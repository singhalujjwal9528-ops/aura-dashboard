import { useState, useEffect } from "react";
import { fetchDashboard, fetchAnalytics, fetchInsights, mockDashboardData, mockAnalyticsData, mockInsightsData } from "@/lib/api";

export function useDashboardData(userId = "1") {
  const [dashboard, setDashboard] = useState(mockDashboardData);
  const [analytics, setAnalytics] = useState(mockAnalyticsData);
  const [insights, setInsights] = useState(mockInsightsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [d, a, i] = await Promise.allSettled([
          fetchDashboard(userId),
          fetchAnalytics(userId),
          fetchInsights(userId),
        ]);
        if (d.status === "fulfilled") setDashboard(d.value.data);
        if (a.status === "fulfilled") setAnalytics(a.value.data);
        if (i.status === "fulfilled") setInsights(i.value.data);
      } catch {
        setError("Using demo data — API unavailable");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  return { dashboard, analytics, insights, loading, error };
}
