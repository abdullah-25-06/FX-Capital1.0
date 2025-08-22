import React, { useState, useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const TradingView = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("1h");
  const [activeTab, setActiveTab] = useState("chart");
  const [price, setPrice] = useState(0.21734);
  const [change, setChange] = useState(-0.12);

  const chartContainerRef = useRef();
  const chart = useRef();
  const candleSeries = useRef();

  const timeframes = ["1m", "5m", "1h", "3m"];
  const chartTabs = [
    "Chart",
    "TXns",
    "Holders (3.26M)",
    "History",
    "Orders",
    "Dev",
  ];
  const filterTabs = ["All", "You", "Dev"];

  const tradingPairs = [
    { pair: "BTC/USDT", status: "in transaction", price: "16,993.0080" },
    { pair: "ETH/USDT", status: "in transaction", price: "2,345.37" },
    { pair: "BNB/USDT", status: "in transaction", price: "845.3770" },
    { pair: "XRP/USDT", status: "in transaction", price: "3.08681" },
    { pair: "YOBAHENT/USDT", status: "in transaction", price: "Notebook" },
  ];

  // Generate sample candlestick data
  const generateSampleData = () => {
    const data = [];
    const now = new Date();
    let value = 0.21734;

    for (let i = 0; i < 100; i++) {
      const time = new Date(now - (100 - i) * 60000); // 1 minute intervals
      const open = value;
      const high = open * (1 + Math.random() * 0.02);
      const low = open * (1 - Math.random() * 0.02);
      const close = low + Math.random() * (high - low);
      value = close;

      data.push({
        time: Math.floor(time.getTime() / 1000),
        open,
        high,
        low,
        close,
      });
    }

    return data;
  };

  useEffect(() => {
    // Initialize chart
    chart.current = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#1a1a1a" },
        textColor: "#d9d9d9",
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.5)" },
        horzLines: { color: "rgba(42, 46, 57, 0.5)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Create candle series
    candleSeries.current = chart.current.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Set sample data
    const sampleData = generateSampleData();
    candleSeries.current.setData(sampleData);

    // Update price based on last candle
    if (sampleData.length > 0) {
      const lastCandle = sampleData[sampleData.length - 1];
      setPrice(lastCandle.close);
      const prevCandle = sampleData[sampleData.length - 2];
      const priceChange =
        ((lastCandle.close - prevCandle.close) / prevCandle.close) * 100;
      setChange(priceChange);
    }

    // Handle resize
    const handleResize = () => {
      chart.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chart.current) {
        chart.current.remove();
      }
    };
  }, []);

  // Update chart when timeframe changes
  useEffect(() => {
    if (candleSeries.current) {
      const newData = generateSampleData();
      candleSeries.current.setData(newData);

      if (newData.length > 0) {
        const lastCandle = newData[newData.length - 1];
        setPrice(lastCandle.close);
        const prevCandle = newData[newData.length - 2];
        const priceChange =
          ((lastCandle.close - prevCandle.close) / prevCandle.close) * 100;
        setChange(priceChange);
      }
    }
  }, [activeTimeframe]);

  return (
    <div className='mb-16 bg-poloniex-section min-h-screen text-white'>
      {/* Header Section */}
      <div className='bg-poloniex-dark py-4 px-6 border-b border-poloniex-border mb-6'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-poloniex-gold whitespace-nowrap mr-4'>
              FX CAPITAL
            </h1>
            <span className='text-sm text-gray-400 hidden sm:block'>
              jup.ag/tokens/So
            </span>
          </div>
          <div className='text-sm text-gray-400'>12:06</div>
        </div>
      </div>

      <div className='container mx-auto px-4'>
        {/* Main Chart Section */}
        <div className='bg-poloniex-gray rounded-lg p-6 mb-6 shadow'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold text-white'>Chart</h2>
            <div className='flex items-center space-x-2 text-sm text-gray-400'>
              <span>Liked by</span>
              <button className='hover:text-blue-400'>Like</button>
              <button className='hover:text-red-400'>Flag</button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className='flex space-x-2 mb-6'>
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setActiveTimeframe(timeframe)}
                className={`px-3 py-1 rounded text-sm ${
                  activeTimeframe === timeframe
                    ? "bg-poloniex-blue text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>

          {/* Candlestick Chart Container */}
          <div className='bg-gray-800 rounded-lg p-4 mb-6 relative'>
            <div ref={chartContainerRef} className='w-full h-64' />

            {/* Price Indicator */}
            <div className='absolute top-6 left-6 bg-black bg-opacity-70 rounded px-3 py-1'>
              <div className='text-sm text-white'>
                Price:{" "}
                <span
                  className={change >= 0 ? "text-green-400" : "text-red-400"}
                >
                  {price.toFixed(5)} ({change.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Price/Mean Section */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-sm text-gray-400 mb-2'>Price / Mean</h3>
              <div className='text-xl font-bold text-white'>18</div>
            </div>
            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-sm text-gray-400 mb-2'>Volume</h3>
              <div className='text-xl font-bold text-white'>74</div>
            </div>
            <div className='bg-gray-800 rounded-lg p-4'>
              <h3 className='text-sm text-gray-400 mb-2'>Current Price</h3>
              <div
                className={`text-xl font-bold ${
                  change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {price.toFixed(5)} ({change.toFixed(2)}%)
              </div>
            </div>
          </div>

          {/* Chart Tabs */}
          <div className='flex overflow-x-auto space-x-2 mb-4 hide-scrollbar'>
            {chartTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded text-sm whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.toLowerCase()
                    ? "bg-poloniex-blue text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className='flex space-x-2 mb-6'>
            {filterTabs.map((filter) => (
              <button
                key={filter}
                className='px-3 py-1 rounded text-sm bg-gray-700 text-gray-300 hover:bg-gray-600'
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Data Table */}
          <div className='bg-gray-800 rounded-lg p-4'>
            <div className='grid grid-cols-4 gap-4 text-sm text-gray-400 mb-3'>
              <div>Date/Age</div>
              <div>Price</div>
              <div>Volume</div>
              <div>Trader</div>
            </div>

            {/* Sample Data Rows */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className='grid grid-cols-4 gap-4 py-3 border-b border-gray-700'
              >
                <div className='text-white'>2 hours ago</div>
                <div className='text-white'>$181.83</div>
                <div className='text-white'>$151.90</div>
                <div className='text-blue-400'>ktf</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Pairs Table */}
        <div className='bg-poloniex-gray rounded-lg p-6 mb-6 shadow'>
          <h2 className='text-xl font-semibold mb-4'>TransactionQuote</h2>

          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='border-b border-gray-700'>
                  <th className='py-2 text-left text-gray-400'>Coin</th>
                  <th className='py-2 text-left text-gray-400'>Trading Pair</th>
                  <th className='py-2 text-left text-gray-400'>Status</th>
                  <th className='py-2 text-left text-gray-400'>Latest Price</th>
                </tr>
              </thead>
              <tbody>
                {tradingPairs.map((coin, index) => (
                  <tr key={index} className='border-b border-gray-700'>
                    <td className='py-3 text-white'>
                      {coin.pair.split("/")[0]}
                    </td>
                    <td className='py-3 text-white'>{coin.pair}</td>
                    <td className='py-3 text-green-400'>{coin.status}</td>
                    <td className='py-3 text-white'>{coin.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <button className='bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg'>
            Buy
          </button>
          <button className='bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg'>
            Sell
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className='flex overflow-x-auto space-x-2 mb-6 hide-scrollbar'>
          {["Swap", "Pro", "Perps", "Lend", "Portfolio"].map((tab) => (
            <button
              key={tab}
              className='px-4 py-2 rounded text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 whitespace-nowrap flex-shrink-0'
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Options Transaction Section */}
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
              <h4 className='font-semibold mb-2 text-white'>MA</h4>
              <p className='text-sm text-gray-300'>
                <span className='font-semibold'>MA5:</span> 113500.4700
              </p>
              <p className='text-sm text-gray-300'>114320.9900</p>
              <p className='text-sm text-gray-300'>MA10: 113627.7030</p>
            </div>

            <div className='bg-gray-800 p-3 rounded'>
              <h4 className='font-semibold mb-2 text-white'>VOL</h4>
              <p className='text-sm text-gray-300'>
                <span className='font-semibold'>MA20:</span> 522.965K
              </p>
              <p className='text-sm text-gray-300'>MA30: 531.863K</p>
              <p className='text-sm text-gray-300'>VOL</p>
            </div>

            <div className='bg-gray-800 p-3 rounded'>
              <h4 className='font-semibold mb-2 text-white'>MACD</h4>
              <p className='text-sm text-gray-300'>
                <span className='font-semibold'>DIF:</span> -149.5552
              </p>
              <p className='text-sm text-gray-300'>DEA: -103.4250</p>
              <p className='text-sm text-gray-300'>MAC</p>
            </div>
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

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TradingView;
