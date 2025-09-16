import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, TrendingUp, Briefcase, ArrowRight, Star, Shield, Zap } from "lucide-react";

const UserRoles = () => {
  const roles = [
    {
      title: "Startups & Founders",
      description: "Get AI-powered insights, connect with verified investors, and secure funding faster",
      icon: Rocket,
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "AI Project Score with improvement tips",
        "Secure Data Room with NDA protection",
        "Verified investor connections",
        "Pitch deck analysis & feedback",
        "Valuation benchmarking tools"
      ],
      cta: "Start Fundraising",
      badge: "Most Popular"
    },
    {
      title: "Investors",
      description: "Access curated deal flow, evaluate startups with AI insights, and make informed decisions",
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      features: [
        "Curated deal flow with AI scoring",
        "Risk assessment & growth predictions",
        "Anonymous browsing options",
        "Secure due diligence access",
        "Portfolio fit analysis"
      ],
      cta: "Explore Deals",
      badge: "Premium Access"
    },
    {
      title: "Service Providers",
      description: "Connect with startups needing your expertise in legal, marketing, consulting & more",
      icon: Briefcase,
      color: "text-accent",
      bgColor: "bg-accent/10",
      features: [
        "AI-matched startup leads",
        "Specialized service marketplace",
        "Direct messaging with founders",
        "Featured provider listings",
        "Industry trend insights"
      ],
      cta: "Join Network",
      badge: "Growing Network"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="w-fit mx-auto">
            <Star className="w-3 h-3 mr-1" />
            Choose Your Path
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold">
            Built for Every Player in the{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're raising capital, investing in the future, or providing essential services, 
            Tamweel connects you with the right opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <Card key={index} className="relative group hover:shadow-elegant transition-smooth border-0 shadow-card bg-gradient-card">
                {role.badge && (
                  <div className="absolute -top-3 left-6">
                    <Badge variant="secondary" className="bg-gradient-accent text-accent-foreground">
                      {role.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 ${role.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${role.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">{role.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {role.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-gradient-hero rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={index === 0 ? "hero" : index === 1 ? "secondary" : "cta"} 
                    className="w-full group"
                    size="lg"
                  >
                    {role.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-8 bg-card rounded-2xl p-6 shadow-card">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">KYC/AML Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">AI-Powered Matching</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Trust Score® System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRoles;