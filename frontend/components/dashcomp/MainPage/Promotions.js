"use client";
import React, { useState, useEffect } from "react";

// Function to calculate time remaining for a given expiry date
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

const PromotionsSlider = ({ promotions = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState("");

  useEffect(() => {
    if (!promotions.length) {
      console.warn("No promotions data passed or promotions is empty.");
      return;
    }

    // Update timer every second based on current promotion expiryDate
    const updateTimer = () => {
      const currentPromotion = promotions[currentIndex];
      if (currentPromotion && currentPromotion.expiryDate) {
        setTimer(timeRemaining(currentPromotion.expiryDate));
      } else {
        setTimer("No expiry date");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, promotions]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!promotions.length) return;

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
    <div className="relative max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Slider Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[150px] text-center">
        {promotions.map((promotion, index) => (
          <div
            key={index}
            className={`absolute w-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{promotion.title}</h3>
            <p className="text-gray-600 mb-2">{promotion.description}</p>
            {/* Timer */}
            {index === currentIndex && (
              <span
                className={`block font-semibold mb-3 ${
                  timer === "Expired" ? "text-red-600" : "text-green-600"
                }`}
              >
                {timer}
              </span>
            )}
            <a
              href={promotion.link}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-900 transition"
        onClick={() =>
          setCurrentIndex(
            (currentIndex - 1 + promotions.length) % promotions.length,
          )
        }
        aria-label="Previous Promotion"
      >
        ❮
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-900 transition"
        onClick={() => setCurrentIndex((currentIndex + 1) % promotions.length)}
        aria-label="Next Promotion"
      >
        ❯
      </button>
    </div>
  );
};

export default PromotionsSlider;
