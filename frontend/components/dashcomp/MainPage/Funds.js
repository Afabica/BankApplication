"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "../../../styles/DashPage.css";

const SidePanel = dynamic(() => import("../../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});
const Header = dynamic(() => import("../../hedfot/DashHeader"), {
  ssr: false,
});

const FundsPage = () => {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 500, date: "2024-02-10" },
    { id: 2, type: "Withdrawal", amount: 200, date: "2024-02-08" },
  ]);

  const handleAddFunds = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) return;

    setBalance((prev) => prev + numericAmount);
    setTransactions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "Deposit",
        amount: numericAmount,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setAmount("");
  };

  const handleWithdrawFunds = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0 || numericAmount > balance) return;

    setBalance((prev) => prev - numericAmount);
    setTransactions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "Withdrawal",
        amount: numericAmount,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setAmount("");
  };

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      <div className="flex flex-col flex-1">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <main className="p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6">Funds Management</h1>

          <section className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-2xl">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Current Balance: ${balance.toFixed(2)}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="border border-gray-300 rounded px-4 py-2 w-full md:w-48"
              />
              <button
                onClick={handleAddFunds}
                disabled={!parseFloat(amount)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Add Funds
              </button>
              <button
                onClick={handleWithdrawFunds}
                disabled={!parseFloat(amount) || parseFloat(amount) > balance}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Withdraw Funds
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Transaction History
              </h3>
              <ul className="space-y-2">
                {transactions.map((tx) => (
                  <li
                    key={tx.id}
                    className={`p-3 rounded border ${
                      tx.type === "Deposit"
                        ? "bg-green-100 border-green-300"
                        : "bg-red-100 border-red-300"
                    }`}
                  >
                    <span className="font-medium">{tx.date}</span> - {tx.type}:
                    ${tx.amount.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FundsPage;
