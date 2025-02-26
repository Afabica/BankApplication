"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13 (App Router)
import { setCookie } from "nookies";
import ThemeSwitcher from "../../scripts/theme";
import dynamic from "next/dynamic";
import client from "prom-client";

const withAuth = dynamic(() => import("../tools/withAuth"), {
  ssr: false,
});

const SidePanel = dynamic(() => import("../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});

const PanelElements = dynamic(() => import("../hedfot/PanelElements"), {
  ssr: false,
});

const Header = dynamic(() => import("../hedfot/DashHeader"), {
  ssr: false,
});

const loginCounter = new client.Counter({
  name: "login_attempt_total",
  help: "Total number of login attempts",
  labelNames: ["status"],
});

const loginDuration = new client.Histogram({
  name: "login_duration_seconds",
  help: "Duration of login  requests in seconds",
  buckets: [0.1, 0.5, 1, 2, 5],
});

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

    try {
      // Send login request to the backend
      const start = Date.now();
      const response = await axios.post(
        "http://backend-service.my-app.svc.cluster.local:8080/api/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const durationSeconds = Date.now() - start;

      loginCounter.lables(response.status).inc();
      loginDuration.observer(durationSeconds);

      // Directly use the data from the response
      const { token, customer, transactions } = response.data;

      // Check for successful login
      if (response.status === 200) {
        // Store the token in cookies
        setCookie(null, "jwt", token, {
          path: "/",
          maxAge: 86400, // 1 day expiration
          httpOnly: false, // This is fine for front-end access to the cookie
        });

        // Store user information and transactions in localStorage
        localStorage.setItem("customer", JSON.stringify(customer));
        localStorage.setItem("transactions", JSON.stringify(transactions));

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // Handle unsuccessful login
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
