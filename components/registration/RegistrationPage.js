"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    dob: "",
    mobile: "",
    email: "",
    id: "",
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleRegistration = async () => {
    const response = await axios.post("", formData);
    if (response.status === 200) {
      console.log("Registration complete.");
      router.push("/login");
    } else {
      console.error("Registration unseccessful.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleRegistration} className="space-y-4">
          <input
            type="text"
            name="login"
            placeholder="Enter login or email"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:rinf-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            calue={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:rinf-blue-500"
            required
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
