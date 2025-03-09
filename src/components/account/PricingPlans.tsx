
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingPlansProps {
  currentPlanId: string;
}

export function PricingPlans({ currentPlanId }: PricingPlansProps) {
  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Basic features for educators just getting started",
      price: "0",
      features: [
        "3 courses maximum",
        "Limited AI-powered features",
        "Basic quiz creation",
        "Email support"
      ],
      cta: "Current Plan",
      disabled: false,
    },
    {
      id: "professional",
      name: "Professional",
      description: "Everything you need for professional educators",
      price: "19.99",
      features: [
        "Unlimited courses",
        "Full AI assistance",
        "Advanced assessment tools",
        "Chat & email support",
        "Lecture preparation tools",
        "Student analytics"
      ],
      cta: "Current Plan",
      disabled: false,
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom solutions for institutions and departments",
      price: "49.99",
      features: [
        "All Professional features",
        "Custom integrations",
        "Department-wide collaboration",
        "Priority support",
        "API access",
        "Dedicated account manager"
      ],
      cta: "Upgrade",
      disabled: false,
    },
  ];

  const handlePlanChange = (planId: string) => {
    console.log(`Changing to plan: ${planId}`);
    // In a real app, this would trigger a Stripe checkout session
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {plans.map((plan) => {
        const isCurrentPlan = plan.id === currentPlanId;
        
        return (
          <Card 
            key={plan.id} 
            className={cn(
              "flex flex-col",
              isCurrentPlan && "border-primary",
              plan.popular && !isCurrentPlan && "border-blue-200"
            )}
          >
            <CardHeader>
              {plan.popular && (
                <Badge className="w-fit mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Most Popular
                </Badge>
              )}
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={cn("w-full", plan.popular && !isCurrentPlan && "bg-blue-600 hover:bg-blue-700")}
                variant={isCurrentPlan ? "outline" : "default"}
                disabled={isCurrentPlan || plan.disabled}
                onClick={() => handlePlanChange(plan.id)}
              >
                {isCurrentPlan ? (
                  <>Current Plan</>
                ) : (
                  <>
                    {plan.cta}
                    {plan.popular && <Zap className="ml-2 h-4 w-4" />}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
