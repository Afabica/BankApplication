"use client";

import React, { useState } from "react";
import axios from "axios"; 
import { evaluatePassword } from "../../components/tools/Password.js"; 
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../../components/hedfot/HeaderHome"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../components/hedfot/FooterHome"), {
  ssr: false,
});


const API_URL = "http://localhost:8080/api";

const RegistrationPage = ({ onFlip }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: "",
    mobile: "",
    email: "",
    id: "",
    accountType: "checking",
    username: "",
    password: "",
    employer: "",
    verificationCode: "",
  });
  const [color, setColor] = useState('gray');
  const [feedback, setFeedback] = useState('');
  const [strength, setStrength] = useState('');
  const [error, setError] = useState(""); 

  const handleChange = async (e) => {
    const { name, value } = e.target; // ✅ Correct destructuring
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // ✅ Correct field update
    }));

    // ✅ Handle password strength check correctly
    if (name === "password") {
      const { strength, feedback, color } = await evaluatePassword(value);
      setStrength(strength);
      setFeedback(feedback);
      setColor(color);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/register`, formData); 
      console.log("Registration successful:", response.data);
    } catch (err) {
      console.error("Registration failed", err);
      setError("Registration failed. Please check the details and try again.");
    }
  };

  return (
    <div className="RegistrationCont" style={{backgroundImage: 'url(/images/home1.jpg)'}}>
      <section className="regist-section">
        <form onSubmit={handleSubmit} className="RegistForm">
          <h2 className="registheader">Registration</h2>
          {error && <p style={{ color: "red" }}>{error}</p>} 
          <div className="forminput">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Identification Details"
              required
            />
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="business">Business</option>
            </select>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <div>
              <p style={{ color }}>Strength: <strong>{feedback}</strong></p>
            </div>
            <input
              type="text"
              name="employer"
              value={formData.employer}
              onChange={handleChange}
              placeholder="Employer Name"
            />
            <input
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              placeholder="Verification Code"
              required
            />
            <button type="submit" className="registButton">Register</button>
          </div>
          <a href="/signin" className="flip-link" onClick={onFlip}>
            Already have an account? Login.
          </a>
        </form>
      </section>
    </div>
  );
};

export default RegistrationPage;

