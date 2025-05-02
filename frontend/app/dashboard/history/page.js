"use client";

import React from "react";
import "../../../styles/NavDash.css";
//import "../../../styles/Navigation.css";
import Transactions from "../../../components/dashcomp/MainPage/AllTrans";
import "../../../styles/global.css";
import "../../../styles/AllTrans.css";
import "../../../styles/DashPage.css";

//import "../../../styles/Navigation.css";
const PaymentsPage = () => {
  return (
    <div>
      <Transactions />
    </div>
  );
};

export default PaymentsPage;
