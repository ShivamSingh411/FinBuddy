import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Plus,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sun,
  Moon,
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';

const ROUTE_TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Real-time overview of your personal wealth & cash flow' },
  '/transactions': { title: 'Transactions', subtitle: 'Filter, search, categorize, and record every cash movement' },
  '/budgets': { title: 'Budgets & Limits', subtitle: 'Targeted monthly allowances by category' },
  '/goals': { title: 'Savings Goals', subtitle: 'Milestone tracking for big purchases & safety nets' },
  '/assistant': { title: 'AI Money Assistant', subtitle: 'Interactive co-pilot for spending advice & scenario modeling' },
  '/simulator': { title: 'Financial Future Simulator', subtitle: 'Compound interest & long-term investment wealth projections' },
  '/survival': { title: 'Money Survival Mode', subtitle: 'Emergency runway calculator & zero-income survival modeling' },
  '/life-events': { title: 'Life Event Cost Predictor', subtitle: 'Plan realistic budgets for major life transitions' },
  '/reports': { title: 'Reports & Analytics', subtitle: 'Trends, category breakdowns, and exportable financial summaries' },
  '/settings': { title: 'Settings & Preferences', subtitle: 'Account parameters, currency, theme, and display options' },
  '/pricing': { title: 'Plans & Pricing', subtitle: 'Compare FREE, PLUS, and PREMIUM subscription tiers' },
};

export const Topbar = ({ setMobileOpen, onOpenAddTransaction }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useFinance();
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentInfo = ROUTE_TITLES[location.pathname] || {
    title: 'FinBuddy',
    subtitle: 'Your Personal AI Finance Assistant',
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/transactions?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 py-3.5 px-4 sm:px-6 lg:px-8 glass-panel-subtle border-b border-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-white/80 border border-slate-300/60"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate font-heading tracking-tight">
              {currentInfo.title}
            </h2>
            <p className="text-xs text-slate-500 truncate hidden sm:block">
              {currentInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center relative max-w-xs w-full"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-2xl glass-input placeholder:text-slate-400"
          />
        </form>

        {/* Right: Actions, Theme Toggle, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onOpenAddTransaction && (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={onOpenAddTransaction}
              className="hidden sm:inline-flex"
            >
              Add Transaction
            </Button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-white/70 hover:bg-white border border-slate-200/80 text-slate-700 shadow-xs hover:shadow transition-all"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 rounded-2xl bg-white/70 hover:bg-white border border-slate-200/80 text-slate-700 shadow-xs hover:shadow transition-all"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl glass-panel-elevated p-4 shadow-2xl border border-white/90 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-bold text-slate-900">Notifications</span>
                  </div>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-500/15 px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="py-2 space-y-2.5">
                  <div className="p-2.5 rounded-2xl bg-white/80 border border-slate-100 flex items-start gap-3">
                    <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Grocery budget at 91%</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Only ₹700 left for remaining 9 days in October.
                      </p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/80 border border-slate-100 flex items-start gap-3">
                    <div className="p-1.5 rounded-xl bg-teal-500/10 text-teal-600 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Upcoming: Health Premium</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        ₹4,500 due on October 25 (in 3 days).
                      </p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/80 border border-slate-100 flex items-start gap-3">
                    <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Emergency Fund Progress</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        75% of your ₹3,00,000 target achieved!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200/70 text-center">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-2xl bg-white/70 hover:bg-white border border-slate-200/80 shadow-xs hover:shadow transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-xl object-cover ring-1 ring-teal-400"
              />
              <span className="text-xs font-semibold text-slate-800 hidden sm:block max-w-[90px] truncate">
                {user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 rounded-3xl glass-panel-elevated p-3 shadow-2xl border border-white/90 z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-200/70">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/settings');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100/80 rounded-xl transition-colors"
                  >
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/pricing');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center justify-between"
                  >
                    <span>View Plans</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-500/20 text-teal-600 border border-teal-500/30 capitalize">
                      {user.plan || 'Free'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/assistant');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100/80 rounded-xl transition-colors flex items-center justify-between"
                  >
                    <span>AI Assistant</span>
                    <Sparkles className="w-3 h-3 text-teal-500" />
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
