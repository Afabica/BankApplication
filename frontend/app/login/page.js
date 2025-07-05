"use client";

import SignInForm from "../../components/logincomp/MainPage";
import Footer from "../../components/hedfot/FooterHome";
import Header from "../../components/hedfot/HeaderHome.js";
import React from "react";

const Home = () => {
  return (
    <div>
      <Header />
      <SignInForm />
      <Footer />
    </div>
  );
};

export default Home;
