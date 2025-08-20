import React, { useState } from "react";

const Assets = ({ setShowSidebar }) => {
  const [totalAssets, setTotalAssets] = useState(0.0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("position");

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
      <div className='bg-card rounded-medium p-6'>
        <h2 className='text-xl font-semibold mb-6 border-b border-border-custom pb-3 text-primary'>
          Available Assets
        </h2>

        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg text-secondary'>Convert total assets</h3>
          <button className='text-orange text-sm flex items-center'>
            Account change record <span className='ml-1'>►</span>
          </button>
        </div>

        <div className='bg-beige rounded-medium p-6 mb-6'>
          <p className='text-2xl font-bold text-center mb-6 text-dark'>
            {totalAssets.toFixed(2)} USDT
          </p>

          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <p className='text-secondary text-xs'>Yesterday's income[USDT]</p>
              <p className='font-medium text-dark text-sm'>0.00</p>
            </div>
            <div>
              <p className='text-secondary text-xs'>Current earnings[USDT]</p>
              <p className='font-medium text-dark text-sm'>0.00</p>
            </div>
            <div>
              <p className='text-secondary text-xs'>Total revenue[USDT]</p>
              <p className='font-medium text-dark text-sm'>0</p>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-3 justify-center mb-6'>
          <button
            onClick={handleRecharge}
            disabled={isProcessing}
            className='bg-blue text-white px-4 py-2 rounded-circle flex items-center justify-center w-12 h-12 disabled:opacity-50'
          >
            <span className='text-xl'>💰</span>
          </button>

          <button
            onClick={handleWithdraw}
            disabled={isProcessing || totalAssets < 50}
            className='bg-orange text-white px-4 py-2 rounded-circle flex items-center justify-center w-12 h-12 disabled:opacity-50'
          >
            <span className='text-xl'>↓</span>
          </button>

          <button className='bg-orange text-white px-4 py-2 rounded-circle flex items-center justify-center w-12 h-12'>
            <span className='text-xl'>₿</span>
          </button>
        </div>

        <div className='flex justify-center mb-6'>
          <div className='bg-beige rounded-pill p-1 flex'>
            <button
              className={`px-4 py-2 rounded-pill text-sm ${
                activeTab === "position" ? "bg-blue text-white" : "text-dark"
              }`}
              onClick={() => setActiveTab("position")}
            >
              Position
            </button>
            <button
              className={`px-4 py-2 rounded-pill text-sm ${
                activeTab === "history" ? "bg-blue text-white" : "text-dark"
              }`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>
        </div>

        {/* Empty position illustration */}
        <div className='text-center py-8'>
          <div className='text-blue text-4xl mb-2'>📄✨</div>
          <p className='text-secondary'>No positions yet</p>
        </div>
      </div>
    </div>
  );
};

export default Assets;
