"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../../../components/hedfot/DashHeader"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../../components/hedfot/DashFooter"), {
  ssr: false,
});
const PanelElements = dynamic(
  () => import("../../../components/hedfot/PanelElements"),
  {
    ssr: false,
  },
);
const SidePanel = dynamic(
  () => import("../../../components/dashcomp/MainPage/SidePanel"),
  {
    ssr: false,
  },
);

const Home = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loans, setLoans] = useState([
    { id: 1, amount: 5000, status: "Approved", date: "2024-01-15" },
    { id: 2, amount: 3000, status: "Pending", date: "2024-02-01" },
  ]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleApplyLoan = () => {
    if (!loanAmount || loanAmount <= 0) return;
    setLoans([
      ...loans,
      {
        id: loans.length + 1,
        amount: parseFloat(loanAmount),
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setLoanAmount("");
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      {isPanelOpen && (
        <aside className="w-64 bg-white shadow-md">
          <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <PanelElements />
          </SidePanel>
        </aside>
      )}
      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

      <div className="flex flex-1">
        {/* Sidebar */}

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">
            Loans Management
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Loan Application Form */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Apply for a Loan
              </h2>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                className="w-full border rounded-md p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleApplyLoan}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
              >
                Apply
              </button>
            </div>

            {/* Loan History */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Loan History
              </h3>
              <ul className="space-y-3">
                {loans.map((loan) => (
                  <li
                    key={loan.id}
                    className={`p-3 rounded-md ${
                      loan.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {loan.date} - Amount: ${loan.amount} - Status:{" "}
                    <span className="font-semibold">{loan.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
