"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const API = "https://localhost:8443";
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Step 1 state
  const [creds, setCreds] = useState({
    username: "",
    password: "",
    email: "",
    mobile: "",
  });
  const [nextStepToken, setNextStepToken] = useState("");
  const [error, setError] = useState("");

  // Step 2 state
  const [profile, setProfile] = useState({
    fullName: "",
    dob: "",
    address: "",
    identificationDetails: "",
    accountType: "",
    employer: "",
  });

  const handleCredChange = (e) =>
    setCreds({ ...creds, [e.target.name]: e.target.value });
  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const submitCredentials = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // axios.post(url, payload, config)
      const response = await axios.post(`${API}/api/register`, creds, {
        headers: { "Content-Type": "application/json" },
      });
      // axios throws on non-2xx, so we don’t need to check response.ok
      const data = response.data;
      setNextStepToken(data.nextStepToken);
      setStep(2);
    } catch (err) {
      // axios puts the server payload in err.response.data
      setError(err.response?.data?.error || err.message);
    }
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${API}/profile`, profile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${nextStepToken}`,
        },
      });
      if (response.status === 200) {
        router.push("/login");
      } else {
        console.error("Profile creation wasn't successfull.");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4 bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(/images/home1.jpg)" }}
    >
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 md:p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-blue-700">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={submitCredentials} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Step 1: Credentials
            </h2>
            <input
              name="username"
              placeholder="Username"
              value={creds.username}
              onChange={handleCredChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={creds.password}
              onChange={handleCredChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={creds.email}
              onChange={handleCredChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="mobile"
              placeholder="Mobile (+421...)"
              value={creds.mobile}
              onChange={handleCredChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={submitProfile} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Step 2: Profile Details
            </h2>
            <input
              name="fullName"
              placeholder="Full Name"
              value={profile.fullName}
              onChange={handleProfileChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="dob"
              type="date"
              placeholder="Date of Birth"
              value={profile.dob}
              onChange={handleProfileChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="address"
              placeholder="Address"
              value={profile.address}
              onChange={handleProfileChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="identificationDetails"
              placeholder="ID Details"
              value={profile.identificationDetails}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="accountType"
              placeholder="Account Type"
              value={profile.accountType}
              onChange={handleProfileChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="employer"
              placeholder="Employer"
              value={profile.employer}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Complete Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
