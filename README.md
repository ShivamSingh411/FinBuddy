# FinBuddy — Your Personal AI Finance Assistant ✦

> **Track Smarter. Plan Ahead. Save Better.**

FinBuddy is a modern, responsive personal finance web application built with React, Vite, and Tailwind CSS. It features a high-end glassmorphic interface, dark and light modes, Indian Rupees (INR ₹) currency formatting with Indian number grouping conventions, and financial planning tools including compound interest simulation, runway survival calculations, life-event cost prediction, and AI-assisted financial guidance.

---

## ✨ Key Features

- **💎 Premium Glassmorphic UI & Dual Theme:**
  - Frosted translucent panels with backdrop blur, subtle borders, and smooth glow accents.
  - Seamless Light Mode and Dark Mode switching via top navigation and settings, persisted in `localStorage`.
- **🇮🇳 Default Indian Rupees (INR) & Multi-Currency Engine:**
  - Formats all amounts using Indian numbering conventions (e.g., `₹1,25,000.00`).
  - Centralized currency service supporting INR (₹), USD ($), EUR (€), GBP (£), and AED (د.إ) with realistic exchange rates and live preview.
- **📊 Interactive Dashboard:**
  - Real-time KPI summary: Total Available Balance, Monthly Inflows, Outflows, and Net Savings Rate.
  - Interactive Cash Flow Trends (Bar chart) and Category Spend Breakdown (Doughnut chart).
  - Upcoming bill obligations tracker with automated cycle calculation.
- **🧾 Smart Transaction Tracking:**
  - Log, edit, and delete income and expense items.
  - Search, filter by category, payment method (UPI, Net Banking, Credit/Debit Card, Cash), and essential vs. optional tags.
  - One-click CSV export for offline analysis.
- **🎯 Budgets & Savings Goals:**
  - Category spending caps with real-time percentage indicators and over-budget warnings.
  - Milestone-based savings goals with target dates, visual progress rings, and contribution logging.
- **📈 Future Wealth Simulator:**
  - Compound growth projections over 1 to 30 years.
  - Configurable initial capital, monthly deposit pace, and expected return rate.
  - Conservative (4%), Baseline (7%), and Optimistic (10%) preset scenario modeling with interactive year-by-year projections.
- **🛡️ Money Survival Mode:**
  - Real-time emergency runway calculator in days and months.
  - Emergency zero-income simulation toggle.
  - Categorization of expenses into mandatory essentials (housing, groceries, utilities) vs. discretionary spending.
  - Actionable tiered cutback strategies to stretch your cash reserves.
- **🧭 Life Event Cost Predictor:**
  - Guided cost estimator for life milestones: Relocating/New Apartment, Vehicle Purchase, Higher Education, Wedding & Celebrations, and Custom Events.
  - Itemized breakdowns with customizable contingency buffer sliders (5% to 20%) and required monthly savings pace.
- **🤖 AI Financial Co-Pilot:**
  - Conversational assistant with financial context awareness.
  - Evaluates purchase affordability, pinpoints category overspending, and suggests personalized savings tactics.
  - Structured for plug-and-play integration with Google Gemini via a Flask REST backend.
- **💳 Subscription Plans & Pricing UI:**
  - Dedicated `/pricing` route featuring **Free**, **Plus** (₹299/mo), and **Premium** (₹999/mo) tiers.
  - Monthly vs. Annual billing toggle (25% discount), feature limits comparison table, and modal confirmation flow.
  - Current plan status badge displayed across the dashboard and topbar.
- **⚙️ Comprehensive 7-Section Settings:**
  - Organized tabs: Profile, Preferences, Currency, Appearance, Notifications, Subscription & Billing, and Security & Account Management (with full JSON data export and demo reset).
- **📱 Fully Responsive & Collapsible Sidebar:**
  - Desktop sidebar collapses to an icon-only mode with hover tooltips and auto-reflowing content layout.
  - Mobile slide-over drawer with backdrop blur.
  - FinBuddy brand header navigates to the public landing page (`/`).

---

## 🛠️ Technology Stack

- **Frontend Framework:** [React 19](https://react.dev/)
- **Build Tool & Dev Server:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS properties for theme tokens
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Data Visualization:** [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** Plus Jakarta Sans & JetBrains Mono

---

## 📁 Project Structure

```text
FinBuddy/
├── public/                 # Static assets and favicon
├── src/
│   ├── components/
│   │   ├── charts/         # CashFlowChart, CategoryPieChart, ProjectionChart
│   │   ├── common/         # GlassCard, Button, Badge, Modal, TransactionModal
│   │   └── layout/         # AppLayout, Navbar, Topbar, Sidebar, Footer
│   ├── context/
│   │   ├── FinanceContext.jsx  # Central state for transactions, budgets, goals, user profile
│   │   ├── ThemeContext.jsx    # Light / Dark theme provider with localStorage sync
│   │   └── ToastContext.jsx    # Non-intrusive floating notification system
│   ├── pages/
│   │   ├── LandingPage.jsx     # Public showcase with pricing highlights & feature previews
│   │   ├── LoginPage.jsx       # Demo login portal
│   │   ├── RegisterPage.jsx    # Demo account registration
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── DashboardPage.jsx   # Core financial overview & metrics
│   │   ├── TransactionsPage.jsx# Searchable, filterable ledger with CSV export
│   │   ├── BudgetsPage.jsx     # Spending limits & category allocations
│   │   ├── GoalsPage.jsx       # Savings milestone tracking
│   │   ├── AssistantPage.jsx   # AI chat interface with financial heuristics
│   │   ├── SimulatorPage.jsx   # Interactive compound interest calculator
│   │   ├── SurvivalPage.jsx    # Emergency runway & cash cutback modeling
│   │   ├── LifeEventsPage.jsx  # Milestone expense predictor
│   │   ├── ReportsPage.jsx     # Deep financial analytics & breakdown
│   │   ├── PricingPage.jsx     # Subscription tiers & limits comparison
│   │   └── SettingsPage.jsx    # 7-tab configuration hub
│   ├── services/
│   │   ├── api.js              # REST service layer (supports client simulation & backend)
│   │   ├── chartSetup.js       # Chart.js registration & default styling
│   │   ├── currencyService.js  # Multi-currency matrix, formatting, and conversion logic
│   │   └── demoData.js         # Seed data (Sakshi Kumari default profile, INR scale)
│   ├── App.jsx                 # Route definitions & provider tree
│   ├── index.css               # Glassmorphism design system & dark mode custom properties
│   └── main.jsx                # Application entry point
├── .env.example            # Environment configuration template
├── .gitignore              # Ignored files, dependencies, and build artifacts
├── index.html              # HTML shell
├── package.json            # Project dependencies and npm scripts
└── vite.config.js          # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) (version 9.0 or higher) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <REPOSITORY_URL>
   cd FinBuddy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional):**
   ```bash
   cp .env.example .env
   ```
   *Note: By default, FinBuddy operates completely autonomously in browser storage mode with rich demo data. No backend or database is strictly required to run and test the frontend.*

### Running Locally

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173/` (or the port indicated in your terminal).

### Building for Production

Compile optimized production assets into the `dist/` directory:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🔌 Backend & API Integration (Optional)

FinBuddy is architected with a decoupled service layer located in `src/services/api.js`.

- When `VITE_API_URL` is undefined, the application operates in **Client Mock Mode**, storing transactions, budgets, goals, and user preferences directly in `localStorage`.
- To connect a real backend (e.g., Python Flask / FastAPI with MySQL / PostgreSQL), configure:
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```
  The service layer will automatically switch to issuing REST API requests to endpoints such as `/transactions`, `/budgets`, `/goals`, and `/assistant/chat`.

---

## 🔒 Security & Privacy

- **No Secrets Published:** All production secrets, `.env` files, and local build artifacts are excluded via `.gitignore`.
- **Public & Private Separation:** The public landing page (`/`) does not expose private account records or user identifiers.
- **Client Isolation:** When running in default demo mode, all financial records remain strictly within the user's local browser storage.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
