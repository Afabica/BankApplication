import { useState } from "react";
import { FaSearch, FaUserFriends, FaCog } from "react-icons/fa";
import { Card } from "@/components/ui/card";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const chats = [
    { id: 1, name: "Alice", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Bob", lastMessage: "Let's catch up later!" },
    { id: 3, name: "Charlie", lastMessage: "Did you see the news?" },
  ];

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Sidebar */}
      <div className="col-span-3 bg-gray-900 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold">Chats</h2>
        <div className="relative my-2">
          <FaSearch className="absolute left-2 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto mt-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 cursor-pointer rounded-lg ${
                selectedChat === chat.id ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <p className="font-semibold">{chat.name}</p>
              <p className="text-sm text-gray-400">{chat.lastMessage}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-around p-4 border-t border-gray-700">
          <FaUserFriends className="text-xl cursor-pointer" />
          <FaCog className="text-xl cursor-pointer" />
        </div>
      </div>

      {/* Chat Window */}
      <div className="col-span-6 flex flex-col bg-gray-100">
        {selectedChat ? (
          <Card className="p-6">Chat with {chats.find(c => c.id === selectedChat)?.name}</Card>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="col-span-3 bg-white p-4 border-l">
        <h3 className="font-bold">Details</h3>
        <p className="text-gray-500 text-sm">Select a chat to see details</p>
      </div>
    </div>
  );
}

