"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { parseCookies } from "nookies";

const withAuth = dynamic(() => import("../../tools/withAuth"), {
  ssr: false,
});

const SidePanel = dynamic(() => import("../../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});
const Header = dynamic(() => import("../../hedfot/DashHeader"), {
  ssr: true,
});

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [files, setFiles] = useState([]); // Added missing state for files

//  const fetchDataFromStorage = async () => {
//    try {
//      const cookies = parseCookies();
//      const token = cookies.token; // Ensure token is retrieved from cookies
//      console.log(token);
//
//      if (!token) {
//        console.error("No authentication token found");
//        return;
//      }
//
//      const response = await axios.get(
//        `https://localhost:8443/operations/translist?user_id=${encodeURIComponent()}`,
//        {
//          headers: {
//            "Content-Type": "application/json",
//            Authorization: `Bearer ${token}`,
//          },
//          credentials: "include",
//        },
//      );
//    } catch (err) {
//      console.log("Error occured: " + err);
//    }
//  };

  useEffect(() => {
    fetchTransactions();
  }, []); // Empty dependency array ensures this runs only once

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
    <div className="transactions-page">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>
      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />
      <h2>Transactions</h2>

      {/* Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className="transaction-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td>${transaction.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
