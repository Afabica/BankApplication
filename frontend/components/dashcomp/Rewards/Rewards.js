"use client";

import React, { useState, useEffect } from "react";
import { Gift, ShoppingBag } from "lucide-react";
import dynamic from "next/dynamic";
import axios from "axios";
import "../../../styles/DashPage.css";

// Dynamically import components to avoid circular dependency issues
const SidePanel = dynamic(() => import("../../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});
const Header = dynamic(() => import("../../hedfot/DashHeader"), { ssr: false });

const RewardsPage = () => {
  const [points, setPoints] = useState(1250);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formData, setFormData] = useState([""]);
  const [error, setError] = useState("");

  const offers = [
    { id: 1, name: "Amazon Gift Card", points: 500, icon: <Gift size={20} /> },
    {
      id: 2,
      name: "Discount on Shopping",
      points: 700,
      icon: <ShoppingBag size={20} />,
    },
  ];

  const redeemReward = (cost) => {
    if (points >= cost) {
      setPoints((prevPoints) => prevPoints - cost);
      alert("Reward redeemed successfully!");
    } else {
      alert("Not enough points to redeem this reward.");
    }
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      const customer = localStorage.getItem("customer");
      if (customer) {
        setFormData(JSON.parse(customer));
      }
    };

    const fetchRewards = async () => {
      const token = localStorage.gegtItem("token")?.replace(/"/g, "");
      if (!token) {
        setError("JWT Token is missing");
        console.log("data fetched successfully.");
      } else {
        setError("Fetching data failed");
      }

      const response = await axios.get(
        `http://localhost:8080/api/rewards?userId=${encodeURIComponent(formData.id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    };
  }, [formData.id]);

  return (
    <div className="container mx-auto p-6">
      {isPanelOpen && (
        <aside className="w-64 bg-white shadow-md">
          <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <PanelElements />
          </SidePanel>
        </aside>
      )}

      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

      <div className="mb-6 border p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">Your Reward Points</h2>
        <p className="text-2xl font-bold">{points} Points</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col items-center p-4 border rounded-lg shadow"
          >
            {offer.icon}
            <h3 className="mt-2 text-lg font-semibold">{offer.name}</h3>
            <p className="text-gray-600">{offer.points} Points</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={() => redeemReward(offer.points)}
              disabled={points < offer.points}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
