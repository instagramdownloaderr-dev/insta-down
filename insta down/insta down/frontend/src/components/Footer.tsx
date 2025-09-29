import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      {/* Footer Ad Space */}
      <div className="container mx-auto px-4 py-6">
        <div className="ad-space h-24 mb-8">
          Google AdSense - Footer Ad
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="gradient-instagram p-2 rounded-xl">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange bg-clip-text text-transparent">
                Instagram Downloader
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              The most trusted Instagram downloader tool. Download Instagram photos, videos, and reels 
              quickly and securely. Free to use with no registration required.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">How to Use</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Support</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">DMCA</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Instagram Downloader. All rights reserved. Not affiliated with Instagram.</p>
          <p className="mt-2">This tool is for personal use only. Please respect content creators' rights and Instagram's terms of service.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;