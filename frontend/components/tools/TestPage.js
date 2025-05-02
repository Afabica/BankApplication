"use client";

import React, { useState } from "react";
import axios from "axios";

const FetchDataPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError(""); // Reset error before fetching

    try {
      const response = await axios.get("http://localhost:8080/api/transactions", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYTEyMyIsImlhdCI6MTczODE1NDEyNiwiZXhwIjoxNzM4MjQwNTI2fQ.n7qZRAcUPKa6nW8yc_mmzkG7EzXdzbnkH-ro31Bm_L1nftlyZUi-u4SZQmuIefmpoxjrz0s4GDM_5wHKLNxoHQ`, // Replace with actual token
        },
      });

      setData(response.data.transactions); // Adjust based on API response structure
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Fetch Transactions</h1>

      <button
        onClick={fetchData}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {data && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Transactions:</h2>
          <ul className="mt-2">
            {data.map((transaction, index) => (
              <li key={index} className="border p-2 mt-2 rounded">
                <strong>Amount:</strong> {transaction.amount} <br />
                <strong>Type:</strong> {transaction.transaction_type} <br />
                <strong>Status:</strong> {transaction.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchDataPage;

