import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5 pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered Fundraising Platform
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Connect{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Startups
                </span>{" "}
                with{" "}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  Investors
                </span>{" "}
                in MENA
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Tamweel is the region's first AI-powered platform that matches verified startups 
                with accredited investors through intelligent scoring and secure deal rooms.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-secondary" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-secondary" />
                <span>KYC/AML Verified</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Start Fundraising
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="premium" size="xl">
                Explore Opportunities
              </Button>
            </div>

            {/* User Types */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center p-4 rounded-lg bg-card shadow-card hover:shadow-elegant transition-smooth">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Startups</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card shadow-card hover:shadow-elegant transition-smooth">
                <div className="text-2xl font-bold text-secondary">200+</div>
                <div className="text-sm text-muted-foreground">Investors</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card shadow-card hover:shadow-elegant transition-smooth">
                <div className="text-2xl font-bold text-accent">$50M+</div>
                <div className="text-sm text-muted-foreground">Raised</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="MENA professionals collaborating on innovative business solutions"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            
            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-glow border border-primary/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Trust Score®</div>
                  <div className="text-xs text-muted-foreground">Verified Platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;