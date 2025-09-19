import React, { useState, useEffect } from "react";
import {
  Banknote,
  ArrowUpRight,
  ReceiptText,
  CandlestickChart,
  ArrowLeft,
} from "lucide-react";

const Dashboard = () => {
  const [page, setPage] = useState("dashboard");
  const [currentAd, setCurrentAd] = useState(0);
  const [prices, setPrices] = useState({});
  const [status, setStatus] = useState({});
  const [amount, setAmount] = useState("");

  const ads = [
    { id: 1, title: "🔥 Special Offer!", content: "Get 0% trading fees for the first month on all BTC pairs", bgColor: "bg-gradient-to-r from-blue-800 to-blue-600" },
    { id: 2, title: "✨ New Listing", content: "Trade the new YOBAHENT/USDT pair with enhanced liquidity", bgColor: "bg-gradient-to-r from-purple-800 to-purple-600" },
    { id: 3, title: "🎁 Referral Bonus", content: "Earn 50% commission on every friend you refer to POLONIEX", bgColor: "bg-gradient-to-r from-green-800 to-green-600" },
  ];

  const coinList = [
    { symbol: "BTCUSDT", pair: "BTC/USDT", logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    { symbol: "ETHUSDT", pair: "ETH/USDT", logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
    { symbol: "LTCUSDT", pair: "LTC/USDT", logo: "https://assets.coingecko.com/coins/images/2/large/litecoin.png" },
    { symbol: "BNBUSDT", pair: "BNB/USDT", logo: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png" },
    { symbol: "NEOUSDT", pair: "NEO/USDT", logo: "https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png" },
    { symbol: "QTUMUSDT", pair: "QTUM/USDT", logo: "https://assets.coingecko.com/coins/images/684/large/qtum.png" },
    { symbol: "EOSUSDT", pair: "EOS/USDT", logo: "https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png" },
    { symbol: "SNTUSDT", pair: "SNT/USDT", logo: "https://assets.coingecko.com/coins/images/779/large/status.png" },
    { symbol: "BNTUSDT", pair: "BNT/USDT", logo: "https://assets.coingecko.com/coins/images/736/large/bancor.png" },
    { symbol: "BCHUSDT", pair: "BCH/USDT", logo: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png" },
    { symbol: "GASUSDT", pair: "GAS/USDT", logo: "https://assets.coingecko.com/coins/images/858/large/gas.png" },
  ];

  const rechargeOptions = [500, 2000, 5000, 10000, 50000];

  // Rotate ads
  useEffect(() => {
    const interval = setInterval(() => setCurrentAd(prev => (prev + 1) % ads.length), 5000);
    return () => clearInterval(interval);
  }, [ads.length]);

  // Live prices
  useEffect(() => {
    const streamUrl = "wss://stream.binance.com:9443/stream?streams=" +
      coinList.map(c => `${c.symbol.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(streamUrl);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message?.data?.s) {
        const symbol = message.data.s;
        const price = parseFloat(message.data.c).toFixed(2);
        setPrices(prev => ({ ...prev, [symbol]: price }));
        setStatus(prev => ({ ...prev, [symbol]: Math.random() > 0.3 ? "In transaction" : "Closed" }));
      }
    };
    return () => ws.close();
  }, []);

  // Dashboard Page
  const renderDashboard = () => (
    <div className="bg-[#0F172A] min-h-screen font-roboto">
      <div className="relative border-b border-gray-800 overflow-hidden">
        {/* Animated coins background */}
        <div className="absolute inset-0 opacity-10 flex justify-around items-center -top-6">
          <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="btc" className="w-20 h-20 animate-slowspin"/>
          <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png" alt="eth" className="w-16 h-16 animate-float"/>
          <img src="https://assets.coingecko.com/coins/images/325/large/Tether-logo.png" alt="usdt" className="w-14 h-14 animate-slowspin"/>
        </div>

        {/* Foreground */}
        <div className="relative z-10 p-2 pt-2">
          <h2 className="text-xs text-gray-400 font-light mb-1">Total assets equivalent (USDT)</h2>
          <p className="text-3xl font-reddit text-white tracking-tight mb-3">944.32</p>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-4 mt-2">
            {[
              { icon: <Banknote size={28} />, label: "Recharge", action: () => setPage("recharge") },
              { icon: <ArrowUpRight size={28} />, label: "Withdrawal" },
              { icon: <ReceiptText size={28} />, label: "Transaction" },
              { icon: <CandlestickChart size={28} />, label: "Future Market" },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                className="flex flex-col items-center justify-center py-3 transition"
              >
                {/* Icon solid gold */}
                <span className="text-yellow-400">{btn.icon}</span>

                {/* Text with gradient */}
                <span className="text-xs font-light mt-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  {btn.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ad Slider */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className={`${ads[currentAd].bgColor} rounded-lg p-4 text-white transition-all duration-700`}>
          <h3 className="text-sm font-light mb-1">{ads[currentAd].title}</h3>
          <p className="text-xs font-light opacity-90">{ads[currentAd].content}</p>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div className="overflow-hidden whitespace-nowrap py-1 px-3 bg-gray-800 rounded-lg mt-2">
        <div className="inline-block animate-marquee text-white font-light">
          🔥 In your payment, please feel free to contact our representatives 🔥 &nbsp;
          🔥 In your payment, please feel free to contact our representatives 🔥
        </div>
      </div>

      {/* Trading Pairs */}
      <div>
        <h3 className="text-sm font-light mb-3 text-white p-3">Trade these coins with FX Capital</h3>
        <div className="overflow-x-auto p-3">
          <table className="min-w-full border-collapse table-fixed">
            <thead>
              <tr className="text-gray-400 text-[11px] font-light">
                <th className="py-2 text-left w-1/3">Pair</th>
                <th className="py-2 text-center w-1/3">Status</th>
                <th className="py-2 text-right w-1/3">Price</th>
              </tr>
            </thead>
            <tbody>
              {coinList.map((coin, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/40 transition">
                  <td className="py-3 flex items-center space-x-2 text-white text-sm w-1/3 font-light">
                    <img src={coin.logo} alt={coin.pair} className="w-6 h-6"/>
                    <span>{coin.pair}</span>
                  </td>
                  <td className={`py-3 text-sm w-1/3 text-center font-light ${status[coin.symbol]==="In transaction"?"text-green-400":"text-red-400"}`}>
                    {status[coin.symbol] || "--"}
                  </td>
                  <td className="py-3 text-sm w-1/3 text-right text-white font-reddit">
                    {prices[coin.symbol] || "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Recharge Page
  const renderRecharge = () => (
    <div className="bg-[#0A1A2F] min-h-screen text-white font-roboto">
      <div className="flex items-center mb-6 p-3 pt-0">
        <button onClick={() => setPage("dashboard")} className="text-gray-300 hover:text-blue-400">
          <ArrowLeft size={28} />
        </button>
        <h1 className="ml-3 text-2xl font-light text-white">Recharge</h1>
      </div>

      <div className="space-y-4 p-3 pt-0">
        {[ 
          { label: "USDT (TRC20)", value: "bc1qk4jqh72lt9qslyafqfm804gpj5nl80emayvrzd" },
          { label: "USDT (ERC20)", value: "TUDyTymd4Zbv1fJs4VKcbbLLBNYhq6fy2k" },
          { label: "BTC", value: "0x05610e0d2b1dd573a367e358fd137fadc305caa4" },
          { label: "ETH", value: "0x05610e0d2b1dd573a367e358fd137fadc305caa4" },
        ].map((item, idx) => (
          <div key={idx}>
            <p className="text-sm text-gray-400 font-light mb-1">{item.label}</p>
            <div className="bg-gray-800 rounded-lg px-3 py-2 flex justify-between items-center">
              <span className="text-sm text-white font-reddit break-all">{item.value}</span>
              <button className="text-blue-400 text-sm font-light">Copy</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 pt-0">
        <p className="text-sm text-gray-400 font-light mb-3">Number of recharges (USDT)</p>
        <div className="grid grid-cols-3 gap-2">
          {rechargeOptions.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-3 rounded-lg text-sm transition font-light ${
                amount === value
                  ? "bg-blue-600 text-white font-reddit"
                  : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white font-reddit"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Please enter the amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-4 w-full px-3 py-3 bg-gray-800 text-white text-sm rounded-lg font-reddit outline-none placeholder-gray-400"
        />
      </div>

      <div className="mt-6 p-3 pt-0">
        <p className="text-sm text-gray-400 font-light mb-2">Upload recharge certificate</p>
        <div className="w-full h-24 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400">
          <span className="text-gray-400 text-sm font-light">Upload</span>
        </div>
      </div>

      <div className="mt-6 p-3 pt-0">
        <button
          onClick={() => { alert(`Recharge request submitted: ${amount} USDT`); }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-reddit text-lg rounded-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );

  return page === "dashboard" ? renderDashboard() : renderRecharge();
};

export default Dashboard;
