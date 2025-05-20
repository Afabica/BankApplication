"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FeedbackPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [isLoading, setIsLoading] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState("");

  useEffect(() => {
    const fetchProfile = () => {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) {
        setFormData(JSON.parse(storedCustomer));
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      userEmail: email,
      message: message,
      rating: rating,
    };

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token")?.replace(/"/g, "");
      console.log(token);
      if (!token) {
        console.error("JWT Token is missing");
        return;
      }

      if (!formData.id) {
        console.error("User ID is missing");
        return;
      }
      const res = await axios.post("https://localhost:8443/api/feedback", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(feedbackData),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        setResponseMessage("Feedback submitted successfully!");
      } else {
        setResponseMessage(`Error: $data.message || "Something wen wrong"}`);
      }
    } catch (error) {
      setIsLoading(false);
      setResponseMessage(`Error: ${error.messsage}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-10 mb-10 bg-white shadow-md rounded">
      <h1> Submit Feedback</h1>
      <form onSubmit={handleSubmit} className="text-xl font-bold mb4">
        <div style={{ marginBottom: "10px " }}>
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
          />
        </div>
        <div className="">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="enter your feedback"
            className="w-full p-2 border rounded mb-3"
          />
        </div>
        <div className="">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded mb-3"
            required
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excallent</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-20 p-2 border rounded mb-3"
        >
          {isLoading ? "Submittins..." : "Submit Feedback"}
        </button>

        {responseMessage && <p className="">{responseMessage}</p>}
      </form>
    </div>
  );
}
