"use client";

import React, { useState, useEffect} from "react";
import axios from 'axios';
import ThemeChanger from '../tools/ThemeChanger.js';
import { pageeView } from "@/utils/gtag";
import ScrollTriggerComponent from "../../components/animation/ScrollTriggerComponent.js";

const NotificationsPage = () => {

  useEffect(() => {
    
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Transaction",
      message: "You have made a transaction of $500.",
      timestamp: "2025-01-14 10:30 AM",
      read: false,
    },
    {
      id: 2,
      title: "New Offer Available",
      message: "You have a new loan offer with a low interest rate.",
      timestamp: "2025-01-13 04:00 PM",
      read: false,
    },
    {
      id: 3,
      title: "Security Alert",
      message: "Your account was logged in from an unrecognized device.",
      timestamp: "2025-01-12 09:15 AM",
      read: false,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="notifications-actions">
          <button onClick={markAllAsRead}>Mark All as Read</button>
          <button onClick={clearAllNotifications}>Clear All</button>
        </div>
      </div>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">No notifications available</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "read" : "unread"
              }`}
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
    </div>
  );
};

export default NotificationsPage;

