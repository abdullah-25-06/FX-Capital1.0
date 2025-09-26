import React, { useState } from "react";
import {
  Wallet,
  ArrowDownUp,
  BarChart3,
  FileText,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

const Assets = () => {
  const [activeTab, setActiveTab] = useState("position");
  const [page, setPage] = useState("assets");
  const [amount, setAmount] = useState("");
  const [showAssets, setShowAssets] = useState(true);

  const rechargeOptions = [500, 2000, 5000, 10000, 50000];

  // Recharge Page
  const renderRecharge = () => (
    <div className="bg-[#0A1A2F] min-h-screen text-white font-sans px-4">
      {/* Header */}
      <div className="flex items-center mb-6 py-4">
        <button
          onClick={() => setPage("assets")}
          className="text-gray-300 hover:text-blue-400"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="ml-3 text-lg font-semibold">Recharge</h1>
      </div>

      {/* Wallet Addresses */}
      <div className="space-y-4">
        {[
          {
            label: "USDT (TRC20)",
            value: "bc1qk4jqh72lt9qslyafqfm804gpj5nl80emayvrzd",
          },
          { label: "USDT (ERC20)", value: "TUDyTymd4Zbv1fJs4VKcbbLLBNYhq6fy2k" },
          { label: "BTC", value: "0x05610e0d2b1dd573a367e358fd137fadc305caa4" },
          { label: "ETH", value: "0x05610e0d2b1dd573a367e358fd137fadc305caa4" },
        ].map((item, idx) => (
          <div key={idx}>
            <p className="text-sm text-gray-300 mb-1">{item.label}</p>
            <div className="bg-gray-800 rounded-lg px-3 py-2 flex justify-between items-center">
              <span className="text-xs break-all">{item.value}</span>
              <button className="text-blue-400 text-xs">Copy</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recharge Options */}
      <div className="mt-6">
        <p className="text-sm text-gray-300 mb-3">
          Number of recharges (USDT)
        </p>
        <div className="grid grid-cols-3 gap-2">
          {rechargeOptions.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-2 rounded-lg text-sm font-medium transition ${
                amount === value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Please enter the amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-4 w-full px-3 py-2 bg-gray-800 text-sm rounded-lg outline-none text-white placeholder-gray-400"
        />
      </div>

      {/* Upload Proof */}
      <div className="mt-6">
        <p className="text-sm text-gray-300 mb-2">Upload recharge certificate</p>
        <div className="w-full h-24 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400">
          <span className="text-gray-400 text-sm">Upload</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={() => {
            console.log("Recharge submitted with amount:", amount);
            alert(`Recharge request submitted: ${amount} USDT`);
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );

  // Assets Main Page
  const renderAssets = () => (
    <div className="w-full min-h-screen bg-[#0a1a2f] flex flex-col font-sans">
      <div className="w-full max-w-md mx-auto">
        {/* Heading */}
        <h2 className="text-white text-base font-medium text-center mb-3">
          Available Assets
        </h2>

        {/* Card */}
        <div className="bg-gradient-to-b from-[#fbe9d7] to-[#f7d6ad] w-full rounded-xl shadow p-4 text-black mb-8">
          {/* Header */}
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
              Account change record &rarr;
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
              <p className="text-gray-600">Yesterday&apos;s income(USDT)</p>
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
            onClick={() => setPage("recharge")}
          >
            <Wallet className="w-6 h-6 mb-1 text-[#c49a6c]" />
            <span>Recharge</span>
          </div>
          <div className="flex flex-col items-center">
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
              ${
                activeTab === "position"
                  ? "bg-gradient-to-r from-[#fbe9d7] to-[#f7d6ad] text-black"
                  : "text-white"
              }`}
          >
            Position
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition 
              ${
                activeTab === "history"
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

  return page === "assets" ? renderAssets() : renderRecharge();
};

export default Assets;
