"use client";

import React, { useState, useEffect } from "react";
import SidePanel from "../../../components/dashcomp/MainPage/SidePanel.js";
import Header from "../../../components/hedfot/DashHeader.js";
import Footer from "../../../components/hedfot/DashFooter.js";
import PanelElements from "../../../components/hedfot/PanelElements.js";

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
    setFinancialData([
      { month: "Jan", income: 4000, expenses: 2400 },
      { month: "Feb", income: 3000, expenses: 1398 },
      { month: "Mar", income: 5000, expenses: 3800 },
      { month: "Apr", income: 4500, expenses: 3200 },
      { month: "May", income: 6000, expenses: 4200 },
    ]);
  }, []);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Side panel */}
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      {/* Fixed header */}
      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

      {/* Main content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">📊 Statistics & Reports</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Income vs Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10B981" />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Financial Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#34D399" />
                <Bar dataKey="expenses" fill="#F87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsReports;
