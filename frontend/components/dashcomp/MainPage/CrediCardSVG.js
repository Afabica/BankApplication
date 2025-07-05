import React from "react";

export default function CreditCardSVG() {
  return (
    <div className="w-[320px] h-[200px]">
      <div className="w-[320px] h-[200px] bg-gradient-to-br from-indigo-600 to-purple-500 rounded-xl text-white p-5 shadow-lg flex flex-col justify-between font-sans">
        {/* Top section */}
        <div className="flex justify-between items-center">
          {/* Chip (CSS box) */}
          <div className="w-10 h-8 bg-yellow-400 rounded-sm shadow-inner relative">
            <div className="absolute top-0 left-1 w-8 h-[2px] bg-yellow-700" />
            <div className="absolute top-1.5 left-1 w-8 h-[2px] bg-yellow-700" />
            <div className="absolute top-3 left-1 w-8 h-[2px] bg-yellow-700" />
          </div>

          {/* Visa or Mastercard text or emoji */}
          <div className="text-lg font-bold tracking-wider">VISA</div>
          {/* Or use emoji placeholder: 💳 / 💰 / 🟡🔴 */}
        </div>

        {/* Middle section */}
        <div className="text-lg tracking-widest mt-4 select-none">
          **** **** **** 1234
        </div>

        {/* Bottom section */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <div>
            <p className="uppercase text-xs opacity-70">Card Holder</p>
            <p className="font-semibold">John Doe</p>
          </div>
          <div>
            <p className="uppercase text-xs opacity-70">Expires</p>
            <p className="font-semibold">12/27</p>
          </div>
        </div>
      </div>
    </div>
  );
}
