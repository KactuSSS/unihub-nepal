import { cn } from "@/lib/utils";

interface AdBannerProps {
  variant?: "horizontal" | "vertical" | "inline" | "footer";
  className?: string;
}

const adContent = {
  horizontal: {
    title: "Excel Academy Nepal",
    subtitle: "Prepare for your exams with expert guidance",
    cta: "Enroll Now",
    image: "📚",
  },
  vertical: {
    title: "Study Abroad Consultancy",
    subtitle: "Your gateway to global education",
    cta: "Learn More",
    image: "🌍",
  },
  inline: {
    title: "Language Institute",
    subtitle: "Master IELTS, TOEFL & more",
    cta: "Start Learning",
    image: "🗣️",
  },
  footer: {
    title: "Career Coaching Center",
    subtitle: "Transform your future today",
    cta: "Get Started",
    image: "🎯",
  },
};

export const AdBanner = ({ variant = "horizontal", className }: AdBannerProps) => {
  const content = adContent[variant];

  if (variant === "horizontal") {
    return (
      <div className={cn("ad-container p-4 sm:p-6", className)}>
        <span className="ad-label">Sponsored</span>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{content.image}</div>
            <div>
              <h4 className="font-semibold text-foreground">{content.title}</h4>
              <p className="text-sm text-muted-foreground">{content.subtitle}</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors whitespace-nowrap">
            {content.cta}
          </button>
        </div>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("ad-container p-4 flex flex-col items-center text-center", className)}>
        <span className="ad-label">Sponsored</span>
        <div className="text-5xl mt-4 mb-3">{content.image}</div>
        <h4 className="font-semibold text-foreground mb-1">{content.title}</h4>
        <p className="text-sm text-muted-foreground mb-4">{content.subtitle}</p>
        <button className="w-full px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
          {content.cta}
        </button>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("ad-container p-4 flex items-center gap-4", className)}>
        <span className="ad-label">Sponsored</span>
        <div className="text-3xl">{content.image}</div>
        <div className="flex-1">
          <h4 className="font-medium text-sm text-foreground">{content.title}</h4>
          <p className="text-xs text-muted-foreground">{content.subtitle}</p>
        </div>
        <button className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
          {content.cta}
        </button>
      </div>
    );
  }

  // Footer variant
  return (
    <div className={cn("ad-container py-3 px-4 flex items-center justify-center gap-6", className)}>
      <span className="ad-label">Sponsored</span>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{content.image}</span>
        <span className="text-sm font-medium text-foreground">{content.title}</span>
        <span className="text-sm text-muted-foreground hidden sm:block">—</span>
        <span className="text-sm text-muted-foreground hidden sm:block">{content.subtitle}</span>
      </div>
      <button className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
        {content.cta}
      </button>
    </div>
  );
};
