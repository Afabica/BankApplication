// tools/fetchProfile.js
"use client";

export const fetchCustomerInfo = () => {
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
};

export const fetchToken = (e) => {
  if (!e?.accountId) return;
  const token = localStorage.getItem("token")?.replace(/"/g, "");
  if (!token) {
    return "Authentication token missing";
  } else {
    return token;
  }
};
