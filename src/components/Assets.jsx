import React, { useState } from "react";
import {
  Wallet,
  ArrowDownUp,
  BarChart3,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";
import Withdraw from "./Withdraw"; 
import Recharge from "./Recharge";  // ✅ Import Recharge page

const Assets = () => {
  const [activeTab, setActiveTab] = useState("position");
  const [showAssets, setShowAssets] = useState(true);
  const [page, setPage] = useState("assets"); 

  // Withdraw Page
  const renderWithdraw = () => (
    <Withdraw onClose={() => setPage("assets")} />
  );

  // ✅ Recharge Page
  const renderRecharge = () => (
    <Recharge onBack={() => setPage("assets")} />
  );

  // Assets Main Page
  const renderAssets = () => (
    <div className="w-full min-h-screen bg-[#0a1a2f] flex flex-col font-sans">
      <div className="w-full max-w-md mx-auto">
        {/* Heading */}
        <h2 className="text-white text-base font-medium text-center mb-2">
          Available Assets
        </h2>

        {/* Card */}
        <div className="bg-gradient-to-b from-[#fbe9d7] to-[#f7d6ad] w-full rounded-xl shadow p-4 text-black mb-8">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs flex items-center gap-1">
              Convert total assets
              <span
                className="cursor-pointer"
                onClick={() => setShowAssets(!showAssets)}
              >
                {showAssets ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </p>
            <button className="bg-[#6b4c1f] text-white text-[11px] px-3 py-1 rounded-full">
              Account change record →
            </button>
          </div>

          {/* Total Assets */}
          <p className="text-2xl font-bold mb-4 flex items-center gap-2">
            {showAssets ? "887.56" : "****"}
            <span className="text-sm font-normal">USDT</span>
          </p>

          {/* Asset Stats */}
          <div className="grid grid-cols-3 text-xs">
            <div>
              <p className="text-gray-600">Yesterday's income(USDT)</p>
              <p className="font-semibold text-base">42.56</p>
            </div>
            <div>
              <p className="text-gray-600">Current earnings(USDT)</p>
              <p className="font-semibold text-base">0.00</p>
            </div>
            <div>
              <p className="text-gray-600">Total revenue(USDT)</p>
              <p className="font-semibold text-base">42.56</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around text-center text-xs text-white mb-8">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setPage("recharge")}   // ✅ Recharge page call
          >
            <Wallet className="w-6 h-6 mb-1 text-[#c49a6c]" />
            <span>Recharge</span>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setPage("withdraw")}   // ✅ Withdraw page call
          >
            <ArrowDownUp className="w-6 h-6 mb-1 text-[#c49a6c]" />
            <span>Withdrawal/Transfer</span>
          </div>

          <div className="flex flex-col items-center">
            <BarChart3 className="w-6 h-6 mb-1 text-[#c49a6c]" />
            <span>Futures Market</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#2a2a2a] rounded-full p-1 mb-8">
          <button
            onClick={() => setActiveTab("position")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition 
              ${activeTab === "position"
                ? "bg-gradient-to-r from-[#fbe9d7] to-[#f7d6ad] text-black"
                : "text-white"
              }`}
          >
            Position
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition 
              ${activeTab === "history"
                ? "bg-gradient-to-r from-[#fbe9d7] to-[#f7d6ad] text-black"
                : "text-white"
              }`}
          >
            History
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center text-gray-400">
          <FileText className="w-12 h-12 mb-2 text-gray-500" />
          <p className="text-sm">No Data</p>
        </div>
      </div>
    </div>
  );

  // Main return
  return page === "assets"
    ? renderAssets()
    : page === "recharge"
    ? renderRecharge()
    : renderWithdraw();
};

export default Assets;
