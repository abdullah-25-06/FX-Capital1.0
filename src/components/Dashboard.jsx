import React, { useState, useEffect } from "react";
import { Wallet, ArrowDownCircle, Receipt, LineChart } from "lucide-react";

const Dashboard = ({ setShowSidebar }) => {
  const [currentAd, setCurrentAd] = useState(0);

  // Sample ads data
  const ads = [
    {
      id: 1,
      title: "🔥 Special Offer!",
      content: "Get 0% trading fees for the first month on all BTC pairs",
      bgColor: "bg-gradient-to-r from-blue-800 to-blue-600",
    },
    {
      id: 2,
      title: "✨ New Listing",
      content: "Trade the new YOBAHENT/USDT pair with enhanced liquidity",
      bgColor: "bg-gradient-to-r from-purple-800 to-purple-600",
    },
    {
      id: 3,
      title: "🎁 Referral Bonus",
      content: "Earn 50% commission on every friend you refer to POLONIEX",
      bgColor: "bg-gradient-to-r from-green-800 to-green-600",
    },
  ];

  // Auto-rotate ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads.length]);

  const nextAd = () => setCurrentAd((prev) => (prev + 1) % ads.length);
  const prevAd = () =>
    setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);

  return (
    <div className='mb-16 bg-[#0F172A] min-h-screen px-4 py-6'>
      {/* Header Section */}
      <div className='py-4 px-6 mb-6'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <img src='/Logo.png' alt='Logo' className='w-8 h-8 mr-2' />
            <h1 className='text-lg font-bold text-yellow-400 mr-4'>
              FX CAPITAL
            </h1>
            <span className='text-xs text-gray-400 hidden sm:block'>
              fx-capital.online
            </span>
          </div>
          <div className='text-xs text-gray-400'>12:06</div>
        </div>
      </div>

{/* Total Assets Section */}
<div className='p-6 mb-6'>
  <h2 className='text-base font-semibold mb-3 text-gray-300'>
    Total Assets (USDT)
  </h2>
  <p className='text-3xl font-bold text-white'>0.00</p>

  {/* Buttons Row */}
  <div className='grid grid-cols-4 gap-2 mt-5'>
    <div className='flex flex-col items-center'>
      <button className='w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-full transition'>
        <Wallet size={24} />
      </button>
      <span className='text-xs text-gray-400 mt-2'>Wallet</span>
    </div>
    <div className='flex flex-col items-center'>
      <button className='w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-full transition'>
        <ArrowDownCircle size={24} />
      </button>
      <span className='text-xs text-gray-400 mt-2'>Deposit</span>
    </div>
    <div className='flex flex-col items-center'>
      <button className='w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-full transition'>
        <Receipt size={24} />
      </button>
      <span className='text-xs text-gray-400 mt-2'>History</span>
    </div>
    <div className='flex flex-col items-center'>
      <button className='w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-full transition'>
        <LineChart size={24} />
      </button>
      <span className='text-xs text-gray-400 mt-2'>Analytics</span>
    </div>
  </div>
</div>

      {/* Ad Slider Section */}
      <div className='p-4 mb-6 relative overflow-hidden'>
        <div
          className={`${ads[currentAd].bgColor} rounded-xl p-5 text-white transition-all duration-700`}
        >
          <h3 className='text-lg font-semibold mb-2'>{ads[currentAd].title}</h3>
          <p className='text-sm opacity-90'>{ads[currentAd].content}</p>

          {/* Navigation dots */}
          <div className='flex justify-center mt-4 space-x-2'>
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAd(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentAd ? "bg-white scale-110" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevAd}
            className='absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 hover:bg-black/60 transition'
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
            className='absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 hover:bg-black/60 transition'
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

      {/* Scrolling Banner */}
      <div className='bg-gradient-to-r from-red-700 to-red-500 rounded-xl p-3 mb-6 overflow-hidden'>
        <div className='relative w-full'>
          <div className='animate-scroll whitespace-nowrap text-white text-sm font-medium'>
            🔥 In your payment, please feel free to contact our representatives
            🔥 &nbsp;&nbsp;&nbsp; 🔥 In your payment, please feel free to
            contact our representatives 🔥
          </div>
        </div>
      </div>

      {/* Trading Pairs Section */}
      <div className='p-6 mb-6'>
        <h3 className='text-base font-semibold mb-4 text-white'>
          Trade these coins with Unocoin
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse'>
            <thead>
              <tr className='text-gray-400 text-xs'>
                <th className='py-2 text-left'>Trading Pair</th>
                <th className='py-2 text-left'>Status</th>
                <th className='py-2 text-left'>Latest Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  pair: "BTC/USDT",
                  status: "In transaction",
                  price: "16,993.0080",
                },
                {
                  pair: "ETH/USDT",
                  status: "In transaction",
                  price: "2,345.37",
                },
                {
                  pair: "BNB/USDT",
                  status: "In transaction",
                  price: "845.3770",
                },
                {
                  pair: "YOBAHENT/USDT",
                  status: "In transaction",
                  price: "Notebook",
                },
              ].map((coin, i) => (
                <tr key={i}>
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
      <div className='p-6'>
        <h3 className='text-base font-semibold mb-2 text-white'>
          When and how did it all start?
        </h3>
        <p className='text-gray-300 text-sm'>
          On the 15th of December 2013, when India started trading crypto
          assets!
        </p>
      </div>

      {/* Custom CSS for scroll */}
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
          animation: scroll 18s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;