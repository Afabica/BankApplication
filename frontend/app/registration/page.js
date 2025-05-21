"use client";

import React from "react";
import RegistrationPage from "../../components/registcomp/RegistForm";
import "../../styles/Registration.css";
import Header from "../../components/hedfot/HeaderHome";
import Footer from "../../components/hedfot/FooterHome";
import "../../styles/Registration.css";
import "../../styles/homepage.css";
import "../../styles/Navigation.css";

export default function RegistPage() {
  return (
    <div>
      <Header />
      <RegistrationPage />
    </div>
  );
}
