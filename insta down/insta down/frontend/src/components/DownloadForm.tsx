import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Link, Play, Image, Zap, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaPreview {
  preview_url: string;
  download_url: string;
  media_type: 'image' | 'video';
  title: string;
}

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<MediaPreview | null>(null);
  const { toast } = useToast();

  const validateInstagramUrl = (url: string): boolean => {
    const instagramRegex = /^https:\/\/(?:www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?(\?.*)?$/;
    return instagramRegex.test(url);
  };

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter an Instagram URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateInstagramUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Instagram post, reel, or video URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setMediaPreview(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Backend API not available. Please ensure the Flask backend is running.");
        }
        
        let errorMessage = "Failed to extract media";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setMediaPreview(data);
      
      toast({
        title: "Media Found!",
        description: "Preview loaded successfully. Click Download to save the media.",
      });
    } catch (error) {
      console.error('Extraction error:', error);
      toast({
        title: "Extraction Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!mediaPreview) return;

    setIsDownloading(true);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          download_url: mediaPreview.download_url,
          title: mediaPreview.title,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Download failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Download error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${mediaPreview.title.replace(/[^\w\s-]/g, '').replace(/[-\s]+/g, '-')}.${mediaPreview.media_type === 'video' ? 'mp4' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      toast({
        title: "Download Complete!",
        description: "Media file has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange bg-clip-text text-transparent mb-6">
            Instagram Downloader
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download Instagram photos, videos, and reels instantly. Fast, free, and secure - no registration required.
          </p>
        </div>

        {/* Ad Space */}
        <div className="ad-space h-24 mb-8 rounded-lg">
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Google AdSense - Top Banner
          </div>
        </div>

        {/* Main Download Form */}
        <Card className="shadow-soft border-0 bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Link className="h-6 w-6" />
              Paste Instagram Link
            </CardTitle>
            <CardDescription>
              Enter any Instagram post, reel, or video URL to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleExtract} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://www.instagram.com/p/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 h-12 text-base"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isLoading || !url.trim()}
                  className="px-8"
                >
                  {isLoading ? "Loading..." : "Get Preview"}
                </Button>
              </div>
            </form>

            {/* Media Preview */}
            {mediaPreview && (
              <div className="mt-8 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">{mediaPreview.title}</h3>
                  
                  {mediaPreview.media_type === 'image' ? (
                    <div className="relative inline-block">
                      <img
                        src={mediaPreview.preview_url}
                        alt="Instagram media preview"
                        className="max-w-full h-auto max-h-96 rounded-lg shadow-medium"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                        <Image className="h-3 w-3" />
                        Image
                      </div>
                    </div>
                  ) : (
                    <div className="relative inline-block">
                      <video
                        src={mediaPreview.preview_url}
                        controls
                        className="max-w-full h-auto max-h-96 rounded-lg shadow-medium"
                        onError={(e) => {
                          e.currentTarget.poster = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        Video
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    size="lg"
                    className="px-8 bg-gradient-to-r from-instagram-pink to-instagram-purple hover:from-instagram-purple hover:to-instagram-orange transition-all duration-300"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {isDownloading ? "Downloading..." : "Download Now"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center border-0 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Download Instagram media in seconds with our optimized servers
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">100% Secure</h3>
              <p className="text-sm text-muted-foreground">
                Your privacy is protected. No data stored, no registration required
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Always Free</h3>
              <p className="text-sm text-muted-foreground">
                Unlimited downloads, no premium plans, completely free forever
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How to Use */}
        <Card className="mt-12 border-0 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>How to Download Instagram Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-instagram-pink rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Copy Instagram URL</h4>
                <p className="text-sm text-muted-foreground">
                  Go to Instagram, find the post/reel you want, and copy the URL
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-instagram-purple rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Paste & Preview</h4>
                <p className="text-sm text-muted-foreground">
                  Paste the URL above and click "Get Preview" to see the media
                </p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-instagram-orange rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Download & Enjoy</h4>
                <p className="text-sm text-muted-foreground">
                  Click "Download Now" to save the image or video to your device
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad Space */}
        <div className="ad-space h-24 mt-12 rounded-lg">
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Google AdSense - Bottom Banner
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadForm;