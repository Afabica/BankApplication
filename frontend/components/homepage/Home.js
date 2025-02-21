'use client';

import Link from 'next/link';
import React from 'react';
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../hedfot/HeaderHome"), {
  ssr: false,
});
const Footer = dynamic(() => import("../hedfot/FooterHome"), {
  ssr: false,
});
const HomeSlider = dynamic(() => import("../animation/HomeSlider"), {
  ssr: false,
});
const FAQSection = dynamic(() => import("../homepage/FAQ"), {
  ssr: false,
});

const HomePage = () => {


  return (
    <div className="home-container">
      <header>
         <Header /> 
      </header>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to BankApp</h1>
          <p className="hero-description">
            Secure, easy-to-use banking at your fingertips. Manage your accounts, investments, and more in one place.
          </p>
        </div>
      </section>

      <section className="wrapper_slider">
      <HomeSlider/>
      </section>


      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose BankApp?</h2>
        <div className="features-container">
          <div className="feature-item">
            <h3 className="feature-title">Secure Transactions</h3>
            <p className="feature-description">
              We use the latest encryption and security protocols to ensure your financial data is safe.
            </p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">Easy Account Management</h3>
            <p className="feature-description">
              Access and manage your bank accounts, transactions, and more from a user-friendly dashboard.
            </p>
          </div>
          <div className="feature-item">
            <h3 className="feature-title">24/7 Customer Support</h3>
            <p className="feature-description">
              Our dedicated customer support team is available 24/7 to assist you with any issues or questions.
            </p>
          </div>
        </div>
      </section>

      <section>
        <FAQSection/>
      </section>


      {/* Footer Section */}
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;

