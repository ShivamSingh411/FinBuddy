import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  PiggyBank,
  Sparkles,
  TrendingUp,
  Receipt,
  PieChart,
  Target,
  Plus,
  Calendar,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Clock,
  AlertTriangle,
  Info,
  Crown,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { GlassCard, CardHeader } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CashFlowChart } from '../components/charts/CashFlowChart';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { AI_SAMPLE_INSIGHTS } from '../services/demoData';

export const DashboardPage = () => {
  const { user, transactions, budgets, goals, upcomingBills, metrics, formatCurrency } = useFinance();
  const outletContext = useOutletContext();
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  // Top 5 recent transactions
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Banner: Greeting, Month Selector, and AI summary badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-500/15 px-3 py-0.5 rounded-full border border-teal-500/30">
              Interactive Dashboard
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              {(user.plan || 'plus').toUpperCase()} PLAN
            </span>
            <span className="text-xs text-slate-500">Live Client Data Layer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight mt-1">
            Welcome back, {user.name} <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            You've saved <span className="font-semibold text-teal-700">{formatCurrency(metrics.netSavings)}</span> this month ({metrics.savingsRate}% savings rate).
          </p>
        </div>

        {/* Month Selector & Quick Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl glass-input bg-white/70 text-xs font-semibold text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="October 2026">October 2026</option>
              <option value="September 2026">September 2026</option>
              <option value="August 2026">August 2026</option>
            </select>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => outletContext?.openAddTransaction?.()}
            className="shadow-lg shadow-teal-500/20"
          >
            Record Cash Movement
          </Button>
        </div>
      </div>

      {/* 4 CORE KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Net Balance */}
        <GlassCard hoverEffect className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Available Balance</span>
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center border border-teal-500/20">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              {formatCurrency(24850.4)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.4%
              </span>
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          </div>
        </GlassCard>

        {/* Monthly Income */}
        <GlassCard hoverEffect className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Monthly Inflow</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading tracking-tight">
              {formatCurrency(metrics.totalIncome)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-slate-500">
              <Badge variant="emerald" size="sm">Salary & Freelance</Badge>
              <span className="text-slate-400 font-normal">2 deposits</span>
            </div>
          </div>
        </GlassCard>

        {/* Monthly Expenses */}
        <GlassCard hoverEffect className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Monthly Outflow</span>
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center border border-rose-500/20">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-heading tracking-tight">
              {formatCurrency(metrics.totalExpenses)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-slate-500">
              <span className="text-teal-600 font-bold">45.7%</span>
              <span className="text-slate-400 font-normal">of monthly budget cap</span>
            </div>
          </div>
        </GlassCard>

        {/* Net Savings & Rate */}
        <GlassCard hoverEffect className="relative overflow-hidden bg-gradient-to-br from-teal-500/15 via-white/70 to-emerald-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Net Monthly Savings</span>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-teal-500/25">
              <PiggyBank className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-heading tracking-tight">
              {formatCurrency(metrics.netSavings)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-teal-800">
              <Badge variant="teal" size="sm" dot>{metrics.savingsRate}% Rate</Badge>
              <span className="text-slate-500 font-normal">Exceeds 40% goal</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* QUICK ACTIONS DOCK */}
      <div className="p-3 sm:p-4 rounded-3xl glass-panel-subtle border border-white/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            Quick Actions:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Receipt}
            onClick={() => outletContext?.openAddTransaction?.()}
          >
            Add Expense
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={TrendingUp}
            onClick={() => outletContext?.openAddTransaction?.()}
          >
            Add Income
          </Button>
          <Link to="/budgets">
            <Button variant="outline" size="sm" icon={PieChart}>
              Manage Budgets
            </Button>
          </Link>
          <Link to="/goals">
            <Button variant="outline" size="sm" icon={Target}>
              Add Savings Goal
            </Button>
          </Link>
          <Link to="/survival">
            <Button variant="outline" size="sm" icon={ShieldAlert} className="text-amber-700 border-amber-300">
              Run Survival Check
            </Button>
          </Link>
        </div>
      </div>

      {/* CHARTS ROW: Cash Flow Trends + Spending by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <CardHeader
            title="Cash Flow Dynamics"
            subtitle="Comparing income vs expenses across the past 6 months"
            icon={TrendingUp}
            action={
              <Link
                to="/reports"
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                Detailed Analytics <ChevronRight className="w-4 h-4" />
              </Link>
            }
          />
          <CashFlowChart height={270} />
        </GlassCard>

        <GlassCard>
          <CardHeader
            title="Outflow Breakdown"
            subtitle="Spending distribution across active categories"
            icon={PieChart}
            action={
              <Link
                to="/transactions"
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                All Tx <ChevronRight className="w-4 h-4" />
              </Link>
            }
          />
          <CategoryPieChart categorySpendMap={metrics.categorySpendMap} height={270} />
        </GlassCard>
      </div>

      {/* RECENT TRANSACTIONS + UPCOMING BILLS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions List */}
        <GlassCard className="lg:col-span-2">
          <CardHeader
            title="Recent Transactions"
            subtitle="Your most recent income and expense movements"
            icon={Receipt}
            action={
              <Link to="/transactions">
                <Button variant="ghost" size="sm" icon={ChevronRight} iconPosition="right">
                  View All ({transactions.length})
                </Button>
              </Link>
            }
          />

          <div className="divide-y divide-slate-100">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="py-3.5 flex items-center justify-between gap-3 hover:bg-white/40 px-2 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                      tx.type === 'income'
                        ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {tx.type === 'income' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {tx.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="truncate">{tx.categoryName}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p
                    className={`text-sm sm:text-base font-bold font-mono ${
                      tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </p>
                  <span className="text-[11px] text-slate-400 block">{tx.paymentMethod}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Upcoming Bills & Reminders */}
        <GlassCard>
          <CardHeader
            title="Upcoming Bills"
            subtitle="Scheduled obligations for the next 14 days"
            icon={Calendar}
          />
          <div className="space-y-3">
            {upcomingBills.map((bill) => (
              <div
                key={bill.id}
                className="p-3.5 rounded-2xl bg-white/70 border border-slate-100 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0 border border-teal-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {bill.name}
                    </p>
                    <p className="text-[11px] text-slate-500">Due {bill.dueDate}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {formatCurrency(bill.amount)}
                  </span>
                  <Badge variant="slate" size="sm" className="mt-1 block">
                    Auto Debit
                  </Badge>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Total upcoming obligations this cycle:{' '}
                  <strong>{formatCurrency(upcomingBills.reduce((acc, b) => acc + (Number(b.amount) || 0), 0))}</strong>
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* AI INSIGHTS & SAVINGS GOALS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Spending Insights */}
        <GlassCard className="lg:col-span-2 relative overflow-hidden">
          <CardHeader
            title="AI Financial Insights"
            subtitle="Algorithmic patterns and actionable opportunities"
            icon={Sparkles}
            action={
              <Link to="/assistant">
                <Button variant="primary" size="sm" icon={Sparkles}>
                  Ask AI Assistant
                </Button>
              </Link>
            }
          />

          <div className="p-2.5 mb-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600 shrink-0" />
            <span>AI Spending Insights • Sample intelligent heuristics based on current month ledger.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {AI_SAMPLE_INSIGHTS.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white/70 border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    {item.type === 'positive' && <Badge variant="emerald" size="sm">Positive</Badge>}
                    {item.type === 'warning' && <Badge variant="amber" size="sm">Attention</Badge>}
                    {item.type === 'opportunity' && <Badge variant="teal" size="sm">Opportunity</Badge>}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={() => alert(`Simulating action: "${item.actionText}". Full Flask API & Gemini connector will persist this automated task.`)}
                  className="mt-4 text-[11px] font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 text-left"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Savings Goals Snapshot */}
        <GlassCard>
          <CardHeader
            title="Active Milestones"
            subtitle={`${metrics.overallGoalsProgress}% overall completion`}
            icon={Target}
            action={
              <Link to="/goals" className="text-xs font-bold text-teal-600 hover:text-teal-700">
                View All
              </Link>
            }
          />

          <div className="space-y-4">
            {goals.slice(0, 3).map((goal) => {
              const pct = Math.min(
                100,
                Math.round((Number(goal.savedAmount) / Number(goal.targetAmount)) * 100)
              );
              return (
                <div key={goal.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{goal.title}</span>
                    <span className="text-slate-500 font-mono font-medium">
                      {formatCurrency(goal.savedAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  {/* Glass Progress Bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-200/70 overflow-hidden neu-inset p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{pct}% funded</span>
                    <span>Target: {goal.targetDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
