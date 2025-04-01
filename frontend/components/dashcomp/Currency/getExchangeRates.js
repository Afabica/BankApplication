"use client"; // This directive is necessary to ensure it's only run on the client side (in Next.js)

import axios from "axios";

const BASE_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = "51cbe08d13988d3ae8149ba2"; // You can store this in an environment variable for better security

export const getExchangeRates = async (baseCurrency = "USD") => {
  try {
    // Make the GET request to the API endpoint
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`
    );
    
    // Check if the API response contains data
    if (response.data && response.data.conversion_rates) {
      return response.data; // Return the full response
    } else {
      console.error("No conversion rates data available");
      return null; // Return null if the response does not contain the expected data
    }
  } catch (error) {
    // If there's an error, log it and return null
    console.error("Error fetching exchange rates:", error);
    return null; // Return null in case of an error
  }
};

