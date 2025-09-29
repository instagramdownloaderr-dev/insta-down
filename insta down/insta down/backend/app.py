from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import re
import os
import tempfile
from urllib.parse import urlparse
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

def validate_instagram_url(url):
    """Validate if the URL is a valid Instagram post URL"""
    instagram_patterns = [
        r'^https://www\.instagram\.com/p/[A-Za-z0-9_-]+/?.*$',
        r'^https://www\.instagram\.com/reel/[A-Za-z0-9_-]+/?.*$',
        r'^https://www\.instagram\.com/tv/[A-Za-z0-9_-]+/?.*$'
    ]
    
    for pattern in instagram_patterns:
        if re.match(pattern, url):
            return True
    return False

def extract_instagram_media(url):
    """Extract media information from Instagram post"""
    try:
        # Clean URL - remove query parameters except essential ones
        base_url = url.split('?')[0]
        if not base_url.endswith('/'):
            base_url += '/'
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        }
        
        response = requests.get(base_url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract title
        title_tag = soup.find('meta', property='og:title')
        title = title_tag['content'] if title_tag else 'Instagram Media'
        
        # Extract media URLs
        preview_url = None
        download_url = None
        media_type = 'image'
        
        # Try to get video first (for reels/videos)
        video_tag = soup.find('meta', property='og:video')
        if video_tag and video_tag.get('content'):
            preview_url = video_tag['content']
            download_url = video_tag['content']
            media_type = 'video'
        else:
            # Fall back to image
            image_tag = soup.find('meta', property='og:image')
            if image_tag and image_tag.get('content'):
                preview_url = image_tag['content']
                download_url = image_tag['content']
                media_type = 'image'
        
        if not preview_url:
            return None, "Could not extract media from this Instagram post"
        
        return {
            'preview_url': preview_url,
            'download_url': download_url,
            'media_type': media_type,
            'title': title
        }, None
        
    except requests.exceptions.Timeout:
        return None, "Request timed out. Please try again."
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        return None, "Failed to fetch Instagram post. The post might be private or deleted."
    except Exception as e:
        logger.error(f"Extraction error: {str(e)}")
        return None, "An error occurred while processing the Instagram post."

def download_media_file(media_url, title):
    """Download media file from URL"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        }
        
        response = requests.get(media_url, headers=headers, timeout=30, stream=True)
        response.raise_for_status()
        
        # Determine file extension from content type or URL
        content_type = response.headers.get('content-type', '')
        if 'video' in content_type:
            extension = '.mp4'
        elif 'image' in content_type:
            extension = '.jpg'
        else:
            # Try to get extension from URL
            parsed_url = urlparse(media_url)
            path = parsed_url.path
            if '.' in path:
                extension = path.split('.')[-1]
                if extension not in ['jpg', 'jpeg', 'png', 'mp4', 'mov']:
                    extension = '.jpg'
                else:
                    extension = '.' + extension
            else:
                extension = '.jpg'
        
        # Create temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=extension)
        
        # Download file in chunks
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                temp_file.write(chunk)
        
        temp_file.close()
        return temp_file.name, None
        
    except Exception as e:
        logger.error(f"Download error: {str(e)}")
        return None, "Failed to download media file."

@app.route('/api/extract', methods=['POST'])
def extract_media():
    """Extract media information from Instagram URL"""
    try:
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({'error': 'URL is required'}), 400
        
        url = data['url'].strip()
        
        if not validate_instagram_url(url):
            return jsonify({'error': 'Invalid Instagram URL. Please provide a valid Instagram post, reel, or video URL.'}), 400
        
        media_info, error = extract_instagram_media(url)
        
        if error:
            return jsonify({'error': error}), 400
        
        if not media_info:
            return jsonify({'error': 'Could not extract media from this post'}), 400
        
        return jsonify(media_info)
        
    except Exception as e:
        logger.error(f"Extract endpoint error: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/api/download', methods=['POST'])
def download_media():
    """Download media file"""
    try:
        data = request.get_json()
        if not data or 'download_url' not in data:
            return jsonify({'error': 'download_url is required'}), 400
        
        download_url = data['download_url']
        title = data.get('title', 'instagram_media')
        
        # Clean title for filename
        safe_title = re.sub(r'[^\w\s-]', '', title)
        safe_title = re.sub(r'[-\s]+', '-', safe_title)
        
        temp_file_path, error = download_media_file(download_url, safe_title)
        
        if error:
            return jsonify({'error': error}), 400
        
        if not temp_file_path:
            return jsonify({'error': 'Failed to download file'}), 400
        
        # Determine filename and mimetype
        if temp_file_path.endswith('.mp4'):
            filename = f"{safe_title}.mp4"
            mimetype = 'video/mp4'
        else:
            filename = f"{safe_title}.jpg"
            mimetype = 'image/jpeg'
        
        def remove_file(response):
            try:
                os.unlink(temp_file_path)
            except:
                pass
            return response
        
        return send_file(
            temp_file_path,
            as_attachment=True,
            download_name=filename,
            mimetype=mimetype
        )
        
    except Exception as e:
        logger.error(f"Download endpoint error: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/sitemap.xml')
def sitemap():
    """Generate sitemap.xml"""
    sitemap_xml = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>2024-01-01</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>'''
    
    response = make_response(sitemap_xml)
    response.headers['Content-Type'] = 'application/xml'
    return response

@app.route('/robots.txt')
def robots():
    """Generate robots.txt"""
    robots_txt = '''User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml'''
    
    response = make_response(robots_txt)
    response.headers['Content-Type'] = 'text/plain'
    return response

@app.route('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Instagram Downloader API is running'})

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)