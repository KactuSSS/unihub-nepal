import { MapPin, Calendar, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JobCardProps {
  company: string;
  role: string;
  location: string;
  deadline: string;
  type: "internship" | "job";
  isPaid?: boolean;
  className?: string;
}

export const JobCard = ({
  company,
  role,
  location,
  deadline,
  type,
  isPaid = true,
  className,
}: JobCardProps) => {
  return (
    <div className={cn("glass-card p-5 card-hover group", className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-2xl font-bold text-primary">
          {company.charAt(0)}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-3 py-1 text-xs font-medium rounded-full",
            type === "internship"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          )}>
            {type === "internship" ? "Internship" : "Full-time"}
          </span>
          {isPaid && (
            <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              Paid
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {role}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{company}</p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>Due: {deadline}</span>
        </div>
      </div>

      {/* Action */}
      <Button
        variant="glass"
        className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Apply Now
      </Button>
    </div>
  );
};
