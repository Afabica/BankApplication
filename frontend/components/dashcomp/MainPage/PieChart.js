"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../../../styles/BarChart.css"; // Import the CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const transactions = [
  { id: 1, category: "Food", amount: 120 },
  { id: 2, category: "Transport", amount: 50 },
  { id: 3, category: "Food", amount: 80 },
  { id: 4, category: "Rent", amount: 800 },
  { id: 5, category: "Utilities", amount: 200 },
  { id: 6, category: "Transport", amount: 30 },
];

const groupExpensesByCategory = (transactions) => {
  const categoryTotals = {};
  transactions.forEach(({ category, amount }) => {
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;
  });
  return categoryTotals;
};

const BarChart = () => {
  const categoryTotals = groupExpensesByCategory(transactions);

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Categories" } },
      y: { title: { display: true, text: "Amount" }, beginAtZero: true },
    },
  };

  return (
    <div className="chart-container">
      <h2>Expenses by Category</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

