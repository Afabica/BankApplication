"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
//import "../../../styles/NavDash.css";
import "../../../styles/DashPage.css";

const SidePanel = dynamic(() => import("../../dashcomp/MainPage/SidePanel"), {
  ssr: true,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: true,
});
const Header = dynamic(() => import("../../hedfot/DashHeader"), {
  ssr: true,
});

const InvestmentsPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [parsedData, setParsedData] = useState("");
  const [investments, setInvestments] = useState([
    {
      id: 1,
      type: "Stocks",
      amount: 1000,
      date: "2024-01-10",
      currentValue: 1200,
    },
    {
      id: 2,
      type: "Bonds",
      amount: 500,
      date: "2023-12-05",
      currentValue: 550,
    },
  ]);
  const [newType, setNewType] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCurrentValue, setNewCurrentValue] = useState("");

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const handleAddInvestment = () => {
    const amt = parseFloat(newAmount);
    const currVal = parseFloat(newCurrentValue);
    if (!newType || !amt || amt <= 0 || !currVal || currVal <= 0) return;

    const newInvestment = {
      id: investments.length + 1,
      type: newType,
      amount: amt,
      currentValue: currVal,
      date: new Date().toISOString().split("T")[0],
    };
    setInvestments([...investments, newInvestment]);
    setNewType("");
    setNewAmount("");
    setNewCurrentValue("");
  };

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    if (customer && customer !== "undefined") {
      try {
        const parsed = JSON.parse(customer);
        setParsedData(parsed);
      } catch (err) {
        console.error("Error parsing customer data:", err);
        return;
      }
    }
  }, []);

  console.log(parsedData);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce(
    (sum, inv) => sum + inv.currentValue,
    0,
  );

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      <div className="flex flex-col flex-1">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <main className="p-6 md:p-10 max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6">Investments</h1>

          <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Investment</h2>
            <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
              <input
                type="text"
                placeholder="Investment Type (e.g. Stocks)"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 flex-1"
              />
              <input
                type="number"
                placeholder="Amount Invested"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-40"
                min="0"
              />
              <input
                type="number"
                placeholder="Current Value"
                value={newCurrentValue}
                onChange={(e) => setNewCurrentValue(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-40"
                min="0"
              />
              <button
                onClick={handleAddInvestment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
                disabled={
                  !newType ||
                  !parseFloat(newAmount) ||
                  parseFloat(newAmount) <= 0 ||
                  !parseFloat(newCurrentValue) ||
                  parseFloat(newCurrentValue) <= 0
                }
              >
                Add Investment
              </button>
            </div>
          </section>

          <section className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current Investments</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-3">Type</th>
                  <th className="border-b p-3">Amount Invested</th>
                  <th className="border-b p-3">Current Value</th>
                  <th className="border-b p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-100">
                    <td className="border-b p-3">{inv.type}</td>
                    <td className="border-b p-3">${inv.amount.toFixed(2)}</td>
                    <td className="border-b p-3">
                      ${inv.currentValue.toFixed(2)}
                    </td>
                    <td className="border-b p-3">{inv.date}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className="border-t p-3">Totals</td>
                  <td className="border-t p-3">${totalInvested.toFixed(2)}</td>
                  <td className="border-t p-3">
                    ${totalCurrentValue.toFixed(2)}
                  </td>
                  <td className="border-t p-3"></td>
                </tr>
              </tfoot>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default InvestmentsPage;
