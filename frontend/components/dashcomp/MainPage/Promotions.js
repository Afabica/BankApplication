"use client";
import React, { useState, useEffect } from "react";

// Function to calculate time remaining
function timeRemaining(expiryDate) {
  const now = new Date();
  const endTime = new Date(expiryDate);
  const timeDiff = endTime - now;

  if (timeDiff <= 0) return "Expired";

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
}

const PromotionsSlider = ({ promotions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [timer, setTimer] = useState("");
  const currentDate = new Date("2025-03-27");
  currentDate.setDate(currentDate.getDate() + 7);

  // Update timer every second
  useEffect(() => {
    const updateTimer = () => {
      if (promotions.length > 0) {
        setTimer(timeRemaining(currentDate));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, promotions]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promotions.length]);

  if (promotions.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No promotions available at the moment.
      </p>
    );
  }

  return (
    <div className="relative p-50 h-[400px] min-w-screen max-w-md mx-auto bg-white shadow-lg rounded-lg p-20">
      {/* Slider Container */}
      <div className="relative flex items-center justify-center min-h-[150px]">
        {promotions.map((promotion, index) => (
          <div
            key={index}
            className={`absolute w-full transition-opacity duration-500 ${index === currentIndex ? "opacity-100 block" : "opacity-0 hidden"}`}
          >
            <h3 className="text-xl font-bold">{promotion.title}</h3>
            <p className="text-gray-600">{promotion.description}</p>
            {/* ✅ Timer now dynamically updates and is visible */}
            {index === currentIndex && (
              <span className="block text-red-500 font-semibold">{timer}</span>
            )}
            <a
              href={promotion.link}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claim Offer
            </a>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-900 transition"
        onClick={() =>
          setCurrentIndex(
            (currentIndex - 1 + promotions.length) % promotions.length,
          )
        }
      >
        ❮
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-900 transition"
        onClick={() => setCurrentIndex((currentIndex + 1) % promotions.length)}
      >
        ❯
      </button>
    </div>
  );
};

export default PromotionsSlider;
