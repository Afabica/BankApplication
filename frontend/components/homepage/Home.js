"use client";

import React from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../hedfot/HeaderHome"), { ssr: false });
const Footer = dynamic(() => import("../hedfot/FooterHome"), { ssr: false });
const HomeSlider = dynamic(() => import("../animation/HomeSlider"), {
  ssr: false,
});
const FAQSection = dynamic(() => import("../homepage/FAQ"), { ssr: false });

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="w-full shadow-md z-50">
        <Header />
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to BankApp</h1>
          <p className="text-lg">
            Secure, easy-to-use banking at your fingertips. Manage your
            accounts, investments, and more in one place.
          </p>
        </div>
      </section>

      {/* Slider Section */}
      <section className="py-12 px-4">
        <HomeSlider />
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose BankApp?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-600">
                We use the latest encryption and security protocols to ensure
                your financial data is safe.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                Easy Account Management
              </h3>
              <p className="text-gray-600">
                Access and manage your bank accounts, transactions, and more
                from a user-friendly dashboard.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">
                24/7 Customer Support
              </h3>
              <p className="text-gray-600">
                Our dedicated customer support team is available 24/7 to assist
                you with any issues or questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 px-4">
        <FAQSection />
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 shadow-inner mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
