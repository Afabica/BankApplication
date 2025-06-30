"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const OtpGetter = () => {
  const [otpcode, setOtpCode] = useState("");
  const router = useRouter();
  const [Error, setError] = useState("");

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        "https://localhost:8443/api/otp/verify",
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stingify({ otpcode }),
        },
      );

      if (response.status === 200) {
        const data = await response.json();

        alert(data.message);
        router.push("https://localhost:3000/signin");
      } else {
        setError(response.data.message);
        console.error("Wrong code entered.");
      }
    } catch (err) {
      console.error("Confirmation of sended code failed: ", err);
      setError("Confirmation of sended code failed: ", err);
    }
  };

  return (
    <div
      className="max-w-md mx-auto mt-10 p-10 mb-10 bg-white shadow-md rounded"
      style={{ backgroundImage: "url(../../images/SecureBank.jpeg)" }}
    >
      <h2 className="text-xl font-bold mb4">Otp code entering</h2>
      <form onSubmit={handleSendOtp}>
        <input
          type="text"
          placeholder="Enter received otp code."
          value={otpcode}
          onChange={(e) => setOtpCode(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          className="w-full h-20 p-2 border rounded mb-3"
          type="submit"
          onCLick="handleSendOtp"
        />
      </form>
    </div>
  );
};

export default OtpGetter;
