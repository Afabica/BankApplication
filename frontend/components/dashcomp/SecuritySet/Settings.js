"use client";

import React, { useState, useEffect } from "react";
import ThemeChanger from "../../tools/ThemeChanger.js";
import "../../../styles/NavDash.css";
import axios from "axios";
import dynamic from "next/dynamic";

// Dynamic imports
const SidePanel = dynamic(() => import("../../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../../hedfot/PanelElements"), {
  ssr: false,
});
const Header = dynamic(() => import("../../hedfot/DashHeader"), { ssr: false });
const Footer = dynamic(() => import("../../hedfot/DashFooter"), { ssr: false });

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
      try {
        const response = await axios.get("http://localhost:8080/");
        const data = response.data;

        setTwoFAEnabled(data.twoFAEnabled || false);
        setBiometricEnabled(data.biometricEnabled || true);
        setLanguage(data.language || "en");
        setBalanceThreshold(data.balanceThreshold || "");
        setNotifications(data.notifications || false);
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    fetchUserSettings();
  }, []);

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
    console.log("Password changed to:", password);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Side Panel */}

      {isPanelOpen && (
        <aside className="w-64 bg-white shadow-md">
          <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <PanelElements />
          </SidePanel>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <main className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8">Security Settings</h1>

          <div className="space-y-8 bg-white p-6 rounded-xl shadow">
            {/* Theme Selection */}
            <div>
              <p className="text-xl font-semibold mb-2">Theme</p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={toggleTheme}
              >
                Switch to {currentTheme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>

            {/* Notifications */}
            <div>
              <p className="text-xl font-semibold mb-2">Notifications</p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={toggleNotifications}
              >
                {notifications ? "Disable" : "Enable"} Notifications
              </button>
            </div>

            {/* Language Selection */}
            <div>
              <p className="text-xl font-semibold mb-2">Language</p>
              <select
                className="w-full border border-gray-300 p-2 rounded"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            {/* Balance Threshold */}
            <div>
              <p className="text-xl font-semibold mb-2">
                Balance Threshold for Alerts
              </p>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="number"
                value={balanceThreshold}
                onChange={(e) => setBalanceThreshold(e.target.value)}
              />
            </div>

            {/* Change Password */}
            <div>
              <p className="text-xl font-semibold mb-2">Change Password</p>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecuritySettings;
