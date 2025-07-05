"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function SendMoneyQuickAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    recipient: "",
    amount: "",
    note: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.recipient || !form.amount) {
      alert("Please fill in both recipient and amount.");
      return;
    }

    // Simulate successful send
    setSuccess(true);

    setTimeout(() => {
      setForm({ recipient: "", amount: "", note: "" });
      setIsOpen(false);
      setSuccess(false);
    }, 1500);
  };

  return (
    <div>
      {/* Quick Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
      >
        Send Money
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Send Money
              </h2>

              {success ? (
                <div className="text-green-600 text-center font-semibold">
                  ✅ Money sent successfully!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Recipient Email / IBAN
                    </label>
                    <input
                      type="text"
                      name="recipient"
                      value={form.recipient}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Note (optional)
                    </label>
                    <input
                      type="text"
                      name="note"
                      value={form.note}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4 font-semibold"
                  >
                    Send Now
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
