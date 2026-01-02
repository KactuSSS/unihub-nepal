import { BubbleNav } from "@/components/BubbleNav";
import { AdBanner } from "@/components/AdBanner";
import { PricingCard } from "@/components/PricingCard";
import { Footer } from "@/components/Footer";
import { Lock, Star, MessageSquare, Eye, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const premiumFeatures = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Model Answers",
    description: "View complete, verified answers for all exam questions",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Exam Frameworks",
    description: "Structured approach guides to tackle any question type",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Community Reviews",
    description: "Rate answers and learn from peer comments",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Access",
    description: "Watermarked, view-only content for your eyes only",
  },
];

const pricingPlans = [
  {
    title: "Monthly",
    price: "Rs. 199",
    period: "month",
    features: [
      "Access all model answers",
      "Exam frameworks & guides",
      "Download up to 20 papers",
      "Email support",
    ],
  },
  {
    title: "Yearly",
    price: "Rs. 999",
    period: "year",
    features: [
      "Everything in Monthly",
      "Unlimited downloads",
      "Priority support",
      "Early access to new papers",
      "Save 58% annually",
    ],
    isPopular: true,
  },
  {
    title: "Lifetime",
    price: "Rs. 2,499",
    period: "one-time",
    features: [
      "Everything in Yearly",
      "Lifetime access",
      "All future updates",
      "Exclusive study materials",
    ],
  },
];

const Answers = () => {
  return (
    <div className="min-h-screen bg-background">
      <BubbleNav />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-amber-100 text-amber-700">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Premium Feature</span>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Model Answers & Exam Frameworks
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Unlock verified solutions and structured approaches to ace your exams. 
              Learn from the best answers and understand the marking schemes.
            </p>
          </div>

          {/* Premium Lock Preview */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Blurred content preview */}
              <div className="blur-md select-none pointer-events-none">
                <h3 className="text-xl font-semibold mb-4">Data Structures & Algorithms - 2024 Final</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="font-medium mb-2">Q1. Explain Binary Search Tree with insertion and deletion operations.</p>
                    <p className="text-muted-foreground">
                      A Binary Search Tree (BST) is a node-based binary tree data structure which has the following properties...
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="font-medium mb-2">Q2. Write a program to implement Quick Sort algorithm.</p>
                    <p className="text-muted-foreground">
                      Quick Sort is a divide-and-conquer algorithm that picks an element as pivot...
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Lock overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Unlock Premium Access</h3>
                <p className="text-muted-foreground mb-4 text-center max-w-sm">
                  Subscribe to view model answers, exam frameworks, and study guides.
                </p>
                <Button variant="premium" size="lg">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {premiumFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 card-hover text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Ad Banner */}
          <AdBanner variant="horizontal" className="mb-16" />

          {/* Pricing */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Plan
            </h2>
            <p className="text-muted-foreground">
              Student-friendly pricing for academic excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>

          {/* Security Note */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Content is watermarked, view-only, and protected from screenshots
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Answers;
