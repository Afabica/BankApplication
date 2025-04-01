"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import withAuth from "../../tools/withAuth";

const Header = dynamic(() => import("../../../components/hedfot/DashHeader"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../../components/hedfot/DashFooter"), {
  ssr: false,
});

const SidePanel = dynamic(
  () => import("../../../components/dashcomp/MainPage/SidePanel"),
  {
    ssr: false,
  },
);

const InvestmentPage = () => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investments, setInvestments] = useState([
    {
      id: 1,
      name: "Fixed Deposit",
      interestRate: "5.5%",
      duration: "1 Year",
      status: "Active",
    },
    {
      id: 2,
      name: "Mutual Funds",
      interestRate: "7.2%",
      duration: "3 Years",
      status: "Pending",
    },
  ]);

  const fetchdata = () => {};

  const handleInvest = () => {
    if (!investmentAmount || investmentAmount <= 0) return;
    setInvestments([
      ...investments,
      {
        id: investments.length + 1,
        name: "New Investment",
        interestRate: "6.0%",
        duration: "2 Years",
        status: "Pending",
      },
    ]);
    setInvestmentAmount("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <SidePanel>{/* Add Side Navigation if needed */}</SidePanel>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">
            Investment Plans
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Investment Application Form */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Invest Now
              </h2>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Enter investment amount"
                className="w-full border rounded-md p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleInvest}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
              >
                Invest
              </button>
            </div>

            {/* Investment Plans List */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Your Investments
              </h3>
              <ul className="space-y-3">
                {investments.map((investment) => (
                  <li
                    key={investment.id}
                    className={`p-3 rounded-md ${
                      investment.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <span className="font-bold">{investment.name}</span> -{" "}
                    {investment.interestRate} - {investment.duration} -{" "}
                    <span className="font-semibold">{investment.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default withAuth(InvestmentPage);
