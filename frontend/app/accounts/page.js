"use client";

import React from "react";
import Footer from "../../components/hedfot/FooterHome.js";
import Header from "../../components/hedfot/HeaderHome.js";
//import AccountManagement from "../../components/dashcomp/AccManag/AManag.js";
import "../../styles/Navigation.css";
import AccManag from "../../components/dashcomp/AccManag/AManag.js";
//import '../../styles/NavDash.css';

export default function Accounts() {
  return (
    <div className="AccountCont">
      <Header />
      <AccManag />
    </div>
  );
}
