"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../../hedfot/DashHeader";

const SidePanel = dynamic(() => import("./SidePanel"), { ssr: false });
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});

const PaymentsPage = () => {
  // Mocked initial user data
  const mockedUser = {
    accountId: "user123",
    ibans: [
      "SK9764782389123467348912",
      "SK3333333333333333333333",
      "SK1234567890123456789012",
      "SK9845677834128934902390",
    ],
  };

  // Mocked initial balance by IBAN
  const initialBalances = {
    SK9764782389123467348912: 2500.0,
    SK3333333333333333333333: 5200.55,
    SK1234567890123456789012: 1350.25,
    SK9845677834128934902390: 789.9,
  };

  const [parsedData] = useState(mockedUser);
  const [balance, setBalance] = useState(
    initialBalances[mockedUser.ibans[0]] || 0
  );

  const [formData, setFormData] = useState({
    iban: mockedUser.ibans[0],
    destinationIban: "",
    amount: "",
    sourceCardNumber: "",
    destinationCardNumber: "",
    transactionType: "TRANSFER",
    description: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Update balance when user selects a different IBAN
  useEffect(() => {
    if (formData.iban) {
      setBalance(initialBalances[formData.iban] ?? 0);
    }
  }, [formData.iban]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResponse(null);
    setError(null);
  };

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    const amountNum = parseFloat(formData.amount);

    if (!formData.iban) {
      setError("Please select a source IBAN.");
      return;
    }
    if (!formData.destinationIban) {
      setError("Please enter a destination IBAN.");
      return;
    }
    if (!amountNum || amountNum <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }
    if (amountNum > balance) {
      setError("Insufficient balance.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      // Update balance locally
      setBalance((prev) => prev - amountNum);

      // Clear amount and other optional fields, keep IBAN selected
      setFormData((prev) => ({
        ...prev,
        amount: "",
        destinationIban: "",
        sourceCardNumber: "",
        destinationCardNumber: "",
        description: "",
      }));

      setResponse("🎉 Transaction processed successfully!");
      setIsSubmitting(false);
    }, 1000);
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
              Balance for{" "}
              <span className="font-mono">{formData.iban}</span>:{" "}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {parsedData.ibans.map((iban) => (
                    <option key={iban} value={iban}>
                      {iban}
                    </option>
                  ))}
                </select>
              </div>

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
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${
                  isSubmitting
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

