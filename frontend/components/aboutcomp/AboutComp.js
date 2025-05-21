"use client";

import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        About Our Bank
      </h1>
      <p className="text-gray-700 mb-6 leading-relaxed text-lg">
        Welcome to our bank, where your financial goals are our priority.
        Established in 1995, we have been committed to providing personalized
        banking services tailored to your needs. Our mission is to help you grow
        your wealth, manage your finances, and achieve financial security.
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed text-lg">
        We offer a wide range of services including savings and checking
        accounts, loans, investments, and digital banking solutions that are
        secure, reliable, and easy to use. Our experienced team is here to
        support you every step of the way.
      </p>
      <p className="text-gray-700 leading-relaxed text-lg">
        Thank you for choosing us as your trusted banking partner. We look
        forward to serving you and helping you succeed financially.
      </p>

      <div className="mt-10 border-t pt-6 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Your Bank Name. All rights reserved.
      </div>
    </div>
  );
}
