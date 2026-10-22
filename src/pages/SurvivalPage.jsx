import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingDown,
  Sliders,
  DollarSign,
  HeartPulse,
  Coffee,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { GlassCard, CardHeader } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useFinance } from '../context/FinanceContext';

export const SurvivalPage = () => {
  const { metrics, formatCurrency } = useFinance();

  // Inputs
  const [availableCash, setAvailableCash] = useState(11250);
  const [essentialExpenses, setEssentialExpenses] = useState(2150);
  const [optionalExpenses, setOptionalExpenses] = useState(680);
  const [monthlyIncome, setMonthlyIncome] = useState(6192);
  const [zeroIncomeMode, setZeroIncomeMode] = useState(true); // Default to stress-testing emergency runway with 0 income

  // Calculations
  const analysis = useMemo(() => {
    const cash = Number(availableCash) || 0;
    const essential = Number(essentialExpenses) || 1;
    const optional = Number(optionalExpenses) || 0;
    const totalOut = essential + optional;
    const income = zeroIncomeMode ? 0 : Number(monthlyIncome) || 0;

    const netBurnMonthly = Math.max(0, totalOut - income);
    const essentialBurnMonthly = Math.max(0, essential - income);

    // Total runway with all current expenses
    const monthsAll = netBurnMonthly > 0 ? (cash / netBurnMonthly).toFixed(1) : 999;
    const daysAll = Math.round(Number(monthsAll) * 30.4);

    // Runway if only bare essentials are funded
    const monthsEssential = essentialBurnMonthly > 0 ? (cash / essentialBurnMonthly).toFixed(1) : 999;
    const daysEssential = Math.round(Number(monthsEssential) * 30.4);

    // Buffer Health Tier
    let tier = 'healthy'; // 'critical' | 'moderate' | 'healthy' | 'exceptional'
    if (monthsEssential < 2) tier = 'critical';
    else if (monthsEssential < 4) tier = 'moderate';
    else if (monthsEssential <= 7) tier = 'healthy';
    else tier = 'exceptional';

    return {
      totalOut,
      netBurnMonthly,
      essentialBurnMonthly,
      monthsAll: monthsAll > 99 ? '99+' : monthsAll,
      daysAll: daysAll > 3000 ? '3000+' : daysAll,
      monthsEssential: monthsEssential > 99 ? '99+' : monthsEssential,
      daysEssential: daysEssential > 3000 ? '3000+' : daysEssential,
      tier,
      cutbackSavings: optional,
      extraDaysSaved: Math.round(((cash / essential) - (cash / totalOut)) * 30.4),
    };
  }, [availableCash, essentialExpenses, optionalExpenses, monthlyIncome, zeroIncomeMode]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-500/15 px-3 py-0.5 rounded-full border border-rose-500/30">
              Resilience Diagnostics
            </span>
            <Badge variant={analysis.tier === 'critical' ? 'rose' : 'teal'} size="sm">
              Stress-Test Simulation
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
            Money Survival Mode
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Transparently model how many months and days your liquid savings last under stress scenarios.
          </p>
        </div>

        {/* Zero Income Stress-Test Toggle */}
        <div className="flex items-center gap-3 p-2 px-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs neu-inset">
          <span className="text-xs font-semibold text-slate-700">Zero-Income Stress Test:</span>
          <button
            onClick={() => setZeroIncomeMode(!zeroIncomeMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              zeroIncomeMode ? 'bg-rose-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                zeroIncomeMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-xs font-bold text-slate-900">
            {zeroIncomeMode ? `Active (Income = ${formatCurrency(0)})` : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Main Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Baseline Runway */}
        <GlassCard className="relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Lifestyle Runway
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-200/60 text-slate-700 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {analysis.monthsAll} Months
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ~{analysis.daysAll} days with full optional spending included
          </p>
        </GlassCard>

        {/* Bare Essentials Runway */}
        <GlassCard className="bg-gradient-to-br from-teal-500/15 via-white/70 to-emerald-500/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Survival Essentials Runway
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-teal-800 font-heading">
            {analysis.monthsEssential} Months
          </div>
          <p className="text-xs text-teal-800/80 mt-1">
            ~{analysis.daysEssential} days with non-essential expenses paused (+{analysis.extraDaysSaved} days gained)
          </p>
        </GlassCard>

        {/* Safety Tier Status */}
        <GlassCard className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Resilience Assessment
              </span>
              <ShieldAlert className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-heading">
              {analysis.tier === 'exceptional' && 'Exceptional Buffer 🛡️'}
              {analysis.tier === 'healthy' && 'Healthy Runway ✅'}
              {analysis.tier === 'moderate' && 'Moderate Buffer ⚠️'}
              {analysis.tier === 'critical' && 'Low Safety Net 🚨'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Standard financial guideline recommends 3 to 6 months of liquid cash reserves.
            </p>
          </div>
          <div className="pt-2">
            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full"
                style={{ width: `${Math.min(100, (Number(analysis.monthsEssential) / 6) * 100)}%` }}
              />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Assumptions & Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <GlassCard className="p-6">
          <CardHeader
            title="Runway Assumptions"
            subtitle="Adjust numbers to reflect your exact liquid cushion"
            icon={Sliders}
          />

          <div className="space-y-5">
            {/* Liquid Cash */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Available Liquid Cash & Savings</label>
                <span className="text-sm font-bold font-mono text-teal-700">{formatCurrency(availableCash)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={availableCash}
                onChange={(e) => setAvailableCash(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Essential Expenses */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Essential Expenses (Rent, Utilities, Food, Medicine)
                </label>
                <span className="text-sm font-bold font-mono text-slate-800">{formatCurrency(essentialExpenses)}/mo</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={essentialExpenses}
                onChange={(e) => setEssentialExpenses(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Optional Expenses */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Optional Expenses (Dining, Entertainment, Subscriptions)
                </label>
                <span className="text-sm font-bold font-mono text-amber-700">{formatCurrency(optionalExpenses)}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={optionalExpenses}
                onChange={(e) => setOptionalExpenses(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            {/* Monthly Income if not zero-income mode */}
            {!zeroIncomeMode && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Expected Ongoing Income</label>
                  <span className="text-sm font-bold font-mono text-emerald-600">{formatCurrency(monthlyIncome)}/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="250"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            )}
          </div>
        </GlassCard>

        {/* Actionable Cutback Scenarios */}
        <GlassCard className="p-6 flex flex-col justify-between">
          <div>
            <CardHeader
              title="Tiered Expense Reduction Playbook"
              subtitle="Concrete levers to extend your survival runway"
              icon={Flame}
            />

            <div className="space-y-3.5">
              {/* Tier 1 */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0 font-bold text-xs">
                  T1
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900">
                    Pause Discretionary Subscriptions & Dining Out
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Eliminates {formatCurrency(optionalExpenses)}/month immediately.
                  </p>
                  <span className="text-[11px] font-bold text-teal-700 mt-1 inline-block">
                    + Adds ~{analysis.extraDaysSaved} days of survival runway
                  </span>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 shrink-0 font-bold text-xs">
                  T2
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900">
                    Renegotiate Utilities & Grocery Staples
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Shifting from specialty markets to bulk meal prep typically frees 15-20% (~{formatCurrency(3500)}/mo).
                  </p>
                  <span className="text-[11px] font-bold text-teal-700 mt-1 inline-block">
                    + Adds ~14 days of survival runway
                  </span>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 shrink-0 font-bold text-xs">
                  T3
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900">
                    Hard Emergency Protocol (Shelter & Nutrition Only)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Freeze all gym memberships, shopping, transport trips, and defer non-critical loan payments.
                  </p>
                  <span className="text-[11px] font-bold text-teal-700 mt-1 inline-block">
                    Max runway: {analysis.monthsEssential} full months
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Model calculation: Non-alarmist heuristic estimate</span>
            <span className="font-semibold text-slate-700">FinBuddy Resilience Engine</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
