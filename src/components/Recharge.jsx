// Recharge.jsx
import React, { useState } from "react";
import { ArrowLeft, X, UploadCloud } from "lucide-react";

const Recharge = ({ onBack }) => {
  const [amount, setAmount] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const rechargeOptions = [500, 2000, 5000, 10000, 50000];

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      console.log("Uploaded file:", file);
      alert(`Uploaded: ${file.name}`);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="relative min-h-screen bg-[#0A1A2F] w-full overflow-y-auto text-white font-sans px-4 py-4">
      {/* Header */}
      <div className="relative flex items-center border-b border-gray-700 pb-3 mb-5">
        <button
          onClick={onBack}
          className="absolute left-0 text-gray-300 hover:text-blue-400 transition"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="mx-auto text-lg font-semibold">Recharge</h1>
      </div>

      {/* Wallet Addresses */}
      <div className="space-y-3">
        {[
          { label: "USDT (TRC20)", value: "bc1qk4jqh72lt9qslyafqfm804gpj5nl80emayvrzd" },
          { label: "USDT (ERC20)", value: "TUDyTymd4Zbv1fJs4VKcbbLLBNYhq6fy2k" },
          { label: "BTC", value: "0x05610e0d2b1dd573a367e358fd137fadc305caa4" },
          { label: "ETH", value: "0x05610e0d2b1dd573a367e358fd137fadc305caa4" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800/70 rounded-md px-3 py-2 flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="text-xs break-all">{item.value}</p>
            </div>
            <button
              className="text-blue-400 text-xs px-2 py-1 rounded hover:bg-blue-500/20"
              onClick={() => {
                navigator.clipboard.writeText(item.value);
                alert("Copied to clipboard!");
              }}
            >
              Copy
            </button>
          </div>
        ))}
      </div>

      {/* Recharge Options */}
      <div className="mt-6">
        <p className="text-sm text-gray-300 mb-2">Recharge Amount (USDT)</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {rechargeOptions.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-2 rounded-md text-sm font-medium transition shadow-sm ${
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
          placeholder="Or enter custom amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-3 w-full px-3 py-2 bg-gray-800 text-base rounded-md outline-none text-white placeholder-gray-400"
        />
      </div>

      {/* Upload Proof */}
      <div className="mt-6">
        <p className="text-sm text-gray-300 mb-2">Upload Proof</p>
        <label className="w-full max-h-52 sm:h-32 border-2 border-dashed border-gray-600 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 relative bg-gray-800/30 transition-all duration-200">
          {selectedFile ? (
            <>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-full object-contain rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1 hover:bg-red-500"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <UploadCloud size={32} className="text-gray-400" />
              <span className="text-gray-400 text-sm text-center">
                Click to upload
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center pb-8 sm:pb-18">
        <button
          onClick={() => {
            if (!amount || !selectedFile) {
              alert("Please select amount and upload an image!");
              return;
            }
            console.log("Recharge submitted with amount:", amount);
            console.log("Uploaded file:", selectedFile);
            alert(`Recharge request submitted: ${amount} USDT`);
          }}
          className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded shadow-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Recharge;
