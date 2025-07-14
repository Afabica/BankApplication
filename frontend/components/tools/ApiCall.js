// tools/fetchProfile.js
"use client";

import { useState, useEffect } from "react";

export default function getToken() {
  const error = null;
  const loading = null;
  const customerRaw = localStorage.getItem("customer");
  if (!customerRaw || customerRaw === "undefined") {
    error = "No customer data in localStorage";
    loading = false;
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(customerRaw);
  } catch (err) {
    console.error("Error parsing customer data:", err);
    error = "Invalid customer data";
    loading = false;
    return;
  }

  const tokenRaw = localStorage.getItem("token");
  const token = tokenRaw?.replace(/"/g, "");
  if (!token) {
    error = "Authentication token missing";
    loading = false;
    return { success: false, data: { error, loading } };
  } else {
    return { success: true, data: { token, parsed } };
  }
}

//export default function fetchCustomerInfo() {
//  try {
//    const storedCustomer = localStorage.getItem("customer");
//    if (!storedCustomer) return null;
//
//    const parsedData = JSON.parse(storedCustomer);
//    console.log("Parsed profile:", parsedData);
//    return parsedData;
//  } catch (e) {
//    console.error("Failed to parse stored customer data", e);
//    return null;
//  }
//}

//const [style, setStyle] = useState({
//  fontSize: "16px",
//  lineHeight: "20.8px",
//  fontWeight: "100",
//});
//
//export function AdjustTextSize() {
//  const vw = window.innerWidth * 0.0095;
//  const vh = window.innerHeight * 0.0095;
//  const responsiveSize = vh + vw;
//  const cresponsiveSize = responsiveSize * 3.5;
//
//  setStyle({
//    fontSize: responsiveSize + "px",
//    lineHeight: responsiveSize * 1.3 + "px",
//    fontWeight: "100",
//  });
//}

//export const fetchToken = (e) => {
//  if (!e?.accountId) return;
//  const token = localStorage.getItem("token")?.replace(/"/g, "");
//  if (!token) {
//    return "Authentication token missing";
//  } else {
//    return token;
//  }
//};
