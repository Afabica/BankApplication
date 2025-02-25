"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import PieChart from "./PieChart.js";
import Promotions from "./Promotions";
import dynamic from "next/dynamic";
import withAuth from "../../tools/withAuth";
import ProfileCards from "../Cards/ProfileCards";

const Footer = dynamic(() => import("../../hedfot/DashFooter"), { ssr: false });
const Header = dynamic(() => import("../../hedfot/DashHeader"), { ssr: false });
const SidePanel = dynamic(() => import("./SidePanel"), { ssr: false });
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), { ssr: false });

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

  // Toggle Side Panel
  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  // Fetch Profile Data from LocalStorage
  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      setFormData(JSON.parse(storedCustomer));
    }
  }, []); // Run once on mount

  // Fetch Transactions & Performance Tracking with Prometheus
  const fetchData = useCallback(async () => {
    if (!formData.id) return; // Prevent unnecessary API calls

    const start = performance.now(); // ⏱ Start performance timer

    try {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      if (!token) {
        setError("JWT Token is missing");
        router.push("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/operations/translist?userId=${encodeURIComponent(formData.id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTransactions(response.data);
      } else {
        setError("Fetching data failed");
      }

      setStatistics({
        savings: "$15,000",
        creditScore: "750",
        monthlyIncome: "$3,000",
        monthlyExpenses: "$2,200",
      });

    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Data fetching failed.");
    } finally {
      const duration = performance.now() - start; // ⏱ End performance timer
      axios.post("/api/metrics", {
        method: "GET",
        route: "/operations/translist",
        duration,
        status_code: 200,
      }).catch((err) => console.error("Metrics logging failed:", err)); // Log errors silently
    }
  }, [formData.id, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="dashboard-container">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>
      <div className="main-layout">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />
        <main className="main-content">
          <div>
            <p>{userData.name || "No Name"}</p>
            <p>{userData.amount || "No Amount"}</p>
            <p>{userData.cardnumber || "No Card Number"}</p>
          </div>
          <section className="account-statistics">
            <div className="stat-card">
              <h2>Total Savings</h2>
              <p>{statistics.savings}</p>
            </div>
            <div className="stat-card">
              <h2>Credit Score</h2>
              <p>{statistics.creditScore}</p>
            </div>
            <div className="stat-card">
              <h2>Monthly Income</h2>
              <p>{statistics.monthlyIncome}</p>
            </div>
            <div className="stat-card">
              <h2>Monthly Expenses</h2>
              <p>{statistics.monthlyExpenses}</p>
            </div>
          </section>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <section className="transactions">
            <h1>Recent Transactions</h1>
            <table>
              <thead>
                <tr>
                  <th>*</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="4">No transactions available</td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <FontAwesomeIcon icon={faShoppingCart} size="20px" color="#A3C600" />
                      </td>
                      <td>{transaction.transactionDate}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
          <section><ProfileCards /></section>
          <section className="pie_chart"><PieChart /></section>
          <section>
            <h2>Bank Offers</h2>
            <div className="offers">
              {offers.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section><Promotions promotions={promotionsData} /></section>
        </main>
      </div>
    </div>
  );
}

export default withAuth(Home);

