"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import BankCardsCarousel from "./ProfileCards";
import PieChart from "./PieChart";
import Promotions from "./Promotions";
import CurrencyTable from "./CurrencyTable";
import "../../../styles/DashPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SendMoneyQuickAction from "./SendMoneyQuickAction";
import IncomeOutcomeChart from "./IncomeOutcomeChart";
import fetchProfile from "../../tools/ApiCall";

const Header = dynamic(() => import("../../hedfot/DashHeader"), { ssr: true });
const SidePanel = dynamic(() => import("./SidePanel"), { ssr: true });
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: true,
});

function Home() {
  const router = useRouter();
  const API = "https://localhost:8443";
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [parsedData, setParsedData] = useState([""]);
  const [ibans, setIbans] = useState([]);

  const payments = [
    {
      id: "txn_001",
      date: "2025-06-28",
      description: "Payment to John Doe",
      ibanFrom: "DE89 3704 0044 0532 0130 00",
      ibanTo: "DE45 5001 0517 5407 3249 31",
      amount: -150.0,
      currency: "EUR",
      status: "Completed",
    },
    {
      id: "txn_002",
      date: "2025-06-27",
      description: "Salary deposit",
      ibanFrom: "Company Payroll",
      ibanTo: "DE89 3704 0044 0532 0130 00",
      amount: 2500.0,
      currency: "EUR",
      status: "Completed",
    },
    {
      id: "txn_003",
      date: "2025-06-26",
      description: "Electricity bill payment",
      ibanFrom: "DE89 3704 0044 0532 0130 00",
      ibanTo: "DE91 1000 0000 0123 4567 89",
      amount: -75.32,
      currency: "EUR",
      status: "Pending",
    },
    {
      id: "txn_004",
      date: "2025-06-25",
      description: "Refund from Amazon",
      ibanFrom: "DE89 3704 0044 0532 0130 00",
      ibanTo: "Amazon Payments",
      amount: 45.67,
      currency: "EUR",
      status: "Completed",
    },
    {
      id: "txn_005",
      date: "2025-06-24",
      description: "Monthly subscription fee",
      ibanFrom: "DE89 3704 0044 0532 0130 00",
      ibanTo: "Netflix",
      amount: -13.99,
      currency: "EUR",
      status: "Completed",
    },
  ];

  const promotionsData = [
    {
      title: "Summer Sale",
      description: "Get 20% off all items!",
      link: "https://example.com/sale",
      expiryDate: "2025-07-10T23:59:59Z",
    },
    {
      title: "Holiday Bonus",
      description: "Earn double rewards points.",
      link: "https://example.com/bonus",
      expiryDate: "2025-07-15T23:59:59Z",
    },
  ];

  const requestNewCard = async () => {
    if (!parsedData?.accountId) return;
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (!token) {
      setError("Authentication token missing.");
      return;
    }

    const response = await axios.get(
      `https://localhost:8443/profcards/newcard`,
      {
        accountId: parsedData.accountId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
  };

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  // Parse user profile from localStorage
  useEffect(() => {
    const customer = fetchProfile();
    if (customer) {
      setParsedData(customer);
      setTransactions(payments);
      console.log("Customer data fetched.");
    } else {
      console.warn("Customer data not fetched.");
    }
    //    const getUserDetails = async () => {
    //      const customer = localStorage.getItem("customer");
    //      if (customer) {
    //        try {
    //          const parsed = JSON.parse(customer);
    //          setParsedData(parsed);
    //        } catch (err) {
    //          console.error("Error parsing customer data:", err);
    //        }
    //      }
    //    };
    //    getUserDetails();
  }, []);
  // Fetch transactions
  //  useEffect(() => {
  //    const fetchTransactions = async () => {
  //      if (!parsedData?.accountId) return;
  //
  //      const token = localStorage.getItem("token")?.replace(/"/g, "");
  //      if (!token) {
  //        setError("Authentication token missing.");
  //        return;
  //      }
  //
  //      try {
  //        const params = new URLSearchParams();
  //        if (parsedData.iban) params.append("iban", parsedData.iban);
  //        if (parsedData.accountId) params.append("userId", parsedData.accountId);
  //
  //        const response = await axios.get(
  //          `https://localhost:8443/operations/translist?${params.toString()}`,
  //          {
  //            headers: {
  //              Authorization: `Bearer ${parsedData.token}`,
  //              "Content-Type": "application/json",
  //            },
  //          },
  //        );
  //
  //        if (response.status === 200) {
  //          setTransactions(response.data);
  //        } else {
  //          setError("Failed to fetch transactions.");
  //        }
  //      } catch (err) {
  //        setError("Error fetching transactions.");
  //        console.error("Fetch error:", err);
  //      }
  //    };
  //
  //    fetchTransactions();
  //  }, [parsedData]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 px-4 pt-4">
        {/* Side Panel */}
        <div className="z-10">
          {isPanelOpen && (
            <aside className="w-full lg:w-64 bg-white shadow-md">
              <SidePanel isOpen={isPanelOpen} onClose={togglePanel}>
                <PanelElements />
              </SidePanel>
            </aside>
          )}
        </div>

        {/* Left - Cards */}
        <aside className="w-full lg:w-1/4">
          <BankCardsCarousel />
        </aside>

        <main className="w-full lg:w-2/4 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-3">
              Welcome, {parsedData?.username || "User"}
            </h1>
            {/*<p>Balance: {parsedData?.balance ?? "N/A"}</p>
            <p>Card Number: {parsedData?.cardNumber ?? "N/A"}</p>*/}
          </div>

          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h2 className="font-semibold mb-2">Total Savings</h2>
              <p>
                {parsedData?.totalSavings
                  ? `$${parsedData.totalSavings}`
                  : "$0"}
              </p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h2 className="font-semibold mb-2">Credit Score</h2>
              <p>{parsedData?.creditScore ?? "N/A"}</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h2 className="font-semibold mb-2">Monthly Income</h2>
              <p>{statistics.monthlyIncome || "$0"}</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h2 className="font-semibold mb-2">Monthly Expenses</h2>
              <p>{statistics.monthlyExpenses || "$0"}</p>
            </div>
          </section>

          {/* Error message */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {/* Transactions */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            <table className="min-w-full bg-white rounded shadow overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      No transactions available
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, index) => (
                    <tr
                      key={tx.id || index}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3 text-center">
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          size="lg"
                          color="#A3C600"
                        />
                      </td>
                      <td className="p-3">
                        {tx.date}
                        {/*{new Date(tx.transactionDate).toLocaleDateString()}*/}
                      </td>
                      <td className="p-3">{tx.description || "-"}</td>
                      <td className="p-3 text-right">
                        ${parseFloat(tx.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          <IncomeOutcomeChart />
        </main>

        {/* Right - Promotions */}
        <aside className="w-full lg:w-1/4">
          <Promotions promotions={promotionsData} />
          <CurrencyTable />
        </aside>
      </div>
    </div>
  );
}

export default Home;
