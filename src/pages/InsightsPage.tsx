import { motion } from "framer-motion";
import { Brain, Moon, Heart, Smartphone, Activity, Sparkles, TrendingUp } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const iconMap: Record<string, any> = { moon: Moon, heart: Heart, phone: Smartphone, activity: Activity };
const severityColors: Record<string, string> = {
  warning: "border-l-yellow-400 bg-yellow-400/5",
  success: "border-l-neon-green bg-neon-green/5",
  alert: "border-l-neon-pink bg-neon-pink/5",
  info: "border-l-neon-blue bg-neon-blue/5",
};

const InsightsPage = () => {
  const { insights, loading } = useDashboardData();

  if (loading) return <LoadingSpinner />;

  const { predictions } = insights;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.h1 {...fadeUp()} className="text-2xl md:text-3xl font-bold gradient-text flex items-center gap-3">
        <Brain className="w-8 h-8" /> AI Insights
      </motion.h1>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {insights.insights.map((insight, i) => {
          const Icon = iconMap[insight.icon] || Brain;
          return (
            <motion.div
              key={insight.id}
              {...fadeUp(0.1 + i * 0.05)}
              className={`glass-card-hover p-5 border-l-4 ${severityColors[insight.severity]}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Future Prediction */}
      <motion.div {...fadeUp(0.4)} className="glass-card p-6 md:p-8 border border-primary/20 neon-glow-purple">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-foreground">Future Prediction</h2>
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">AI Powered</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Predicted Mood</p>
            <p className="text-5xl mb-1">{["😢", "😟", "😐", "😊", "😁"][predictions.predictedMood - 1]}</p>
            <p className="text-sm text-muted-foreground">{predictions.moodConfidence}% confidence</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Health Score</p>
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" strokeWidth="8" stroke="hsl(230 15% 22%)" fill="none" />
                <circle cx="50" cy="50" r="42" strokeWidth="8" stroke="hsl(160 100% 50%)" fill="none"
                  strokeDasharray={`${predictions.healthScore * 2.64} 264`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-neon-green">{predictions.healthScore}</span>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-neon-green" />
                <p className="text-sm font-medium text-foreground">Recommendation</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{predictions.recommendation}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsightsPage;
