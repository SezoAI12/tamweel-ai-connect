import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, MessageCircle, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Verify",
      description: "Create your profile and complete KYC verification to build trust with our AI-powered Trust Score®.",
      step: "01"
    },
    {
      icon: Search,
      title: "Get Matched",
      description: "Our AI analyzes your profile and connects you with the most relevant investors or startups based on your criteria.",
      step: "02"
    },
    {
      icon: MessageCircle,
      title: "Connect Securely",
      description: "Use our secure messaging and data rooms to share information and communicate with verified parties only.",
      step: "03"
    },
    {
      icon: TrendingUp,
      title: "Close Deals",
      description: "Complete your fundraising or investment with our integrated tools, legal documents, and compliance features.",
      step: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Connection to{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Investment
            </span>{" "}
            in 4 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground">
            Our streamlined process makes fundraising and investing in the MENA region 
            more efficient and secure than ever before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-elegant transition-smooth">
              <CardContent className="p-8 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-hero text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <div className="mb-6 mt-4">
                  <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;