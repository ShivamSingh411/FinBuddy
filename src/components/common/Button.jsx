import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-sm font-semibold rounded-2xl gap-2',
    lg: 'px-6 py-3.5 text-base font-semibold rounded-2xl gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 active:translate-y-0 border border-teal-400/40',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/15 hover:-translate-y-0.5 active:translate-y-0 border border-slate-700/50',
    outline:
      'bg-white/70 hover:bg-white text-slate-700 border border-slate-300/80 shadow-sm hover:shadow hover:-translate-y-0.5 backdrop-blur-md',
    ghost:
      'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 active:bg-slate-200/70',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 hover:-translate-y-0.5 active:translate-y-0 border border-rose-500/40',
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
};
