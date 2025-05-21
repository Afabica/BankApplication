"use client";

import React from "react";
import dynamic from "next/dynamic";



export default function AccountTypes() {
  const accountTypes = [
    {
      name: "Savings Account",
      description:
        "A savings account is a deposit account that earns interest over time. It's ideal for individuals who want to save money securely while earning some returns.",
      features: [
        "Earns interest monthly",
        "Easy access to funds",
        "Low minimum balance requirements",
      ],
    },
    {
      name: "Checking Account",
      description:
        "A checking account is designed for daily transactions such as deposits, withdrawals, and bill payments. It usually comes with a debit card and check-writing capabilities.",
      features: [
        "Unlimited transactions",
        "Access to debit card",
        "Overdraft protection options",
      ],
    },
    {
      name: "Business Account",
      description:
        "Business accounts are tailored for business owners to manage company finances separately from personal funds, with features to support business operations.",
      features: [
        "Multiple user access",
        "Higher transaction limits",
        "Integration with accounting software",
      ],
    },
    {
      name: "Fixed Deposit Account",
      description:
        "A fixed deposit account locks your money for a fixed tenure with a higher interest rate, ideal for long-term savings.",
      features: [
        "Higher interest rates",
        "Fixed tenure period",
        "Penalty for early withdrawal",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Bank Account Types
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Explore the different types of accounts we offer and find the one that
        fits your needs.
      </p>

      <div className="space-y-8">
        {accountTypes.map((account) => (
          <div
            key={account.name}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{account.name}</h2>
            <p className="text-gray-700 mb-4">{account.description}</p>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {account.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
