import { motion } from "framer-motion";
import { Moon, Heart, Footprints } from "lucide-react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const chartTooltipStyle = {
  contentStyle: { background: "hsl(230 20% 12%)", border: "1px solid hsl(230 15% 22%)", borderRadius: "12px", color: "hsl(210 40% 95%)" },
};

const KpiCard = ({ icon: Icon, label, value, unit, color, delay }: { icon: any; label: string; value: number; unit: string; color: string; delay: number }) => (
  <motion.div {...fadeUp(delay)} className="glass-card-hover p-6 flex items-center gap-5">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color}`}>
      <Icon className="w-7 h-7 text-primary-foreground" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold text-foreground">{value}<span className="text-lg text-muted-foreground ml-1">{unit}</span></p>
    </div>
  </motion.div>
);

const AnalyticsPage = () => {
  const { analytics, loading } = useDashboardData();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 {...fadeUp()} className="text-2xl md:text-3xl font-bold gradient-text">Analytics</motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard icon={Moon} label="Avg Sleep" value={analytics.avgSleep} unit="hrs" color="from-neon-blue/80 to-neon-purple/80" delay={0.1} />
        <KpiCard icon={Heart} label="Avg Heart Rate" value={analytics.avgHeartRate} unit="bpm" color="from-neon-pink/80 to-neon-purple/80" delay={0.15} />
        <KpiCard icon={Footprints} label="Avg Steps" value={analytics.avgSteps} unit="steps" color="from-neon-green/80 to-neon-blue/80" delay={0.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...fadeUp(0.25)} className="glass-card-hover p-6">
          <h3 className="font-semibold text-foreground mb-4">Weekly Sleep Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={analytics.sleepTrend}>
              <defs>
                <linearGradient id="sleepTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(210 100% 60%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(210 100% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 15% 22%)" />
              <XAxis dataKey="week" stroke="hsl(215 15% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="avg" stroke="hsl(210 100% 60%)" fill="url(#sleepTrendGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div {...fadeUp(0.3)} className="glass-card-hover p-6">
          <h3 className="font-semibold text-foreground mb-4">Weekly Heart Rate Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.heartRateTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 15% 22%)" />
              <XAxis dataKey="week" stroke="hsl(215 15% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="avg" stroke="hsl(330 100% 65%)" strokeWidth={2} dot={{ fill: "hsl(330 100% 65%)", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
