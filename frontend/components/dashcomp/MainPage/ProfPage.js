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
import BankCardsCarousel from "../Cards/ProfileCards.js";
import CurrencyTable from "../Currency/CurrencyTable.js";

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
  const expirationDate = new Date("2025-07-28");

  //  const httpRequestDurationMicroseconds = new promClient.Histogram({
  //    name: "http_request_duration_ms",
  //    help: "Duration of HTTP request in ms",
  //
  //    labelNames: ["method", "route", "status_code"],
  //    buckets: [50, 100, 200, 500, 1000, 2000],
  //  });

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const promotions = [
    {
      id: 1,
      title: "0% Interest on Credit Card for 6 Months!",
      description:
        "Apply for our premium credit card today and enjoy 0% interest for the first 6 months.",
      validUntil: "2025-06-30",
      imageUrl: "/images/promotion-credit-card.jpg",
      link: "/apply-credit-card",
    },
    {
      id: 2,
      title: "Get $200 Cash Bonus on New Checking Account",
      description:
        "Open a new checking account with a direct deposit and receive a $200 bonus!",
      validUntil: "2025-07-15",
      imageUrl: "/images/promotion-checking-account.jpg",
      link: "/open-account",
    },
    {
      id: 3,
      title: "Exclusive Mortgage Rates – Limited Time Offer!",
      description:
        "Secure your dream home with our lowest-ever mortgage rates. Apply today!",
      validUntil: "2025-08-01",
      imageUrl: "/images/promotion-mortgage.jpg",
      link: "/mortgage-offers",
    },
    {
      id: 4,
      title: "Refer a Friend & Earn $100",
      description:
        "Invite your friends to join our bank, and earn $100 for each successful referral.",
      validUntil: "2025-12-31",
      imageUrl: "/images/promotion-referral.jpg",
      link: "/refer-friend",
    },
    {
      id: 5,
      title: "Travel Rewards Credit Card – Earn 3x Points",
      description:
        "Earn triple rewards on travel and dining when you use our Travel Rewards Credit Card.",
      validUntil: "2025-09-30",
      imageUrl: "/images/promotion-travel-rewards.jpg",
      link: "/travel-card",
    },
    {
      id: 6,
      title: "Auto Loan Special – 1.9% APR",
      description:
        "Get behind the wheel with our low-rate auto loans starting at just 1.9% APR.",
      validUntil: "2025-10-15",
      imageUrl: "/images/promotion-auto-loan.jpg",
      link: "/auto-loans",
    },
    {
      id: 7,
      title: "Double Cashback on Online Purchases!",
      description:
        "Use your bank debit or credit card for online shopping and earn double cashback.",
      validUntil: "2025-07-31",
      imageUrl: "/images/promotion-cashback.jpg",
      link: "/cashback-offer",
    },
    {
      id: 8,
      title: "Small Business Loan – Fast Approval",
      description:
        "Expand your business with our quick-approval small business loans at competitive rates.",
      validUntil: "2025-11-30",
      imageUrl: "/images/promotion-business-loan.jpg",
      link: "/business-loans",
    },
    {
      id: 9,
      title: "Student Savings Account – Get a $50 Bonus!",
      description:
        "Open a student savings account and receive a $50 bonus for free!",
      validUntil: "2025-08-20",
      imageUrl: "/images/promotion-student.jpg",
      link: "/student-account",
    },
    {
      id: 10,
      title: "Personal Loan – No Processing Fees!",
      description:
        "Apply for a personal loan now with zero processing fees and instant approval.",
      validUntil: "2025-09-10",
      imageUrl: "/images/promotion-personal-loan.jpg",
      link: "/personal-loan",
    },
  ];

  useEffect(() => {
    const fetchProfile = () => {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) {
        setFormData(JSON.parse(storedCustomer));
      }
    };

    const fetchData = async () => {
      const token = localStorage.getItem("token")?.replace(/"/g, ""); // Remove quotes if stored as string
      console.log(token);
      try {
        if (!token) {
          console.error("JWT Token is missing");
          return;
        }

        if (!formData.id) {
          console.error("User ID is missing");
          return;
        }

        //        const response = await axios.get(
        //          `http://localhost:8080/operations/translist?userId=7`,
        //          {
        //            headers: {
        //              Authorization: `Bearer ${token}`,
        //              "Content-Type": "application/json",
        //            },
        //          },
        //        );
        const response = await axios.get(
          `https://backend-service:8443/operations/translist?userId=${encodeURIComponent(formData.id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          console.log("Data fetched successfully:", response.data);
          setTransactions(response.data);
        } else {
          console.error("Fetching data failed", response);
        }
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response?.data || err.message,
        );
      }
    };

    const fetchUserCards = async () => {
      const response = await axios.get("http://localhost:8080/api");
    };

    fetchProfile();
    if (formData.id) {
      console.log(formData.id);
      fetchData();
    }
    setPromotionsData(promotions);
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
            <BankCardsCarousel />
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
            <CurrencyTable />
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
//export default withAuth(Home);
export default Home;
