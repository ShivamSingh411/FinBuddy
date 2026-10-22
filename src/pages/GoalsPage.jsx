import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Target,
  Plus,
  TrendingUp,
  ShieldCheck,
  Laptop,
  Plane,
  GraduationCap,
  Sparkles,
  Calendar,
  CheckCircle2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useToast } from '../context/ToastContext';
import { GlassCard, CardHeader } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const GoalsPage = () => {
  const { goals, addGoal, addContribution, formatCurrency, metrics } = useFinance();
  const { addToast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contributeGoal, setContributeGoal] = useState(null);
  const [contributionAmt, setContributionAmt] = useState('');

  // Form states for new goal
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Safety Net');
  const [newTarget, setNewTarget] = useState('');
  const [newInitialSaved, setNewInitialSaved] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('2027-01-01');
  const [newDesc, setNewDesc] = useState('');

  const handleContributeSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(contributionAmt);
    if (!amt || isNaN(amt) || amt <= 0) {
      addToast('Please enter a valid contribution amount', 'error');
      return;
    }

    addContribution(contributeGoal.id, amt);
    const newTotal = Number(contributeGoal.savedAmount) + amt;
    const target = Number(contributeGoal.targetAmount);

    if (newTotal >= target) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      addToast(`🎉 Milestone Accomplished! You reached 100% of ${contributeGoal.title}!`, 'success', 5000);
    } else {
      addToast(`Added +$${amt.toFixed(2)} to ${contributeGoal.title}`, 'success');
    }

    setContributeGoal(null);
    setContributionAmt('');
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTarget || isNaN(Number(newTarget))) {
      addToast('Please provide a goal title and target amount', 'error');
      return;
    }

    addGoal({
      title: newTitle.trim(),
      category: newCategory,
      targetAmount: parseFloat(newTarget),
      savedAmount: parseFloat(newInitialSaved) || 0,
      targetDate: newTargetDate,
      description: newDesc.trim() || 'Custom financial milestone',
      color: '#14B8A6',
      icon: 'Target',
    });

    addToast(`Goal "${newTitle}" created successfully!`, 'success');
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewTarget('');
    setNewInitialSaved('');
    setNewDesc('');
  };

  const getGoalIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('emergency') || t.includes('safety')) return ShieldCheck;
    if (t.includes('macbook') || t.includes('laptop') || t.includes('tech')) return Laptop;
    if (t.includes('japan') || t.includes('travel') || t.includes('vacation')) return Plane;
    if (t.includes('education') || t.includes('degree') || t.includes('master')) return GraduationCap;
    return Target;
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Savings Goals & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Turn ambitious financial aspirations into steady, automated progress.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
          className="shadow-lg shadow-teal-500/20 self-start sm:self-auto"
        >
          Create New Goal
        </Button>
      </div>

      {/* Aggregate Overview Card */}
      <GlassCard className="p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Goals Target
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-1">
              {formatCurrency(metrics.totalGoalsTarget)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Combined target across {goals.length} active milestones
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Saved to Date
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 font-heading mt-1">
              {formatCurrency(metrics.totalGoalsSaved)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Remaining to fund: <span className="font-bold text-slate-800">{formatCurrency(metrics.totalGoalsTarget - metrics.totalGoalsSaved)}</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Combined Progress</span>
              <span className="text-teal-700">{metrics.overallGoalsProgress}% Complete</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200/70 p-0.5 neu-inset overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-500 transition-all duration-500"
                style={{ width: `${metrics.overallGoalsProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{goals.filter((g) => Number(g.savedAmount) >= Number(g.targetAmount)).length} of {goals.length} completed</span>
              <span>On healthy trajectory</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => {
          const saved = Number(g.savedAmount) || 0;
          const target = Number(g.targetAmount) || 1;
          const pct = Math.min(100, Math.round((saved / target) * 100));
          const remaining = Math.max(0, target - saved);
          const isDone = pct >= 100;
          const Icon = getGoalIcon(g.title);

          return (
            <GlassCard key={g.id} hoverEffect className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                        isDone
                          ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
                          : 'bg-teal-500/15 text-teal-600 border-teal-500/30'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        {g.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="teal" size="sm">{g.category || 'Personal'}</Badge>
                        {isDone && <Badge variant="emerald" size="sm" dot>Goal Achieved!</Badge>}
                      </div>
                    </div>
                  </div>

                  <span className="text-2xl font-extrabold font-heading text-slate-900">
                    {pct}%
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  {g.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-3 rounded-full bg-slate-200/70 p-0.5 neu-inset overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone
                        ? 'bg-emerald-500 shadow-md shadow-emerald-500/30'
                        : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Financial Metric Row */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-white/60 border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Saved</span>
                    <span className="text-xs sm:text-sm font-bold text-teal-700 font-heading">
                      {formatCurrency(saved)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Target</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 font-heading">
                      {formatCurrency(target)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-500 font-heading">
                      {formatCurrency(remaining)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Target: {g.targetDate}</span>
                </div>

                <Button
                  variant={isDone ? 'outline' : 'primary'}
                  size="sm"
                  icon={DollarSign}
                  onClick={() => {
                    setContributeGoal(g);
                    setContributionAmt('');
                  }}
                >
                  {isDone ? 'Add Bonus' : 'Log Contribution'}
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Log Contribution Modal */}
      {contributeGoal && (
        <Modal
          isOpen={Boolean(contributeGoal)}
          onClose={() => setContributeGoal(null)}
          title={`Contribute to ${contributeGoal.title}`}
          subtitle={`Current progress: ${formatCurrency(contributeGoal.savedAmount)} of ${formatCurrency(contributeGoal.targetAmount)}`}
        >
          <form onSubmit={handleContributeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contribution Amount ($ USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  step="10"
                  required
                  placeholder="250.00"
                  value={contributionAmt}
                  onChange={(e) => setContributionAmt(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 text-sm font-semibold rounded-2xl glass-input"
                />
              </div>
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Quick add:</span>
              {[50, 100, 250, 500].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setContributionAmt(String(amt))}
                  className="px-2.5 py-1 text-xs font-medium rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 transition-colors"
                >
                  +${amt}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <Button variant="ghost" size="md" onClick={() => setContributeGoal(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Confirm Deposit
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Create New Goal Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Milestone Goal"
        subtitle="Define a target amount and target completion date"
      >
        <form onSubmit={handleCreateGoal} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Goal Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Electric Vehicle Down Payment"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl glass-input bg-white"
              >
                <option value="Safety Net">Safety Net / Emergency</option>
                <option value="Technology">Technology & Hardware</option>
                <option value="Travel">Travel & Vacations</option>
                <option value="Education">Education & Courses</option>
                <option value="Vehicle">Vehicle & Mobility</option>
                <option value="Home">Home & Living</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={newTargetDate}
                onChange={(e) => setNewTargetDate(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl glass-input bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Amount ($ USD) *
              </label>
              <input
                type="number"
                step="50"
                required
                placeholder="5000"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Initial Saved Amount ($ USD)
              </label>
              <input
                type="number"
                step="50"
                placeholder="0"
                value={newInitialSaved}
                onChange={(e) => setNewInitialSaved(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description / Notes
            </label>
            <input
              type="text"
              placeholder="Why this milestone is important to you..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-2xl glass-input"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" size="md" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Create Goal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
