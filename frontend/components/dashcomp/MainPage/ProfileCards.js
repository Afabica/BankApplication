"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SendMoneyQuickAction from "./SendMoneyQuickAction";
import fetchProfile from "../../tools/ApiCall";
import axios from "axios";

const gradients = [
  "from-pink-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-blue-500 to-indigo-500",
  "from-yellow-500 to-orange-500",
  "from-purple-500 to-fuchsia-500",
];

export default function VerticalBankCarousel() {
  const API = "https://localhost:8443";
  const [userDetails, setUserDetails] = useState("");
  const [error, setError] = useState("");
  const [cards, setCards] = useState([
    {
      id: "",
      bank: "",
      cardNumber: "",
    },
  ]);

  useEffect(() => {
    const customer = fetchProfile();
    if (customer) {
      setUserDetails(customer);
    } else {
      return;
    }
  }, []);

  const nextCard = () => {
    if (cards.length === 0) return;
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const requestNewCard = async () => {
    if (!userDetails?.accountId) return;
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (!token) {
      setError("Authentication token missing.");
      return;
    }

    const response = await axios.post(
      `https://localhost:8443/profcards/newcard`,
      {
        accountId: userDetails.accountId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      console.log("Request sended successfully");
    } else {
      console.error("Request failed");
    }
  };

  //  const addCard = () => {
  //    const newCard = {
  //      id: Date.now(),
  //      bank: `Bank ${String.fromCharCode(65 + (cards.length % 26))}`,
  //      cardNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
  //      balance: `$${(Math.random() * 10000).toFixed(2)}`,
  //    };
  //    setCards((prev) => [...prev, newCard]);
  //  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Bank Card Carousel
      </h1>

      <div className="relative w-[360px] h-[280px]">
        <AnimatePresence>
          {cards.slice(0, 5).map((card, index) => {
            const angle = index * 3 - 6; // fanned rotation
            const yOffset = index * 12;
            const scale = 1 - index * 0.03;
            const gradient = gradients[card.id % gradients.length];

            return (
              <motion.div
                key={card.id}
                initial={{ y: -100, opacity: 0, rotate: angle }}
                animate={{ y: yOffset, scale, rotate: angle, opacity: 1 }}
                exit={{ y: 200, opacity: 0, rotate: angle + 10 }}
                transition={{ duration: 0.6, type: "spring" }}
                style={{ zIndex: cards.length - index }}
                className={`absolute w-full h-[180px] bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-xl cursor-pointer`}
                onClick={() => deleteCard(card.id)}
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">{card.bank}</h2>
                  <div className="w-10 h-6 bg-white bg-opacity-20 rounded-sm"></div>
                </div>
                <p className="mt-4 tracking-widest">{card.cardNumber}</p>
                <div className="mt-auto pt-4 text-2xl font-bold">
                  {card.balance}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        onClick={nextCard}
        className="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg"
      >
        <ArrowDown className="w-6 h-6" />
      </button>

      <button
        onClick={requestNewCard}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow"
      >
        Add New Card
      </button>
      <SendMoneyQuickAction />

      {cards.length === 0 && (
        <p className="mt-4 text-gray-500">No cards available</p>
      )}
    </div>
  );
}
