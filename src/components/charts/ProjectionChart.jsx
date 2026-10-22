import React from 'react';
import { Line } from 'react-chartjs-2';
import '../../services/chartSetup';

export const ProjectionChart = ({
  initial = 10000,
  monthly = 500,
  rate = 7, // percentage
  years = 10,
  height = 300,
}) => {
  const labels = [];
  const balanceData = [];
  const principalData = [];

  const r = rate / 100 / 12;

  for (let y = 0; y <= years; y++) {
    labels.push(`Yr ${y}`);
    const months = y * 12;

    // Compound Interest formula: FV = P*(1+r)^n + PMT * [((1+r)^n - 1) / r]
    let total = initial;
    if (months > 0) {
      if (r > 0) {
        total = initial * Math.pow(1 + r, months) + monthly * ((Math.pow(1 + r, months) - 1) / r);
      } else {
        total = initial + monthly * months;
      }
    }
    const principal = initial + monthly * months;

    balanceData.push(Math.round(total));
    principalData.push(Math.round(principal));
  }

  const data = {
    labels,
    datasets: [
      {
        label: `Projected Balance (${rate}% APY)`,
        data: balanceData,
        borderColor: '#14B8A6', // Teal
        backgroundColor: 'rgba(20, 184, 166, 0.15)',
        fill: true,
        tension: 0.35,
        borderWidth: 3,
        pointBackgroundColor: '#14B8A6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Total Principal Invested',
        data: principalData,
        borderColor: '#64748B', // Slate
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: { size: 12, weight: '500' },
          color: '#475569',
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: '#64748B' },
      },
      y: {
        grid: { color: 'rgba(203, 213, 225, 0.35)' },
        ticks: {
          callback: (val) => `$${(val / 1000).toFixed(0)}k`,
          font: { size: 12 },
          color: '#64748B',
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Line data={data} options={options} />
    </div>
  );
};
