import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Trading = ({ setShowSidebar }) => {
  const [activeTimeframe, setActiveTimeframe] = useState("1H");
  const [price, setPrice] = useState(116593.006);
  const [isBuying, setIsBuying] = useState(false);
  const chartRef = useRef(null);

  const timeframes = ["1M", "5M", "15M", "30M", "1H", "1D"];

  // Generate sample price data
  const generateChartData = () => {
    const data = [];
    let currentPrice = 114000;

    for (let i = 0; i < 50; i++) {
      currentPrice += (Math.random() - 0.5) * 200;
      data.push(currentPrice);
    }

    return data;
  };

  const chartData = {
    labels: Array.from({ length: 50 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "BTC/USDT",
        data: generateChartData(),
        borderColor: "#00ffff", // Teal
        backgroundColor: "rgba(0, 255, 255, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffd700", // Gold
        bodyColor: "#ffffff",
        borderColor: "#00ffff", // Teal
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Price: ${context.parsed.y.toFixed(2)} USDT`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prevPrice) => prevPrice * (1 + (Math.random() - 0.5) * 0.001));
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
      <div className='bg-card-bg rounded-lg p-6 border border-border-custom'>
        <h2 className='text-xl font-semibold mb-4 border-b border-border-custom pb-3 text-gold'>
          OptionsTransaction
        </h2>
        <h3 className='text-lg font-semibold mb-2 text-teal'>BTC/USDT</h3>

        <div className='flex justify-between mb-6'>
          <div>
            <p
              className={`text-2xl font-semibold ${
                price > 116593.006 ? "text-green" : "text-red"
              }`}
            >
              {price.toFixed(3)}
              {price > 116593.006 ? "↑" : "↓"}
            </p>
          </div>
          <div className='text-right'>
            <p className='text-teal'>117625 - 116593.01</p>
            <div className='flex space-x-6 mt-2 text-sm'>
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
          <div className='flex justify-between items-center mb-4'>
            <div className='flex space-x-2'>
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

          {/* Chart */}
          <div className='h-64'>
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          </div>

          {/* Chart Indicators */}
          <div className='grid grid-cols-4 gap-2 mt-4 text-xs'>
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
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='bg-darker-bg p-3 rounded border border-border-custom'>
            <h4 className='font-semibold mb-2 text-sm text-gold'>MACD</h4>
            <div className='space-y-1 text-xs'>
              <p className='text-teal'>
                <span className='font-semibold'>DIF:</span> -149.5552
              </p>
              <p className='text-green'>
                <span className='font-semibold'>DEA:</span> -103.4250
              </p>
              <p className='text-blue'>
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
              <p className='text-green'>
                <span className='font-semibold'>MB:</span> 111190.0000
              </p>
              <p className='text-blue'>
                <span className='font-semibold'>DN:</span> 11970.0000
              </p>
              <p className='text-orange'>
                <span className='font-semibold'>WIDTH:</span> 11848.0000
              </p>
            </div>
          </div>
        </div>

        {/* Buy/Sell Buttons */}
        <div className='flex justify-between'>
          <button
            onClick={handleBuy}
            className='bg-red text-white px-6 py-3 rounded flex-1 mr-2 font-medium'
            disabled={isBuying}
          >
            {isBuying ? "Processing..." : "Buy more"}
          </button>
          <button
            onClick={handleSell}
            className='bg-teal text-dark-bg px-6 py-3 rounded flex-1 ml-2 font-medium'
            disabled={isBuying}
          >
            Buy less
          </button>
        </div>

        {/* Time indicators */}
        <div className='flex justify-between mt-4 text-xs text-teal'>
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
