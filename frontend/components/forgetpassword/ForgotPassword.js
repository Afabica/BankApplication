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
  const [error, setError] = useState("");

  const Header = dynamic(() => import("../hedfot/HeaderHome"), { ssr: false });
  const Footer = dynamic(() => import("../hedfot/FooterHome"), { ssr: false });

  //  useEffect(() => {
  //    const checkUser = async () => {
  //      if (!phone) return;
  //      setLoading(true);
  //      try {
  //        const response = await axios.get("http://localhost:8080/api/verify", {
  //          params: { phone },
  //        });
  //
  //        if (response.status === 200) {
  //          setUserExists(response.data.exists);
  //        } else {
  //          setError(response.data.message || "User doesn't exist");
  //        }
  //      } catch (err) {
  //        setError("User verification failed.");
  //      } finally {
  //        setLoading(false);
  //      }
  //    };
  //
  //    checkUser();
  //  }, [phone]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!userExist) {
      setError("User does not exist.");
      return;
    }

    setLoading(true);
    try {
      //      const response = await axios.post("http://localhost:8080/api/send/otp", {
      //        phone,
      //      });
      const response = await axios.post(
        "/api/send/otp",
        {
          phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        alert(response.data.message);
        router.push("/signin/passrestore/otpconf");
      } else {
        setError(response.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-right justify-right min-h-screen bg-gray-100"
      style={{ backgroundImage: "url(../../images/SecureBank.jpeg)" }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSendOTP} className="space-y-4">
          <input
            type="text"
            placeholder="Enter phone number or email address"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className={`w-full px-4 py-2 text-white rounded-md ${loading || !userExist ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            type="submit"
            disabled={!userExist || loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
