"use client";

import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import Footer from "../hedfot/FooterHome";
import Header from "../hedfot/HeaderHome";
import { evaluatePassword } from "../../components/tools/Password.js"; 

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
  const [error, setError] = useState(""); // State to track errors

  const handleChange = async (e) => {
    const { name, value } = e.target; // Correctly destructure from event target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field
    }));
    const { strength, feedback, color } = await evaluatePassword(formData.password);
    setStrength(strength);
    setFeedback(feedback);
    setColor(color);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/register`, formData); // Correct axios.post usage
      console.log("Registration successful:", response.data);
    } catch (err) {
      console.error("Registration failed", err);
      setError("Registration failed. Please check the details and try again.");
    }
  };

  return (
    <div className="RegistrationCont" style={{backgroundImage: 'url(/images/home1.jpg)'}}>
      <header>
        <Header />
      </header>
      <section className="regist-section">
        <form onSubmit={handleSubmit} className="RegistForm">
          <h2 className="registheader">Registration</h2>
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
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
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RegistrationPage;

