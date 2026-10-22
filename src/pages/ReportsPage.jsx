import React, { useState } from 'react';
import {
  Printer,
  Calendar,
  TrendingUp,
  PieChart,
} from 'lucide-react';
import { GlassCard, CardHeader } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CashFlowChart } from '../components/charts/CashFlowChart';
import { CategoryPieChart } from '../components/charts/CategoryPieChart';
import { useFinance } from '../context/FinanceContext';

export const ReportsPage = () => {
  const { user, metrics, budgets, formatCurrency } = useFinance();
  const [dateRange, setDateRange] = useState('6m'); // '30d' | '3m' | '6m' | 'ytd'

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12 print:bg-white print:p-0">
      {/* Top Banner with Print Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-500/15 px-3 py-0.5 rounded-full border border-teal-500/30">
              Audit & Reports
            </span>
            <Badge variant="teal" size="sm">Consolidated Statements</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
            Financial Analytics & Statements
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review your month-over-month trajectory, category concentration, and savings adherence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl glass-input bg-white/70 text-xs font-semibold text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="30d">Last 30 Days</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="ytd">Year to Date (2026)</option>
            </select>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Printer}
            onClick={handlePrint}
            className="shadow-lg shadow-teal-500/20"
          >
            Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Printable Header (Visible only on print or clean view) */}
      <div className="hidden print:block p-4 border-b border-slate-300 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">FinBuddy Monthly Financial Report</h1>
        <p className="text-xs text-slate-500">
          Generated for: {user.name} ({user.email}) • Cycle: October 2026
        </p>
      </div>

      {/* Performance Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard>
          <span className="text-xs font-semibold text-slate-500">Net Savings Rate</span>
          <div className="text-3xl font-extrabold text-teal-700 font-heading mt-1">
            {metrics.savingsRate}%
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            +14% higher than target benchmark
          </p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs font-semibold text-slate-500">Budget Adherence Score</span>
          <div className="text-3xl font-extrabold text-slate-900 font-heading mt-1">
            92 / 100
          </div>
          <p className="text-xs text-slate-500 mt-1">
            7 of 8 categories within limit
          </p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs font-semibold text-slate-500">Total Recorded Inflow</span>
          <div className="text-3xl font-extrabold text-emerald-600 font-heading mt-1">
            {formatCurrency(metrics.totalIncome)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Primary salary + side contracts
          </p>
        </GlassCard>

        <GlassCard>
          <span className="text-xs font-semibold text-slate-500">Total Recorded Outflow</span>
          <div className="text-3xl font-extrabold text-slate-800 font-heading mt-1">
            {formatCurrency(metrics.totalExpenses)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Net Surplus: {formatCurrency(metrics.netSavings)}
          </p>
        </GlassCard>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <CardHeader
            title="6-Month Inflow vs Outflow"
            subtitle="Trailing cash flow consistency"
            icon={TrendingUp}
          />
          <CashFlowChart height={280} />
        </GlassCard>

        <GlassCard>
          <CardHeader
            title="Category Weightings"
            subtitle="Current cycle spending dispersion"
            icon={PieChart}
          />
          <CategoryPieChart categorySpendMap={metrics.categorySpendMap} height={280} />
        </GlassCard>
      </div>

      {/* Category Performance Breakdown Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-5 border-b border-slate-200/70 bg-white/40 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Category Variance Ledger
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            Active Fiscal Cycle
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/70 bg-white/30 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Category Name</th>
                <th className="py-3.5 px-6">Classification</th>
                <th className="py-3.5 px-6 text-right">Target Cap</th>
                <th className="py-3.5 px-6 text-right">Actual Outflow</th>
                <th className="py-3.5 px-6 text-right">Variance</th>
                <th className="py-3.5 px-6 text-right">Burn Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
              {budgets.map((b) => {
                const spent = Number(b.spent) || 0;
                const allocated = Number(b.allocated) || 1;
                const variance = allocated - spent;
                const pct = Math.round((spent / allocated) * 100);

                return (
                  <tr key={b.id} className="hover:bg-white/40 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      {b.categoryName}
                    </td>
                    <td className="py-3.5 px-6">
                      <Badge variant={b.isEssential ? 'teal' : 'slate'} size="sm">
                        {b.isEssential ? 'Essential Need' : 'Discretionary'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono text-slate-700">
                      {formatCurrency(allocated)}
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-900">
                      {formatCurrency(spent)}
                    </td>
                    <td
                      className={`py-3.5 px-6 text-right font-mono font-semibold ${
                        variance >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {variance >= 0 ? `+${formatCurrency(variance)}` : `-${formatCurrency(Math.abs(variance))}`}
                    </td>
                    <td className="py-3.5 px-6 text-right font-mono">
                      <span
                        className={`font-bold ${
                          pct > 100 ? 'text-rose-600' : pct > 75 ? 'text-amber-600' : 'text-teal-700'
                        }`}
                      >
                        {pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
