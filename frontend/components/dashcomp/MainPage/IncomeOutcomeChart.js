import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function IncomeOutcomeChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Income",
        data: [3000, 3200, 2800, 3500, 4000, 4200, 4500, 4700, 4300, 4800],
        borderColor: "rgba(34, 197, 94, 1)", // green
        backgroundColor: "rgba(34, 197, 94, 0.3)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Outcome",
        data: [2000, 1800, 2100, 2200, 2300, 2000, 2400, 2600, 2500, 2800],
        borderColor: "rgba(239, 68, 68, 1)", // red
        backgroundColor: "rgba(239, 68, 68, 0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Income and Outcome",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
