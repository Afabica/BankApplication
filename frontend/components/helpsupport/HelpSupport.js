"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "../../styles/DashPage.css";

const SidePanel = dynamic(() => import("../dashcomp/MainPage/SidePanel"), {
  ssr: false,
});
const Header = dynamic(() => import("../hedfot/DashHeader"), {
  ssr: false,
});
const PanelElements = dynamic(() => import("../hedfot/PanelElements"), {
  ssr: false,
});

const HelpSupport = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // default to open

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar (visible unless toggled off) */}
      {isPanelOpen && (
        <aside className="w-64 bg-white shadow-md">
          <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
            <PanelElements />
          </SidePanel>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header stays at top of content */}
        <Header togglePanel={togglePanel} isPanelOpen={isPanelOpen} />

        <main className="p-6 space-y-8 max-w-5xl mx-auto">
          <section className="text-center">
            <h1 className="text-4xl font-bold">Help & Support</h1>
            <p className="text-gray-600 mt-2">
              We’re here to assist you with any questions or issues you may
              have.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-medium">How do I reset my password?</h3>
                <p>
                  Go to the login page and click "Forgot Password." Follow the
                  instructions to reset it.
                </p>
              </div>
              <div>
                <h3 className="font-medium">How can I contact support?</h3>
                <p>
                  Email us or use the live chat available 24/7 in our mobile
                  app.
                </p>
              </div>
              <div>
                <h3 className="font-medium">How do I check my balance?</h3>
                <p>
                  Log into your dashboard or mobile app to view your balance.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@yourbank.com"
                  className="text-blue-600 underline"
                >
                  support@yourbank.com
                </a>
              </li>
              <li>
                Phone: <strong>1-800-555-1234</strong>
              </li>
              <li>Live Chat: Available in our mobile app</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1">
              <li>Check your internet connection.</li>
              <li>Clear browser cache and cookies.</li>
              <li>Update your browser or app.</li>
            </ol>
          </section>

          <section className="bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-semibold mb-2">Feedback</h2>
            <p className="mb-4 text-gray-700">
              Let us know how we can improve.
            </p>
            <a
              href="/feedback"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Feedback
            </a>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HelpSupport;
