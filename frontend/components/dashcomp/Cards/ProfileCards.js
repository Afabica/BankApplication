//"use client";
//import React, { useState } from "react";
//import { motion } from "framer-motion";
//import { Trash } from "lucide-react";
//
//export default function BankCards() {
//  const [cards, setCards] = useState([
//    {
//      id: 1,
//      bank: "Bank A",
//      cardNumber: "**** **** **** 1234",
//      balance: "$5,000",
//    },
//    {
//      id: 2,
//      bank: "Bank B",
//      cardNumber: "**** **** **** 5678",
//      balance: "$8,200",
//    },
//    {
//      id: 3,
//      bank: "Bank C",
//      cardNumber: "**** **** **** 9012",
//      balance: "$3,400",
//    },
//  ]);
//
//  const addCard = () => {
//    const newCard = {
//      id: Date.now(),
//      bank: `Bank ${String.fromCharCode(65 + (cards.length % 26))}`,
//      cardNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
//      balance: `$${(Math.random() * 10000).toFixed(2)}`,
//    };
//    setCards([...cards, newCard]);
//  };
//
//  const deleteCard = (id) => {
//    setCards(cards.filter((card) => card.id !== id));
//  };
//
//  return (
//    <div className="p-6 bg-gray-100 max-h-screen flex flex-col items-center">
//      <h1 className="text-2xl font-bold mb-4">Your Bank Cards</h1>
//
//      {/* Scrollable Card Container */}
//      <div className="w-full max-w-4xl h-100 overflow-x-auto pb-4">
//        <div className="flex gap-4 px-2">
//          {cards.map((card) => (
//            <motion.div
//              key={card.id}
//              className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl w-72 shadow-lg flex-shrink-0"
//              initial={{ opacity: 0, scale: 0.8 }}
//              animate={{ opacity: 1, scale: 1 }}
//              exit={{ opacity: 0, scale: 0.8 }}
//            >
//              <h2 className="text-lg font-semibold">{card.bank}</h2>
//              <p className="text-md my-2">{card.cardNumber}</p>
//              <p className="text-xl font-bold">{card.balance}</p>
//              <button
//                onClick={() => deleteCard(card.id)}
//                className="absolute top-2 right-2 bg-red-600 p-2 rounded-full hover:bg-red-700"
//              >
//                <Trash className="text-white w-5 h-5" />
//              </button>
//            </motion.div>
//          ))}
//        </div>
//      </div>
//
//      {/* Action Buttons */}
//      <div className="mt-6">
//        <button
//          onClick={addCard}
//          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//        >
//          Add New Card
//        </button>
//      </div>
//    </div>
//  );
//}

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";

export default function BankCards() {
  const [cards, setCards] = useState([
    {
      id: 1,
      bank: "Bank A",
      cardNumber: "**** **** **** 1234",
      balance: "$5,000",
    },
    {
      id: 2,
      bank: "Bank B",
      cardNumber: "**** **** **** 5678",
      balance: "$8,200",
    },
    {
      id: 3,
      bank: "Bank C",
      cardNumber: "**** **** **** 9012",
      balance: "$3,400",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      bank: `Bank ${String.fromCharCode(65 + (cards.length % 26))}`,
      cardNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
      balance: `$${(Math.random() * 10000).toFixed(2)}`,
    };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 max-h-screen min-w-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Your Bank Cards</h1>

      {/* Scrollable Card Container */}
      <div className="relative w-full max-w-[450px] overflow-hidden">
        {/* Single Card View */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl w-full h-[300px] shadow-lg flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <h2 className="text-lg font-semibold">{card.bank}</h2>
              <p className="text-md my-2">{card.cardNumber}</p>
              <p className="text-xl font-bold">{card.balance}</p>
              <button
                onClick={() => deleteCard(card.id)}
                className="absolute top-2 right-2 bg-red-600 p-2 rounded-full hover:bg-red-700"
              >
                <Trash className="text-white w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={prevCard}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          onClick={nextCard}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          disabled={currentIndex === cards.length - 1}
        >
          Next
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        <button
          onClick={addCard}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add New Card
        </button>
      </div>
    </div>
  );
}
