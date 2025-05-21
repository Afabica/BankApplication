"use client";

import axios from "axios";

const BASE_URL = "https://v6.exchangerate-api.com/v6";
const API_KEY = "51cbe08d13988d3ae8149ba2";

export const getExchangeRates = async (baseCurrency = "USD") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`,
    );

    if (response.data && response.data.conversion_rates) {
      return response.data; 
    } else {
      console.error("No conversion rates data available");
      return null; 
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null; 
  }
};
