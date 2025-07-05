"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Header from "../../hedfot/DashHeader";
import "../../../styles/DashPage.css";

const SidePanel = dynamic(() => import("./SidePanel"), { ssr: false });
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});

const PaymentsPage = () => {
  // State for user IBANs fetched from backend
  const [ibans, setIbans] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loadingIbans, setLoadingIbans] = useState(true); // loading flag for fetching ibans

  // Form state
  const [formData, setFormData] = useState([]);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Fetch IBANs on mount using userId from localStorage
  useEffect(() => {
    const userId = localStorage.getItem("customer");
    if (!userId) {
      setError("User not logged in");
      setLoadingIbans(false);
      return;
    }

    async function fetchIbans() {
      try {
        setLoadingIbans(true);
        // Replace with your actual backend API endpoint to fetch IBANs by userId
        const res = await axios.get(`/api/users/${userId}/ibans`);

        if (res.data.ibans && res.data.ibans.length > 0) {
          setIbans(res.data.ibans);
          setFormData((prev) => ({
            ...prev,
            iban: res.data.ibans[0], // default selected IBAN
          }));

          // Fetch initial balance for the first IBAN
          const balanceRes = await axios.get(
            `/api/accounts/${res.data.ibans[0]}/balance`,
          );
          setBalance(balanceRes.data.balance ?? 0);
        } else {
          setError("No IBANs found for this user.");
        }
      } catch (err) {
        setError("Failed to fetch IBANs. Please try again later.");
      } finally {
        setLoadingIbans(false);
      }
    }

    fetchIbans();
  }, []);

  // When user selects a different IBAN, fetch and update balance
  useEffect(() => {
    async function fetchBalance() {
      if (!formData.iban) return;

      try {
        const res = await axios.get(`/api/accounts/${formData.iban}/balance`);
        setBalance(res.data.balance ?? 0);
      } catch {
        setBalance(0);
      }
    }

    fetchBalance();
  }, [formData.iban]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
    setResponse(null);
  };

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    const amountNum = parseFloat(formData.amount);

    if (!formData.iban) return setError("Please select a source IBAN.");
    if (!formData.destinationIban)
      return setError("Please enter a destination IBAN.");
    if (!amountNum || amountNum <= 0)
      return setError("Please enter a valid amount greater than zero.");
    if (amountNum > balance) return setError("Insufficient balance.");

    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/payments", {
        sourceIban: formData.iban,
        destinationIban: formData.destinationIban,
        amount: amountNum,
        sourceCardNumber: formData.sourceCardNumber,
        destinationCardNumber: formData.destinationCardNumber,
        transactionType: formData.transactionType,
        description: formData.description,
      });

      if (res.data.updatedBalance !== undefined) {
        setBalance(res.data.updatedBalance);
      }

      setResponse(res.data.message || "🎉 Transaction processed successfully!");

      setFormData((prev) => ({
        ...prev,
        amount: "",
        destinationIban: "",
        sourceCardNumber: "",
        destinationCardNumber: "",
        description: "",
      }));
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Something went wrong processing your transaction.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      <div className="flex flex-1 flex-col">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <main className="flex flex-1 justify-center items-start p-10">
          <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-xl">
            <h1 className="text-3xl font-extrabold mb-8 text-blue-700">
              Payment Portal
            </h1>

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg font-semibold">
                {error}
              </div>
            )}

            {response && (
              <div className="mb-6 p-5 bg-green-100 text-green-800 rounded-lg font-semibold flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{response}</span>
              </div>
            )}

            <p className="mb-6 text-gray-700 font-semibold">
              Balance for <span className="font-mono">{formData.iban}</span>:{" "}
              <span className="text-green-600">${balance.toFixed(2)}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="iban"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Source IBAN (Your Account)
                </label>
                <select
                  id="iban"
                  name="iban"
                  value={formData.iban}
                  onChange={handleChange}
                  required
                  disabled={loadingIbans}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ibans.map((iban) => (
                    <option key={iban} value={iban}>
                      {iban}
                    </option>
                  ))}
                </select>
              </div>

              {/* rest of form fields unchanged */}

              <div>
                <label
                  htmlFor="destinationIban"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Destination IBAN
                </label>
                <input
                  type="text"
                  id="destinationIban"
                  name="destinationIban"
                  value={formData.destinationIban}
                  onChange={handleChange}
                  placeholder="Enter destination IBAN"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  step="0.01"
                  min="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="sourceCardNumber"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Source Card Number (Optional)
                </label>
                <input
                  type="text"
                  id="sourceCardNumber"
                  name="sourceCardNumber"
                  value={formData.sourceCardNumber}
                  onChange={handleChange}
                  placeholder="•••• •••• •••• ••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="destinationCardNumber"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Destination Card Number (Optional)
                </label>
                <input
                  type="text"
                  id="destinationCardNumber"
                  name="destinationCardNumber"
                  value={formData.destinationCardNumber}
                  onChange={handleChange}
                  placeholder="•••• •••• •••• ••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add a note or description"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loadingIbans}
                className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${
                  isSubmitting || loadingIbans
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Processing..." : "Process Payment"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentsPage;
