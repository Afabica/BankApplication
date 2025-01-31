"use client";

import React, { useState, useEffect } from "react";
import { parseCookies } from 'nookies';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SidePanel from "./SidePanel.js";
import PanelElements from "../../hedfot/PanelElements.js";
import Header from "../../hedfot/DashHeader.js";
import PieChart from "./PieChart.js";
import withAuth from "../../tools/withAuth.js";


function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [balance, setBalance] = useState('$5,000');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [userData, setUserData] = useState([]);
  const [offers, setOffers] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [cards, setCards] = useState([]);
  const [profile, setProfile] = useState([]);


  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  }; 

  useEffect(() => {

      const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const transactions = JSON.parse(localStorage.getItem("transactions"));
        if(user && transactions) {
                setTransactions(transactions);
                setUserData(user);
            } else {
                window.location.href = "/signin";
            }
      }
//    setTransactions([
//      { id: 1, description: 'Transfer to John', amount: '-$100', date: '2024-12-20' },
//      { id: 2, description: 'Deposit', amount: '$500', date: '2024-12-19' },
//      { id: 3, description: 'Withdrawal', amount: '-$200', date: '2024-12-18' },
//      { id: 4, description: 'Withdrawl', amount: '$200', date: '2024-12-18'},
//     {id: 5, desciption: 'Deposit', amount: '$600', date: '2024-12-31'}
//    ]);
//     
//    setUserData([
//            {name: 'John Doe', amount: '$300,34', cardnumber: 'SK3689128978781267561267'}
//        ])
//
//    setStatistics({
//      savings: '$15,000',
//      creditScore: '750',
//      monthlyIncome: '$3,000',
//      monthlyExpenses: '$2,200',
//    });
//
//    setOffers([
//      { id: 1, title: 'Zero Interest Loan', description: 'Get a personal loan with zero interest for the first 6 months.' },
//      { id: 2, title: 'Premium Credit Card', description: 'Exclusive credit card with cashback and rewards points.' },
//    ]);
  }, []);


  return (
    <div className="dashboard-container">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements/>
            </SidePanel>
      <div className="main-layout">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />
        <main className="main-content">
          <div >
            <p>{userData.name}</p> 
            <p>{userData.amount}</p>
            <p>{userData.cardnumber}</p>
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

          <section id="transactions" className="transactions">
            <h2>Recent Transactions</h2>
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
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
<td><FontAwesomeIcon icon={faShoppingCart} size="20px" color="#A3C600"/></td>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="pie-chart">
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
        </main>
      </div>
    </div>
  );
}

export default withAuth(Home);

