"use client";

import React from "react";
import Home from "../../components/dashcomp/MainPage/ProfPage.js";
import "../../styles/global.css";
import "../../styles/NavDash.css";
import "../../styles/DashPage.css";

const ProfilePage = () => {
  return (
    <div>
      <div className="bg-blue textwhite p4 round">Tailwind works!</div>
      <Home />
    </div>
  );
};

export default ProfilePage;
