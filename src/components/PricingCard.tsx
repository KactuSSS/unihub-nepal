import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  className?: string;
  onSelect?: () => void;
}

export const PricingCard = ({
  title,
  price,
  period,
  features,
  isPopular = false,
  className,
  onSelect,
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 transition-all duration-300",
        isPopular
          ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-glow-lg scale-105"
          : "glass-card",
        className
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-primary text-sm font-semibold rounded-full shadow-md flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className={cn(
          "text-lg font-semibold mb-2",
          isPopular ? "text-white" : "text-foreground"
        )}>
          {title}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className={cn(
            "text-4xl font-bold",
            isPopular ? "text-white" : "text-foreground"
          )}>
            {price}
          </span>
          <span className={cn(
            "text-sm",
            isPopular ? "text-white/70" : "text-muted-foreground"
          )}>
            /{period}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
              isPopular ? "bg-white/20" : "bg-primary/10"
            )}>
              <Check className={cn(
                "w-3 h-3",
                isPopular ? "text-white" : "text-primary"
              )} />
            </div>
            <span className={cn(
              "text-sm",
              isPopular ? "text-white/90" : "text-muted-foreground"
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={isPopular ? "glass" : "premium"}
        className={cn(
          "w-full",
          isPopular && "text-primary hover:bg-white"
        )}
        onClick={onSelect}
      >
        Get Started
      </Button>
    </div>
  );
};
