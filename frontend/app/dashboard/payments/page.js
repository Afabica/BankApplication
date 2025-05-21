"use client";

import React from "react";
import TransactionsPage from "../../../components/dashcomp/MainPage/AllTrans";
import PaymentsPage from "../../../components/dashcomp/MainPage/Payments";
import Header from "../../../components/hedfot/DashHeader";
import "../../../styles/NavDash.css";
import "../../../styles/DashPage.css";
import "../../../styles/global.css";

const Transaction = () => {
  return (
    <div>
      <PaymentsPage />
    </div>
  );
};

export default Transaction;
