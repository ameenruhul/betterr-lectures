
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface PaymentMethodProps {
  paymentMethod: {
    id: string;
    type: string;
    card?: {
      brand: string;
      last4: string;
      expMonth: number;
      expYear: number;
    };
    isDefault: boolean;
  };
}

export function PaymentMethodCard({ paymentMethod }: PaymentMethodProps) {
  const { card } = paymentMethod;
  
  // Format card brand name for display
  const formatCardBrand = (brand: string) => {
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  };
  
  // Get card icon based on brand
  const getCardIcon = () => {
    // In a real app, you would have different icons for different card brands
    return <CreditCard className="h-5 w-5" />;
  };
  
  const handleSetDefault = () => {
    // Logic to set payment method as default
    console.log("Setting payment method as default:", paymentMethod.id);
  };
  
  const handleDelete = () => {
    // Logic to delete payment method
    console.log("Deleting payment method:", paymentMethod.id);
  };
  
  if (!card) return null;
  
  return (
    <Card className={cn("overflow-hidden", paymentMethod.isDefault && "border-primary border-2")}>
      <CardContent className="p-0">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent rounded-md p-2">
              {getCardIcon()}
            </div>
            <div>
              <div className="font-medium">
                {formatCardBrand(card.brand)} •••• {card.last4}
              </div>
              <div className="text-sm text-muted-foreground">
                Expires {card.expMonth}/{card.expYear}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {paymentMethod.isDefault ? (
              <Badge variant="outline" className="border-green-500 text-green-600 gap-1">
                <Check className="h-3 w-3" />
                Default
              </Badge>
            ) : (
              <Button variant="outline" size="sm" onClick={handleSetDefault}>
                Set Default
              </Button>
            )}
            
            {!paymentMethod.isDefault && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to remove this payment method? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
