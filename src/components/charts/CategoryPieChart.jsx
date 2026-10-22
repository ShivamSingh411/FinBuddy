import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../../services/chartSetup';

export const CategoryPieChart = ({ categorySpendMap = {}, height = 260 }) => {
  const categories = Object.keys(categorySpendMap);
  const values = Object.values(categorySpendMap);

  const fallbackLabels = ['Housing', 'Dining', 'Groceries', 'Transport', 'Utilities', 'Shopping'];
  const fallbackValues = [1750, 284, 240, 95, 135, 165];

  const labels = categories.length > 0 ? categories : fallbackLabels;
  const dataValues = values.length > 0 ? values : fallbackValues;

  const totalSpent = dataValues.reduce((acc, curr) => acc + curr, 0);

  const colors = [
    '#0284C7', // Housing (sky blue)
    '#F59E0B', // Dining (amber)
    '#10B981', // Groceries (emerald)
    '#6366F1', // Transport (indigo)
    '#EC4899', // Utilities (pink)
    '#F97316', // Shopping (orange)
    '#8B5CF6', // Subscriptions (purple)
    '#14B8A6', // Health (teal)
  ];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 12,
          font: {
            size: 11,
            weight: '500',
          },
          color: '#475569',
          generateLabels: (chart) => {
            const chartData = chart.data;
            if (chartData.labels.length && chartData.datasets.length) {
              return chartData.labels.map((label, i) => {
                const val = chartData.datasets[0].data[i];
                const pct = totalSpent > 0 ? Math.round((val / totalSpent) * 100) : 0;
                return {
                  text: `${label} (${pct}%)`,
                  fillStyle: chartData.datasets[0].backgroundColor[i],
                  strokeStyle: '#ffffff',
                  lineWidth: 1,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.raw || 0;
            const pct = totalSpent > 0 ? ((val / totalSpent) * 100).toFixed(1) : 0;
            return ` $${val.toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center" style={{ height }}>
      <Doughnut data={data} options={options} />
      {/* Center cutout info */}
      <div className="absolute top-1/2 left-[30%] sm:left-[35%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Total</span>
        <span className="text-base sm:text-lg font-bold text-slate-800">
          ${Math.round(totalSpent).toLocaleString()}
        </span>
      </div>
    </div>
  );
};
