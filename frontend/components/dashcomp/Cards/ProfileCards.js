"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { FaCreditCard, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

export default function ProfileCards({ customerId }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const cookies = parseCookies();
        const token = cookies.jwt;
        setLoading(true);

        const response = await axios.get(`http://localhost:8080/profcards/${customerId}/cards`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setCards(response.data);
        } else {
          console.error("❌ Failed to fetch profile cards");
        }
      } catch (error) {
        console.error("❌ Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, [customerId]);

  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💳 Your Bank Cards</h1>

      {loading ? (
        <p className="text-lg text-gray-600">Loading cards...</p>
      ) : (
        <div className="flex space-x-4 overflow-x-scroll p-4 scrollbar-hide w-full max-w-3xl">
          {cards.map((card) => (
            <div
              key={card.cardId}
              className="w-72 h-40 flex-shrink-0 rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative transform hover:scale-105 transition-all"
            >
              <FaCreditCard className="absolute top-4 right-4 text-2xl text-gray-200" />
              <p className="text-lg font-semibold">{card.cardType} Card</p>
              <p className="text-sm mt-2 opacity-80">**** **** **** {card.maskedCardNumber.slice(-4)}</p>
              <p className="text-sm mt-2">Exp: {card.expirationDate}</p>
              <p className="text-sm flex items-center mt-2">
                {card.status === "Active" ? (
                  <FaRegCheckCircle className="text-green-400 mr-2" />
                ) : (
                  <FaRegTimesCircle className="text-red-400 mr-2" />
                )}
                {card.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

