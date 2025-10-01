// Recharge.jsx
import React, { useState } from "react";
import { ArrowLeft, X } from "lucide-react";

const Recharge = ({ onBack }) => {
  const [amount, setAmount] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // for image upload
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
    <div className="bg-[#0A1A2F] min-h-screen text-white font-sans px-4">
      {/* Header */}
      <div className="flex items-center mb-6 py-4">
        <button
          onClick={onBack}
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
              <button
                className="text-blue-400 text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(item.value);
                  alert("Copied to clipboard!");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recharge Options */}
      <div className="mt-6">
        <p className="text-sm text-gray-300 mb-3">Number of recharges (USDT)</p>
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
        <label className="w-full h-24 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 relative">
          {selectedFile ? (
            <>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
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
            <span className="text-gray-400 text-sm">Click to upload</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            multiple={false} // sirf ek file
          />
        </label>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
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
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Recharge;
