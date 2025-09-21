import React, { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";

const Recharge = ({ onBack }) => {
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const rechargeOptions = [500, 2000, 5000, 10000, 50000];

  const wallets = [
    { label: "USDT (TRC20)", value: "bc1qk4jqh72lt9qslyafqfm804gpj5nl80emayvrzd" },
    { label: "USDT (ERC20)", value: "TUDyTymd4Zbv1fJs4VKcbbLLBNYhq6fy2k" },
    { label: "BTC", value: "0x05610e0d2b1dd573a367e358fd137fadc305caa4" },
    { label: "ETH", value: "0x05610e0d2b1dd573a367e358fd137fadc305caa4" },
  ];

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-[#0A1A2F] min-h-screen text-white font-roboto">
      {/* Header */}
      <div className="flex items-center mb-6 p-3 pt-0">
        <button
          onClick={onBack}
          className="text-gray-300 hover:text-blue-400"
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="ml-3 text-2xl font-light text-white">Recharge</h1>
      </div>

      {/* Wallets */}
      <div className="space-y-4 p-3 pt-0">
        {wallets.map((item, idx) => (
          <div key={idx}>
            <p className="text-sm text-gray-400 font-light mb-1">{item.label}</p>
            <div className="bg-gray-800 rounded-lg px-3 py-2 flex justify-between items-center">
              <span className="text-sm text-white font-reddit break-all">
                {item.value}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(item.value);
                  alert(`${item.label} address copied!`);
                }}
                className="text-blue-400 text-sm font-light"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Amount Options */}
      <div className="mt-6 p-3 pt-0">
        <p className="text-sm text-gray-400 font-light mb-3">
          Number of recharges (USDT)
        </p>
        <div className="grid grid-cols-3 gap-2">
          {rechargeOptions.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-3 rounded-lg text-sm transition font-light ${
                amount === value
                  ? "bg-blue-600 text-white font-reddit"
                  : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white font-reddit"
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
          className="mt-4 w-full px-3 py-3 bg-gray-800 text-white text-sm rounded-lg font-reddit outline-none placeholder-gray-400"
        />
      </div>

      {/* Upload */}
      <div className="mt-6 p-3 pt-0">
        <p className="text-sm text-gray-400 font-light mb-2">
          Upload recharge certificate
        </p>

        <div
          onClick={() => fileInputRef.current.click()}
          className="w-full h-24 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400"
        >
          <span className="text-gray-400 text-sm font-light">
            {file ? file.name : "Click to upload"}
          </span>
        </div>

        {/* ✅ Properly hidden input using Tailwind sr-only */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="sr-only"
        />
      </div>

      {/* Submit */}
      <div className="mt-6 p-3 pt-0">
        <button
          onClick={() => {
            if (!amount) {
              alert("Please enter recharge amount");
              return;
            }
            if (!file) {
              alert("Please upload recharge certificate");
              return;
            }
            alert(`Recharge request submitted: ${amount} USDT\nFile: ${file.name}`);
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-reddit text-lg rounded-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Recharge;
