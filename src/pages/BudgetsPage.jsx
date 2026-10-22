import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { useToast } from '../context/ToastContext';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const BudgetsPage = () => {
  const { budgets, updateBudget, addBudget, deleteBudget, formatCurrency } = useFinance();
  const { addToast } = useToast();

  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [editingBudget, setEditingBudget] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  // Add Budget modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newAllocated, setNewAllocated] = useState('');
  const [newIsEssential, setNewIsEssential] = useState(true);

  // Overall calculations
  const totalAllocated = budgets.reduce((acc, b) => acc + Number(b.allocated || 0), 0);
  const totalSpent = budgets.reduce((acc, b) => acc + Number(b.spent || 0), 0);
  const overallPct = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;
  const remainingBudget = totalAllocated - totalSpent;

  const handleEditClick = (b) => {
    setEditingBudget(b);
    setEditAmount(String(b.allocated));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editAmount || isNaN(Number(editAmount)) || Number(editAmount) <= 0) {
      addToast('Please enter a valid budget amount', 'error');
      return;
    }
    updateBudget(editingBudget.id, parseFloat(editAmount));
    addToast(`Budget for ${editingBudget.categoryName} updated to $${parseFloat(editAmount)}`, 'success');
    setEditingBudget(null);
  };

  const handleCreateBudget = (e) => {
    e.preventDefault();
    if (!newCatName.trim() || !newAllocated || isNaN(Number(newAllocated))) {
      addToast('Please enter category name and allocation', 'error');
      return;
    }
    addBudget({
      categoryId: `cat_${Date.now()}`,
      categoryName: newCatName.trim(),
      allocated: parseFloat(newAllocated),
      color: '#14B8A6',
      icon: 'PieChart',
      isEssential: newIsEssential,
    });
    addToast(`New budget for ${newCatName} created!`, 'success');
    setIsAddModalOpen(false);
    setNewCatName('');
    setNewAllocated('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Monthly Budgets & Allowances
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track planned targets against actual spending limits across active categories.
          </p>
        </div>

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
            onClick={() => setIsAddModalOpen(true)}
            className="shadow-lg shadow-teal-500/20"
          >
            Create Budget
          </Button>
        </div>
      </div>

      {/* Overview Card with Total Gauge */}
      <GlassCard className="p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Monthly Cap
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-1">
              {formatCurrency(totalAllocated)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Allocated across {budgets.length} living categories
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Spent So Far
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 font-heading mt-1">
              {formatCurrency(totalSpent)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Remaining buffer: <span className="font-bold text-slate-800">{formatCurrency(remainingBudget)}</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Overall Budget Burn Rate</span>
              <span
                className={
                  overallPct > 100
                    ? 'text-rose-600'
                    : overallPct > 75
                    ? 'text-amber-600'
                    : 'text-teal-700'
                }
              >
                {overallPct}% Consumed
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200/70 p-0.5 neu-inset overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  overallPct > 100
                    ? 'bg-rose-500'
                    : overallPct > 75
                    ? 'bg-amber-500'
                    : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                }`}
                style={{ width: `${Math.min(100, overallPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Day 22 of 31 in cycle</span>
              <span>{remainingBudget >= 0 ? `${formatCurrency(remainingBudget)} surplus` : 'Over budget'}</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Category Budget Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {budgets.map((b) => {
          const spent = Number(b.spent) || 0;
          const allocated = Number(b.allocated) || 1;
          const pct = Math.round((spent / allocated) * 100);
          const remaining = allocated - spent;

          // Status state
          const isExceeded = pct >= 100;
          const isApproaching = pct >= 75 && pct < 100;
          const isNormal = pct < 75;

          return (
            <GlassCard key={b.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {b.categoryName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={b.isEssential ? 'teal' : 'slate'} size="sm">
                        {b.isEssential ? 'Essential' : 'Discretionary'}
                      </Badge>
                      {isExceeded && (
                        <Badge variant="rose" size="sm" dot>Exceeded</Badge>
                      )}
                      {isApproaching && (
                        <Badge variant="amber" size="sm" dot>75%+ Spent</Badge>
                      )}
                      {isNormal && (
                        <Badge variant="emerald" size="sm" dot>On Track</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditClick(b)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-white/80 transition-colors"
                      title="Adjust budget limit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        deleteBudget(b.id);
                        addToast(`Removed ${b.categoryName} budget`, 'info');
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete budget"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Amounts display */}
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Spent: </span>
                    <span className="text-lg font-bold font-heading text-slate-900">
                      {formatCurrency(spent)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Target: </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {formatCurrency(allocated)}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-200/70 p-0.5 neu-inset overflow-hidden my-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isExceeded
                        ? 'bg-rose-500'
                        : isApproaching
                        ? 'bg-amber-500'
                        : 'bg-teal-500'
                    }`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{pct}% utilized</span>
                <span
                  className={`font-semibold ${
                    remaining >= 0 ? 'text-teal-700' : 'text-rose-600'
                  }`}
                >
                  {remaining >= 0
                    ? `${formatCurrency(remaining)} remaining`
                    : `Over by ${formatCurrency(Math.abs(remaining))}`}
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Edit Budget Modal */}
      {editingBudget && (
        <Modal
          isOpen={Boolean(editingBudget)}
          onClose={() => setEditingBudget(null)}
          title={`Adjust Budget: ${editingBudget.categoryName}`}
          subtitle="Update the planned monthly limit for this category"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Allocated Monthly Amount ($ USD)
              </label>
              <input
                type="number"
                step="10"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl glass-input text-sm font-semibold"
                placeholder="500"
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-3">
              <Button variant="ghost" size="md" onClick={() => setEditingBudget(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Update Budget
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add New Budget Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Category Budget"
        subtitle="Set a planned target allowance for a spending area"
      >
        <form onSubmit={handleCreateBudget} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Pet Care, Hobbies, Gym"
              className="w-full px-4 py-2.5 rounded-2xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Monthly Cap ($ USD) *
            </label>
            <input
              type="number"
              step="10"
              required
              value={newAllocated}
              onChange={(e) => setNewAllocated(e.target.value)}
              placeholder="300"
              className="w-full px-4 py-2.5 rounded-2xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newIsEssential}
                onChange={(e) => setNewIsEssential(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
              />
              <span className="text-xs font-medium text-slate-700">
                Mark as Essential Need (used in Money Survival Mode)
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button variant="ghost" size="md" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Save Budget
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
