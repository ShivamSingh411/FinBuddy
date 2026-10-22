import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../../services/chartSetup';

export const ExpenseBreakdownChart = ({
  items = [],
  height = 240,
}) => {
  const labels = items.map((i) => i.name);
  const dataValues = items.map((i) => Number(i.cost || i.amount || 0));

  const colors = [
    '#0D9488', // teal 600
    '#0284C7', // sky 600
    '#6366F1', // indigo 500
    '#F59E0B', // amber 500
    '#EC4899', // pink 500
    '#10B981', // emerald 500
    '#8B5CF6', // violet 500
  ];

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 10,
          font: { size: 11 },
          color: '#475569',
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: $${Number(ctx.raw).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
