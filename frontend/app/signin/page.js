'use client';

import SignInForm from "../../components/logincomp/MainPage";
import Footer from "../../components/hedfot/FooterHome";
import Header from "../../components/hedfot/HeaderHome.js";
import ThemeSwitcher from "../../scripts/theme.js";
import React from 'react';
import "../../styles/index.css";
import "../../styles/NavDash.css";
//import "../../styles/global.css";

const Home = () => {
  return (
    <div>
      <header>
        <Header />
        <ThemeSwitcher />
      </header>
      <SignInForm />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default  Home;
