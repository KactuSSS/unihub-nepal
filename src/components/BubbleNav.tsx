import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Lock, Briefcase, User, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Past Papers", href: "/papers", icon: <FileText className="w-4 h-4" /> },
  { label: "Answers", href: "/answers", icon: <Lock className="w-4 h-4" /> },
  { label: "Jobs", href: "/jobs", icon: <Briefcase className="w-4 h-4" /> },
  { label: "Profile", href: "/profile", icon: <User className="w-4 h-4" /> },
];

export const BubbleNav = () => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="nav-float">
      <div className="flex items-center gap-1">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 mr-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-foreground hidden sm:block">PaperHub</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-6 bg-border/50 mx-2 hidden sm:block" />

        {/* Nav Items */}
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          const isHovered = hoveredIndex === index;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "bubble-pill relative",
                isActive ? "bubble-pill-active" : "bubble-pill-inactive"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className={cn(
                "transition-transform duration-300",
                (isActive || isHovered) && "scale-110"
              )}>
                {item.icon}
              </span>
              <span className="hidden md:block">{item.label}</span>
              
              {/* Glow effect for active state */}
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl -z-10" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
