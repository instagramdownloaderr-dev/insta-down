import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Zap, Shield } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-80 space-y-6">
      {/* Side Ad Space */}
      <div className="ad-space h-64 rounded-lg">
        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
          Google AdSense - Sidebar Ad
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="border-0 bg-card/50 backdrop-blur">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4 text-center">Why Choose Us?</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">100% Free</p>
                <p className="text-xs text-muted-foreground">Always free, no hidden costs</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">No Registration</p>
                <p className="text-xs text-muted-foreground">Start downloading immediately</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Lightning Fast</p>
                <p className="text-xs text-muted-foreground">Download in seconds</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Secure & Private</p>
                <p className="text-xs text-muted-foreground">Your data stays safe</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Another Ad Space */}
      <div className="ad-space h-48 rounded-lg">
        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
          Google AdSense - Sidebar Ad 2
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;