# Instagram Downloader

A professional web application for downloading Instagram photos, videos, and reels.

## Features

- ✨ Download Instagram photos, videos, and reels
- 🚀 Fast and secure downloads
- 📱 Responsive design for mobile and desktop
- 🔒 No registration required
- 💰 Completely free to use
- 🎯 SEO optimized with structured data
- 📊 Google AdSense integration ready

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Shadcn/ui components
- Lucide React icons

### Backend
- Flask (Python)
- yt-dlp for Instagram media extraction
- Flask-CORS for cross-origin requests
- Gunicorn for production deployment

## Local Development

### Backend Setup

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask development server:
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Deployment

### Railway Deployment (Backend)

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Python app and use the `Procfile`
3. Set environment variables if needed
4. Deploy!

### Netlify/Vercel Deployment (Frontend)

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting platform

## Environment Variables

### Backend
- `PORT` - Port number (Railway sets this automatically)

### Frontend
- Update the API base URL in the frontend code to point to your deployed backend

## SEO Features

- ✅ Dynamic meta tags and Open Graph tags
- ✅ Structured data (JSON-LD) for SoftwareApplication
- ✅ Sitemap.xml generation
- ✅ Robots.txt with proper directives
- ✅ Canonical URLs
- ✅ Mobile-first responsive design
- ✅ Fast loading optimized build

## Google AdSense Integration

The app includes placeholder ad units in three strategic positions:
- Sticky header ad
- In-content ad (between heading and form)
- Footer ad

Replace `ca-pub-XXXXXXXXXXXXXXXXX` with your actual AdSense publisher ID.

## API Endpoints

- `POST /api/download` - Download Instagram media
- `GET /api/health` - Health check
- `GET /sitemap.xml` - SEO sitemap
- `GET /robots.txt` - Robots file
- `GET /` - Main application

## Security Features

- Input validation for Instagram URLs
- File size limits (100MB max)
- CORS properly configured
- Temporary file cleanup
- Error handling and sanitization

## Legal Notice

This tool is for educational purposes. Users are responsible for complying with Instagram's Terms of Service and respecting content creators' rights.

## License

MIT License - see LICENSE file for details
