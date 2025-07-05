// tools/fetchProfile.js
"use client";

export default function fetchProfile() {
  try {
    const storedCustomer = localStorage.getItem("customer");
    if (!storedCustomer) return null;

    const parsedData = JSON.parse(storedCustomer);
    console.log("Parsed profile:", parsedData);
    return parsedData;
  } catch (e) {
    console.error("Failed to parse stored customer data", e);
    return null;
  }
}
