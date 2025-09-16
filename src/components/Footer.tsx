import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Globe 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Tamweel</span>
            </div>
            <p className="text-muted-foreground">
              The MENA region's first AI-powered fundraising and networking platform connecting startups with investors.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Globe className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">For Startups</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">For Investors</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">For Providers</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">AI Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Security</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-smooth">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">API Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Compliance</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Dubai, UAE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@tamweel.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+966 11 123 4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2024 Tamweel. All rights reserved.</span>
              <Badge variant="outline" className="text-xs">
                MENA Region
              </Badge>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-smooth">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;