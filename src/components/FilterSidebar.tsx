import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
}

const filterGroups: FilterGroup[] = [
  {
    title: "Faculty",
    options: [
      { label: "Engineering", value: "engineering" },
      { label: "Science", value: "science" },
      { label: "Management", value: "management" },
      { label: "Humanities", value: "humanities" },
      { label: "Medicine", value: "medicine" },
    ],
  },
  {
    title: "Program",
    options: [
      { label: "Bachelor's", value: "bachelors" },
      { label: "Master's", value: "masters" },
      { label: "PhD", value: "phd" },
    ],
  },
  {
    title: "Semester",
    options: [
      { label: "1st Semester", value: "1" },
      { label: "2nd Semester", value: "2" },
      { label: "3rd Semester", value: "3" },
      { label: "4th Semester", value: "4" },
      { label: "5th Semester", value: "5" },
      { label: "6th Semester", value: "6" },
      { label: "7th Semester", value: "7" },
      { label: "8th Semester", value: "8" },
    ],
  },
  {
    title: "Year",
    options: [
      { label: "2024", value: "2024" },
      { label: "2023", value: "2023" },
      { label: "2022", value: "2022" },
      { label: "2021", value: "2021" },
      { label: "2020", value: "2020" },
      { label: "2019", value: "2019" },
      { label: "2018", value: "2018" },
    ],
  },
];

interface FilterSidebarProps {
  className?: string;
  onFiltersChange?: (filters: Record<string, string[]>) => void;
}

export const FilterSidebar = ({ className, onFiltersChange }: FilterSidebarProps) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Faculty", "Year"]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title)
        ? prev.filter((g) => g !== title)
        : [...prev, title]
    );
  };

  const toggleFilter = (groupTitle: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[groupTitle] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      
      const newFilters = { ...prev, [groupTitle]: updated };
      onFiltersChange?.(newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFiltersChange?.({});
  };

  const totalSelected = Object.values(selectedFilters).flat().length;

  return (
    <aside className={cn("glass-card p-5", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Filters</h2>
          {totalSelected > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-primary rounded-full">
              {totalSelected}
            </span>
          )}
        </div>
        {totalSelected > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-4">
        {filterGroups.map((group) => {
          const isExpanded = expandedGroups.includes(group.title);
          const groupSelected = selectedFilters[group.title] || [];

          return (
            <div key={group.title} className="border-b border-border/50 pb-4 last:border-0">
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between w-full text-left group"
              >
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {group.title}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {isExpanded && (
                <div className="mt-3 space-y-2 animate-slide-in-bottom">
                  {group.options.map((option) => {
                    const isSelected = groupSelected.includes(option.value);

                    return (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer group/item"
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center",
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-border group-hover/item:border-primary/50"
                          )}
                          onClick={() => toggleFilter(group.title, option.value)}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            isSelected ? "text-foreground font-medium" : "text-muted-foreground"
                          )}
                          onClick={() => toggleFilter(group.title, option.value)}
                        >
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Apply Button */}
      <Button variant="premium" className="w-full mt-6">
        Apply Filters
      </Button>
    </aside>
  );
};
