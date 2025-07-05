"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import SidePanel from "./SidePanel";

// Assuming SidePanel is a default export; if not adjust accordingly
//const SidePanel = dynamic(() => import("./SidePanel"), { ssr: false });

// Assuming PanelElements is a default export; if not, do:
// const PanelElements = dynamic(() => import("../../hedfot/PanelElements").then(mod => mod.PanelElements), { ssr: false });
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});

// Assuming DashHeader is a default export; if not, adjust as above
const Header = dynamic(() => import("../../hedfot/DashHeader"), { ssr: true });

const TransactionsPage = () => {
  const [transactions] = useState([
    {
      id: 1,
      date: "2025-06-15",
      category: "Food",
      description: "Grocery shopping",
      amount: 45.2,
    },
    {
      id: 2,
      date: "2025-06-16",
      category: "Transport",
      description: "Bus fare",
      amount: 3.5,
    },
  ]);

  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    filterTransactions(newSearchTerm, filterCategory);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setFilterCategory(newCategory);
    filterTransactions(searchTerm, newCategory);
  };

  const filterTransactions = (searchTerm, category) => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter((transaction) =>
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(
        (transaction) => transaction.category === category,
      );
    }

    setFilteredTransactions(filtered);
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            value={filterCategory}
            onChange={handleCategoryChange}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Description
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4">{transaction.category}</td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      ${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
