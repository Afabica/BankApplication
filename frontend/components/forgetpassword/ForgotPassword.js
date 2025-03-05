"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ForgotPasswordPage = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [userExist, setUserExists] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(false);
  const [error, setError] = useState("");

  const Header = dynamic(() => import("../hedfot/HeaderHome"), {
    ssr: false,
  });
  const Footer = dynamic(() => import("../hedfot/FooterHome"), {
    ssr: false,
  });

  useEffect(() => {
    const checkUser = async () => {
      if (!phone) return;
      setLoading(true);

      const response = await axios.get("http://localhost:8080/api/verify", {
        email,
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("customer", JSON.stringify(email));
        setUserExists(data.exsits);
        setLoading(false);
      } else {
        setError(response.data.message || "Use doesn't exist");
        console.error("User not found");
      }
    };

    checkUser();
  }, []);

  const handleSendOTP = async () => {
    if (!userExist) return;

    try {
      const response = await axios.get("http://localhost:8080/api/send/otp", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (response.status === 200) {
        const data = await response.json();
        alert(data.message);
        router.push("/signin/passrestore/otpconf");
      } else {
        setError(response.data.message);
        console.error("Login failed.");
      }

      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-10 mb-10 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSendOTP}>
        <input
          type="text"
          placeholder="Enter phone number or email address"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          type="submit"
          onClick="handleSendOTP"
          disabled={!userExist || loading}
        >
          Send OTP
        </button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
