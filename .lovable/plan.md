

## Digital Twin for Personalized Mental Health — Frontend

### Design System
- Dark theme with neon accents (blue/purple/green gradients)
- Glassmorphism cards with backdrop blur
- Smooth animations (fade-in, hover scale, page transitions)
- Fully responsive (mobile + desktop)

### Pages & Components

**1. Login Page**
- Email/password form with glassmorphism card
- Gradient background with animated elements
- Smooth transitions, redirects to dashboard on submit
- Local auth state (no backend auth — just UI flow)

**2. Dashboard Layout**
- Sidebar navigation: Dashboard, Analytics, Profile, Logout
- Collapsible sidebar with icons, neon accent highlights
- Top header with user greeting

**3. Dashboard Page** (fetches from `localhost:5000/api/dashboard/:id`)
- **User Overview** — Profile card with avatar, name, age, gender
- **Sleep Section** — Area chart showing sleep hours over time
- **Heart Rate Section** — Animated line chart for HR trends
- **Phone Usage** — Bar chart for screen time
- **Mood Section** — Mood trend chart + interactive slider (1–5) with submit button
- **Activity Section** — Circular progress / progress bars for steps

**4. Analytics Page** (fetches from `localhost:5000/api/analytics/:id`)
- KPI cards with icons: avg sleep, avg heart rate, avg steps
- Summary charts

**5. AI Insights Page** (fetches from `localhost:5000/api/insights/:id`)
- Smart health insight cards with AI-style glow effects
- Future Prediction placeholder panel with predicted mood & health insights

**6. Profile Page**
- User info display card

### Technical Details
- Recharts for all charts (already React-friendly)
- Axios for API calls with loading spinners & error states
- React Router for page navigation
- Framer Motion for page transitions and animations
- Mock/fallback data when API is unavailable

