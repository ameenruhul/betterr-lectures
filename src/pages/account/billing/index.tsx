
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentMethodCard } from "@/components/account/PaymentMethodCard";
import { PricingPlans } from "@/components/account/PricingPlans";
import { Separator } from "@/components/ui/separator";
import { AddPaymentMethodForm } from "@/components/account/AddPaymentMethodForm";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CreditCard, Plus, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const BillingPage = () => {
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  
  // Mock data for payment methods
  const paymentMethods = [
    { 
      id: "pm_1234", 
      type: "card", 
      card: { 
        brand: "visa", 
        last4: "4242", 
        expMonth: 12, 
        expYear: 2025 
      }, 
      isDefault: true 
    },
    { 
      id: "pm_5678", 
      type: "card", 
      card: { 
        brand: "mastercard", 
        last4: "8210", 
        expMonth: 3, 
        expYear: 2024 
      }, 
      isDefault: false 
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              Professional Plan
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Current billing period</h4>
              <p className="font-medium">Oct 12, 2023 - Nov 12, 2023</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Amount due</h4>
              <p className="font-medium">$19.99</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">Next invoice</h4>
              <p className="font-medium">Nov 12, 2023</p>
            </div>
          </div>
          
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Upcoming plan change</AlertTitle>
            <AlertDescription className="text-amber-700">
              Your plan will upgrade to Enterprise on Nov 12, 2023. The new monthly charge will be $49.99.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel Subscription</Button>
          <Button variant="default">Change Plan</Button>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="payment-methods">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="pricing-plans">Pricing Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment-methods" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods for subscription and invoices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <PaymentMethodCard 
                  key={method.id} 
                  paymentMethod={method} 
                />
              ))}
              
              {showAddPaymentMethod ? (
                <>
                  <Separator className="my-4" />
                  <AddPaymentMethodForm 
                    onCancel={() => setShowAddPaymentMethod(false)}
                    onSuccess={() => setShowAddPaymentMethod(false)}
                  />
                </>
              ) : (
                <Button 
                  variant="outline" 
                  className="mt-2" 
                  onClick={() => setShowAddPaymentMethod(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing-plans" className="pt-4">
          <PricingPlans currentPlanId="professional" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingPage;
