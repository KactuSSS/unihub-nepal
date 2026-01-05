import { BubbleNav } from "@/components/BubbleNav";
import { AdBanner } from "@/components/AdBanner";
import { PaperCard } from "@/components/PaperCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Footer } from "@/components/Footer";
import { FileText, Building2, Calendar, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const dashboardStats = [
  { icon: <FileText className="w-5 h-5" />, value: "2,450", label: "Papers Available" },
  { icon: <Calendar className="w-5 h-5" />, value: "7", label: "Years Covered" },
  { icon: <BookOpen className="w-5 h-5" />, value: "45", label: "Subjects" },
  { icon: <Users className="w-5 h-5" />, value: "12,340", label: "Active Students" },
];

const recentPapers = [
  { subject: "Computer Architecture", year: 2024, semester: "5th Sem", examType: "Final", faculty: "BCT" },
  { subject: "Database Management System", year: 2024, semester: "4th Sem", examType: "Final", faculty: "BCA" },
  { subject: "Object Oriented Programming", year: 2024, semester: "3rd Sem", examType: "Internal", faculty: "BCT" },
  { subject: "Digital Logic Design", year: 2023, semester: "2nd Sem", examType: "Final", faculty: "BCE" },
  { subject: "Engineering Mathematics II", year: 2024, semester: "2nd Sem", examType: "Final", faculty: "All" },
  { subject: "Applied Mechanics", year: 2023, semester: "1st Sem", examType: "Final", faculty: "Civil" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string | null } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user]);

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <BubbleNav />
      
      {/* Header Section */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-4">
          {/* University Header */}
          <div className="glass-card p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Tribhuvan University</h1>
                  <p className="text-muted-foreground">Institute of Engineering, Pulchowk Campus</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-foreground">{displayName}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xl font-bold text-primary">
                  {initials}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {dashboardStats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card p-4 text-center card-hover"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
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
              <FilterSidebar />
              
              {/* Sidebar Ad */}
              <div className="mt-6 hidden lg:block">
                <AdBanner variant="vertical" />
              </div>
            </div>

            {/* Papers Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Recent Papers</h2>
                  <p className="text-sm text-muted-foreground">Showing papers for your program</p>
                </div>
                <Link to="/papers" className="text-primary hover:underline text-sm font-medium">
                  View All →
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {recentPapers.map((paper, index) => (
                  <PaperCard key={index} {...paper} />
                ))}
              </div>

              {/* Inline Ad after papers */}
              <div className="mt-6">
                <AdBanner variant="inline" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
