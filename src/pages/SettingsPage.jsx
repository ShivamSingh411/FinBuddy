import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Bell,
  Lock,
  Download,
  RotateCcw,
  LogOut,
  Shield,
  Globe,
  Sun,
  Moon,
  Sliders,
  Crown,
  Zap,
  ChevronRight,
  Check,
  Image,
  Calendar,
  DollarSign,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { GlassCard, CardHeader } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useFinance } from '../context/FinanceContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { CURRENCIES, EXCHANGE_RATES } from '../services/currencyService';

const SECTION_TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Sliders },
  { id: 'currency', label: 'Currency', icon: Globe },
  { id: 'appearance', label: 'Appearance', icon: Sun },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'subscription', label: 'Subscription', icon: Crown },
  { id: 'security', label: 'Security', icon: Lock },
];

const PLAN_INFO = {
  free:    { label: 'Free',    color: 'slate',  icon: Shield, price: '₹0/month'   },
  plus:    { label: 'Plus',    color: 'teal',   icon: Zap,    price: '₹299/month'  },
  premium: { label: 'Premium', color: 'violet', icon: Crown,  price: '₹999/month'  },
};

export const SettingsPage = () => {
  const { user, updateUserPreferences, resetToDemoData, transactions, budgets, goals } = useFinance();
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');

  // Profile
  const [name, setName]     = useState(user.name);
  const [email, setEmail]   = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);

  // Preferences
  const [dateFormat, setDateFormat]     = useState('dd/mm/yyyy');
  const [weekStart, setWeekStart]       = useState('monday');
  const [glassIntensity, setGlassIntensity] = useState('balanced');

  // Currency
  const [currency, setCurrency]         = useState(user.currency || 'INR');
  const [currencySymbol, setCurrencySymbol] = useState(user.currencySymbol || '₹');

  // Notifications
  const [alert80, setAlert80]           = useState(true);
  const [alert100, setAlert100]         = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [billReminders, setBillReminders] = useState(true);

  // Modals
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // ── Handlers ──
  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    const found = CURRENCIES.find((c) => c.code === curr);
    setCurrencySymbol(found ? found.symbol : '₹');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserPreferences({ name: name.trim(), email: email.trim(), avatar: avatar.trim() });
    addToast('Profile updated successfully!', 'success');
  };

  const handleSaveCurrency = (e) => {
    e.preventDefault();
    updateUserPreferences({ currency, currencySymbol });
    addToast('Currency preference saved!', 'success');
  };

  const handleExportJSON = () => {
    const data = { user, transactions, budgets, goals, exportedAt: new Date().toISOString() };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', jsonStr);
    a.setAttribute('download', `finbuddy_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    addToast('Financial workspace exported to JSON!', 'success');
  };

  const handleConfirmReset = () => {
    resetToDemoData();
    setIsResetModalOpen(false);
    addToast('Workspace restored to pristine demo data.', 'info');
  };

  const planInfo = PLAN_INFO[user.plan || 'free'];
  const PlanIcon = planInfo.icon;

  // ── Section renderers ──
  const renderProfile = () => (
    <GlassCard className="p-6 sm:p-7">
      <CardHeader title="Profile Information" subtitle="Your display name, email, and avatar" icon={User} />
      <form onSubmit={handleSaveProfile} className="space-y-4 mt-2">
        {/* Avatar Preview */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 border border-slate-100">
          <img src={avatar} alt={name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-400/40" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-700 mb-1">Avatar URL</p>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl glass-input"
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Display Name</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input"
            />
          </div>
        </div>
        <div className="flex justify-end pt-1">
          <Button type="submit" variant="primary" size="md">Save Profile</Button>
        </div>
      </form>
    </GlassCard>
  );

  const renderPreferences = () => (
    <GlassCard className="p-6 sm:p-7">
      <CardHeader title="Display Preferences" subtitle="Date format, week start, and visual intensity" icon={Sliders} />
      <div className="space-y-4 mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date Format</label>
            <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input bg-white">
              <option value="dd/mm/yyyy">DD/MM/YYYY (Indian)</option>
              <option value="mm/dd/yyyy">MM/DD/YYYY (US)</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD (ISO)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Week Starts On</label>
            <select value={weekStart} onChange={(e) => setWeekStart(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input bg-white">
              <option value="monday">Monday</option>
              <option value="sunday">Sunday</option>
              <option value="saturday">Saturday</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Glassmorphism Intensity</label>
          <select value={glassIntensity} onChange={(e) => setGlassIntensity(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input bg-white">
            <option value="balanced">Balanced Frosted (Recommended)</option>
            <option value="subtle">Subtle Minimalist</option>
            <option value="deep">High Intensity Frost</option>
          </select>
        </div>
        <div className="flex justify-end">
          <Button variant="primary" size="md" onClick={() => addToast('Preferences saved!', 'success')}>
            Save Preferences
          </Button>
        </div>
      </div>
    </GlassCard>
  );

  const renderCurrency = () => (
    <div className="space-y-5">
      <GlassCard className="p-6 sm:p-7">
        <CardHeader title="Primary Currency" subtitle="Choose your display currency and number format" icon={Globe} />
        <form onSubmit={handleSaveCurrency} className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Currency</label>
            <select value={currency} onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-2xl glass-input bg-white">
              <option value="INR">₹ INR — Indian Rupee (default)</option>
              <option value="USD">$ USD — US Dollar</option>
              <option value="EUR">€ EUR — Euro</option>
              <option value="GBP">£ GBP — British Pound</option>
              <option value="AED">AED — UAE Dirham</option>
            </select>
          </div>
          <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800">
            <p className="font-semibold mb-0.5">Format Preview</p>
            <p className="text-sm font-bold">
              {currencySymbol}{(125000).toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md">Apply Currency</Button>
          </div>
        </form>
      </GlassCard>

      {/* Exchange Rate Info */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Exchange Rate Reference</h4>
            <p className="text-xs text-slate-500">Stubbed rates – ready for live API</p>
          </div>
          <Badge variant="teal" size="sm">Base: INR</Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(EXCHANGE_RATES.rates).filter(([k]) => k !== 'INR').map(([code, rate]) => (
            <div key={code} className="p-3 rounded-2xl bg-white/60 border border-slate-100 text-center">
              <p className="text-xs font-bold text-slate-700">{code}</p>
              <p className="text-sm font-extrabold text-teal-700 mt-0.5">
                {rate.toFixed(5)}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">per ₹1</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1">
          <RefreshCw className="w-3 h-3" />
          Last updated: {EXCHANGE_RATES.lastUpdated} · {EXCHANGE_RATES.source}
        </p>
      </GlassCard>
    </div>
  );

  const renderAppearance = () => (
    <GlassCard className="p-6 sm:p-7">
      <CardHeader title="Appearance & Theme" subtitle="Switch between light and dark mode" icon={isDark ? Moon : Sun} />
      <div className="mt-4 space-y-4">
        {/* Theme Toggle Card */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/70 border border-slate-100">
          <div>
            <p className="text-sm font-bold text-slate-900">
              {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {isDark
                ? 'Deep navy backgrounds with glassmorphic dark panels.'
                : 'Icy-blue frosted glass with soft ambient gradients.'}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isDark ? 'bg-teal-500' : 'bg-slate-300'
            }`}
            aria-label="Toggle theme"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                isDark ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Theme Preview */}
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => isDark && toggleTheme()}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              !isDark ? 'border-teal-500 bg-[#EBF2F8]' : 'border-slate-200/40 bg-slate-100/60 opacity-60'
            }`}
          >
            <div className="w-full h-8 rounded-xl bg-white/70 border border-white/80 mb-2 flex items-center px-2 gap-1">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <div className="w-10 h-1.5 rounded bg-slate-300" />
            </div>
            <p className="text-[11px] font-bold text-slate-700 text-center">Light Mode</p>
          </div>
          <div
            onClick={() => !isDark && toggleTheme()}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              isDark ? 'border-teal-500 bg-[#0b1528]' : 'border-slate-200/40 bg-slate-800/20 opacity-60'
            }`}
          >
            <div className="w-full h-8 rounded-xl bg-slate-800/70 border border-slate-700/50 mb-2 flex items-center px-2 gap-1">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              <div className="w-10 h-1.5 rounded bg-slate-600" />
            </div>
            <p className="text-[11px] font-bold text-slate-400 text-center">Dark Mode</p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Theme preference is persisted in your browser's local storage.
        </p>
      </div>
    </GlassCard>
  );

  const renderNotifications = () => (
    <GlassCard className="p-6 sm:p-7">
      <CardHeader title="Notification Triggers" subtitle="Configure thresholds for alerts and reminders" icon={Bell} />
      <div className="space-y-3 mt-3">
        {[
          { label: 'Budget Warning (at 80%)', desc: 'Alert when any category crosses 80% of its allocation.', checked: alert80, setter: setAlert80 },
          { label: 'Budget Exceeded (at 100%)', desc: 'Immediate alert when spending surpasses a budget limit.', checked: alert100, setter: setAlert100 },
          { label: 'Weekly AI Digest', desc: 'Summary of savings rate and opportunities every Monday.', checked: weeklyDigest, setter: setWeeklyDigest },
          { label: 'Upcoming Bill Reminders', desc: 'Notify 3 days before each scheduled bill payment.', checked: billReminders, setter: setBillReminders },
        ].map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-white/70 border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => item.setter(!item.checked)}
              className={`mt-0.5 relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 ${
                item.checked ? 'bg-teal-500' : 'bg-slate-300'
              }`}
              role="switch" aria-checked={item.checked}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                item.checked ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        ))}
        <div className="flex justify-end pt-1">
          <Button variant="primary" size="md" onClick={() => addToast('Notification preferences saved!', 'success')}>
            Save Preferences
          </Button>
        </div>
      </div>
    </GlassCard>
  );

  const renderSubscription = () => (
    <div className="space-y-5">
      {/* Current Plan Banner */}
      <GlassCard className={`p-6 bg-gradient-to-br from-teal-500/10 via-white/80 to-sky-500/5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md`}>
              <PlanIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Current Plan</p>
              <h3 className="text-lg font-extrabold text-slate-900 font-heading">{planInfo.label}</h3>
              <p className="text-xs text-teal-700 font-semibold">{planInfo.price}</p>
            </div>
          </div>
          <Button variant="primary" size="md" icon={ChevronRight} iconPosition="right"
            onClick={() => navigate('/pricing')}>
            View All Plans
          </Button>
        </div>
      </GlassCard>

      {/* Plan Limit Summary */}
      <GlassCard className="p-6">
        <h4 className="text-sm font-bold text-slate-900 mb-3">Your Current Plan Includes</h4>
        <div className="space-y-2">
          {[
            { label: 'Transactions / month', value: user.plan === 'free' ? '50' : 'Unlimited' },
            { label: 'Budget categories', value: user.plan === 'free' ? '3' : 'Unlimited' },
            { label: 'Savings goals', value: user.plan === 'premium' ? 'Unlimited' : user.plan === 'plus' ? '10' : '2' },
            { label: 'AI Money Assistant', value: user.plan !== 'free' },
            { label: 'Reports & Analytics', value: user.plan !== 'free' },
            { label: 'Life Event Predictor', value: user.plan === 'premium' },
            { label: 'Money Survival Mode', value: user.plan === 'premium' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-xs text-slate-700">{item.label}</span>
              {typeof item.value === 'boolean' ? (
                item.value ? (
                  <Check className="w-4 h-4 text-teal-500" />
                ) : (
                  <span className="text-xs text-slate-400">—</span>
                )
              ) : (
                <span className="text-xs font-bold text-slate-900">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 flex items-start gap-2">
        <Shield className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          Subscription billing is illustrative — no actual payment is processed in demo mode.
          Data stays private and local to your browser.
        </span>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-5">
      {/* Data Management */}
      <GlassCard className="p-6 sm:p-7">
        <CardHeader title="Data Management" subtitle="Export your records or reset to demo data" icon={Download} />
        <div className="space-y-4 mt-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/70 border border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Export Local Workspace</h4>
              <p className="text-xs text-slate-500">Download transactions, budgets, and goals as JSON.</p>
            </div>
            <Button variant="outline" size="sm" icon={Download} onClick={handleExportJSON}>
              Export JSON
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-rose-500/8 border border-rose-500/20">
            <div>
              <h4 className="text-sm font-bold text-rose-900">Reset to Demo Data</h4>
              <p className="text-xs text-rose-700/80">Clears all entries and restores original October 2026 dataset.</p>
            </div>
            <Button variant="danger" size="sm" icon={RotateCcw} onClick={() => setIsResetModalOpen(true)}>
              Reset Data
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Session & Account */}
      <GlassCard className="p-6 sm:p-7">
        <CardHeader title="Account & Session" subtitle="Manage your current session and credentials" icon={Lock} />
        <div className="space-y-4 mt-3">
          <div className="p-4 rounded-2xl bg-white/70 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Current Session</p>
                <p className="text-xs text-slate-500 mt-0.5">Signed in as {user.email}</p>
              </div>
              <Badge variant="teal" size="sm">Active</Badge>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 border border-slate-100">
            <p className="text-xs font-bold text-slate-900 mb-1">Data Persistence Mode</p>
            <p className="text-xs text-slate-500">Local Browser Storage — ready to connect to Flask backend & MySQL when deployed.</p>
          </div>
          <div className="flex justify-end">
            <Button
              variant="danger"
              size="md"
              icon={LogOut}
              onClick={() => {
                addToast('Signed out of session', 'info');
                navigate('/login');
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const SECTION_RENDERERS = {
    profile:      renderProfile,
    preferences:  renderPreferences,
    currency:     renderCurrency,
    appearance:   renderAppearance,
    notifications: renderNotifications,
    subscription: renderSubscription,
    security:     renderSecurity,
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-500/15 px-3 py-0.5 rounded-full border border-teal-500/30">
            Account & System
          </span>
          <Badge variant="teal" size="sm">7 Sections</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your profile, currency, theme, notifications, subscription, and security.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {SECTION_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/70'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Section Content */}
      <div className="animate-fade-in">{SECTION_RENDERERS[activeTab]?.()}</div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Demo Dataset?"
        subtitle="This will restore all default mock records."
      >
        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          Are you sure? Any transactions, custom budgets, or goal progress logged in this session
          will be replaced by the original INR sample dataset for Sakshi Kumari.
        </p>
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="md" onClick={() => setIsResetModalOpen(false)}>Cancel</Button>
          <Button variant="danger" size="md" onClick={handleConfirmReset}>Confirm Reset</Button>
        </div>
      </Modal>
    </div>
  );
};
