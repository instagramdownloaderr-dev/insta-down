import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import DownloadForm from "@/components/DownloadForm";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Instagram Downloader - Download Photos, Videos & Reels Free</title>
        <meta name="description" content="Download Instagram photos, videos, and reels instantly. Free, fast, and secure Instagram downloader. No registration required." />
        <meta name="keywords" content="instagram downloader, instagram video downloader, instagram photo downloader, instagram reels downloader, free instagram downloader" />
        <meta name="author" content="Instagram Downloader" />
        <link rel="canonical" href="https://yourdomain.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Instagram Downloader - Download Photos, Videos & Reels Free" />
        <meta property="og:description" content="Download Instagram photos, videos, and reels instantly. Free, fast, and secure Instagram downloader. No registration required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Instagram Downloader - Download Photos, Videos & Reels Free" />
        <meta name="twitter:description" content="Download Instagram photos, videos, and reels instantly. Free, fast, and secure Instagram downloader. No registration required." />
        <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Instagram Downloader",
            "description": "Download Instagram photos, videos, and reels instantly. Free, fast, and secure Instagram downloader.",
            "applicationCategory": "Utility",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex container mx-auto">
          <main className="flex-1">
            <DownloadForm />
            <Features />
            <FAQ />
          </main>
          <div className="hidden lg:block ml-8">
            <Sidebar />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
