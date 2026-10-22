import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-slate-300/40 rounded-xl ${className}`}
    />
  );
};
