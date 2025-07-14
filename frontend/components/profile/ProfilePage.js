"use client";

import React, { useState, useEffect } from "react";
import Header from "../hedfot/DashHeader";
import dynamic from "next/dynamic";
import axios from "axios";
import fetchToken from "../tools/ApiCall";

const SidePanel = dynamic(() => import("../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../hedfot/PanelElements"), {
  ssr: false,
});

function ProfilePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: "",
    mobile: "",
    passNumber: "",
    gender: "",
    identificationDetails: "",
    accountType: "",
    employer: "",
    avatar: "",
    email: "",
    accountId: "",
  });

  const API = "https://localhost:8443";

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
    //    const tokenRaw = fetchToken();
    const token = tokenRaw?.replace(/"/g, "");
    if (!token) {
      setError("Authentication token missing");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const response = await axios.get(`${API}/profile/${parsed.accountId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setFormData((prev) => ({
            ...prev,
            ...response.data,
            accountId: parsed.accountId,
          }));
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
  }, []);

  const updateUserProfile = async () => {
    const tokenRaw = localStorage.getItem("token");
    const token = tokenRaw?.replace(/"/g, "");

    try {
      const response = await axios.put(
        `${API}/profile/${formData.accountId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.status === 200;
    } catch (err) {
      console.erro("Update error:", err);
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) return <div className="p-6 text-center">Loading profile…</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

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

        <div className="p-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  N/A
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{formData.fullName}</h1>
              <p className="text-sm text-gray-600">
                {formData.email || "No email"}
              </p>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Address", name: "address" },
              { label: "Mobile", name: "mobile" },
              { label: "Passport Number", name: "passNumber" },
              { label: "Gender", name: "gender" },
              {
                label: "Identification Details",
                name: "identificationDetails",
              },
              { label: "Account Type", name: "accountType" },
              { label: "Employer", name: "employer" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded shadow-sm"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
