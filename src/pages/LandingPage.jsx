import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Receipt,
  Target,
  ShieldAlert,
  Compass,
  CheckCircle2,
  ChevronRight,
  Lock,
  Eye,
  Sliders,
  Shield,
  Zap,
  Crown,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { GlassCard } from '../components/common/GlassCard';
import { CashFlowChart } from '../components/charts/CashFlowChart';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#EBF2F8] relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-br from-teal-400/20 via-sky-300/20 to-transparent blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-[45%] -left-48 w-[600px] h-[600px] bg-emerald-300/15 blur-[150px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-[65%] -right-48 w-[600px] h-[600px] bg-sky-400/15 blur-[150px] rounded-full pointer-events-none -z-0" />

      {/* Glass Navbar */}
      <Navbar />

      <main className="flex-1 z-10 pt-28 sm:pt-36">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 pb-16 sm:pb-24">
          {/* Subtle Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-teal-500/30 shadow-xs backdrop-blur-md mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800">
              Track Smarter. Plan Ahead. Save Better.
            </span>
            <span className="text-teal-600 font-bold ml-1">✦</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 font-heading tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Your money. Your goals.{' '}
            <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
              One smarter plan.
            </span>
          </h1>

          {/* Subheading / Copy */}
          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Experience next-generation financial clarity. FinBuddy combines translucent glassmorphism with intelligent expense tracking, cash survival forecasting, and life-event milestone planning.
          </p>

          {/* CTA Group */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto shadow-xl shadow-teal-500/25"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto"
            >
              Explore Features
            </Button>
          </div>

          {/* Floating Live Glass Dashboard Preview Card */}
          <div className="mt-14 sm:mt-20 max-w-5xl mx-auto">
            <div className="relative p-2 sm:p-4 rounded-3xl glass-panel-elevated shadow-2xl border border-white/90 group">
              {/* Card Header bar inside mock preview */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 mb-4 bg-white/40 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-semibold text-slate-500 font-mono">
                    finbuddy.app/preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium bg-teal-500/10 text-teal-700 px-2.5 py-1 rounded-full border border-teal-500/20">
                    Live Interactive Preview
                  </span>
                </div>
              </div>

              {/* Inside Mock Dashboard Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left p-2 sm:p-4">
                <div className="p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Total Net Balance</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1 font-heading">₹2,48,500.00</div>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
                    +12.4% vs last month
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Monthly Inflow</span>
                  <div className="text-2xl font-bold text-teal-600 mt-1 font-heading">₹61,920.00</div>
                  <span className="text-[11px] text-slate-500 mt-1 inline-block">October Pay & Side Gig</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500">Monthly Outflow</span>
                  <div className="text-2xl font-bold text-slate-800 mt-1 font-heading">₹28,300.00</div>
                  <span className="text-[11px] text-teal-600 font-semibold mt-1 inline-block">
                    45.7% of budget used
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md">
                  <span className="text-xs font-semibold text-teal-100">Survival Runway</span>
                  <div className="text-2xl font-bold mt-1 font-heading">5.2 Months</div>
                  <span className="text-[11px] text-teal-100 mt-1 inline-block">Safe emergency reserve</span>
                </div>
              </div>

              {/* Preview Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-2 sm:p-4 text-left">
                <div className="lg:col-span-2 p-4 rounded-2xl bg-white/70 border border-white/80">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-slate-800">Cash Flow Trends</span>
                    <span className="text-xs text-slate-500">Last 6 Months</span>
                  </div>
                  <CashFlowChart height={200} />
                </div>
                <div className="p-4 rounded-2xl bg-white/70 border border-white/80">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-slate-800">Top Spend</span>
                    <span className="text-xs text-slate-500">By Category</span>
                  </div>
                  <CategoryPieChart height={200} />
                </div>
              </div>

              {/* Quick Launch Banner */}
              <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-2xl m-2 sm:m-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    Try adding transactions, budgeting limits, or adjusting simulator sliders directly in the app.
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 shrink-0"
                >
                  Enter Workspace <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES SECTION */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-500/15 px-3 py-1 rounded-full border border-teal-500/30">
              Complete Feature Suite
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-4 font-heading tracking-tight">
              Master every facet of your cash flow.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Designed with frosted glassmorphism, responsive navigation, and intuitive tools that turn complicated budgeting into an enjoyable daily habit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <GlassCard hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-600 flex items-center justify-center mb-5 border border-teal-500/30">
                  <Receipt className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Smart Expense Tracking
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Log, categorize, filter, and search all your outflows and income streams with instant visual badges and status indicators.
                </p>
              </div>
              <Link
                to="/transactions"
                className="mt-6 text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                View Transactions <ChevronRight className="w-4 h-4" />
              </Link>
            </GlassCard>

            {/* Feature 2 */}
            <GlassCard hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-600 flex items-center justify-center mb-5 border border-sky-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  AI Spending Insights
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Contextual recommendations that highlight anomalous dining expenses, recurring subscription creep, and automated savings opportunities.
                </p>
              </div>
              <Link
                to="/assistant"
                className="mt-6 text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                Chat with Assistant <ChevronRight className="w-4 h-4" />
              </Link>
            </GlassCard>

            {/* Feature 3 */}
            <GlassCard hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-600 flex items-center justify-center mb-5 border border-indigo-500/30">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Savings Goals & Rings
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Create targeted milestones for vacations, tech gear, or an emergency fund with live contribution logging and celebration bursts.
                </p>
              </div>
              <Link
                to="/goals"
                className="mt-6 text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                Explore Goals <ChevronRight className="w-4 h-4" />
              </Link>
            </GlassCard>

            {/* Feature 4 */}
            <GlassCard hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-500/30">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Future Simulator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Interactive compound growth modeling with custom annual returns, monthly deposits, and baseline vs optimistic scenario comparisons.
                </p>
              </div>
              <Link
                to="/simulator"
                className="mt-6 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                Launch Simulator <ChevronRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </div>
        </section>

        {/* DEDICATED SECTION: MONEY SURVIVAL & LIFE EVENT PREDICTOR */}
        <section id="survival" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Money Survival Mode Panel */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/90 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <ShieldAlert className="w-48 h-48 text-rose-500" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 border border-rose-500/25 text-xs font-bold mb-4">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  Financial Resilience Feature
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-3">
                  Money Survival Mode
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  What if income abruptly paused? Money Survival Mode calculates your exact runway in days and months, dividing expenses into essential (housing, food, medicine) versus optional (dining, streaming).
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-slate-100 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Real-time essential vs optional expense segmentation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-slate-100 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Zero-income emergency scenario toggle</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-slate-100 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Actionable tiered cutback strategies to extend cash runway</span>
                  </div>
                </div>
              </div>

              <Button
                variant="secondary"
                size="md"
                icon={ShieldAlert}
                onClick={() => navigate('/survival')}
                className="self-start"
              >
                Open Survival Calculator
              </Button>
            </div>

            {/* Life Event Cost Predictor Panel */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/90 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Compass className="w-48 h-48 text-teal-500" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 border border-teal-500/25 text-xs font-bold mb-4">
                  <Compass className="w-4 h-4 text-teal-600" />
                  Life Milestone Planning
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-3">
                  Life Event Cost Predictor
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Big transitions come with hidden costs. Plan ahead for moving to a new apartment, buying a vehicle, funding graduate school, or wedding celebrations with guided itemized estimates.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-slate-100 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>5 curated milestone templates with customizable line items</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-slate-100 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>Contingency buffer percentage slider (5% to 20%)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 border border-slate-100 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>Automated monthly savings pace calculation</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                icon={Compass}
                onClick={() => navigate('/life-events')}
                className="self-start"
              >
                Predict Life Event Costs
              </Button>
            </div>
          </div>
        </section>

        {/* 3-STEP HOW IT WORKS */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200/60 px-3 py-1 rounded-full">
              Seamless Workflow
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-4 font-heading tracking-tight">
              Three steps to complete financial poise.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl glass-panel border border-white/80 relative">
              <span className="text-5xl font-extrabold text-teal-500/20 font-heading block mb-4">
                01
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Record & Categorize
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Log transactions quickly or load realistic demo data. Tag payments with payment methods, dates, and essential/optional statuses.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl glass-panel border border-white/80 relative">
              <span className="text-5xl font-extrabold text-sky-500/20 font-heading block mb-4">
                02
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Simulate & Protect
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review your Money Survival Runway and model future compound growth over 1 to 30 years using conservative or optimistic assumptions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl glass-panel border border-white/80 relative">
              <span className="text-5xl font-extrabold text-emerald-500/20 font-heading block mb-4">
                03
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Consult Your AI Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ask FinBuddy conversational questions like "Can I afford this purchase?" or "Where did I spend the most this month?" for immediate guidance.
              </p>
            </div>
          </div>
        </section>

        {/* TRUST & PRIVACY SECTION */}
        <section id="trust" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="p-8 sm:p-12 rounded-3xl glass-panel-elevated border border-white/90">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/15 text-teal-600 flex items-center justify-center mx-auto border border-teal-500/30">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                Transparent data privacy from day one.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We believe trust is earned through architectural clarity, not unverified marketing claims. In this client application:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="p-5 rounded-2xl bg-white/70 border border-slate-100">
                <Lock className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 mb-1">Local Browser Isolation</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Demo records and preferences are kept in your browser's private local state. No personal credentials or bank credentials are ever requested or stored.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 border border-slate-100">
                <Eye className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 mb-1">Separated Service Architecture</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The frontend uses clean API contracts so when connected to your Flask backend, authentication and encryption are properly audited.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/70 border border-slate-100">
                <Sliders className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 mb-1">Full User Reset Control</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You can purge, reset, or export your entire mock financial workspace with a single click in Settings whenever you choose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION PLANS HIGHLIGHTS */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-500/15 px-3 py-1 rounded-full border border-teal-500/30">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-4 font-heading tracking-tight">
              Simple plans for every financial stage.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Start free with core tracking or unlock unlimited power with AI financial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* FREE PLAN */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/80 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-500/10 text-slate-600 flex items-center justify-center mb-4 border border-slate-300/40">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Free</h3>
                <p className="text-xs text-slate-500 mt-1">Get started at no cost</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 font-heading">₹0</span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Up to 50 transactions/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>3 budget categories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>2 savings goals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Basic dashboard overview</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/register')}
                className="mt-8 w-full justify-center"
              >
                Get Started Free
              </Button>
            </div>

            {/* PLUS PLAN (RECOMMENDED) */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border-2 border-teal-500/50 shadow-xl relative flex flex-col justify-between hover:scale-[1.02] transition-transform">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-[11px] px-3.5 py-1 rounded-full shadow-md tracking-wider uppercase">
                Most Popular
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-600 flex items-center justify-center mb-4 border border-teal-500/30">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Plus</h3>
                <p className="text-xs text-slate-500 mt-1">For proactive savers & builders</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 font-heading">₹299</span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-semibold">Unlimited transactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-semibold">Unlimited budget categories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Up to 10 savings goals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>AI Money Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Future Simulator & Survival Mode</span>
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/register')}
                className="mt-8 w-full justify-center shadow-lg shadow-teal-500/25"
              >
                Start Plus Trial
              </Button>
            </div>

            {/* PREMIUM PLAN */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/80 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 border border-amber-400/40">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Premium</h3>
                <p className="text-xs text-slate-500 mt-1">Full financial autonomy & intelligence</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900 font-heading">₹999</span>
                  <span className="text-xs text-slate-500 ml-1">/ month</span>
                </div>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-semibold">Everything in Plus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited savings goals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Priority Gemini reasoning model</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Life Event Predictor & Custom Scenarios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Full CSV/JSON Financial Export</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/register')}
                className="mt-8 w-full justify-center"
              >
                Go Premium
              </Button>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-tr from-slate-950 via-slate-900 to-teal-950 text-white shadow-2xl relative overflow-hidden border border-teal-500/30">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading mb-4 leading-tight">
                Ready to take complete control of your finances?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
                Join thousands building financial resilience with FinBuddy's glassmorphic dashboards, AI spending insights, and long-term simulators.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto"
                >
                  Start Exploring Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  Sign In with Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
