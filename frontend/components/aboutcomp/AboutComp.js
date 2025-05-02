'use client';

// pages/about.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';


const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Welcome to Wealthnest</h1>
        <p>Your Trusted Partner for Financial Growth</p>
      </header>
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          At Wealthnest, we believe in empowering individuals and businesses to achieve their financial dreams. 
          Founded with a commitment to innovation and trust, we aim to provide seamless, secure, and user-friendly 
          banking solutions for everyone.
        </p>
      </section>
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To revolutionize the banking experience with cutting-edge technology, personalized services, 
          and a focus on financial well-being. We strive to be more than a bank — we’re a nest for your wealth.
        </p>
      </section>
      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>Secure and innovative digital banking solutions</li>
          <li>Personalized financial planning and advisory</li>
          <li>Quick and transparent loan services</li>
          <li>Investment options tailored to your goals</li>
        </ul>
      </section>
      <footer className="about-footer">
        <p>
          Join thousands of satisfied customers who trust Wealthnest to manage their finances and grow their wealth. 
          Experience the future of banking today.
        </p>
      </footer>
      <style jsx>{`
        .about-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .about-header {
          padding-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
        }
        h1 {
          color: #2c3e50;
          font-size: 2.5rem;
        }
        p {
          color: #7f8c8d;
          font-size: 1.1rem;
        }
        h2 {
          color: #34495e;
          margin-top: 20px;
        }
        ul {
          text-align: left;
          padding: 0;
          margin: 20px 0;
          list-style: none;
        }
        ul li {
          background: #ecf0f1;
          margin: 10px 0;
          padding: 10px;
          border-radius: 4px;
          color: #2c3e50;
        }
        .about-footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default About;

