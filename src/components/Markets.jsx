import React, { useState, useEffect } from "react";

const Markets = () => {
  const [tradingPairs, setTradingPairs] = useState([
    { coin: "BTC", pair: "BTC/USDT", status: "In Transaction", price: "116593.00601", change: "+2.5%" },
    { coin: "ETH", pair: "ETH/USDT", status: "In Transaction", price: "4348.52401", change: "+1.2%" },
    { coin: "BNB", pair: "BNB/USDT", status: "In Transaction", price: "845.37701", change: "-0.5%" },
    { coin: "XRP", pair: "XRP/USDT", status: "In Transaction", price: "3.08681", change: "+3.1%" },
    { coin: "LINK", pair: "LINK/USDT", status: "In Transaction", price: "25.48421", change: "+1.8%" },
    { coin: "BCH", pair: "BCH/USDT", status: "In Transaction", price: "570.15991", change: "-1.2%" },
    { coin: "LTC", pair: "LTC/USDT", status: "In Transaction", price: "118.02001", change: "+0.8%" },
    { coin: "BSV", pair: "BSV/USDT", status: "In Transaction", price: "26.92881", change: "-2.1%" },
    { coin: "ADA", pair: "ADA/USDT", status: "In Transaction", price: "0.92051", change: "+4.2%" },
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Page Header */}
      <div className="w-full py-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 pl-6">
          Transaction Quote
        </h2>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block w-full">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold">Coin</th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold">Trading Pair</th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold">Status</th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold">Latest Price</th>
              <th className="py-4 px-6 text-left text-gray-300 font-semibold">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {tradingPairs.map((coin, index) => (
              <tr
                key={index}
                className="hover:bg-slate-700/30 transition-all duration-300 cursor-pointer group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-slate-900 font-bold text-sm">
                        {coin.coin.charAt(0)}
                      </span>
                    </div>
                    <span className="font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors text-base">
                      {coin.coin}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-blue-400 font-semibold text-base">{coin.pair}</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/40">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    {coin.status}
                  </span>
                </td>
                <td className="py-4 px-6 font-mono text-white font-bold text-base">
                  ${coin.price}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold ${
                      coin.change.includes("+")
                        ? "bg-green-500/20 text-green-400 border border-green-500/40"
                        : "bg-red-500/20 text-red-400 border border-red-500/40"
                    }`}
                  >
                    {coin.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {tradingPairs.map((coin, index) => (
          <div
            key={index}
            className="p-4 hover:bg-slate-700/20 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-slate-900 font-bold text-xs sm:text-sm">
                    {coin.coin.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-yellow-400 text-sm sm:text-base">{coin.coin}</div>
                  <div className="text-blue-400 text-xs sm:text-sm">{coin.pair}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-white font-bold text-sm sm:text-base">
                  ${parseFloat(coin.price).toLocaleString()}
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                    coin.change.includes("+")
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {coin.change}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs sm:text-sm">Status:</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/40">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                {coin.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Markets;