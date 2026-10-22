import React from 'react';

export const Badge = ({
  children,
  variant = 'teal', // 'teal' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'slate'
  size = 'sm', // 'sm' | 'md'
  dot = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs sm:text-sm',
  }[size];

  const variantClasses = {
    teal: 'bg-teal-500/10 text-teal-700 border-teal-500/25',
    emerald: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/25',
    amber: 'bg-amber-500/10 text-amber-700 border-amber-500/25',
    rose: 'bg-rose-500/10 text-rose-700 border-rose-500/25',
    indigo: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/25',
    slate: 'bg-slate-200/60 text-slate-700 border-slate-300/60',
  }[variant];

  const dotClasses = {
    teal: 'bg-teal-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    indigo: 'bg-indigo-500',
    slate: 'bg-slate-500',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-sm ${sizeClasses} ${variantClasses} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotClasses}`} />}
      {children}
    </span>
  );
};
