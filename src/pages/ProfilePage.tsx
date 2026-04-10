import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData } from "@/hooks/useDashboardData";

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const { dashboard } = useDashboardData();
  const u = dashboard.user;

  const fields = [
    { icon: User, label: "Name", value: u.name },
    { icon: Mail, label: "Email", value: authUser?.email || "user@example.com" },
    { icon: Calendar, label: "Age", value: `${u.age} years old` },
    { icon: Shield, label: "Gender", value: u.gender },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold gradient-text">
        Profile
      </motion.h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-hover p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{u.name}</h2>
            <p className="text-muted-foreground">Digital Twin Subject</p>
          </div>
        </div>
        <div className="space-y-4">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
              <Icon className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-foreground font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
