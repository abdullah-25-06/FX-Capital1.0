import React from "react";
import { TrendingUp, PieChart, Layers } from "lucide-react";

const Finance = () => {
  return (
    <div className='bg-[#0F172A] min-h-screen py-6 px-4'>
      {/* Card */}
      <div className='bg-[#1A1A1A] max-w-sm w-full rounded-2xl shadow-lg p-5 mx-auto'>
        <h2 className='text-base font-semibold mb-4 text-white text-center'>
          Futures Market
        </h2>

        {/* Funds Box */}
        <div className='bg-gradient-to-b from-[#fbe9d7] to-[#f7d6ad] rounded-xl p-4 mb-5 text-black'>
          <h3 className='text-base font-semibold text-center mb-2'>
            Funds in Custody
          </h3>
          <p className='text-2xl font-bold text-center mb-4'>0 USDT</p>

          <div className='grid grid-cols-2 gap-2 text-center text-xs'>
            <div>
              <p className='text-gray-600 text-xs'>Today's Rate of Return</p>
              <p className='font-semibold text-xs'>0.00 USDT</p>
            </div>
            <div>
              <p className='text-gray-600 text-xs'>Cumulative Income</p>
              <p className='font-semibold text-xs'>0 USDT</p>
            </div>
            <div>
              <p className='text-gray-600 text-xs'>Endjusted Orders</p>
              <p className='font-semibold text-xs'>-</p>
            </div>
            <div>
              <p className='text-gray-600 text-xs'>Orders in Custody</p>
              <p className='font-semibold text-xs'>0</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-between mb-5'>
          <button className='flex flex-col items-center bg-[#2a2a2a] text-white w-20 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition'>
            <TrendingUp className='w-4 h-4 mb-1 text-yellow-400' />
            <span className='text-xs font-medium'>Invest</span>
          </button>

          <button className='flex flex-col items-center bg-[#2a2a2a] text-white w-20 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition'>
            <PieChart className='w-4 h-4 mb-1 text-green-400' />
            <span className='text-xs font-medium'>Analyze</span>
          </button>

          <button className='flex flex-col items-center bg-[#2a2a2a] text-white w-20 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition'>
            <Layers className='w-4 h-4 mb-1 text-blue-400' />
            <span className='text-xs font-medium'>Orders</span>
          </button>
        </div>

        {/* Tabs */}
        <div className='flex gap-3'>
          <button className='flex-1 py-2 rounded-full shadow-md border-0 font-medium text-xs transition bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'>
            Summary
          </button>

          <button className='flex-1 py-2 rounded-full shadow-md border-0 font-medium text-xs transition bg-gray-700 text-white hover:bg-gray-600'>
            History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finance;
