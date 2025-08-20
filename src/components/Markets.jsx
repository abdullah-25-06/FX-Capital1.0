import React, { useState, useEffect } from "react";

const Markets = ({ setShowSidebar }) => {
  const [tradingPairs, setTradingPairs] = useState([
    {
      coin: "BTC",
      pair: "BTC/USDT",
      status: "in transaction",
      price: "116593.00601",
      change: "+2.5%",
    },
    {
      coin: "ETH",
      pair: "ETH/USDT",
      status: "in transaction",
      price: "4348.52401",
      change: "+1.2%",
    },
    {
      coin: "BNB",
      pair: "BNB/USDT",
      status: "in transaction",
      price: "845.37701",
      change: "-0.5%",
    },
    {
      coin: "XRP",
      pair: "XRP/USDT",
      status: "in transaction",
      price: "3.08681",
      change: "+3.1%",
    },
    {
      coin: "LINK",
      pair: "LINK/USDT",
      status: "in transaction",
      price: "25.48421",
      change: "+1.8%",
    },
    {
      coin: "BCH",
      pair: "BCH/USDT",
      status: "in transaction",
      price: "570.15991",
      change: "-1.2%",
    },
    {
      coin: "LTC",
      pair: "LTC/USDT",
      status: "in transaction",
      price: "118.02001",
      change: "+0.8%",
    },
    {
      coin: "BSV",
      pair: "BSV/USDT",
      status: "in transaction",
      price: "26.92881",
      change: "-2.1%",
    },
    {
      coin: "ADA",
      pair: "ADA/USDT",
      status: "in transaction",
      price: "0.92051",
      change: "+4.2%",
    },
  ]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTradingPairs((prevPairs) =>
        prevPairs.map((pair) => ({
          ...pair,
          price: (
            parseFloat(pair.price) *
            (1 + (Math.random() - 0.5) * 0.01)
          ).toFixed(5),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='mb-16'>
      <div className='bg-white rounded-lg p-6 shadow-sm border border-poloniex-border'>
        <h2 className='text-xl font-semibold mb-6 border-b border-poloniex-border pb-3'>
          TransactionQuote
        </h2>

        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-poloniex-border'>
                <th className='py-3 text-left text-poloniex-gray font-normal text-sm'>
                  Coin
                </th>
                <th className='py-3 text-left text-poloniex-gray font-normal text-sm'>
                  Trading Pair
                </th>
                <th className='py-3 text-left text-poloniex-gray font-normal text-sm'>
                  Status
                </th>
                <th className='py-3 text-left text-poloniex-gray font-normal text-sm'>
                  Latest Price
                </th>
                <th className='py-3 text-left text-poloniex-gray font-normal text-sm'>
                  24h Change
                </th>
              </tr>
            </thead>
            <tbody>
              {tradingPairs.map((coin, index) => (
                <tr
                  key={index}
                  className='border-b border-poloniex-border hover:bg-poloniex-section cursor-pointer'
                >
                  <td className='py-3 font-medium'>{coin.coin}</td>
                  <td className='py-3'>{coin.pair}</td>
                  <td className='py-3 text-green-500 text-sm'>{coin.status}</td>
                  <td className='py-3 font-mono'>{coin.price}</td>
                  <td
                    className={`py-3 ${
                      coin.change.includes("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Markets;
