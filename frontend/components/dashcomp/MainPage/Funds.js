"use client";

import React, { useState } from "react";
import "../../../styles/NavDash.css";
import "../../../styles/DashPage.css";
import dynamic from "next/dynamic";

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
    if (!amount || amount <= 0) return;
    setBalance(balance + parseFloat(amount));
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        type: "Deposit",
        amount: parseFloat(amount),
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setAmount("");
  };

  const handleWithdrawFunds = () => {
    if (!amount || amount <= 0 || amount > balance) return;
    setBalance(balance - parseFloat(amount));
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        type: "Withdrawal",
        amount: parseFloat(amount),
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setAmount("");
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <div className="funds-container">
      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>
      <div className="funds-content">
        <h1>Funds Management</h1>
        <div className="funds-section">
          <div className="balance-display">
            <h2>Current Balance: ${balance}</h2>
          </div>
          <div className="funds-actions">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="funds-input"
            />
            <button onClick={handleAddFunds} className="funds-button add">
              Add Funds
            </button>
            <button
              onClick={handleWithdrawFunds}
              className="funds-button withdraw"
            >
              Withdraw Funds
            </button>
          </div>
          <div className="transactions-history">
            <h3>Transaction History</h3>
            <ul>
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  className={`transaction-item ${tx.type.toLowerCase()}`}
                >
                  {tx.date} - {tx.type}: ${tx.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundsPage;
