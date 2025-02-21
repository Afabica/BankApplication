"use client";

import React, { useState, useEffect } from "react";
import ThemeChanger from "../../tools/ThemeChanger.js";
import "../../../styles/NavDash.css";
import dynamic from "next/dynamic";

const SidePanel = dynamic(() => import("../../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});
const Header = dynamic(() => import("../../hedfot/DashHeader"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../hedfot/DashFooter"), {
  ssr: false,
});

const SecuritySettings = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [language, setLanguage] = useState("en");
  const [balanceThreshold, setBalanceThreshold] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const fetchUserSettings = async () => {
      const response = await axios.get(`http://localhost:8080/`)
    }
  })
  const toggleNotifications = () => {
    setNotifications((prev) => !prev);
  };

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("Password changed!");
  };

  

  return (
    <div className="security-container">
      <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />
      <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <PanelElements />
      </SidePanel>
      <div className="settings-content">
        <h1>Security Settings</h1>
        <div className="security-settings-section">
          <div className="option-group">
            <p className="option-header">Theme Selection</p>
            <button className="theme-toggle-button" onClick={toggleTheme}>
              Switch to {currentTheme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
          <div className="option-group">
            <p className="option-header">Notifications</p>
            <button className="toggle-button" onClick={toggleNotifications}>
              {notifications ? "Disable" : "Enable"} Notifications
            </button>
          </div>
          <div className="option-group">
            <p className="option-header">Language Selection</p>
            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="option-group">
            <p className="option-header">Balance Threshold for Notifications</p>
            <input
              className="balance-input"
              type="number"
              value={balanceThreshold}
              onChange={(e) => setBalanceThreshold(e.target.value)}
            />
          </div>
          <div className="option-group change-password-section">
            <p className="option-header">Change Password</p>
            <form onSubmit={handleChangePassword}>
              <input
                className="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button className="submit-button" type="submit">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
