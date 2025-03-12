"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../hedfot/DashHeader"), { ssr: false });
const Footer = dynamic(() => import("../hedfot/DashFooter"), { ssr: false });
const SidePanel = dynamic(() => import("../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../hedfot/PanelElements"), {
  ssr: false,
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
        const token = localStorage.getItem("token")?.replace(/"/g, ""); // Retrieve and clean token

        if (!token) {
          setError("JWT Token is missing.");
          return;
        }

        if (!formData.id) {
          return; // Prevent request if user ID is not available
        }

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
          console.log("Data fetched successfully.");
        } else {
          setError("Fetching notifications failed.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Data fetching failed.");
      }
    };
    fetchNotifications();

    fetchUser();
  }, []);

  useEffect(() => {
    if (formData.id) {
      fetchNotifications();
    }
  }, [formData.id]); // Fetch notifications only after user data is set

  // Toggle read/unread status of a specific notification
  const toggleReadStatus = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification,
      ),
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="notifications-page">
      {/* Side Panel */}
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>

      {/* Header */}
      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

      {/* Notifications Header */}
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="notifications-actions">
          <button onClick={markAllAsRead}>Mark All as Read</button>
          <button onClick={clearAllNotifications}>Clear All</button>
        </div>
      </div>

      {/* Error Display */}
      {error && <p className="error-message">{error}</p>}

      {/* Notifications List */}
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">No notifications available</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? "read" : "unread"}`}
              onClick={() => toggleReadStatus(notification.id)}
            >
              <div className="notification-header">
                <h4>{notification.title}</h4>
                <span className="timestamp">{notification.timestamp}</span>
              </div>
              <p className="notification-message">{notification.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotificationsPage;
