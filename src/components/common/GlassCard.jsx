import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  variant = 'default', // 'default' | 'elevated' | 'subtle' | 'navy'
  hoverEffect = false,
  onClick,
  ...props
}) => {
  const variantClass = {
    default: 'glass-panel',
    elevated: 'glass-panel-elevated',
    subtle: 'glass-panel-subtle',
    navy: 'glass-sidebar text-slate-100',
  }[variant] || 'glass-panel';

  const hoverClass = hoverEffect
    ? 'hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-200 ${variantClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  title,
  subtitle,
  icon: Icon,
  action,
  className = '',
}) => {
  return (
    <div className={`flex items-start justify-between gap-4 mb-4 sm:mb-5 ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0 border border-teal-500/20">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
