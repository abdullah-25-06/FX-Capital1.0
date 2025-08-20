import React, { useState } from "react";

const Assets = ({ setShowSidebar }) => {
  const [totalAssets, setTotalAssets] = useState(0.0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecharge = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setTotalAssets((prev) => prev + 100);
      setIsProcessing(false);
      alert("Successfully recharged 100 USDT");
    }, 1500);
  };

  const handleWithdraw = () => {
    if (totalAssets < 50) {
      alert("Insufficient funds. Minimum withdrawal is 50 USDT");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setTotalAssets((prev) => prev - 50);
      setIsProcessing(false);
      alert("Successfully withdrew 50 USDT");
    }, 1500);
  };

  return (
    <div className='mb-16'>
      <div className='bg-card-bg rounded-lg p-6 border border-border-custom'>
        <h2 className='text-xl font-semibold mb-6 border-b border-border-custom pb-3 text-gold'>
          Available Assets
        </h2>

        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg text-teal'>Convert total assets</h3>
          <button className='text-orange text-sm'>
            Account change record ►
          </button>
        </div>

        <div className='bg-darker-bg rounded-lg p-6 mb-6 border border-border-custom'>
          <p className='text-2xl font-bold text-center mb-6 text-gold'>
            {totalAssets.toFixed(2)} USDT
          </p>

          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <p className='text-teal text-sm'>Yesterday's income[USDT]</p>
              <p className='font-medium text-gold'>0.00</p>
            </div>
            <div>
              <p className='text-teal text-sm'>Current earnings[USDT]</p>
              <p className='font-medium text-gold'>0.00</p>
            </div>
            <div>
              <p className='text-teal text-sm'>Total revenue[USDT]</p>
              <p className='font-medium text-gold'>0</p>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-3 mb-6'>
          <button
            onClick={handleRecharge}
            disabled={isProcessing}
            className='bg-teal text-dark-bg px-6 py-2 rounded font-medium disabled:opacity-50'
          >
            {isProcessing ? "Processing..." : "Recharge"}
          </button>
          <button
            onClick={handleWithdraw}
            disabled={isProcessing || totalAssets < 50}
            className='bg-green text-dark-bg px-6 py-2 rounded font-medium disabled:opacity-50'
          >
            {isProcessing ? "Processing..." : "Withdrawal/Transfer"}
          </button>
          <button className='bg-orange text-dark-bg px-6 py-2 rounded font-medium'>
            Futures Market
          </button>
        </div>

        <div className='flex gap-3'>
          <button className='bg-blue text-white px-6 py-2 rounded font-medium'>
            Position
          </button>
          <button className='bg-pink text-white px-6 py-2 rounded font-medium'>
            History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assets;
