import React, { useState, useEffect, useRef } from "react";

const Trading = ({ setShowSidebar }) => {
  const [activeTimeframe, setActiveTimeframe] = useState("1H");
  const [price, setPrice] = useState(116593.006);
  const [isBuying, setIsBuying] = useState(false);
  const [change, setChange] = useState(0);
  const [candleData, setCandleData] = useState([]);

  const chartContainerRef = useRef();
  const chartWidth = 600;
  const chartHeight = 250;
  const padding = 40;

  const timeframes = ["1M", "5M", "15M", "30M", "1H", "1D"];

  // Generate sample candlestick data
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

    if (data.length > 0) {
      const lastCandle = data[data.length - 1];
      setPrice(lastCandle.close);
      const prevCandle = data[data.length - 2];
      const priceChange =
        ((lastCandle.close - prevCandle.close) / prevCandle.close) * 100;
      setChange(priceChange);
    }
  }, [activeTimeframe]);

  // Calculate chart scales
  const getChartScales = (data) => {
    if (!data.length) return null;

    const highs = data.map((d) => d.high);
    const lows = data.map((d) => d.low);
    const minPrice = Math.min(...lows) * 0.99; // Add some padding
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

  // Draw candlestick chart
  const renderCandlestickChart = () => {
    if (!candleData.length)
      return (
        <div className='h-64 flex items-center justify-center text-gray-400'>
          Loading chart data...
        </div>
      );

    const scales = getChartScales(candleData);
    if (!scales) return null;

    const { minPrice, maxPrice, xScale, yScale } = scales;

    return (
      <div className='w-full overflow-x-auto'>
        <svg
          width={chartWidth}
          height={chartHeight}
          className='min-w-full h-64'
        >
          {/* Chart background */}
          <rect width={chartWidth} height={chartHeight} fill='#1a1a1a' />

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <line
                x1={padding}
                y1={padding + ratio * (chartHeight - padding * 2)}
                x2={chartWidth - padding}
                y2={padding + ratio * (chartHeight - padding * 2)}
                stroke='rgba(42, 46, 57, 0.5)'
                strokeWidth='1'
              />
              <text
                x={padding - 5}
                y={padding + ratio * (chartHeight - padding * 2)}
                fill='#d9d9d9'
                fontSize='10'
                textAnchor='end'
                dominantBaseline='middle'
              >
                {Math.round(minPrice + (1 - ratio) * (maxPrice - minPrice))}
              </text>
            </g>
          ))}

          {/* Candlesticks */}
          {candleData.map((candle, index) => {
            const x = xScale(index);
            const openY = yScale(candle.open);
            const closeY = yScale(candle.close);
            const highY = yScale(candle.high);
            const lowY = yScale(candle.low);
            const isBullish = candle.isBullish;
            const color = isBullish ? "#26a69a" : "#ef5350";
            const bodyHeight = Math.max(1, Math.abs(openY - closeY));

            return (
              <g key={index}>
                {/* High-Low line */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={color}
                  strokeWidth='1'
                />

                {/* Candle body */}
                <rect
                  x={x - 4}
                  y={isBullish ? closeY : openY}
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
            stroke='#00ffff'
            strokeWidth='1'
            strokeDasharray='4,4'
          />
        </svg>
      </div>
    );
  };

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prevPrice) => {
        const newPrice = prevPrice * (1 + (Math.random() - 0.5) * 0.001);
        const priceChange = ((newPrice - prevPrice) / prevPrice) * 100;
        setChange(priceChange);
        return newPrice;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = () => {
    setIsBuying(true);
    setTimeout(() => setIsBuying(false), 2000);
    alert(`Buy order placed for BTC/USDT at ${price.toFixed(3)}`);
  };

  const handleSell = () => {
    setIsBuying(false);
    setTimeout(() => setIsBuying(false), 2000);
    alert(`Sell order placed for BTC/USDT at ${price.toFixed(3)}`);
  };

  return (
    <div className='mb-16'>
      <div className='bg-card-bg rounded-lg p-4 md:p-6 border border-border-custom'>
        <h2 className='text-xl font-semibold mb-4 border-b border-border-custom pb-3 text-gold'>
          OptionsTransaction
        </h2>
        <h3 className='text-lg font-semibold mb-2 text-teal'>BTC/USDT</h3>

        <div className='flex flex-col md:flex-row justify-between mb-6 gap-4'>
          <div>
            <p
              className={`text-2xl font-semibold ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {price.toFixed(3)}
              {change >= 0 ? "↑" : "↓"}
            </p>
            <p
              className={`text-sm ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </p>
          </div>
          <div className='text-right'>
            <p className='text-teal'>117625 - 116593.01</p>
            <div className='flex space-x-4 md:space-x-6 mt-2 text-sm'>
              <div>
                <p className='text-teal'>Today's High</p>
                <p className='font-medium text-gold'>117972.5</p>
              </div>
              <div>
                <p className='text-teal'>Today's low</p>
                <p className='font-medium text-gold'>114652.02</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className='bg-darker-bg rounded-lg p-4 mb-6 border border-border-custom'>
          <div className='flex flex-col md:flex-row justify-between items-center mb-4 gap-2'>
            <div className='flex flex-wrap gap-2'>
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  className={`px-3 py-1 rounded text-xs ${
                    activeTimeframe === timeframe
                      ? "bg-teal text-dark-bg"
                      : "bg-card-bg border border-border-custom text-teal"
                  }`}
                  onClick={() => setActiveTimeframe(timeframe)}
                >
                  {timeframe}
                </button>
              ))}
            </div>
            <div className='text-sm text-teal'>MA: 14:33:36.000</div>
          </div>

          {/* Candlestick Chart */}
          {renderCandlestickChart()}

          {/* Chart Indicators */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-xs'>
            <div className='text-center'>
              <div className='text-teal'>MA10</div>
              <div className='font-medium text-gold'>113627.7030</div>
            </div>
            <div className='text-center'>
              <div className='text-teal'>MA20</div>
              <div className='font-medium text-gold'>522.965K</div>
            </div>
            <div className='text-center'>
              <div className='text-teal'>MA30</div>
              <div className='font-medium text-gold'>531.863K</div>
            </div>
            <div className='text-center'>
              <div className='text-teal'>VOL</div>
              <div className='font-medium text-gold'>113620.000</div>
            </div>
          </div>
        </div>

        {/* Technical Indicators */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div className='bg-darker-bg p-3 rounded border border-border-custom'>
            <h4 className='font-semibold mb-2 text-sm text-gold'>MACD</h4>
            <div className='space-y-1 text-xs'>
              <p className='text-teal'>
                <span className='font-semibold'>DIF:</span> -149.5552
              </p>
              <p className='text-green-500'>
                <span className='font-semibold'>DEA:</span> -103.4250
              </p>
              <p className='text-blue-500'>
                <span className='font-semibold'>MAC:</span> 120.0000
              </p>
            </div>
          </div>

          <div className='bg-darker-bg p-3 rounded border border-border-custom'>
            <h4 className='font-semibold mb-2 text-sm text-gold'>BOLL</h4>
            <div className='space-y-1 text-xs'>
              <p className='text-teal'>
                <span className='font-semibold'>UP:</span> 116490.0000
              </p>
              <p className='text-green-500'>
                <span className='font-semibold'>MB:</span> 111190.0000
              </p>
              <p className='text-blue-500'>
                <span className='font-semibold'>DN:</span> 11970.0000
              </p>
              <p className='text-orange-500'>
                <span className='font-semibold'>WIDTH:</span> 11848.0000
              </p>
            </div>
          </div>
        </div>

        {/* Buy/Sell Buttons */}
        <div className='flex flex-col md:flex-row justify-between gap-2'>
          <button
            onClick={handleBuy}
            className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded flex-1 font-medium transition-colors'
            disabled={isBuying}
          >
            {isBuying ? "Processing..." : "Buy more"}
          </button>
          <button
            onClick={handleSell}
            className='bg-teal hover:bg-teal-dark text-dark-bg px-6 py-3 rounded flex-1 font-medium transition-colors'
            disabled={isBuying}
          >
            Buy less
          </button>
        </div>

        {/* Time indicators */}
        <div className='flex justify-between mt-4 text-xs text-teal flex-wrap gap-2'>
          <span>20:22</span>
          <span>20:37</span>
          <span>20:52</span>
          <span>21:07</span>
          <span>21:22</span>
        </div>
      </div>
    </div>
  );
};

export default Trading;
