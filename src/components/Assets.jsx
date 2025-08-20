import React from "react";

const Assets = () => {
  return (
    <div className='mb-16'>
      <div className='bg-poloniex-gray rounded-lg p-6 shadow'>
        <h2 className='text-xl font-semibold mb-6'>Available Assets</h2>

        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg'>Convert total assets</h3>
          <button className='text-poloniex-blue'>
            Account change record ►
          </button>
        </div>

        <div className='bg-gray-800 rounded-lg p-6 mb-6'>
          <p className='text-3xl font-bold text-center mb-6'>0.00 USDT</p>

          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <p className='text-gray-400'>Yesterday's income[USDT]</p>
              <p className='text-lg'>0.00</p>
            </div>
            <div>
              <p className='text-gray-400'>Current earnings[USDT]</p>
              <p className='text-lg'>0.00</p>
            </div>
            <div>
              <p className='text-gray-400'>Total revenue[USDT]</p>
              <p className='text-lg'>0</p>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-4 mb-6'>
          <button className='bg-poloniex-blue hover:bg-blue-700 text-white px-6 py-2 rounded'>
            Recharge
          </button>
          <button className='bg-poloniex-blue hover:bg-blue-700 text-white px-6 py-2 rounded'>
            Withdrawal/Transfer
          </button>
          <button className='bg-poloniex-blue hover:bg-blue-700 text-white px-6 py-2 rounded'>
            Futures Market
          </button>
        </div>

        <div className='flex gap-4'>
          <button className='bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded'>
            Position
          </button>
          <button className='bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded'>
            History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assets;
