import React from "react";

const Futures = () => {
  return (
    <div className='mb-16'>
      <div className='bg-poloniex-gray rounded-lg p-6 shadow'>
        <h2 className='text-xl font-semibold mb-6'>Futures Market</h2>

        <div className='bg-gray-800 rounded-lg p-6 mb-6'>
          <h3 className='text-lg font-semibold mb-4'>Funds in custody</h3>
          <p className='text-3xl font-bold mb-6'>0 USDT</p>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-gray-400'>Estimated today's rate of return</p>
              <p className='text-lg'>0.00 USDT</p>
            </div>
            <div>
              <p className='text-gray-400'>Cumulative Income</p>
              <p className='text-lg'>0 USDT</p>
            </div>
            <div>
              <p className='text-gray-400'>Endjusted Orders</p>
              <p className='text-lg'>-</p>
            </div>
            <div>
              <p className='text-gray-400'>Orders in Custody</p>
              <p className='text-lg'>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Futures;
