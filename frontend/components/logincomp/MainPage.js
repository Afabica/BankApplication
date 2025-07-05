"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import ThemeSwitcher from "../../scripts/theme";
import https from "https";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:8443/api/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          //httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          withCredentials: true,
        },
      );

      const { token, customer } = response.data;

      if (response.status === 200) {
        setCookie(null, "jwt", token, {
          path: "/",
          maxAge: 86400,
          httpOnly: false,
          secure: true,
        });

        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("customer", JSON.stringify(customer));
        router.push("/user/dashboard");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url(/images/home1.jpg)" }}
    >
      <ThemeSwitcher />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-9 right-3 text-sm text-blue-600 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Sign In
        </button>

        <div className="mt-4 text-center">
          <Link
            href="/signin/passrestore"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
