import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Globe, Award, Users, TrendingUp, Lightbulb } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Bank-level security with comprehensive KYC/AML verification and regulatory compliance across the MENA region."
    },
    {
      icon: Lightbulb,
      title: "AI Innovation",
      description: "Cutting-edge AI technology that intelligently matches startups with investors based on deep compatibility analysis."
    },
    {
      icon: Globe,
      title: "MENA Focus",
      description: "Deep understanding of regional markets, regulations, and business culture across all MENA countries."
    }
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Active Startups" },
    { icon: TrendingUp, number: "200+", label: "Verified Investors" },
    { icon: Award, number: "$50M+", label: "Total Raised" },
    { icon: Globe, number: "15+", label: "MENA Countries" }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                About Tamweel
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transforming{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  MENA's
                </span>{" "}
                Fundraising Ecosystem
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Tamweel is the region's first AI-powered platform that bridges the gap between 
                innovative startups and accredited investors across the Middle East and North Africa.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to democratize access to funding while maintaining the highest 
                standards of security, compliance, and trust. We combine cutting-edge technology 
                with deep regional expertise to create meaningful connections that drive economic growth.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="group hover:shadow-elegant transition-smooth">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <stat.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mission Statement */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-center">Our Vision</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  "To become the indispensable AI-powered partner for every fundraising 
                  journey in the MENA region, fostering innovation and economic growth 
                  through trusted connections."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;