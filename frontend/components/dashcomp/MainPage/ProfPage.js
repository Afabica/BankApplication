"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import PieChart from "./PieChart";
import Promotions from "./Promotions";
// import { parseCookies } from "nookies"; // Not used in your current code
// import withAuth from "../../tools/withAuth"; // Uncomment if you want auth wrapper
import ProfileCards from "../Cards/ProfileCards";
import BankCardsCarousel from "../Cards/ProfileCards";
import CurrencyTable from "../Currency/CurrencyTable";

const Footer = dynamic(() => import("../../hedfot/DashFooter"), { ssr: false });
const Header = dynamic(() => import("../../hedfot/DashHeader"), { ssr: false });
const SidePanel = dynamic(() => import("./SidePanel"), { ssr: false });
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});

function Home() {
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [promotionsData, setPromotionsData] = useState([]);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const promotions = [
    // Keep your promotions here or load dynamically
  ];

  useEffect(() => {
    // Load stored customer data from localStorage
    const fetchProfile = () => {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) {
        try {
          const parsedData = JSON.parse(storedCustomer);
          setFormData(parsedData);
          setUserData(parsedData);
        } catch (e) {
          console.error("Failed to parse stored customer data", e);
        }
      }
    };

    const fetchTransactions = async () => {
      // If you want dynamic userId based on formData, wait until formData.customerId is set
      const userId = formData.customerId || 1; // default fallback to 3 if no customerId yet

      const token = localStorage.getItem("token")?.replace(/"/g, "");
      try {
        const response = await axios.get(
          `https://localhost:8443/operations/translist?user_id=${encodeURIComponent(userId)}`,
          {
            headers: {
              Authorization: `Bearer ${token || "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbGlzYWJldGgiLCJpYXQiOjE3NDc4MjU3NDcsImV4cCI6MTc0NzkxMjE0N30.VA-OfEdwN0NxWYqVh9h1DbEnskurwWMqUK5yC9FZOtVKrdFtmHqsZ8MVPzHMGXNetNIElCIWgAD8JyQPvCWefQ"}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          setTransactions(response.data);
        } else {
          setError("Failed to fetch transactions");
          console.error("Failed to fetch transactions", response);
        }
      } catch (err) {
        setError("Error fetching transactions");
        console.error("Fetch error:", err.response?.data || err.message);
      }
    };

    fetchProfile();
    fetchTransactions();
  }, []); // Empty dependency: run once on mount

  useEffect(() => {
    if (formData.customerId) {
      // Fetch transactions after formData.customerId is loaded
      const fetchTransactions = async () => {
        const token = localStorage.getItem("token")?.replace(/"/g, "");
        try {
          const response = await axios.get(
            `https://localhost:8443/operations/translist?user_id=${encodeURIComponent(formData.customerId)}`,
            {
              headers: {
                Authorization: `Bearer ${token || "YOUR_FALLBACK_TOKEN_HERE"}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (response.status === 200) {
            setTransactions(response.data);
          } else {
            setError("Failed to fetch transactions");
            console.error("Failed to fetch transactions", response);
          }
        } catch (err) {
          setError("Error fetching transactions");
          console.error("Fetch error:", err.response?.data || err.message);
        }
      };

      fetchTransactions();
    }
  }, [formData.customerId]);

  return (
    <div className="dashboard-container flex min-h-screen bg-gray-50 text-gray-900">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      <div className="flex flex-col flex-1">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <main className="main-content p-6 flex-1 overflow-auto max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-3">
              Welcome, {userData.fullName || userData.name || "User"}
            </h1>
            <p>Balance: {userData.amount ? `$${userData.amount}` : "N/A"}</p>
            <p>
              Card Number: {userData.cardNumber || userData.cardnumber || "N/A"}
            </p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="stat-card p-4 bg-white rounded shadow">
              <h2 className="font-semibold mb-2">Total Savings</h2>
              <p>{statistics.savings || "$0"}</p>
            </div>
            <div className="stat-card p-4 bg-white rounded shadow">
              <h2 className="font-semibold mb-2">Credit Score</h2>
              <p>{statistics.creditScore || "N/A"}</p>
            </div>
            <div className="stat-card p-4 bg-white rounded shadow">
              <h2 className="font-semibold mb-2">Monthly Income</h2>
              <p>{statistics.monthlyIncome || "$0"}</p>
            </div>
            <div className="stat-card p-4 bg-white rounded shadow">
              <h2 className="font-semibold mb-2">Monthly Expenses</h2>
              <p>{statistics.monthlyExpenses || "$0"}</p>
            </div>
          </section>

          {error && <p className="text-red-600 font-semibold mb-6">{error}</p>}

          <section id="transactions" className="transactions mb-8">
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
                  transactions.map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-center">
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          size="lg"
                          color="#A3C600"
                        />
                      </td>
                      <td className="p-3">
                        {new Date(tx.transactionDate).toLocaleDateString()}
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

          <section className="mb-8">
            <BankCardsCarousel />
          </section>

          <section className="mb-8">
            <PieChart />
          </section>

          <section id="bank-offers" className="bank-offers mb-8">
            <h2 className="text-2xl font-bold mb-4">Bank Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.length === 0 ? (
                <p>No offers available</p>
              ) : (
                offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="offer-card p-4 bg-white rounded shadow"
                  >
                    <h3 className="font-semibold mb-2">{offer.title}</h3>
                    <p>{offer.description}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="mb-8">
            <CurrencyTable />
          </section>

          <section className="mb-8">
            <Promotions promotions={promotionsData} />
          </section>
        </main>

        {/* Uncomment if you want footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

// Uncomment if you want authentication wrapping
// export default withAuth(Home);

export default Home;
