import React, { useState, useEffect } from "react";

const Trading = ({ setShowSidebar }) => {
  const [activeTimeframe, setActiveTimeframe] = useState("1H");
  const [price, setPrice] = useState(116593.006);
  const [isBuying, setIsBuying] = useState(false);
  const [change, setChange] = useState(0);
  const [candleData, setCandleData] = useState([]);

  const chartWidth = 600;
  const chartHeight = 250;
  const padding = 40;
  const timeframes = ["1M", "5M", "15M", "30M", "1H", "1D"];

  // Sample candlestick data
  const generateCandleData = () => {
    const data = [];
    let currentPrice = 114000;

    for (let i = 0; i < 20; i++) {
      const open = currentPrice;
      const high = open + Math.random() * 500;
      const low = open - Math.random() * 500;
      const close = low + Math.random() * (high - low);

      data.push({
        time: i,
        open,
        high: Math.max(open, close) + Math.random() * 200,
        low: Math.min(open, close) - Math.random() * 200,
        close,
        isBullish: close > open,
      });

      currentPrice = close;
    }

    return data;
  };

  useEffect(() => {
    const data = generateCandleData();
    setCandleData(data);

    if (data.length > 1) {
      const lastCandle = data[data.length - 1];
      const prevCandle = data[data.length - 2];
      setPrice(lastCandle.close);
      const priceChange =
        ((lastCandle.close - prevCandle.close) / prevCandle.close) * 100;
      setChange(priceChange);
    }
  }, [activeTimeframe]);

  const getChartScales = (data) => {
    if (!data.length) return null;

    const highs = data.map((d) => d.high);
    const lows = data.map((d) => d.low);
    const minPrice = Math.min(...lows) * 0.99;
    const maxPrice = Math.max(...highs) * 1.01;
    const priceRange = maxPrice - minPrice;

    return {
      minPrice,
      maxPrice,
      priceRange,
      xScale: (index) =>
        padding + (index * (chartWidth - padding * 2)) / (data.length - 1),
      yScale: (price) =>
        chartHeight -
        padding -
        ((price - minPrice) / priceRange) * (chartHeight - padding * 2),
    };
  };

  const renderCandlestickChart = () => {
    if (!candleData.length) {
      return (
        <div className="h-64 flex items-start justify-start text-gray-400 text-sm pl-0">
          Loading chart data...
        </div>
      );
    }

    const scales = getChartScales(candleData);
    if (!scales) return null;

    const { minPrice, maxPrice, xScale, yScale } = scales;

    return (
      <div className="flex justify-start">
        <svg width={chartWidth} height={chartHeight} className="h-64" style={{ maxWidth: '600px' }}>
          {/* Background */}
          <rect width={chartWidth} height={chartHeight} fill="#0F172A" />

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <line
                x1={padding}
                y1={padding + ratio * (chartHeight - padding * 2)}
                x2={chartWidth - padding}
                y2={padding + ratio * (chartHeight - padding * 2)}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text
                x={padding - 5}
                y={padding + ratio * (chartHeight - padding * 2)}
                fill="#ccc"
                fontSize="9"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {Math.round(minPrice + (1 - ratio) * (maxPrice - minPrice))}
              </text>
            </g>
          ))}

          {/* Candles */}
          {candleData.map((candle, index) => {
            const x = xScale(index);
            const openY = yScale(candle.open);
            const closeY = yScale(candle.close);
            const highY = yScale(candle.high);
            const lowY = yScale(candle.low);
            const color = candle.isBullish ? "#26a69a" : "#ef5350";
            const bodyHeight = Math.max(1, Math.abs(openY - closeY));

            return (
              <g key={index}>
                <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} />
                <rect
                  x={x - 4}
                  y={candle.isBullish ? closeY : openY}
                  width={8}
                  height={bodyHeight}
                  fill={color}
                />
              </g>
            );
          })}

          {/* Current price line */}
          <line
            x1={padding}
            y1={yScale(price)}
            x2={chartWidth - padding}
            y2={yScale(price)}
            stroke="#00ffff"
            strokeDasharray="4,4"
          />
        </svg>
      </div>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => {
        const newPrice = prev * (1 + (Math.random() - 0.5) * 0.001);
        const priceChange = ((newPrice - prev) / prev) * 100;
        setChange(priceChange);
        return newPrice;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = () => {
    setIsBuying(true);
    setTimeout(() => setIsBuying(false), 2000);
    alert(`Buy order placed at ${price.toFixed(3)}`);
  };

  const handleSell = () => {
    setIsBuying(true);
    setTimeout(() => setIsBuying(false), 2000);
    alert(`Sell order placed at ${price.toFixed(3)}`);
  };

  return (
    <div className="bg-[#0F172A] min-h-screen py-6 px-6">
      {/* Heading Left aligned */}
      <h2 className="text-lg font-semibold mb-6 text-yellow-400">
        BTC/USDT Trading
      </h2>

      {/* Price Row Left aligned */}
      <div className="flex flex-col items-start mb-6">
        <div>
          <p
            className={`text-2xl font-bold ${
              change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {price.toFixed(3)} {change >= 0 ? "↑" : "↓"}
          </p>
          <p
            className={`text-xs ${
              change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}%
          </p>
        </div>
        <div className="text-gray-400 text-xs mt-2 text-left">
          <p>
            High: <span className="text-yellow-400">117972.5</span>
          </p>
          <p>
            Low: <span className="text-yellow-400">114652.02</span>
          </p>
        </div>
      </div>

      {/* Timeframes Left aligned */}
      <div className="flex flex-wrap gap-2 mb-6 justify-start">
        {timeframes.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTimeframe(t)}
            className={`px-3 py-1 rounded-full text-xs transition ${
              activeTimeframe === t
                ? "bg-yellow-400 text-black"
                : "bg-[#2A2A2A] text-gray-300 hover:bg-[#333]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Chart - Moved to extreme left */}
      <div className="bg-[#0F172A] rounded-xl p-0 flex justify-start">
        {renderCandlestickChart()}
      </div>

      {/* Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 text-center text-xs">
        <div className="bg-[#2A2A2A] p-3 rounded-xl text-gray-300">
          <p>MA10</p>
          <p className="font-semibold text-yellow-400">113627.70</p>
        </div>
        <div className="bg-[#2A2A2A] p-3 rounded-xl text-gray-300">
          <p>MA20</p>
          <p className="font-semibold text-yellow-400">522.96K</p>
        </div>
        <div className="bg-[#2A2A2A] p-3 rounded-xl text-gray-300">
          <p>MA30</p>
          <p className="font-semibold text-yellow-400">531.86K</p>
        </div>
        <div className="bg-[#2A2A2A] p-3 rounded-xl text-gray-300">
          <p>VOL</p>
          <p className="font-semibold text-yellow-400">113620</p>
        </div>
      </div>

      {/* Buy/Sell */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button
          onClick={handleBuy}
          disabled={isBuying}
          className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition text-sm"
        >
          {isBuying ? "Processing..." : "Buy"}
        </button>
        <button
          onClick={handleSell}
          disabled={isBuying}
          className="flex-1 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition text-sm"
        >
          {isBuying ? "Processing..." : "Sell"}
        </button>
      </div>
    </div>
  );
};

export default Trading;