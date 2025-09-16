import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Shield, 
  MessageSquare, 
  FileCheck, 
  TrendingUp, 
  Video,
  Sparkles,
  Globe
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our advanced AI analyzes your profile, sector, stage, and preferences to connect you with the most relevant opportunities.",
      badge: "Core Feature",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Trust Score® System",
      description: "Multi-tier verification with KYC/AML checks ensures every user is legitimate and trustworthy.",
      badge: "Security",
      color: "text-secondary"
    },
    {
      icon: TrendingUp,
      title: "AI Project Scoring",
      description: "Startups receive comprehensive AI-driven scores with actionable insights for improvement.",
      badge: "AI Insights",
      color: "text-accent"
    },
    {
      icon: FileCheck,
      title: "Secure Data Rooms",
      description: "Share sensitive documents with automatic NDA enforcement and access control.",
      badge: "Enterprise",
      color: "text-primary"
    },
    {
      icon: MessageSquare,
      title: "Smart Communication",
      description: "Encrypted messaging with AI coaching for better investor-startup conversations.",
      badge: "Communication",
      color: "text-secondary"
    },
    {
      icon: Video,
      title: "Virtual Pitch Events",
      description: "AI-curated demo days connecting promising startups with interested investors.",
      badge: "Networking",
      color: "text-accent"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="w-fit mx-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold">
            Everything You Need to{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered matching to secure deal rooms, our platform provides all the tools 
            needed for successful fundraising and investment in the MENA region.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-elegant transition-smooth border-0 shadow-card bg-gradient-card hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-card rounded-xl flex items-center justify-center group-hover:shadow-glow transition-smooth`}>
                      <IconComponent className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-smooth">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Regional Focus */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-card shadow-elegant border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Globe className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold">MENA-First, Globally Scalable</h3>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Built specifically for the Middle East & North Africa market with Arabic and English support, 
                regional compliance standards, and understanding of local business culture.
              </p>
              <div className="flex justify-center space-x-8 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">🇸🇦</div>
                  <div className="text-sm text-muted-foreground">Saudi Arabia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">🇦🇪</div>
                  <div className="text-sm text-muted-foreground">UAE</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">🌍</div>
                  <div className="text-sm text-muted-foreground">Expanding</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;