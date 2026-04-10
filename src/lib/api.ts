import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const api = axios.create({ baseURL: API_BASE, timeout: 10000 });

export const fetchDashboard = (id: string) => api.get(`/dashboard/${id}`);
export const fetchAnalytics = (id: string) => api.get(`/analytics/${id}`);
export const fetchInsights = (id: string) => api.get(`/insights/${id}`);

// Mock data fallbacks
export const mockDashboardData = {
  user: { name: "Alex Johnson", age: 28, gender: "Male" },
  sleep: [
    { day: "Mon", hours: 7.2 }, { day: "Tue", hours: 6.5 }, { day: "Wed", hours: 8.0 },
    { day: "Thu", hours: 5.8 }, { day: "Fri", hours: 7.5 }, { day: "Sat", hours: 8.5 }, { day: "Sun", hours: 7.0 },
  ],
  heartRate: [
    { time: "6AM", bpm: 62 }, { time: "9AM", bpm: 75 }, { time: "12PM", bpm: 80 },
    { time: "3PM", bpm: 72 }, { time: "6PM", bpm: 85 }, { time: "9PM", bpm: 68 }, { time: "12AM", bpm: 60 },
  ],
  phoneUsage: [
    { day: "Mon", hours: 4.2 }, { day: "Tue", hours: 5.1 }, { day: "Wed", hours: 3.8 },
    { day: "Thu", hours: 6.0 }, { day: "Fri", hours: 4.5 }, { day: "Sat", hours: 7.2 }, { day: "Sun", hours: 5.5 },
  ],
  mood: [
    { day: "Mon", score: 4 }, { day: "Tue", score: 3 }, { day: "Wed", score: 5 },
    { day: "Thu", score: 2 }, { day: "Fri", score: 4 }, { day: "Sat", score: 5 }, { day: "Sun", score: 3 },
  ],
  activity: { steps: 8420, goal: 10000 },
};

export const mockAnalyticsData = {
  avgSleep: 7.2,
  avgHeartRate: 72,
  avgSteps: 8420,
  sleepTrend: [
    { week: "W1", avg: 6.8 }, { week: "W2", avg: 7.1 }, { week: "W3", avg: 7.5 }, { week: "W4", avg: 7.2 },
  ],
  heartRateTrend: [
    { week: "W1", avg: 74 }, { week: "W2", avg: 71 }, { week: "W3", avg: 73 }, { week: "W4", avg: 72 },
  ],
};

export const mockInsightsData = {
  insights: [
    { id: 1, title: "Sleep Pattern Detected", description: "Your sleep quality drops significantly on weekdays. Consider a consistent bedtime routine.", severity: "warning", icon: "moon" },
    { id: 2, title: "Heart Rate Optimal", description: "Your resting heart rate is within the healthy range. Keep up the good work!", severity: "success", icon: "heart" },
    { id: 3, title: "Screen Time Alert", description: "Weekend screen time is 60% higher than weekdays. Try digital detox activities.", severity: "alert", icon: "phone" },
    { id: 4, title: "Activity Boost Needed", description: "You're 15% below your step goal this week. A 20-min walk could help.", severity: "info", icon: "activity" },
  ],
  predictions: {
    predictedMood: 4,
    moodConfidence: 78,
    healthScore: 82,
    recommendation: "Based on your patterns, tomorrow looks positive. Maintain your evening routine for best results.",
  },
};
