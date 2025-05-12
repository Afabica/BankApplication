"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/hedfot/DashHeader.js";
import axios from "axios";
import { parseCookies } from "nookies";
import dynamic from "next/dynamic";

const SidePanel = dynamic(
  () => import("../../components/dashcomp/MainPage/SidePanel"),
  {
    ssr: false,
  },
);

const PanelElements = dynamic(
  () => import("../../components/hedfot/PanelElements"),
  {
    ssr: false,
  },
);

const ProfilePage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    bio: "",
    location: "",
    phone: "",
  });

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Lorem ipsum dolor sit amet...",
    location: "New York, USA",
    phone: "(123) 456-7890",
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const cookies = parseCookies();
      const token = cookies.jwt;
      try {
        const response = await axios.post(
          "http://localhost:8443/api/profile/user",
          {},
          {
            headers: {
              Authentication: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          setFormData(response.data); // Assuming proper shape
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);
  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const SendChanges = async () => {
    const cookies = parseCookies();
    const token = cookies.jwt;
    try {
      await axios.post("http://localhost:8080/", formData, {
        headers: {
          Authentication: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Failed to send changes:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      <div className="flex-1 flex flex-col">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-xl mt-8">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="mt-6">
            {isEditing ? (
              <form className="space-y-4">
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </form>
            ) : (
              <div className="space-y-2 text-sm mt-4">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Location:</strong> {user.location}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Bio:</strong> {user.bio}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={toggleEditing}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              onClick={SendChanges}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
