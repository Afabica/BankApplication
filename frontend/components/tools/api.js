"use client";

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { parseCookies } from "nookies";


const ApiHandler = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

ApiHandler.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies.jwt;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

ApiHandler.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  if(error.response?.status === 401) {
    console.warn("Unauthorized! Redirecting to login page...");
    window.location.href = "/login";
  }
  return Promise.reject(error);
});
  

export default ApiHandler;
