"use client";

import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard"; // Import the dashboard layout
import { Line, Bar } from "react-chartjs-2"; // Charts for visualization (optional)
import axios from "axios"; // For API calls


const AccountStatistics = () => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch account statistics
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/account-statistics");
        setAccountData(response.data);
      } catch (error) {
        console.error("Error fetching account statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const { balance, credits, debits, transactions, trends } = accountData;

  return (
    <Dashboard>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Account Statistics</h1>

        {/* Header Section */}
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-lg font-semibold">Account Overview</h2>
          <p className="text-gray-600">Current Balance: ${balance.toLocaleString()}</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Export Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">Total Credits (Last 30 Days)</h3>
            <p className="text-green-600">${credits.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">Total Debits (Last 30 Days)</h3>
            <p className="text-red-600">${debits.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">Highest Expense Category</h3>
            <p className="text-gray-700">{accountData.highestExpenseCategory}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Balance Trend (Line Graph) */}
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold mb-2">Balance Trend</h3>
            <Line
              data={{
                labels: trends.dates,
                datasets: [
                  {
                    label: "Balance",
                    data: trends.balances,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>

          {/* Income vs Expenses (Bar Chart) */}
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold mb-2">Income vs Expenses</h3>
            <Bar
              data={{
                labels: trends.dates,
                datasets: [
                  {
                    label: "Income",
                    data: trends.income,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                  {
                    label: "Expenses",
                    data: trends.expenses,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow rounded p-4 mt-6">
          <h3 className="font-semibold mb-2">Recent Transactions</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{transaction.date}</td>
                  <td className="px-4 py-2">{transaction.description}</td>
                  <td className="px-4 py-2">{transaction.category}</td>
                  <td
                    className={`px-4 py-2 ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  );
};

export default AccountStatistics;

