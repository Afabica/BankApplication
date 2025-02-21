"use client";

import React, { useState, useEffect } from "react";
import SidePanel from "../../../components/dashcomp/MainPage/SidePanel.js";
import Header from "../../../components/hedfot/DashHeader.js";
import Footer from "../../../components/hedfot/DashFooter.js";
import PanelElements from "../../../components/hedfot/PanelElements.js";
import "../../../styles/NavDash.css";
import "../../../styles/DashPage.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatisticsReports = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    // Simulating fetching financial data
    setFinancialData([
      { month: "Jan", income: 4000, expenses: 2400 },
      { month: "Feb", income: 3000, expenses: 1398 },
      { month: "Mar", income: 5000, expenses: 3800 },
      { month: "Apr", income: 4500, expenses: 3200 },
      { month: "May", income: 6000, expenses: 4200 },
    ]);
  }, []);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <div className="stats-container">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>
      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />
      <div className="stats-content">
        <h1>Statistics & Reports</h1>
        <div className="charts-section">
          <div className="chart-wrapper">
            <h2>Income vs Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" />
                <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-wrapper">
            <h2>Financial Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />
                <Bar dataKey="expenses" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsReports;
