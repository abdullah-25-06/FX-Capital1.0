import React from "react";

const Finance = ({ setShowSidebar }) => {
  return (
    <div className='mb-16'>
      <div className='bg-white rounded-lg p-6 shadow-sm border border-poloniex-border'>
        <h2 className='text-xl font-semibold mb-6 border-b border-poloniex-border pb-3'>
          Futures Market
        </h2>

        <div className='bg-poloniex-section rounded-lg p-6 mb-6 border border-poloniex-border'>
          <h3 className='text-lg font-semibold mb-4'>Funds in custody</h3>
          <p className='text-2xl font-bold mb-6'>0 USDT</p>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-poloniex-gray text-sm'>
                Estimated today's rate of return
              </p>
              <p className='font-medium'>0.00 USDT</p>
            </div>
            <div>
              <p className='text-poloniex-gray text-sm'>Cumulative Income</p>
              <p className='font-medium'>0 USDT</p>
            </div>
            <div>
              <p className='text-poloniex-gray text-sm'>Endjusted Orders</p>
              <p className='font-medium'>-</p>
            </div>
            <div>
              <p className='text-poloniex-gray text-sm'>Orders in Custody</p>
              <p className='font-medium'>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
