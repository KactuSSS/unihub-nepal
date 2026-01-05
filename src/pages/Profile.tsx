import { BubbleNav } from "@/components/BubbleNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  GraduationCap, 
  Calendar, 
  Crown,
  LogOut,
  Settings,
  CreditCard,
  FileText,
  Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  full_name: string | null;
  email: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const joinedDate = profile?.created_at 
    ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

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
                {initials}
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
                </div>
                <p className="text-muted-foreground mb-1">{user?.email}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="glass" size="icon" className="rounded-xl">
                  <Settings className="w-5 h-5" />
                </Button>
                <Button 
                  variant="glass" 
                  className="rounded-xl text-destructive hover:bg-destructive hover:text-white"
                  onClick={handleLogout}
                >
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

          {/* Account Info */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Account Information
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {profile?.location && (
                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <Building2 className="w-4 h-4" />
                    Location
                  </div>
                  <p className="font-medium text-foreground">{profile.location}</p>
                </div>
              )}
              
              {profile?.bio && (
                <div className="p-4 rounded-xl bg-muted/30 sm:col-span-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <FileText className="w-4 h-4" />
                    Bio
                  </div>
                  <p className="font-medium text-foreground">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Subscription Status */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Subscription Status
            </h2>
            
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
          </div>

          {/* Member Since */}
          <div className="text-center text-muted-foreground text-sm">
            <p>Member since {joinedDate}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
