"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { FontAwesome } from "@fortawesome/react-fontawesome";
import withAuth from "../../tools/withAuth.js";

const PaymentForm = ({ onSubmit }) => {
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");
  const [existence, setExistence] = useState(false);
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    description: "",
    iban: "",
    destinationIban: "",
    sourceCardNumber: "",
    destinationCardNumber: "",
  });

  useEffect(() => {
    const checkExistence = async () => {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      try {
        const response = await axios.get(
          "https://localhost:8443/operations/",
          {
            formData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            httpsAgent: new https.Agent({
              rejectUnauthorized: false,
            }),
            withCredentials: true,
          },
        );

        if (response.status === 200) {
          setExistence(true);
        } else {
          setError("Error fetching transactions");
          console.error("Fetch error:", err.response?.data || err.message);
        }
      } catch (err) {
        setError("Error fetching transactions", response);
        console.error("Fetch error:", err.response?.data || err.message);
      }
    };
    checkExistence();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { recipient, amount } = formData;

    if (!recipient || !amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please provide a valid recipient and a positive amount.");
      return;
    }

    onSubmit({ recipient, amount });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const executeTransaction = async () => {
    const cookies = parseCookies();
    const token = cookies.jwt;

    const response = await axios.post("http://localhost:8080/ ", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      const fetcheddata = response.json();
      console.log(fetcheddata);
    } else {
      console.log("Failed during executing transaction");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Source IBAN</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.recipient}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter recipient name or account"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Transaction type</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.amount}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.description}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">IBAN</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.iban}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter IBAN"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Destination IBAN</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.iban}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter destination IBAN"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Source card number</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.sourceCardNumber}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter source card number"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Destination card number
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.sourceCardNumber}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter destication card number"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Submit Payment
      </button>
    </form>
  );
};

export default PaymentForm;
