"use client";

import React, { useState, useEffect } from "react";
import Header from "../hedfot/DashHeader";
import dynamic from "next/dynamic";
import axios from "axios";

const SidePanel = dynamic(() => import("../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../hedfot/PanelElements"), {
  ssr: false,
});

function ProfilePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "https://localhost:8443";

  // 1) On mount, load customer from localStorage and then fetch profile once
  useEffect(() => {
    const customerRaw = localStorage.getItem("customer");
    if (!customerRaw || customerRaw === "undefined") {
      setError("No customer data in localStorage");
      setLoading(false);
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(customerRaw);
    } catch (err) {
      console.error("Error parsing customer data:", err);
      setError("Invalid customer data");
      setLoading(false);
      return;
    }

    const tokenRaw = localStorage.getItem("token");
    const token = tokenRaw?.replace(/"/g, "");
    if (!token) {
      setError("Authentication token missing");
      setLoading(false);
      return;
    }

    // 2) Now fetch profile
    (async () => {
      try {
        const params = new URLSearchParams({ userId: parsed.accountId });
        const response = await axios.get(`${API}/profile?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setFormData(response.data);
        } else {
          setError("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []); // <- empty deps: run once

  // 3) Handlers remain largely the same, but ensure they await properly and handle errors
  const updateUserProfile = async () => {
    const tokenRaw = localStorage.getItem("token");
    const token = tokenRaw?.replace(/"/g, "");
    try {
      const response = await axios.put(`${API}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.status === 200;
    } catch (err) {
      console.error("Update error:", err);
      return false;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const ok = await updateUserProfile();
    setLoading(false);

    if (!ok) {
      setError("User profile wasn't updated.");
    } else {
      console.log("User profile updated successfully.");
    }
  };

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  if (loading) {
    return <div className="p-6 text-center">Loading profile…</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  // 4) Render formData once loaded
  return (
    <div className="min-w-screen mx-auto">
      {isPanelOpen && (
        <aside className="w-64 bg-white shadow-md">
          <SidePanel isOpen={isPanelOpen} onClose={togglePanel}>
            <PanelElements />
          </SidePanel>
        </aside>
      )}

      <div className="flex-1 flex flex-col">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <div className="p-20">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{formData.name}</h1>
              <p className="text-sm text-gray-600">{formData.email}</p>
            </div>
          </div>

          {/* Editable Fields */}
          {/* … your InputField grid here with formData, onChange, editMode … */}

          {/* Save / Edit Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
