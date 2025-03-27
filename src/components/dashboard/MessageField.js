"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default MessageField = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

  };

  useEffect(() => {
    const fetchCache = async () => {
      const response = await axios.get("http:127.0.0.1/cache/messages");
    };

    if (response.status === 200) {
      setUserData(response.data);
    } else {
      console.error("Error fetching data of current user.");
    }
  });

  return (
    <div className="flex flex-col max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto p-2 border rounded mb-2 bg-gray-100">
        {message.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="p-2 bg-blue-100 rounded my-1">
              {msg}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};
