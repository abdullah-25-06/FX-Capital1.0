import React, { useState, useEffect } from "react";

const Dashboard = ({ setShowSidebar }) => {
  const [currentAd, setCurrentAd] = useState(0);

  // Sample ads data
  const ads = [
    {
      id: 1,
      title: "Special Offer!",
      content: "Get 0% trading fees for the first month on all BTC pairs",
      bgColor: "bg-gradient-to-r from-blue-900 to-blue-700",
    },
    {
      id: 2,
      title: "New Listing",
      content: "Trade the new YOBAHENT/USDT pair with enhanced liquidity",
      bgColor: "bg-gradient-to-r from-purple-900 to-purple-700",
    },
    {
      id: 3,
      title: "Referral Bonus",
      content: "Earn 50% commission on every friend you refer to POLONIEX",
      bgColor: "bg-gradient-to-r from-green-900 to-green-700",
    },
  ];

  // Auto-rotate ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000); // Change ad every 5 seconds

    return () => clearInterval(interval);
  }, [ads.length]);

  const nextAd = () => {
    setCurrentAd((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <div className='mb-16 bg-[#0F172A] min-h-screen px-4 py-4'>
      {/* Header Section */}
      <div className='bg-[#1A1A1A] py-4 px-6 border-b border-gray-700 mb-6 rounded-lg'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <h1 className='text-lg font-bold text-yellow-400 whitespace-nowrap mr-4'>
              FX CAPITAL
            </h1>
            <span className='text-xs text-gray-400 hidden sm:block'>
              fx-capial.online
            </span>
          </div>
          <div className='text-xs text-gray-400'>12:06</div>
        </div>
      </div>

      {/* Total Assets Section */}
      <div className='bg-[#1A1A1A] rounded-lg p-6 mb-6 shadow'>
        <h2 className='text-base font-semibold mb-4 text-gray-300'>
          Total assets equivalent (USDT)
        </h2>
        <p className='text-2xl font-bold text-white'>0.00</p>

        {/* Buttons in single line for mobile - Fixed to stay within screen */}
        <div className='grid grid-cols-2 sm:flex gap-2 mt-4'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs whitespace-nowrap text-center'>
            Recharge
          </button>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs whitespace-nowrap text-center'>
            Withdrawal
          </button>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs whitespace-nowrap text-center'>
            Transaction
          </button>
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs whitespace-nowrap text-center'>
            Futures Market
          </button>
        </div>
      </div>

      {/* Ad Slider Section */}
      <div className='bg-[#1A1A1A] rounded-lg p-4 mb-6 shadow relative overflow-hidden'>
        <div
          className={`${ads[currentAd].bgColor} rounded-lg p-4 text-white transition-all duration-500`}
        >
          <h3 className='text-base font-semibold mb-2'>
            {ads[currentAd].title}
          </h3>
          <p className='text-xs'>{ads[currentAd].content}</p>

          {/* Navigation dots */}
          <div className='flex justify-center mt-4 space-x-2'>
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAd(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentAd ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevAd}
            className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1 hover:bg-opacity-50 transition-all'
          >
            <svg
              className='w-4 h-4 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            onClick={nextAd}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1 hover:bg-opacity-50 transition-all'
          >
            <svg
              className='w-4 h-4 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrolling Banner Section */}
      <div className='bg-gradient-to-r from-red-900 to-red-700 rounded-lg p-3 mb-6 shadow overflow-hidden'>
        <div className='relative w-full'>
          <div className='animate-scroll whitespace-nowrap text-white text-xs'>
            🔥 In your payment, please feel free to contact our representatives
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🔥 In your payment, please feel free
            to contact our representatives &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🔥 In
            your payment, please feel free to contact our representatives
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🔥 In your payment, please feel free
            to contact our representatives
          </div>
        </div>
      </div>

      {/* Trading Pairs Section */}
      <div className='bg-[#1A1A1A] rounded-lg p-6 mb-6 shadow'>
        <h3 className='text-base font-semibold mb-4 text-white'>
          Show trade these coins with Unocoin.
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-gray-700'>
                <th className='py-2 text-left text-gray-400 text-xs'>
                  Trading Pair
                </th>
                <th className='py-2 text-left text-gray-400 text-xs'>Status</th>
                <th className='py-2 text-left text-gray-400 text-xs'>
                  Latest Price
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  pair: "BTC/USDT",
                  status: "in transaction",
                  price: "16,993.0080",
                },
                {
                  pair: "ETH/USDT",
                  status: "in transaction",
                  price: "2,345.37",
                },
                {
                  pair: "BNB/USDT",
                  status: "in transaction",
                  price: "845.3770",
                },
                {
                  pair: "YOBAHENT/USDT",
                  status: "in transaction",
                  price: "Notebook",
                },
              ].map((coin, index) => (
                <tr key={index} className='border-b border-gray-700'>
                  <td className='py-3 text-white text-xs'>{coin.pair}</td>
                  <td className='py-3 text-green-400 text-xs'>{coin.status}</td>
                  <td className='py-3 text-white text-xs'>{coin.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Section */}
      <div className='bg-[#1A1A1A] rounded-lg p-6 shadow'>
        <h3 className='text-base font-semibold mb-2 text-white'>
          When and how did it all start?
        </h3>
        <p className='text-gray-300 text-xs'>
          On the 15th of December 2013, when India started trading crypto
          assets!
        </p>
      </div>

      {/* Add custom CSS for scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
