import React from "react";

const Finance = ({ setShowSidebar }) => {
  return (
    <div className='mb-16'>
      <div className='bg-card-bg rounded-lg p-6 border border-border-custom'>
        <h2 className='text-xl font-semibold mb-6 border-b border-border-custom pb-3 text-gold'>
          Futures Market
        </h2>

        {/* Funds in custody section - EXACT from your design */}
        <div className='bg-darker-bg rounded-lg p-6 mb-6 border border-border-custom'>
          <h3 className='text-lg font-semibold mb-4 text-teal'>
            Funds in custody
          </h3>

          {/* Main funds display - centered like in your design */}
          <div className='text-center mb-8'>
            <p className='text-4xl font-bold text-gold mb-2'>0 USDT</p>
          </div>

          {/* Financial information - exactly as in your design */}
          <div className='space-y-4'>
            <div className='flex justify-between items-center border-b border-border-custom pb-2'>
              <span className='text-teal'>
                Estimated today's rate of return
              </span>
              <span className='text-gold font-semibold'>0.00 USDT</span>
            </div>

            <div className='flex justify-between items-center border-b border-border-custom pb-2'>
              <span className='text-teal'>Cumulative Income</span>
              <span className='text-gold font-semibold'>0 USDT</span>
            </div>

            <div className='flex justify-between items-center border-b border-border-custom pb-2'>
              <span className='text-teal'>Endjusted Orders</span>
              <span className='text-orange font-semibold'>-</span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-teal'>Orders in Custody</span>
              <span className='text-gold font-semibold'>0</span>
            </div>
          </div>
        </div>

        {/* Quick actions - styled like your design */}
        <div className='flex flex-wrap gap-3 justify-center mt-8'>
          <button className='bg-teal text-dark-bg px-6 py-2 rounded font-medium text-sm'>
            New Order
          </button>

          <button className='bg-green text-dark-bg px-6 py-2 rounded font-medium text-sm'>
            View Positions
          </button>

          <button className='bg-blue text-white px-6 py-2 rounded font-medium text-sm'>
            Order History
          </button>
        </div>

        {/* Status indicators - similar to your design */}
        <div className='mt-6 pt-6 border-t border-border-custom'>
          <div className='grid grid-cols-2 gap-4 text-center'>
            <div className='bg-darker-bg p-3 rounded border border-border-custom'>
              <p className='text-teal text-xs mb-1'>Open Positions</p>
              <p className='font-bold text-gold text-lg'>0</p>
            </div>

            <div className='bg-darker-bg p-3 rounded border border-border-custom'>
              <p className='text-teal text-xs mb-1'>Pending Orders</p>
              <p className='font-bold text-gold text-lg'>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
