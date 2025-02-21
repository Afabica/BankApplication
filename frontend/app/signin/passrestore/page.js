"use client";

import React from "react";
import Footer from "../../../components/hedfot/FooterHome.js";
import Header from "../../../components/hedfot/HeaderHome.js";
import ForgotPassword from "../../../components/forgetpassword/ForgotPassword";
import "../../../styles/Navigation.css";

import "../../../styles/NavDash.css";
import "../../../styles/global.css";
//import "../../../styles/OTPSender.css";

export default function PassRestore() {
  return (
    <div className="w-screen h-screen justify-center bg-gray-100">
      <Header />
      <ForgotPassword />
      <Footer />
    </div>
  );
}
