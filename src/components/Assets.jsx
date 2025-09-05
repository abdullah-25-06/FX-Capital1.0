import React, { useState } from "react";
import { Wallet, ArrowDownUp, BarChart3 } from "lucide-react";

const Assets = () => {
  const [activeTab, setActiveTab] = useState("position");

  return (
    <div className="w-full py-8 px-4"> {/* full width + thoda padding */}
      {/* Card */}
      <div className="bg-[#1a1a1a] w-full rounded-2xl shadow-lg p-5">
        <h2 className="text-lg font-semibold mb-4 text-white text-center">
          Available Assets
        </h2>

        {/* Asset Stats */}
        <div className="bg-gradient-to-b from-[#fbe9d7] to-[#f7d6ad] rounded-xl p-4 mb-5 text-black">
          <p className="text-2xl font-bold text-center mb-4">0.00 USDT</p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-gray-600">Yesterday</p>
              <p className="font-semibold">0.00</p>
            </div>
            <div>
              <p className="text-gray-600">Current</p>
              <p className="font-semibold">0.00</p>
            </div>
            <div>
              <p className="text-gray-600">Total</p>
              <p className="font-semibold">0</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-5">
          <button className="flex flex-col items-center bg-[#2a2a2a] text-white w-20 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition border-0">
            <Wallet className="w-5 h-5 mb-1 text-yellow-400" />
            <span className="text-xs font-medium">Recharge</span>
          </button>

          <button className="flex flex-col items-center bg-[#2a2a2a] text-white w-20 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition border-0">
            <ArrowDownUp className="w-5 h-5 mb-1 text-green-400" />
            <span className="text-xs font-medium text-center">Transfer</span>
          </button>

          <button className="flex flex-col items-center bg-[#2a2a2a] text-white w-20 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition border-0">
            <BarChart3 className="w-5 h-5 mb-1 text-blue-400" />
            <span className="text-xs font-medium text-center">Futures</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("position")}
            className={`flex-1 py-2 rounded-full shadow-md border-0 font-medium text-sm transition
              ${
                activeTab === "position"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
          >
            Position
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 rounded-full shadow-md border-0 font-medium text-sm transition
              ${
                activeTab === "history"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
          >
            History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assets;
