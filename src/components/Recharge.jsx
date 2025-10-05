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

  const handleSubmit = () => {
    if (!amount || !selectedFile) {
      alert("Please select amount and upload an image!");
      return;
    }
    console.log("Recharge submitted with amount:", amount);
    console.log("Uploaded file:", selectedFile);
    alert(`Recharge request submitted: ${amount} USDT`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1220] min-h-screen text-white font-sans overflow-y-auto pb-[calc(2rem+env(safe-area-inset-bottom))]">
      {/* Header (same as Withdraw) */}
      <div className="flex items-center px-4 py-3 border-b border-blue-900">
        <button onClick={onBack} className="text-gray-300 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center text-base font-medium">Recharge</h1>
        <div className="w-6" /> {/* Empty div for spacing like Withdraw page */}
      </div>

      {/* Recharge Options */}
      <div className="px-4 mt-6 space-y-4 text-sm">
        {/* Recharge Amount */}
        <p className="text-gray-400 text-xs mb-1">Recharge Amount (USDT)</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {rechargeOptions.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-2 rounded-md text-sm font-medium transition shadow-sm ${
                amount === value
                  ? "bg-blue-500 text-white"
                  : "bg-[#121c30] text-gray-300 hover:bg-blue-500 hover:text-white"
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
          className="w-full p-2 mt-3 rounded border border-blue-900 bg-[#121c30] text-white text-sm placeholder-gray-400"
        />

        {/* Upload Proof */}
        <p className="text-gray-400 text-xs mt-4 mb-1">Upload Proof</p>
        <label className="w-full max-h-52 sm:h-32 border-2 border-dashed border-blue-900 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 relative bg-[#121c30] transition-all duration-200">
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
                className="absolute top-1 right-1 bg-[#0b1220] text-white rounded-full p-1 hover:bg-red-500"
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

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white py-2 rounded text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
