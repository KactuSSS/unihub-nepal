import { BubbleNav } from "@/components/BubbleNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Building2, 
  GraduationCap, 
  Mail, 
  Calendar, 
  Crown,
  LogOut,
  Settings,
  CreditCard,
  FileText,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = {
    name: "Aarav Sharma",
    email: "aarav.sharma@tu.edu.np",
    studentId: "BCT-078-345",
    university: "Tribhuvan University",
    campus: "IOE Pulchowk Campus",
    program: "B.E. Computer Engineering",
    semester: "5th Semester",
    batch: "2078",
    joinedDate: "September 2024",
    isPremium: false,
  };

  const stats = [
    { icon: <FileText className="w-5 h-5" />, value: "127", label: "Papers Viewed" },
    { icon: <Star className="w-5 h-5" />, value: "45", label: "Bookmarked" },
    { icon: <Calendar className="w-5 h-5" />, value: "3 mo", label: "Active" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <BubbleNav />
      
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <div className="glass-card p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-glow">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                  {user.isPremium && (
                    <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-1">{user.email}</p>
                <p className="text-sm text-muted-foreground">Student ID: {user.studentId}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="glass" size="icon" className="rounded-xl">
                  <Settings className="w-5 h-5" />
                </Button>
                <Button variant="glass" className="rounded-xl text-destructive hover:bg-destructive hover:text-white">
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Academic Info */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Academic Information
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Building2 className="w-4 h-4" />
                  University
                </div>
                <p className="font-medium text-foreground">{user.university}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Building2 className="w-4 h-4" />
                  Campus
                </div>
                <p className="font-medium text-foreground">{user.campus}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <FileText className="w-4 h-4" />
                  Program
                </div>
                <p className="font-medium text-foreground">{user.program}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Calendar className="w-4 h-4" />
                  Current Semester
                </div>
                <p className="font-medium text-foreground">{user.semester} (Batch {user.batch})</p>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Subscription Status
            </h2>
            
            {user.isPremium ? (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-amber-500" />
                  <div>
                    <p className="font-semibold text-foreground">Premium Member</p>
                    <p className="text-sm text-muted-foreground">Active until December 2025</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">Free Plan</p>
                    <p className="text-sm text-muted-foreground">Upgrade to access model answers & frameworks</p>
                  </div>
                  <Link to="/answers">
                    <Button variant="premium">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Member Since */}
          <div className="text-center text-muted-foreground text-sm">
            <p>Member since {user.joinedDate}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
