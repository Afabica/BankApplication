"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../../hedfot/DashHeader";
import axios from "axios";

const SidePanel = dynamic(() => import("./SidePanel"), {
  ssr: false,
});

const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});

const PaymentsPage = () => {
  const [formData, setFormData] = useState({
    iban: "",
    destinationIban: "",
    amount: "",
    sourceCardNumber: "",
    destinationCardNumber: "",
    transactionType: "TRANSFER",
    description: "",
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [userIbans, setUserIbans] = useState([]);
  const [balance, setBalance] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchProfile = () => {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) {
        const parsedData = JSON.parse(storedCustomer);
        setUserData(parsedData);
      }
    };

    const fetchUserIbans = async () => {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      if (!token || !userData.id) {
        console.error("Missing token or user ID");
        return;
      }
      try {
        const res = await axios.get(
          `https://localhost:8443/profcards/getcards?user_id=${encodeURIComponent(userData.id)}`,
          {
            headers: {
              Authorization: `Beaarer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (!res.ok) throw new Error("Failed to fetch user cards");
        const data = await res.json();
        setUserIbans(data.cards || []);
        if (data.cards && data.cards.length > 0) {
          setFormData((prev) => ({ ...prev, iban: data.cards[0].iban }));
          setBalance(data.cards[0].balance);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfile();
    fetchUserIbans();
  }, [userData.id]);

  //  useEffect(() => {
  //    if (!formData.iban) return;
  //    const fetchBalance = async () => {
  //      try {
  //        const res = await fetch(
  //          `/api/account/balance?iban=${encodeURIComponent(formData.iban)}`,
  //        );
  //        if (!res.ok) throw new Error("Failed to fetch balance");
  //        const data = await res.json();
  //        setBalance(data.balance);
  //      } catch (err) {
  //        setError(err.message);
  //      }
  //    };
  //    fetchProfile();
  //    fetchBalance();
  //  }, [formData.iban]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    try {
      const res = await fetch("/api/transactions/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Transaction failed");
      }
      setResponse("Transaction processed successfully!");
      setBalance((prev) => prev - parseFloat(formData.amount));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      <div className="flex flex-1 flex-col">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <main className="flex flex-1 justify-center items-start p-8">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Account Overview
            </h2>

            {error && (
              <p className="mb-4 text-red-600 font-medium" role="alert">
                {error}
              </p>
            )}

            {balance !== null ? (
              <p className="mb-6 text-lg text-green-700">
                <strong>Current Balance for {formData.iban}:</strong> ${" "}
                {balance.toFixed(2)}
              </p>
            ) : (
              <p className="mb-6 text-gray-500">Loading balance...</p>
            )}

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Make a Payment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="iban"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Source IBAN (Your Account):
                </label>
                <select
                  id="iban"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {userIbans.map((card) => (
                    <option key={card.iban} value={card.iban}>
                      {card.iban} ({card.cardNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="destinationIban"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Destination IBAN:
                </label>
                <input
                  type="text"
                  id="destinationIban"
                  name="destinationIban"
                  value={formData.destinationIban}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  step="0.01"
                  min="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label
                  htmlFor="sourceCardNumber"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Source Card Number:
                </label>
                <input
                  type="text"
                  id="sourceCardNumber"
                  name="sourceCardNumber"
                  value={formData.sourceCardNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label
                  htmlFor="destinationCardNumber"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Destination Card Number:
                </label>
                <input
                  type="text"
                  id="destinationCardNumber"
                  name="destinationCardNumber"
                  value={formData.destinationCardNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Optional"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Process Payment
              </button>
            </form>

            {response && (
              <p className="mt-4 text-green-700 font-medium" role="alert">
                {response}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentsPage;
