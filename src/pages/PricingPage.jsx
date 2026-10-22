import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Crown,
  ArrowRight,
  Shield,
  Info,
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useFinance } from '../context/FinanceContext';
import { useToast } from '../context/ToastContext';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    icon: Shield,
    iconBg: 'bg-slate-500/10',
    iconColor: 'text-slate-500',
    price: { monthly: 0, annual: 0 },
    tagline: 'Get started at no cost',
    color: 'slate',
    accentBorder: 'border-slate-300/60',
    features: [
      { label: 'Up to 50 transactions/month', included: true },
      { label: '3 budget categories', included: true },
      { label: '2 savings goals', included: true },
      { label: 'Basic dashboard overview', included: true },
      { label: 'AI Money Assistant', included: false },
      { label: 'Future Simulator', included: false },
      { label: 'Life Event Predictor', included: false },
      { label: 'Money Survival Mode', included: false },
      { label: 'Reports & Analytics', included: false },
      { label: 'CSV/JSON Export', included: false },
    ],
    cta: 'Current Plan',
    popular: false,
  },
  {
    id: 'plus',
    name: 'Plus',
    icon: Zap,
    iconBg: 'bg-teal-500/15',
    iconColor: 'text-teal-600',
    price: { monthly: 299, annual: 2699 },
    tagline: 'For serious savers',
    color: 'teal',
    accentBorder: 'border-teal-400/50',
    features: [
      { label: 'Unlimited transactions', included: true },
      { label: 'Unlimited budget categories', included: true },
      { label: 'Up to 10 savings goals', included: true },
      { label: 'Full dashboard & charts', included: true },
      { label: 'AI Money Assistant', included: true },
      { label: 'Future Simulator', included: true },
      { label: 'Life Event Predictor', included: false },
      { label: 'Money Survival Mode', included: false },
      { label: 'Reports & Analytics', included: true },
      { label: 'CSV/JSON Export', included: true },
    ],
    cta: 'Upgrade to Plus',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-600',
    price: { monthly: 999, annual: 8999 },
    tagline: 'Everything, unlimited',
    color: 'violet',
    accentBorder: 'border-violet-400/50',
    features: [
      { label: 'Unlimited transactions', included: true },
      { label: 'Unlimited budget categories', included: true },
      { label: 'Unlimited savings goals', included: true },
      { label: 'Full dashboard & charts', included: true },
      { label: 'AI Money Assistant', included: true },
      { label: 'Future Simulator', included: true },
      { label: 'Life Event Predictor', included: true },
      { label: 'Money Survival Mode', included: true },
      { label: 'Reports & Analytics', included: true },
      { label: 'CSV/JSON Export', included: true },
    ],
    cta: 'Upgrade to Premium',
    popular: false,
  },
];

const PLAN_LIMITS = {
  free: { transactions: 50, categories: 3, goals: 2 },
  plus: { transactions: 'Unlimited', categories: 'Unlimited', goals: 10 },
  premium: { transactions: 'Unlimited', categories: 'Unlimited', goals: 'Unlimited' },
};

export const PricingPage = () => {
  const navigate = useNavigate();
  const { user, updateUserPreferences } = useFinance();
  const { addToast } = useToast();
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'annual'
  const [confirmingPlan, setConfirmingPlan] = useState(null);

  const currentPlan = user.plan || 'free';

  const handleSelectPlan = (planId) => {
    if (planId === currentPlan) {
      addToast('You are already on this plan.', 'info');
      return;
    }
    setConfirmingPlan(planId);
  };

  const handleConfirmPlan = () => {
    if (!confirmingPlan) return;
    updateUserPreferences({ plan: confirmingPlan });
    addToast(
      `Successfully switched to the ${confirmingPlan.charAt(0).toUpperCase() + confirmingPlan.slice(1)} plan!`,
      'success'
    );
    setConfirmingPlan(null);
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span className="text-xs font-semibold text-teal-700">Subscription Plans</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Choose your FinBuddy plan
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Start free, upgrade when you're ready. All plans include our core glassmorphic dashboard.
          Cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/70 border border-slate-200/70 shadow-sm">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              billing === 'monthly'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              billing === 'annual'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Annual
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-700 px-1.5 py-0.5 rounded-full">
              Save 25%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          const isActive = currentPlan === plan.id;
          const price = billing === 'monthly' ? plan.price.monthly : plan.price.annual;
          const period = billing === 'monthly' ? '/month' : '/year';

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl transition-all duration-200 ${
                plan.popular
                  ? 'ring-2 ring-teal-500/60 shadow-xl shadow-teal-500/15 scale-[1.02]'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-[11px] font-bold shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <GlassCard
                className={`p-6 h-full flex flex-col border-2 ${plan.accentBorder} ${
                  isActive ? 'bg-teal-500/5' : ''
                }`}
              >
                {/* Plan Header */}
                <div className="mb-5">
                  <div className={`w-11 h-11 rounded-2xl ${plan.iconBg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900 font-heading">{plan.name}</h3>
                    {isActive && (
                      <Badge variant="teal" size="sm">Current</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 font-heading">
                      {formatPrice(price)}
                    </span>
                    {price > 0 && (
                      <span className="text-xs text-slate-500 font-medium">{period}</span>
                    )}
                  </div>
                  {billing === 'annual' && price > 0 && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      ≈ {formatPrice(Math.round(price / 12))}/month billed annually
                    </p>
                  )}
                </div>

                {/* Feature List */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {feature.included ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                      )}
                      <span
                        className={`text-xs ${
                          feature.included ? 'text-slate-700' : 'text-slate-400'
                        }`}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={isActive ? 'outline' : plan.popular ? 'primary' : 'outline'}
                  size="md"
                  icon={isActive ? undefined : ArrowRight}
                  iconPosition="right"
                  onClick={() => handleSelectPlan(plan.id)}
                  className="w-full"
                  disabled={isActive}
                >
                  {isActive ? '✓ Active Plan' : plan.cta}
                </Button>
              </GlassCard>
            </div>
          );
        })}
      </div>

      {/* Plan Limits Table */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-600" />
          Plan Limits at a Glance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200/70">
                <th className="text-left text-slate-500 font-semibold pb-2 pr-4">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.id} className="text-center text-slate-700 font-bold pb-2 px-4">
                    {p.name}
                    {currentPlan === p.id && (
                      <span className="ml-1 text-teal-600 text-[10px]">●</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: 'Transactions / month', key: 'transactions' },
                { label: 'Budget categories', key: 'categories' },
                { label: 'Savings goals', key: 'goals' },
              ].map((row) => (
                <tr key={row.key}>
                  <td className="py-2.5 pr-4 text-slate-600 font-medium">{row.label}</td>
                  {PLANS.map((p) => (
                    <td key={p.id} className="text-center py-2.5 px-4 text-slate-800 font-semibold">
                      {PLAN_LIMITS[p.id][row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Privacy note */}
      <p className="text-center text-xs text-slate-400">
        🔒 Your financial data is stored locally in your browser. No data is ever sent to external servers in demo mode.
        Subscription billing is illustrative — no actual charge will be made.
      </p>

      {/* Confirmation Modal */}
      {confirmingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <GlassCard className="glass-panel-elevated p-6 sm:p-8 max-w-md w-full rounded-3xl border border-white/90 shadow-2xl animate-fade-in">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-3xl bg-teal-500/15 flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7 text-teal-600" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  Switch to {confirmingPlan.charAt(0).toUpperCase() + confirmingPlan.slice(1)}?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  This is a demo. No payment will be processed. Plan access updates immediately.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" size="md" onClick={() => setConfirmingPlan(null)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={handleConfirmPlan} className="flex-1">
                  Confirm Switch
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
