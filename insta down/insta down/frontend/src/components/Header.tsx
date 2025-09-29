import { Instagram } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Top Ad Space */}
      <div className="ad-space h-16 mx-4 my-2">
        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
          Google AdSense - Top Banner Ad
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="gradient-instagram p-2 rounded-xl">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-orange bg-clip-text text-transparent">
                Instagram Downloader
              </h1>
              <p className="text-xs text-muted-foreground">
                Free • Fast • Secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;