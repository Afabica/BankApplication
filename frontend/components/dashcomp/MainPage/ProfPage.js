"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import PieChart from "./PieChart.js";
import Promotions from "./Promotions";
import dynamic from "next/dynamic";
import withAuth from "../../tools/withAuth";
import ApiHeader from "../../tools/api";
import { parseCookies } from "nookies";
import ProfileCards from "../Cards/ProfileCards";

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

  //  const httpRequestDurationMicroseconds = new promClient.Histogram({
  //    name: "http_request_duration_ms",
  //    help: "Duration of HTTP request in ms",
  //    labelNames: ["method", "route", "status_code"],
  //    buckets: [50, 100, 200, 500, 1000, 2000],
  //  });

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchProfile = () => {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) {
        setFormData(JSON.parse(storedCustomer));
      }
    };

    const fetchData = async () => {
      try {
        // ✅ Get JWT token from localStorage
        const token = localStorage.getItem("token")?.replace(/"/g, ""); // Remove quotes if stored as string
        console.log(token);

        if (!token) {
          setError("JWT Token is missing");
          router.push("/login");
          return;
        }

        // ✅ Fetch transactions with token in Authorization header
        const response = await axios.get(
          `http://localhost:8080/operations/translist?userId=${encodeURIComponent(formData.id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setTransactions(response.data);
          console.log("Data fetched successfully.");
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
      }
    };

    const fetchUserCards = async () => {
      const response = await axios.get("http://localhost:8080/api");
    };

    fetchProfile();
    if (formData.id) {
      fetchData();
    }
  }, [formData.id]); // ✅ Runs only when formData.id is available

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
          <section id="account-statistics" className="account-statistics">
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
          <section id="transactions" className="transactions">
            <div className="title">
              <h1>Recent Transactions</h1>
            </div>
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
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          size="20px"
                          color="#A3C600"
                        />
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
          <section>
            <ProfileCards />
          </section>
          <section className="pie_chart">
            <PieChart />
          </section>
          <section id="bank-offers" className="bank-offers">
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
          <section>
            <Promotions promotions={promotionsData} />
          </section>
        </main>
      </div>
    </div>
  );
}

// ✅ Export the component wrapped with `withAuth`
export default withAuth(Home);
