"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { parseCookies } from "nookies";

const withAuth = dynamic(() => import("../../tools/withAuth"), {
  ssr: false,
})

const SidePanel = dynamic(() => import("../../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});
const Header = dynamic(() => import("../../hedfot/DashHeader"), {
  ssr: false,
});

const TransactionsPage = () => {
  // Sample transaction data (in a real application, this would be fetched from an API)
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Mock transactions data (replace this with actual API fetch in production)
  useEffect(() => {
    const fetchTransactions = () => {
      const data = [
        {
          id: 1,
          date: "2025-01-01",
          category: "Food",
          amount: 120,
          description: "Grocery shopping",
        },
        {
          id: 2,
          date: "2025-01-02",
          category: "Transport",
          amount: 50,
          description: "Taxi fare",
        },
        {
          id: 3,
          date: "2025-01-03",
          category: "Food",
          amount: 80,
          description: "Restaurant",
        },
        {
          id: 4,
          date: "2025-01-04",
          category: "Rent",
          amount: 800,
          description: "January rent",
        },
        {
          id: 5,
          date: "2025-01-05",
          category: "Utilities",
          amount: 200,
          description: "Electricity bill",
        },
        {
          id: 6,
          date: "2025-01-06",
          category: "Transport",
          amount: 30,
          description: "Bus ticket",
        },
      ];
      setTransactions(data);
      setFilteredTransactions(data);
    };

    const fetchDataFromStorage = () => {
      try {
      const response = await axios.get("http://localhost:8080/", {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        credential: "include", 
      }); 

      if( response.status === 200) {
        setFiles(response.data);
      }
    } catch(err) {
      console.error("Error fetching files:", error); 
    }

    fetchTransactions();
  }, []);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterTransactions(event.target.value, filterCategory);
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  // Handle category filter change
  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
    filterTransactions(searchTerm, event.target.value);
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
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
