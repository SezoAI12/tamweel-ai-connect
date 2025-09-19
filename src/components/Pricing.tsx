import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "Free",
      description: "Perfect for early-stage startups and individual investors",
      features: [
        "Basic profile creation",
        "Limited monthly matches",
        "Standard messaging",
        "Basic Trust Score®",
        "Community access"
      ],
      cta: "Get Started Free",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      icon: Star,
      price: "$99/mo",
      description: "For active startups and serious investors",
      features: [
        "Unlimited matches",
        "Advanced AI insights",
        "Priority support",
        "Enhanced Trust Score®",
        "Data room access",
        "Video calls integration",
        "Legal document templates"
      ],
      cta: "Start Free Trial",
      variant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      description: "For VCs, family offices, and large organizations",
      features: [
        "Everything in Professional",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics",
        "Bulk operations",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      variant: "premium" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            Pricing Plans
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Growth
            </span>{" "}
            Plan
          </h2>
          <p className="text-xl text-muted-foreground">
            Transparent pricing that scales with your success. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-elegant transition-smooth ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-hero text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary mb-2">
                  {plan.price}
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="text-base font-normal text-muted-foreground">
                      /month
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/auth" className="block">
                  <Button 
                    variant={plan.variant} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include bank-level security, KYC/AML compliance, and 24/7 support.
          </p>
          <p className="text-sm text-muted-foreground">
            Success fees apply only when deals are successfully closed through our platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;