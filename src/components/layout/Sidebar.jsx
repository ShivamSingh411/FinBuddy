import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Compass,
  BarChart3,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useToast } from '../../context/ToastContext';

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
  { path: '/budgets', label: 'Budgets', icon: PieChart },
  { path: '/goals', label: 'Savings Goals', icon: Target },
  { path: '/assistant', label: 'AI Assistant', icon: Sparkles, badge: 'AI' },
  { path: '/simulator', label: 'Future Simulator', icon: TrendingUp },
  { path: '/survival', label: 'Survival Mode', icon: ShieldAlert, badge: 'Hot' },
  { path: '/life-events', label: 'Life Events', icon: Compass },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ mobileOpen, setMobileOpen, collapsed, onToggleCollapse }) => {
  const { user } = useFinance();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    addToast('You have been logged out of FinBuddy demo session', 'info');
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const sidebarContent = (
    <div
      className="flex flex-col h-full justify-between text-slate-200 overflow-hidden"
      style={{ padding: collapsed ? '1.25rem 0.75rem' : '1.25rem' }}
    >
      {/* Brand & User Header */}
      <div>
        {/* Brand Row */}
        <div
          className="flex items-center mb-6"
          style={{ justifyContent: collapsed ? 'center' : 'space-between', paddingLeft: collapsed ? 0 : '0.5rem', paddingRight: collapsed ? 0 : '0.5rem' }}
        >
          {/* Logo — clickable → landing page */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
            title="Back to FinBuddy Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-400 via-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/25 border border-teal-300 shrink-0">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            {!collapsed && (
              <div className="text-left">
                <h1 className="text-lg font-bold tracking-tight text-white font-heading leading-none">
                  FinBuddy
                </h1>
                <p className="text-[11px] text-teal-300/80 font-medium tracking-wide mt-0.5">
                  Track • Plan • Save
                </p>
              </div>
            )}
          </button>

          {/* Close button (mobile only) */}
          {mobileOpen && !collapsed && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Mini Profile Card (expanded only) */}
        {!collapsed && (
          <div className="mx-1 mb-6 p-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-teal-400/50 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-teal-300/80 truncate font-mono">
                {user.accountType || 'Personal Pro'}
              </p>
            </div>
          </div>
        )}

        {/* Collapsed avatar */}
        {collapsed && (
          <div className="flex justify-center mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-teal-400/50"
              title={user.name}
            />
          </div>
        )}

        {/* Navigation List */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => mobileOpen && setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `relative flex items-center px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 group sidebar-nav-item ${
                    collapsed ? 'justify-center' : 'justify-between'
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500/20 to-teal-500/10 text-teal-300 border border-teal-400/30 shadow-inner backdrop-blur-md font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  }`
                }
              >
                <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      item.badge === 'AI'
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {/* Tooltip for collapsed mode */}
                {collapsed && <span className="sidebar-tooltip">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer & Session info */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        {/* Status badge (expanded only) */}
        {!collapsed && (
          <div className="px-3 py-2 rounded-xl bg-teal-950/40 border border-teal-500/20 flex items-center gap-2 text-xs text-teal-200">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
            <span className="truncate font-medium">Local Mock Mode (Flask ready)</span>
          </div>
        )}

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={onToggleCollapse}
          className={`hidden lg:flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-white/[0.05] transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Log Out' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Log Out</span>}
          {collapsed && <span className="sidebar-tooltip">Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className="hidden lg:block shrink-0 h-screen sticky top-0 z-30 glass-sidebar"
        style={{
          width: collapsed ? '4rem' : '17rem',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] h-full glass-sidebar z-10 animate-fade-in">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
