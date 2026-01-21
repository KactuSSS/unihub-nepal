import { useState } from "react";
import { BubbleNav } from "@/components/BubbleNav";
import { AdBanner } from "@/components/AdBanner";
import { JobCard } from "@/components/JobCard";
import { JobApplicationDialog } from "@/components/JobApplicationDialog";
import { Footer } from "@/components/Footer";
import { Search, Filter, Briefcase, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Job {
  company: string;
  role: string;
  location: string;
  deadline: string;
  type: "internship" | "job";
  isPaid?: boolean;
}

const allJobs = [
  {
    company: "Fusemachines",
    role: "Machine Learning Intern",
    location: "Kathmandu",
    deadline: "Jan 15, 2025",
    type: "internship" as const,
    isPaid: true,
  },
  {
    company: "Leapfrog Technology",
    role: "Software Engineer",
    location: "Lalitpur",
    deadline: "Jan 20, 2025",
    type: "job" as const,
    isPaid: true,
  },
  {
    company: "CloudFactory",
    role: "Data Analyst Intern",
    location: "Remote",
    deadline: "Jan 12, 2025",
    type: "internship" as const,
    isPaid: true,
  },
  {
    company: "Deerwalk Institute",
    role: "Teaching Assistant",
    location: "Kathmandu",
    deadline: "Jan 18, 2025",
    type: "internship" as const,
    isPaid: false,
  },
  {
    company: "Yomari Info",
    role: "Frontend Developer",
    location: "Kathmandu",
    deadline: "Jan 25, 2025",
    type: "job" as const,
    isPaid: true,
  },
  {
    company: "F1Soft International",
    role: "QA Engineer Intern",
    location: "Lalitpur",
    deadline: "Jan 22, 2025",
    type: "internship" as const,
    isPaid: true,
  },
  {
    company: "Cotiviti Nepal",
    role: "Associate Software Engineer",
    location: "Lalitpur",
    deadline: "Jan 30, 2025",
    type: "job" as const,
    isPaid: true,
  },
  {
    company: "Verisk Nepal",
    role: "Data Science Intern",
    location: "Kathmandu",
    deadline: "Jan 28, 2025",
    type: "internship" as const,
    isPaid: true,
  },
];

type FilterType = "all" | "internship" | "job";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationOpen, setApplicationOpen] = useState(false);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setApplicationOpen(true);
  };

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || job.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <BubbleNav />
      
      {/* Header */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Internships & Jobs</h1>
            <p className="text-muted-foreground">
              Find the perfect opportunity to kickstart your career
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by company, role, or location..."
                  className="pl-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border-white/50 shadow-soft"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                {(["all", "internship", "job"] as FilterType[]).map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? "bubbleActive" : "bubble"}
                    onClick={() => setFilterType(type)}
                    className="capitalize"
                  >
                    {type === "all" && <Filter className="w-4 h-4 mr-1" />}
                    {type === "internship" && <GraduationCap className="w-4 h-4 mr-1" />}
                    {type === "job" && <Briefcase className="w-4 h-4 mr-1" />}
                    {type === "all" ? "All" : type + "s"}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Top Banner Ad */}
          <AdBanner variant="horizontal" />
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> opportunities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredJobs.map((job, index) => (
              <JobCard 
                key={index} 
                {...job} 
                onApply={() => handleApply(job)}
              />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No opportunities found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Inline Ad */}
          <div className="mt-8">
            <AdBanner variant="inline" />
          </div>
        </div>
      </section>

      <Footer />

      <JobApplicationDialog
        job={selectedJob}
        open={applicationOpen}
        onOpenChange={setApplicationOpen}
      />
    </div>
  );
};

export default Jobs;
