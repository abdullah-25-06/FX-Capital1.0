import React, { useState } from "react";

const TradingView = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("1M");

  const timeframes = ["1M", "5M", "15M", "30M", "1H", "1D"];
  const tradingPairs = [
    { pair: "BTC/USDT", status: "in transaction", price: "116593.00601" },
    { pair: "ETH/USDT", status: "in transaction", price: "4348.52401" },
    { pair: "BNB/USDT", status: "in transaction", price: "845.37701" },
    { pair: "XRP/USDT", status: "in transaction", price: "3.08681" },
    { pair: "LINK/USDT", status: "in transaction", price: "25.48421" },
    { pair: "BCH/USDT", status: "in transaction", price: "570.15991" },
    { pair: "LTC/USDT", status: "in transaction", price: "118.02001" },
    { pair: "BSV/USDT", status: "in transaction", price: "26.92881" },
    { pair: "ADA/USDT", status: "in transaction", price: "0.92051" },
  ];

  return (
    <div className='mb-16'>
      <div className='bg-poloniex-gray rounded-lg p-6 mb-6 shadow'>
        <h2 className='text-xl font-semibold mb-4'>TransactionQuote</h2>

        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-gray-700'>
                <th className='py-2 text-left'>Coin</th>
                <th className='py-2 text-left'>Trading Pair</th>
                <th className='py-2 text-left'>Status</th>
                <th className='py-2 text-left'>Latest Price</th>
              </tr>
            </thead>
            <tbody>
              {tradingPairs.map((coin, index) => (
                <tr key={index} className='border-b border-gray-700'>
                  <td className='py-3'>{coin.pair.split("/")[0]}</td>
                  <td className='py-3'>{coin.pair}</td>
                  <td className='py-3 text-green-400'>{coin.status}</td>
                  <td className='py-3'>{coin.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='bg-poloniex-gray rounded-lg p-6 shadow'>
        <h2 className='text-xl font-semibold mb-4'>OptionsTransaction</h2>
        <h3 className='text-lg font-semibold mb-2'>BTC/USDT</h3>

        <div className='flex justify-between mb-4'>
          <div>
            <p className='text-2xl text-green-500'>116593.006↑</p>
          </div>
          <div className='text-right'>
            <p>117625 - 116593.01</p>
            <div className='flex space-x-4 mt-1 text-sm'>
              <div>
                <p className='text-gray-400'>Today's High</p>
                <p>117972.5</p>
              </div>
              <div>
                <p className='text-gray-400'>Today's low</p>
                <p>114652.02</p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 mb-6'>
          <div className='bg-gray-800 p-3 rounded'>
            <h4 className='font-semibold mb-2'>MA</h4>
            <p className='text-sm'>
              <span className='font-semibold'>MA5:</span> 113500.4700
            </p>
            <p className='text-sm'>114320.9900</p>
            <p className='text-sm'>MA10: 113627.7030</p>
          </div>

          <div className='bg-gray-800 p-3 rounded'>
            <h4 className='font-semibold mb-2'>VOL</h4>
            <p className='text-sm'>
              <span className='font-semibold'>MA20:</span> 522.965K
            </p>
            <p className='text-sm'>MA30: 531.863K</p>
            <p className='text-sm'>VOL</p>
          </div>

          <div className='bg-gray-800 p-3 rounded'>
            <h4 className='font-semibold mb-2'>MACD</h4>
            <p className='text-sm'>
              <span className='font-semibold'>DIF:</span> -149.5552
            </p>
            <p className='text-sm'>DEA: -103.4250</p>
            <p className='text-sm'>MAC</p>
          </div>
        </div>

        <div className='flex space-x-2 mb-4'>
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              className={`px-3 py-1 rounded text-sm ${
                activeTimeframe === timeframe
                  ? "bg-poloniex-blue text-white"
                  : "bg-gray-700"
              }`}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>

        <div className='flex justify-between'>
          <button className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded'>
            Buy more
          </button>
          <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded'>
            Buy less
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingView;
