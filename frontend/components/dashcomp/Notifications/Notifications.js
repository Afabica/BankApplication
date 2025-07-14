"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../../hedfot/DashHeader"), { ssr: false });
const SidePanel = dynamic(() => import("../MainPage/SidePanel"), {
  ssr: true,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: true,
});

const NotificationsPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUser = () => {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) {
        setFormData(JSON.parse(storedCustomer));
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token")?.replace(/"/g, "");
        if (!token) {
          setError("JWT Token is missing.");
          return;
        }

        if (!formData.id) return;

        const response = await axios.get(
          `http://localhost:8080/operations/api/otp?userId=${encodeURIComponent(formData.id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          setNotifications(response.data);
        } else {
          setError("Failed to fetch notifications.");
        }
      } catch (err) {
        console.error(err);
        setError("Data fetching failed.");
      }
    };

    fetchUser();
    fetchNotifications();
  }, [formData.id]);

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {isPanelOpen && (
        <aside className="w-64 bg-white shadow-md">
          <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <PanelElements />
          </SidePanel>
        </aside>
      )}
      <div className="flex-1 flex flex-col">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-xl mt-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Notifikácie</h1>
            <div className="flex space-x-4">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Označiť všetky ako prečítané
              </button>
              <button
                onClick={clearAllNotifications}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Vymazať všetky
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center text-gray-500">
                Žiadne dostupné notifikácie.
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => toggleReadStatus(notification.id)}
                  className={`p-4 border rounded-lg shadow-sm cursor-pointer ${
                    notification.read
                      ? "bg-gray-100 text-gray-600"
                      : "bg-blue-50 text-blue-900"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold">
                      {notification.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{notification.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
