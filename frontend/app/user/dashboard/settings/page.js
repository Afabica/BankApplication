"use client";

import React from "react";
import SidePanel from "../../../components/dashcomp/MainPage/SidePanel.js";
import SecuritySettings from "../../../components/dashcomp/SecuritySet/Settings.js";
import "../../../styles/DashPage.css";

const Home = () => {
  return (
    <div>
      <SecuritySettings />
    </div>
  );
};

export default Home;
