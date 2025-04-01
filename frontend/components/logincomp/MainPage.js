"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13 (App Router)
import { setCookie } from "nookies";
import ThemeSwitcher from "../../scripts/theme";
import ScrollTriggerComponent from "../animation/ScrollTriggerComponent.js"; // Assuming this will be used in animation logic

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
      const response = await axios.post(
        "http://localhost:8080/api/login",
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
      //      const response = await axios.post(
      //        "/api/login",
      //        {
      //          username,
      //          password,
      //        },
      //        {
      //          headers: {
      //            "Content-Type": "application/json",
      //          },
      //        },
      //      );

      // Directly use the data from the response
      const { token, customer, transactions } = response.data;

      // Check for successful login
      if (response.status === 200) {
        // Store the token in cookies
        setCookie(null, "jwt", token, {
          path: "/",
          maxAge: 86400, // 1 day expiration
          httpOnly: false, // This is fine for front-end access to the cookie
          secure: true,
        });
        // Store user information and transactions in localStorage
        localStorage.setItem("token", JSON.stringify(token));
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
//
export default SignInPage;
//
//"use client";
//import React, { useState, useContext, createContext } from "react";
//import axios from "axios";
//import Link from "next/link";
//import { useRouter } from "next/navigation"; // Use useRouter for client-side navigation
//import { setCookie } from "nookies";
//import axiosInstance from "./axiosInstance";
//import { useAuth } from "./AuthLogic";
//import ThemeSwitcher from "../../scripts/theme";
//import { checkPasswordStrength } from "../tools/PasswordStrength.js";
//import jwtDecode from "jwt-decode";
//const SignInPage = () => {
//  const [username, setUsername] = useState("");
//  const [password, setPassword] = useState("");
//  const [error, setError] = useState("");
//  const router = useRouter(); // Initialize useRouter
//
//  const handleSubmit = async (e) => {
//    e.preventDefault(); // Prevent default form submission
//    try {
//      const response = await axios.post("http://localhost:8080/api/login", {
//        username,
//        password,
//      });
//      // Check for successful login
//      if (response.status === 200) {
//        // Assuming success is status 200
//        // Redirect to the dashboard
//        const decode = jwtDecode(response.data.token);
//        const expirationTime = decode.exp * 1000;
//        setCookie(null, "jwt", response.data.token, {
//          path: "/",
//          expires: new Date(expirationTime),
//          httpOnly: true,
//          secure: true,
//        });
//        router.push("/dashboard"); // Use router.push for client-side navigation
//      } else {
//        setError(response.data.message || "Login failed. Please try again.");
//      }
//    } catch (err) {
//      console.error("Login failed", err); // Log any errors to the console
//      setError("Login failed. Please check your credentials and try again.");
//    }
//  };
//  return (
//    <div
//      className="SignInCont"
//      style={{ backgroundImage: "url(/images/home1.jpg)" }}
//    >
//      <ThemeSwitcher />
//      <section className="signin-section">
//        <form className="SignInForm" onSubmit={handleSubmit}>
//          <h2 className="signheader">Sign In</h2>
//          {error && <p className="error-message">{error}</p>}
//          <div className="forminput">
//            <label htmlFor="username">Username</label>
//            <input
//              type="text"
//              name="username"
//              id="username"
//              value={username}
//              onChange={(e) => setUsername(e.target.value)}
//              required
//            />
//          </div>
//          <div className="forminput">
//            <label htmlFor="password">Password</label>
//            <input
//              type="password"
//              name="password"
//              id="password"
//              value={password}
//              onChange={(e) => setPassword(e.target.value)}
//              required
//            />
//          </div>
//          <button type="submit" className="buttonsign">
//            Sign In
//          </button>
//          <div className="Links">
//            <ul className="ContainerLinks">
//              <li>
//                <Link href="/signin/passrestore">Forgot password?</Link>
//              </li>
//            </ul>
//          </div>
//        </form>
//      </section>
//    </div>
//  );
//};
//export default SignInPage;
