import React from "react";

const FundsCard = () => {
  return (
    <div className="w-full px-2">  {/* 👈 yahan halki si side padding di */}
      {/* Heading same as Assets page */}
      <h2 className="text-white text-base font-medium text-center mb-2">
        Futures Market
      </h2>

      {/* Funds Card */}
      <div className="bg-gradient-to-b from-[#FFE9C7] to-[#F7D6AD] rounded-xl p-4 shadow-md text-black">
        {/* Header with tag */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">Funds in custody</span>
          <span className="bg-[#5B482B] text-white text-xs font-medium px-2 py-1 rounded-full">
            Entrusted Orders
          </span>
        </div>

        {/* Main amount */}
        <p className="text-2xl font-bold mb-4">0 USDT</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-700">
          <div className="flex flex-col items-start">
            <span>Estimated today's rate of return</span>
            <span className="font-semibold mt-1">0.00 USDT</span>
          </div>
          <div className="flex flex-col items-start">
            <span>Cumulative Income</span>
            <span className="font-semibold mt-1">0 USDT</span>
          </div>
          <div className="flex flex-col items-start">
            <span>Orders in Custody</span>
            <span className="font-semibold mt-1">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundsCard;
