"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import {FontAwesome } from "@fortawesome/react-fontawesome";
import withAuth from '../../tools/withAuth.js';

const PaymentForm = ({ onSubmit }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!recipient || !amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please provide valid recipient and amount.');
      return;
    }
    setError('');
    onSubmit({ recipient, amount });
  };



  const executeTransaction = async () => {
        const cookies = parseCookies();
        const token = cookies.jwt;

        const response = await axios.post('http://localhost:8080/ ', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if(response.status == 200) {
            const fetcheddata = response.json();
            console.log(fetcheddata);
        } else {
            console.log('Failed during executing transaction');
        }
    }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Recipient</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient name or account"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
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

