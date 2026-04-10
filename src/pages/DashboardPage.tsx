import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Heart, Smartphone, Smile, Footprints, User } from "lucide-react";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const chartTooltipStyle = {
  contentStyle: { background: "hsl(230 20% 12%)", border: "1px solid hsl(230 15% 22%)", borderRadius: "12px", color: "hsl(210 40% 95%)" },
};

const DashboardPage = () => {
  const { dashboard, loading } = useDashboardData();
  const [moodValue, setMoodValue] = useState([3]);

  if (loading) return <LoadingSpinner />;

  const { user, sleep, heartRate, phoneUsage, mood, activity } = dashboard;
  const stepsPercent = Math.round((activity.steps / activity.goal) * 100);
  const moodEmojis = ["😢", "😟", "😐", "😊", "😁"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 {...fadeUp()} className="text-2xl md:text-3xl font-bold gradient-text">Dashboard</motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Overview */}
        <motion.div {...fadeUp(0.1)} className="glass-card-hover p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
            <p className="text-muted-foreground text-sm">Age: {user.age} · {user.gender}</p>
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div {...fadeUp(0.15)} className="glass-card-hover p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Footprints className="w-5 h-5 text-neon-green" />
            <h3 className="font-semibold text-foreground">Activity</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <Progress value={stepsPercent} className="h-3 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-neon-green [&>div]:to-neon-blue" />
              <p className="text-sm text-muted-foreground mt-2">{activity.steps.toLocaleString()} / {activity.goal.toLocaleString()} steps</p>
            </div>
            <div className="text-3xl font-bold text-neon-green">{stepsPercent}%</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sleep */}
        <motion.div {...fadeUp(0.2)} className="glass-card-hover p-6">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-5 h-5 text-neon-blue" />
            <h3 className="font-semibold text-foreground">Sleep Hours</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={sleep}>
              <defs>
                <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(210 100% 60%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(210 100% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 15% 22%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="hours" stroke="hsl(210 100% 60%)" fill="url(#sleepGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Heart Rate */}
        <motion.div {...fadeUp(0.25)} className="glass-card-hover p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-neon-pink" />
            <h3 className="font-semibold text-foreground">Heart Rate</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={heartRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 15% 22%)" />
              <XAxis dataKey="time" stroke="hsl(215 15% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="bpm" stroke="hsl(330 100% 65%)" strokeWidth={2} dot={{ fill: "hsl(330 100% 65%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Phone Usage */}
        <motion.div {...fadeUp(0.3)} className="glass-card-hover p-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-neon-purple" />
            <h3 className="font-semibold text-foreground">Screen Time</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={phoneUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 15% 22%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="hours" fill="hsl(270 100% 65%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Mood */}
        <motion.div {...fadeUp(0.35)} className="glass-card-hover p-6">
          <div className="flex items-center gap-2 mb-4">
            <Smile className="w-5 h-5 text-neon-green" />
            <h3 className="font-semibold text-foreground">Mood</h3>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={mood}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 15% 22%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
              <YAxis domain={[1, 5]} stroke="hsl(215 15% 55%)" fontSize={12} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="hsl(160 100% 50%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rate your mood</span>
              <span className="text-2xl">{moodEmojis[moodValue[0] - 1]}</span>
            </div>
            <Slider value={moodValue} onValueChange={setMoodValue} min={1} max={5} step={1} className="[&>span>span]:bg-neon-green" />
            <Button size="sm" className="bg-gradient-to-r from-neon-green/80 to-neon-blue/80 hover:opacity-90 text-primary-foreground">
              Submit Mood
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
