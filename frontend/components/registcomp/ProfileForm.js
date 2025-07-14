"use client";

import React, { useState } from "react";
import axios from "axios";
import { fetchCustomerInfo, fetchToken } from "../tools/ApiCall";

export default function CreateProfile() {
  const API = "https://localhost:8443";
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [parsedData, setParsedData] = useState("");
  const [formData, setFormData] = useState({
    account_id: "",
    full_name: "",
    dob: "",
    address: "",
    mobile: "",
    pass_number: "",
    gender: false,
    identification_details: "",
    account_type: "",
    employer: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const tokenValue = fetchToken();
      const profileInfo = fetchCustomerInfo();

      setToken(tokenValue);
      setParsedData(profileInfo);

      const response = await axios.post(
        `${API}/profile?accountId=${profileInfo.accountId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Profile created successfully.");
      } else {
        setError("Unexpected response. Profile not created.");
      }
    } catch (err) {
      console.error(err);
      setError("Error creating profile. Please check console or try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="text-2xl space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Profile Creation
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 px-3 py-2 rounded text-sm">
            {error}
          </p>
        )}

        <input
          type="text"
          name="full_name"
          placeholder="Full Name *"
          value={formData.full_name}
          onChange={handleChange}
          required
          className="input"
          require
        />

        <input
          type="date"
          name="dob"
          placeholder="Date of Birth *"
          value={formData.dob}
          onChange={handleChange}
          required
          className="input"
          require
        />

        <textarea
          name="address"
          placeholder="Address *"
          value={formData.address}
          onChange={handleChange}
          required
          className="input"
          require
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile *"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="input"
          require
        />

        <input
          type="text"
          name="pass_number"
          placeholder="Passport Number"
          value={formData.pass_number}
          onChange={handleChange}
          className="input"
          require
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="gender"
            checked={formData.gender}
            onChange={handleChange}
            require
          />
          <span>Gender: Male (checked = true)</span>
        </label>

        <textarea
          name="identification_details"
          placeholder="Identification Details"
          value={formData.identification_details}
          onChange={handleChange}
          className="input"
          require
        />

        <input
          type="text"
          name="account_type"
          placeholder="Account Type *"
          value={formData.account_type}
          onChange={handleChange}
          required
          className="input"
          require
        />

        <input
          type="text"
          name="employer"
          placeholder="Employer"
          value={formData.employer}
          onChange={handleChange}
          className="input"
          require
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}
