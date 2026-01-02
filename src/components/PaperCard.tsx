import { FileText, Calendar, BookOpen, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaperCardProps {
  subject: string;
  year: number;
  semester: string;
  examType: string;
  faculty?: string;
  className?: string;
  onView?: () => void;
}

export const PaperCard = ({
  subject,
  year,
  semester,
  examType,
  faculty,
  className,
  onView,
}: PaperCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-5 card-hover group",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-colors">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
          {examType}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {subject}
      </h3>
      
      {faculty && (
        <p className="text-sm text-muted-foreground mb-3">{faculty}</p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{year}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>{semester}</span>
        </div>
      </div>

      {/* Action */}
      <Button
        variant="glass"
        className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
        onClick={onView}
      >
        <Eye className="w-4 h-4 mr-2" />
        View Paper
      </Button>
    </div>
  );
};
