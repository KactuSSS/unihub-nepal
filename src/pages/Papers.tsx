import { useState } from "react";
import { BubbleNav } from "@/components/BubbleNav";
import { AdBanner } from "@/components/AdBanner";
import { PaperCard } from "@/components/PaperCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Footer } from "@/components/Footer";
import { PaperPreviewDialog } from "@/components/PaperPreviewDialog";
import { Search, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Paper {
  subject: string;
  year: number;
  semester: string;
  examType: string;
  faculty: string;
}

const allPapers: Paper[] = [
  { subject: "Data Structures & Algorithms", year: 2024, semester: "3rd Sem", examType: "Final", faculty: "Engineering" },
  { subject: "Computer Networks", year: 2024, semester: "5th Sem", examType: "Final", faculty: "Engineering" },
  { subject: "Database Management System", year: 2024, semester: "4th Sem", examType: "Internal", faculty: "Engineering" },
  { subject: "Object Oriented Programming", year: 2023, semester: "3rd Sem", examType: "Final", faculty: "Engineering" },
  { subject: "Microeconomics", year: 2024, semester: "2nd Sem", examType: "Final", faculty: "Management" },
  { subject: "Financial Accounting", year: 2024, semester: "1st Sem", examType: "Final", faculty: "Management" },
  { subject: "Organic Chemistry", year: 2023, semester: "4th Sem", examType: "Internal", faculty: "Science" },
  { subject: "Cell Biology", year: 2024, semester: "2nd Sem", examType: "Final", faculty: "Science" },
  { subject: "Human Anatomy", year: 2024, semester: "1st Sem", examType: "Final", faculty: "Medicine" },
  { subject: "Pharmacology", year: 2023, semester: "3rd Sem", examType: "Final", faculty: "Medicine" },
  { subject: "Engineering Mathematics II", year: 2024, semester: "2nd Sem", examType: "Final", faculty: "Engineering" },
  { subject: "Applied Mechanics", year: 2024, semester: "1st Sem", examType: "Final", faculty: "Engineering" },
];

const Papers = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFiltersChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
  };

  const handleViewPaper = (paper: Paper) => {
    setSelectedPaper(paper);
    setPreviewOpen(true);
  };

  const filteredPapers = allPapers.filter((paper) => {
    // Search filter
    const matchesSearch = 
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.faculty.toLowerCase().includes(searchQuery.toLowerCase());

    // Faculty filter
    const facultyFilters = activeFilters["Faculty"] || [];
    const matchesFaculty = facultyFilters.length === 0 || 
      facultyFilters.includes(paper.faculty.toLowerCase());

    // Year filter
    const yearFilters = activeFilters["Year"] || [];
    const matchesYear = yearFilters.length === 0 || 
      yearFilters.includes(paper.year.toString());

    // Semester filter - extract semester number from "3rd Sem" format
    const semesterFilters = activeFilters["Semester"] || [];
    const semesterNumber = paper.semester.match(/(\d+)/)?.[1] || "";
    const matchesSemester = semesterFilters.length === 0 || 
      semesterFilters.includes(semesterNumber);

    return matchesSearch && matchesFaculty && matchesYear && matchesSemester;
  });

  return (
    <div className="min-h-screen bg-background">
      <BubbleNav />
      
      {/* Header */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Past Exam Papers</h1>
            <p className="text-muted-foreground">
              Browse and access papers from the last 7 years
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search papers by subject, faculty..."
                className="pl-12 h-14 rounded-2xl bg-white/80 backdrop-blur-xl border-white/50 shadow-soft text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Top Banner Ad */}
          <AdBanner variant="horizontal" />
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Sidebar */}
            <div className="w-full lg:w-72 flex-shrink-0">
              <FilterSidebar onFiltersChange={handleFiltersChange} />
            </div>

            {/* Papers Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredPapers.length}</span> papers
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-xl"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-xl"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Papers Grid/List */}
              <div className={cn(
                "gap-4",
                viewMode === "grid" 
                  ? "grid sm:grid-cols-2 xl:grid-cols-3" 
                  : "flex flex-col"
              )}>
                {filteredPapers.map((paper, index) => (
                  <>
                    <PaperCard 
                      key={index} 
                      {...paper} 
                      className={viewMode === "list" ? "flex-row" : ""} 
                      onView={() => handleViewPaper(paper)}
                    />
                    {/* Inline ad every 6 papers */}
                    {(index + 1) % 6 === 0 && index !== filteredPapers.length - 1 && (
                      <div key={`ad-${index}`} className={viewMode === "grid" ? "sm:col-span-2 xl:col-span-3" : ""}>
                        <AdBanner variant="inline" />
                      </div>
                    )}
                  </>
                ))}
              </div>

              {filteredPapers.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No papers found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>

            {/* Right Sidebar Ad (Desktop) */}
            <div className="hidden xl:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <AdBanner variant="vertical" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <PaperPreviewDialog 
        paper={selectedPaper} 
        open={previewOpen} 
        onOpenChange={setPreviewOpen} 
      />
    </div>
  );
};

export default Papers;
