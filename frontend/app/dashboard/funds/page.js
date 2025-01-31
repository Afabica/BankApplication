'use client';

import Link from 'next/link';
import React from 'react';
//import './home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="NavCont">
        <nav className="navbar">
          <ul className="navbar-left">
            <li>
              <Link href="/">Home Page</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/accounts">Accounts and Payments</Link>
            </li>
            <li>
              <Link href="/saving">Savings, Investments, and Pensions</Link>
            </li>
          </ul>
          <ul className="navbar-right">
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
            <li>
              <Link href="/registration">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div> 

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <nav>
            <ul className="footer-nav">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </nav>
          <p className="footer-text">© 2024 BankApp, All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
