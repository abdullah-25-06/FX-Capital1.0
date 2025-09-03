import React, { useState, useEffect } from "react";

const Trading = ({ setShowSidebar }) => {
  const [activeTimeframe, setActiveTimeframe] = useState("1H");
  const [price, setPrice] = useState(116593.006);
  const [isBuying, setIsBuying] = useState(false);
  const [change, setChange] = useState(0);
  const [candleData, setCandleData] = useState([]);
  const [chartDimensions, setChartDimensions] = useState({ width: 350, height: 200 });

  const padding = 30;
  const timeframes = ["1M", "5M", "15M", "30M", "1H", "1D"];

  // Sample candlestick data
  const generateCandleData = () => {
    const data = [];
    let currentPrice = 114000;

    for (let i = 0; i < 15; i++) {
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

  // Update chart dimensions based on container size
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let chartWidth, chartHeight;
      
      if (width < 480) { // Small mobile
        chartWidth = width - 24; // Full width minus padding
        chartHeight = 160;
      } else if (width < 640) { // Mobile
        chartWidth = width - 32;
        chartHeight = 180;
      } else if (width < 768) { // Large mobile/Small tablet
        chartWidth = width - 48;
        chartHeight = 200;
      } else if (width < 1024) { // Tablet
        chartWidth = Math.min(width - 48, 600);
        chartHeight = 220;
      } else { // Desktop
        chartWidth = Math.min(width - 48, 700);
        chartHeight = 250;
      }
      
      setChartDimensions({ width: chartWidth, height: chartHeight });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

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
        padding + (index * (chartDimensions.width - padding * 2)) / (data.length - 1),
      yScale: (price) =>
        chartDimensions.height -
        padding -
        ((price - minPrice) / priceRange) * (chartDimensions.height - padding * 2),
    };
  };

  const renderCandlestickChart = () => {
    if (!candleData.length) {
      return (
        <div 
          className="flex items-center justify-center text-gray-400 text-sm bg-[#0F172A]" 
          style={{ height: chartDimensions.height }}
        >
          Loading chart data...
        </div>
      );
    }

    const scales = getChartScales(candleData);
    if (!scales) return null;

    const { minPrice, maxPrice, xScale, yScale } = scales;
    const isMobile = chartDimensions.width < 480;

    return (
      <div className="w-full">
        <svg 
          width="100%" 
          height={chartDimensions.height} 
          viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
          className="bg-[#0F172A]"
          preserveAspectRatio="xMinYMin meet"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <line
                x1={padding}
                y1={padding + ratio * (chartDimensions.height - padding * 2)}
                x2={chartDimensions.width - padding}
                y2={padding + ratio * (chartDimensions.height - padding * 2)}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text
                x={padding - 5}
                y={padding + ratio * (chartDimensions.height - padding * 2)}
                fill="#ccc"
                fontSize={isMobile ? "8" : "10"}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {Math.round(minPrice + (1 - ratio) * (maxPrice - minPrice)).toLocaleString()}
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
            const candleWidth = isMobile ? 4 : 6;

            return (
              <g key={index}>
                <line 
                  x1={x} 
                  y1={highY} 
                  x2={x} 
                  y2={lowY} 
                  stroke={color} 
                  strokeWidth={isMobile ? 1 : 1.5} 
                />
                <rect
                  x={x - candleWidth/2}
                  y={candle.isBullish ? closeY : openY}
                  width={candleWidth}
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
            x2={chartDimensions.width - padding}
            y2={yScale(price)}
            stroke="#00ffff"
            strokeDasharray="4,4"
            strokeWidth="1"
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
    <div className="bg-[#0F172A] min-h-screen w-full overflow-x-hidden">
      <div className="max-w-full px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4">
            BTC/USDT Trading
          </h2>

          {/* Price Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <p className={`text-xl sm:text-2xl font-bold ${
                change >= 0 ? "text-green-400" : "text-red-400"
              }`}>
                ${price.toFixed(2)}
              </p>
              <span className={`text-lg ${
                change >= 0 ? "text-green-400" : "text-red-400"
              }`}>
                {change >= 0 ? "↑" : "↓"}
              </span>
            </div>
            
            <p className={`text-xs sm:text-sm ${
              change >= 0 ? "text-green-400" : "text-red-400"
            }`}>
              {change >= 0 ? "+" : ""}{change.toFixed(2)}%
            </p>

            <div className="text-gray-400 text-xs sm:text-sm mt-2">
              <div className="flex gap-4">
                <span>High: <span className="text-yellow-400">$117,972.5</span></span>
                <span>Low: <span className="text-yellow-400">$114,652.02</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeframes */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap gap-2">
            {timeframes.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTimeframe(t)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all ${
                  activeTimeframe === t
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-[#2A2A2A] text-gray-300 hover:bg-[#333] hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container - No horizontal scroll */}
        <div className="mb-6">
          <div className="bg-[#0F172A] rounded-xl border border-gray-800 p-2 sm:p-4">
            {renderCandlestickChart()}
          </div>
        </div>

        {/* Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {[
            { label: "MA10", value: "113,627.70" },
            { label: "MA20", value: "522.96K" },
            { label: "MA30", value: "531.86K" },
            { label: "VOL", value: "113,620" }
          ].map((item, index) => (
            <div key={index} className="bg-[#2A2A2A] p-3 rounded-xl text-center">
              <p className="text-gray-300 text-xs sm:text-sm mb-1">{item.label}</p>
              <p className="font-semibold text-yellow-400 text-xs sm:text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Buy/Sell Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleBuy}
            disabled={isBuying}
            className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold py-3 px-4 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base disabled:opacity-70"
          >
            {isBuying ? "Processing..." : "Buy BTC"}
          </button>
          <button
            onClick={handleSell}
            disabled={isBuying}
            className="flex-1 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base disabled:opacity-70"
          >
            {isBuying ? "Processing..." : "Sell BTC"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trading;