import { Card, CardContent } from "@/components/ui/card";
import { Download, Shield, Zap, Smartphone, Users, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Download,
      title: "Download Any Media",
      description: "Support for Instagram photos, videos, reels, and IGTV content"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Quick processing and instant downloads without any waiting"
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your privacy is protected. We don't store your data or URLs"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Works perfectly on all devices - desktop, tablet, and mobile"
    },
    {
      icon: Users,
      title: "No Registration",
      description: "Start downloading immediately without creating an account"
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "24/7 availability with reliable uptime for when you need it"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Instagram Downloader?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most reliable and feature-rich Instagram downloader with millions of satisfied users worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="gradient-card shadow-soft border-0 hover:shadow-medium transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="gradient-instagram p-3 rounded-full w-fit mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;