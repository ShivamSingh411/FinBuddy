import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../services/chartSetup';

export const CashFlowChart = ({ height = 280 }) => {
  const data = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct (Current)'],
    datasets: [
      {
        label: 'Income',
        data: [4800, 5100, 5200, 5400, 5600, 6192],
        backgroundColor: 'rgba(20, 184, 166, 0.85)', // Teal
        hoverBackgroundColor: '#0D9488',
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: 'Expenses',
        data: [3100, 2950, 3400, 3120, 2850, 2830],
        backgroundColor: 'rgba(15, 23, 42, 0.75)', // Deep Navy
        hoverBackgroundColor: '#0F172A',
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
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
          padding: 18,
          font: {
            size: 12,
            weight: '500',
          },
          color: '#475569',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
          color: '#64748B',
        },
      },
      y: {
        grid: {
          color: 'rgba(203, 213, 225, 0.4)',
          drawBorder: false,
        },
        ticks: {
          callback: (value) => `$${value / 1000}k`,
          font: { size: 12 },
          color: '#64748B',
          stepSize: 2000,
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  );
};
