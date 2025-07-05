"use client";

import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "../../../styles/DashPage.css";
import "../../../styles/global.css";

const SidePanel = dynamic(() => import("../../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});
const Header = dynamic(() => import("../../hedfot/DashHeader"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../hedfot/DashFooter"), {
  ssr: false,
});

const AccountManagement = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "John Doe",
      accountNumber: "123456789",
      bankKey: "987654321",
      type: "Savings",
      currency: "USD",
      balance: 5000,
      availableBalance: 4800,
      transactions: [
        { id: 1, date: "2024-12-10", type: "Deposit", amount: 200 },
        { id: 2, date: "2024-12-12", type: "Withdrawal", amount: 100 },
      ],
    },
  ]);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  useEffect(() => {
    // Load accounts from localStorage "customer"
    const fetchProfile = async () => {
      const storedCustomer = localStorage.getItem("customer");
      try {
        const parsedCustomer = storedCustomer
          ? JSON.parse(storedCustomer)
          : null;

        if (Array.isArray(parsedCustomer)) {
          setAccounts(parsedCustomer);
        } else if (parsedCustomer) {
          setAccounts([parsedCustomer]);
        } else {
          setAccounts([]);
        }
      } catch (error) {
        console.error("Error parsing customer data:", error);
        setAccounts([]);
      }
    };

    fetchProfile();
  }, []);

  const [filters, setFilters] = useState({ date: "", type: "" });

  return (
    <div className="max-h-screen bg-gray-100 text-gray-900">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Side panel toggle */}
      {isPanelOpen && (
        <aside className="w-64 bg-white bg-gray-100 text-gray-900">
          <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <PanelElements />
          </SidePanel>
        </aside>
      )}

      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

      <div className="container mx-auto max-w-screen px-4 py-8 flex flex-col gap-6">
        {accounts.map((account, index) => (
          <div
            key={account.id ?? index}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>Account Holder:</strong> {account.name}
              </p>
              <p>
                <strong>Account Number:</strong> {account.accountNumber}
              </p>
              <p>
                <strong>Bank Key:</strong> {account.bankKey}
              </p>
              <p>
                <strong>Type:</strong> {account.type}
              </p>
              <p>
                <strong>Currency:</strong> {account.currency}
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6">Balances</h3>
            <div className="flex justify-between mt-2 flex-wrap gap-4">
              <p>
                <strong>Current Balance:</strong> ${account.balance}
              </p>
              <p>
                <strong>Available Balance:</strong> ${account.availableBalance}
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6">Recent Transactions</h3>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <input
                type="text"
                placeholder="Filter by date"
                className="border px-3 py-2 rounded w-full md:w-1/2"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Filter by type"
                className="border px-3 py-2 rounded w-full md:w-1/2"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              />
            </div>
            <ul className="mt-2">
              {account.transactions && Array.isArray(account.transactions) ? (
                account.transactions
                  .filter(
                    (tx) =>
                      (!filters.date || tx.date.includes(filters.date)) &&
                      (!filters.type ||
                        tx.type
                          .toLowerCase()
                          .includes(filters.type.toLowerCase())),
                  )
                  .map((tx, idx) => (
                    // Use tx.id if exists, fallback to idx to avoid key warning
                    <li key={tx.id ?? idx}>
                      {tx.date} - {tx.type} - ${tx.amount}
                    </li>
                  ))
              ) : (
                <li>No transactions available</li>
              )}
            </ul>

            <h3 className="text-xl font-semibold mt-6">Account Management</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Account
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                Edit Account
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Close Account
              </button>
            </div>

            <h3 className="text-xl font-semibold mt-6">
              Authorization & Signatures
            </h3>
            <button className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Manage Authorizations
            </button>

            <h3 className="text-xl font-semibold mt-6">Notifications</h3>
            <p className="text-gray-700">No unusual activity detected.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountManagement;
