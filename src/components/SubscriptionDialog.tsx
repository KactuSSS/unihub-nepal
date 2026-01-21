import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, Lock, CheckCircle, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface SubscriptionDialogProps {
  plan: {
    title: string;
    price: string;
    period: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SubscriptionDialog = ({
  plan,
  open,
  onOpenChange,
}: SubscriptionDialogProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to subscribe");
      onOpenChange(false);
      navigate("/login");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    toast.success("Subscription activated successfully!");
    
    setTimeout(() => {
      setIsSuccess(false);
      onOpenChange(false);
      navigate("/answers");
    }, 2000);
  };

  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Subscribe to {plan.title} Plan
          </DialogTitle>
          <DialogDescription>
            {plan.price}/{plan.period} - Unlock premium features
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Welcome to Premium!
            </h3>
            <p className="text-muted-foreground">
              You now have access to all premium features.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4">
            {/* Plan Summary */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{plan.title} Plan</span>
                <span className="text-lg font-bold text-primary">{plan.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Billed {plan.period === "one-time" ? "once" : plan.period + "ly"}
              </p>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  required
                />
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Your payment information is encrypted and secure</span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="glass"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="premium"
                className="flex-1"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay ${plan.price}`}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
