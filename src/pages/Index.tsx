import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BubbleNav } from "@/components/BubbleNav";
import heroIllustration from "@/assets/hero-illustration.png";
import { AdBanner } from "@/components/AdBanner";
import { PaperCard } from "@/components/PaperCard";
import { PricingCard } from "@/components/PricingCard";
import { Footer } from "@/components/Footer";
import { 
  GraduationCap, 
  FileText, 
  Building2, 
  Calendar, 
  Users,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Star
} from "lucide-react";

const stats = [
  { icon: <FileText className="w-6 h-6" />, value: "50,000+", label: "Past Papers" },
  { icon: <Building2 className="w-6 h-6" />, value: "15+", label: "Universities" },
  { icon: <Calendar className="w-6 h-6" />, value: "7", label: "Years Covered" },
  { icon: <Users className="w-6 h-6" />, value: "100K+", label: "Students" },
];

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Comprehensive Papers",
    description: "Access past papers from the last 7 years across all major universities in Nepal.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Verified Content",
    description: "All papers are verified and organized by faculty, program, and semester.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Updated Regularly",
    description: "New papers added within weeks of exam completion.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Premium Answers",
    description: "Get model answers and exam frameworks with our premium subscription.",
  },
];

const samplePapers = [
  { subject: "Data Structures & Algorithms", year: 2024, semester: "3rd Sem", examType: "Final", faculty: "Engineering" },
  { subject: "Microeconomics", year: 2024, semester: "2nd Sem", examType: "Final", faculty: "Management" },
  { subject: "Organic Chemistry", year: 2023, semester: "4th Sem", examType: "Internal", faculty: "Science" },
  { subject: "Human Anatomy", year: 2024, semester: "1st Sem", examType: "Final", faculty: "Medicine" },
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

const universities = [
  "Tribhuvan University",
  "Kathmandu University",
  "Pokhara University",
  "Purbanchal University",
  "Mid-Western University",
  "Far-Western University",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BubbleNav />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Nepal's #1 Exam Paper Platform</span>
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-slide-in-bottom">
              Your Gateway to
              <span className="block gradient-text">Academic Excellence</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
              Access 50,000+ past exam papers from all major Nepalese universities. 
              Study smarter, prepare better, and excel in your exams.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
              <Link to="/login">
                <Button variant="hero" size="xl">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/papers">
                <Button variant="glass" size="xl">
                  Browse Papers
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card p-5 text-center card-hover"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 mb-16">
        <AdBanner variant="horizontal" />
      </div>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose PaperHub?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built the most comprehensive exam preparation platform for Nepalese students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 card-hover text-center"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Universities Covered
            </h2>
            <p className="text-muted-foreground">
              Papers from all major universities in Nepal
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {universities.map((uni) => (
              <div
                key={uni}
                className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-bubble text-foreground font-medium hover:shadow-soft transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {uni}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Papers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Latest Papers
              </h2>
              <p className="text-muted-foreground">
                Recently added exam papers
              </p>
            </div>
            <Link to="/papers">
              <Button variant="glass">
                View All Papers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {samplePapers.map((paper, index) => (
              <PaperCard key={index} {...paper} />
            ))}
          </div>

          {/* Inline Ad */}
          <div className="mt-8">
            <AdBanner variant="inline" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Unlock Premium Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get access to model answers, exam frameworks, and exclusive study materials.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-10 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Ace Your Exams?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of students who are already preparing smarter with PaperHub Nepal.
              </p>
              
              <Link to="/login">
                <Button variant="hero" size="xl">
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      <div className="container mx-auto px-4 mb-8">
        <AdBanner variant="footer" />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
