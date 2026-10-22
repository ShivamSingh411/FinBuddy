import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Global default styling for glassmorphic finance aesthetic
ChartJS.defaults.font.family = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
ChartJS.defaults.color = '#64748B';
ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(11, 23, 44, 0.9)';
ChartJS.defaults.plugins.tooltip.titleColor = '#F8FAFC';
ChartJS.defaults.plugins.tooltip.bodyColor = '#E2E8F0';
ChartJS.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.15)';
ChartJS.defaults.plugins.tooltip.borderWidth = 1;
ChartJS.defaults.plugins.tooltip.padding = 12;
ChartJS.defaults.plugins.tooltip.cornerRadius = 10;
ChartJS.defaults.plugins.tooltip.boxPadding = 6;
