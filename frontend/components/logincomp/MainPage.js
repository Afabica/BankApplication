"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13 (App Router)
import { setCookie } from "nookies";
import ThemeSwitcher from "../../scripts/theme";
import ScrollTriggerComponent from "../animation/ScrollTriggerComponent.js"; // Assuming this will be used in animation logic
import https from "https";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error message state
  const router = useRouter(); // Initialize useRouter
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission to avoid page reload

    // Create an https agent to disable SSL verification (bypass SSL)
    const agent = new https.Agent({
      rejectUnauthorized: false, // Disable SSL validation (not recommended for production)
    });

    try {
      const response = await axios.post(
        "https://localhost:8443/api/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false, // This is to bypass the self-signed certificate warning for local development
          }),
          withCredentials: true,
        },
      );
      // Use axios with https agent to bypass SSL verification
      //      const response = await axios.post(
      //        "https://localhost:8443/api/login", // Your backend API endpoint
      //        {
      //          username,
      //          password,
      //        },
      //        {
      //          headers: {
      //            "Content-Type": "application/json",
      //             Accept: "application/json",
      //          },
      //        },
      //      );

      const { token, customer, transactions } = response.data;
      //

      if (response.status === 200) {
        // Store the token in cookies
        console.log(response);
        setCookie(null, "jwt", token, {
          path: "/",
          maxAge: 86400, // 1 day expiration
          httpOnly: false, // This is fine for front-end access to the cookie
          secure: true,
        });
        // Store user information and transactions in localStorage
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("customer", JSON.stringify(customer));
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
        console.error("Login failed");
      }
    } catch (err) {
      console.error("Login failed", err); // Log any errors to the console
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div
      className="SignInCont"
      style={{ backgroundImage: "url(/images/home1.jpg)" }}
    >
      <ThemeSwitcher />
      <section className="signin-section">
        <form className="SignInForm" onSubmit={handleSubmit}>
          <h2 className="signheader">Sign In</h2>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error if exists */}
          <div className="forminput">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="forminput">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="buttonsign">
            Sign In
          </button>
          <div className="Links">
            <ul className="ContainerLinks">
              <li>
                <Link href="/signin/passrestore">Forgot password?</Link>
              </li>
            </ul>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignInPage;

const extractToken = (data) => {
  // Regular expression to match the token
  const tokenRegex = /Token:\s([A-Za-z0-9\-_\.]+)/;
  const match = data.match(tokenRegex);

  if (match && match[1]) {
    return match[1]; // Return the token
  }

  return null; // Return null if token not found
};
