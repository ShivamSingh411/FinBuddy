import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Sliders,
  Info,
} from 'lucide-react';
import { GlassCard, CardHeader } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ProjectionChart } from '../components/charts/ProjectionChart';
import { useFinance } from '../context/FinanceContext';

const CURRENT_YEAR = 2026;

export const SimulatorPage = () => {
  const { formatCurrency } = useFinance();

  const [initialSavings, setInitialSavings] = useState(150000);
  const [monthlyContribution, setMonthlyContribution] = useState(15000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [durationYears, setDurationYears] = useState(10);
  const [activeScenario, setActiveScenario] = useState('baseline'); // 'conservative' (4%) | 'baseline' (7%) | 'optimistic' (10%)

  // Set preset scenarios
  const handleScenarioSelect = (type) => {
    setActiveScenario(type);
    if (type === 'conservative') setExpectedReturn(4);
    if (type === 'baseline') setExpectedReturn(7);
    if (type === 'optimistic') setExpectedReturn(10);
  };

  // Compound Interest Calculations
  const calculation = useMemo(() => {
    const P = Number(initialSavings) || 0;
    const PMT = Number(monthlyContribution) || 0;
    const r = (Number(expectedReturn) || 0) / 100 / 12;
    const n = (Number(durationYears) || 1) * 12;

    let futureValue = P;
    if (n > 0) {
      if (r > 0) {
        futureValue = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
      } else {
        futureValue = P + PMT * n;
      }
    }

    const totalPrincipal = P + PMT * n;
    const compoundEarnings = Math.max(0, futureValue - totalPrincipal);

    // Year-by-year table data
    const yearlyBreakdown = [];
    for (let yr = 1; yr <= durationYears; yr++) {
      const m = yr * 12;
      let fvYear = P;
      if (r > 0) {
        fvYear = P * Math.pow(1 + r, m) + PMT * ((Math.pow(1 + r, m) - 1) / r);
      } else {
        fvYear = P + PMT * m;
      }
      const invested = P + PMT * m;
      const interest = Math.max(0, fvYear - invested);

      yearlyBreakdown.push({
        year: yr,
        totalBalance: Math.round(fvYear),
        principal: Math.round(invested),
        interest: Math.round(interest),
      });
    }

    return {
      futureValue: Math.round(futureValue),
      totalPrincipal: Math.round(totalPrincipal),
      compoundEarnings: Math.round(compoundEarnings),
      yearlyBreakdown,
    };
  }, [initialSavings, monthlyContribution, expectedReturn, durationYears]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-500/15 px-3 py-0.5 rounded-full border border-teal-500/30">
              Wealth Forecaster
            </span>
            <Badge variant="teal" size="sm">Compound Interest Engine</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
            Financial Future Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Model how monthly contributions and compound interest can grow your net worth over time.
          </p>
        </div>

        {/* Quick Scenario Preset Toggles */}
        <div className="flex items-center p-1 rounded-2xl bg-white/70 border border-slate-200/80 shadow-xs neu-inset">
          <button
            onClick={() => handleScenarioSelect('conservative')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeScenario === 'conservative'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Conservative (4%)
          </button>
          <button
            onClick={() => handleScenarioSelect('baseline')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeScenario === 'baseline'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Baseline (7%)
          </button>
          <button
            onClick={() => handleScenarioSelect('optimistic')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeScenario === 'optimistic'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Optimistic (10%)
          </button>
        </div>
      </div>

      {/* 3 Outcome Metric Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <GlassCard className="bg-gradient-to-br from-teal-500/15 via-white/70 to-emerald-500/10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Projected Portfolio in {durationYears} Years
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-teal-800 font-heading mt-1.5">
            {formatCurrency(calculation.futureValue)}
          </div>
          <p className="text-xs text-teal-700/80 mt-1">
            At {expectedReturn}% annualized average compound return
          </p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Principal Invested
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-heading mt-1.5">
            {formatCurrency(calculation.totalPrincipal)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Your initial deposit + {durationYears * 12} monthly additions
          </p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Free Compound Growth
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-heading mt-1.5">
            +{formatCurrency(calculation.compoundEarnings)}
          </div>
          <p className="text-xs text-emerald-700/80 mt-1">
            Interest & market growth on your deposits
          </p>
        </GlassCard>
      </div>

      {/* Main Interactive Controls & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <GlassCard className="p-6">
          <CardHeader
            title="Simulation Parameters"
            subtitle="Fine-tune your initial capital & timeline"
            icon={Sliders}
          />

          <div className="space-y-6">
            {/* Initial Savings */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">Initial Savings</label>
                <span className="text-sm font-bold font-mono text-teal-700">
                  {formatCurrency(initialSavings)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                step="5000"
                value={initialSavings}
                onChange={(e) => setInitialSavings(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(500000)}</span>
                <span>{formatCurrency(1000000)}</span>
              </div>
            </div>

            {/* Monthly Contribution */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">Monthly Contribution</label>
                <span className="text-sm font-bold font-mono text-teal-700">
                  {formatCurrency(monthlyContribution)}/mo
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>{formatCurrency(0)}/mo</span>
                <span>{formatCurrency(50000)}/mo</span>
                <span>{formatCurrency(100000)}/mo</span>
              </div>
            </div>

            {/* Expected Annual Return */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">Annual Return Rate</label>
                <span className="text-sm font-bold font-mono text-teal-700">
                  {expectedReturn}% APY
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => {
                  setExpectedReturn(Number(e.target.value));
                  setActiveScenario('custom');
                }}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1% (Cash)</span>
                <span>7% (Index)</span>
                <span>15% (Aggressive)</span>
              </div>
            </div>

            {/* Projection Duration */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">Time Horizon</label>
                <span className="text-sm font-bold font-mono text-teal-700">
                  {durationYears} Years
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={durationYears}
                onChange={(e) => setDurationYears(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Dynamic Growth Line Chart */}
        <GlassCard className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <CardHeader
              title="Projected Growth Curve"
              subtitle={`Total balance vs principal contributed over ${durationYears} years`}
              icon={TrendingUp}
            />
            <ProjectionChart
              initial={initialSavings}
              monthly={monthlyContribution}
              rate={expectedReturn}
              years={durationYears}
              height={320}
            />
          </div>

          {/* Educational Disclaimer Banner */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-200/50 border border-slate-300/50 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>Hypothetical Model:</strong> Projections use standard monthly compounding formulas for educational purposes and do not account for inflation, taxes, or market fluctuations. Past performance does not guarantee future results.
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Year-by-Year Breakdown Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-5 border-b border-slate-200/70 bg-white/40 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Year-by-Year Growth Ledger
          </h3>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Annual Snapshot
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/70 bg-white/30 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Milestone Year</th>
                <th className="py-3 px-6 text-right">Principal Deposited</th>
                <th className="py-3 px-6 text-right">Compound Interest</th>
                <th className="py-3 px-6 text-right">End Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
              {calculation.yearlyBreakdown.map((row) => (
                <tr key={row.year} className="hover:bg-white/40 transition-colors">
                  <td className="py-3 px-6 font-bold text-slate-900">
                    Year {row.year} ({CURRENT_YEAR + row.year})
                  </td>
                  <td className="py-3 px-6 text-right text-slate-600 font-mono">
                    {formatCurrency(row.principal)}
                  </td>
                  <td className="py-3 px-6 text-right text-emerald-600 font-mono font-semibold">
                    +{formatCurrency(row.interest)}
                  </td>
                  <td className="py-3 px-6 text-right text-slate-900 font-mono font-bold">
                    {formatCurrency(row.totalBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
