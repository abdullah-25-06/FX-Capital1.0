import React from "react";

const Finance = ({ setShowSidebar }) => {
  return (
    <div className='mb-16'>
      <div className='bg-card rounded-medium p-6'>
        <h2 className='text-xl font-semibold mb-6 border-b border-border-custom pb-3 text-primary'>
          Futures Market
        </h2>

        {/* Funds in custody section */}
        <div className='bg-darker-bg rounded-medium p-6 mb-6'>
          <h3 className='text-lg font-semibold mb-4 text-teal'>
            Funds in custody
          </h3>

          {/* Main funds display */}
          <div className='text-center mb-6'>
            <p className='text-4xl font-bold text-primary mb-2'>0 USDT</p>
          </div>

          {/* Financial information */}
          <div className='space-y-4'>
            <div className='flex justify-between items-center border-b border-border-custom pb-2'>
              <span className='text-secondary'>
                Estimated today's rate of return
              </span>
              <span className='text-primary font-semibold'>0.00 USDT</span>
            </div>

            <div className='flex justify-between items-center border-b border-border-custom pb-2'>
              <span className='text-secondary'>Cumulative Income</span>
              <span className='text-primary font-semibold'>0 USDT</span>
            </div>

            <div className='flex justify-between items-center border-b border-border-custom pb-2'>
              <span className='text-secondary'>Endjusted Orders</span>
              <span className='text-orange font-semibold'>-</span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-secondary'>Orders in Custody</span>
              <span className='text-primary font-semibold'>0</span>
            </div>
          </div>

          {/* Entrusted Orders tab */}
          <div className='mt-4'>
            <span className='bg-orange text-dark-bg px-3 py-1 rounded-small text-xs'>
              Entrusted Orders
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className='flex flex-wrap gap-3 justify-center mt-6'>
          <button className='bg-blue text-white px-6 py-2 rounded-pill font-medium text-sm'>
            New Order
          </button>

          <button className='bg-green text-white px-6 py-2 rounded-pill font-medium text-sm'>
            View Positions
          </button>

          <button className='bg-purple text-white px-6 py-2 rounded-pill font-medium text-sm'>
            Order History
          </button>
        </div>

        {/* Status indicators */}
        <div className='mt-6 pt-6 border-t border-border-custom'>
          <div className='grid grid-cols-2 gap-4 text-center'>
            <div className='bg-darker-bg p-3 rounded-small border border-border-custom'>
              <p className='text-secondary text-xs mb-1'>Open Positions</p>
              <p className='font-bold text-primary text-lg'>0</p>
            </div>

            <div className='bg-darker-bg p-3 rounded-small border border-border-custom'>
              <p className='text-secondary text-xs mb-1'>Pending Orders</p>
              <p className='font-bold text-primary text-lg'>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
