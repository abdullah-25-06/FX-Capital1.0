import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { ChevronDown, ChevronUp } from "lucide-react";

// ==================== ORDER MODAL ====================
const OrderModal = ({ show, onClose, price, direction, pair }) => {
  const [selectedTime, setSelectedTime] = useState("180s");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] rounded-xl shadow-2xl w-[400px] text-white border border-gray-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Order Confirmation</h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Trading Pair */}
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Trading Pair</span>
            <span className="font-semibold">{pair || "BTC/USDT"}</span>
          </div>

          {/* Direction */}
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Direction</span>
            <span
              className={`font-semibold ${
                direction === "Buy" ? "text-green-400" : "text-red-400"
              }`}
            >
              {direction}
            </span>
          </div>

          {/* Current Price */}
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Current Price</span>
            <span className="font-semibold">
              {price ? price.toFixed(3) : "--"}
            </span>
          </div>

          {/* Expiration Time */}
          <div>
            <p className="text-sm text-gray-300 mb-2">Select expiration time</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { t: "180s", p: "20%" },
                { t: "300s", p: "30%" },
                { t: "600s", p: "40%" },
                { t: "900s", p: "50%" },
              ].map((opt) => (
                <button
                  key={opt.t}
                  onClick={() => setSelectedTime(opt.t)}
                  className={`flex flex-col items-center justify-center py-2 rounded-lg border text-sm transition ${
                    selectedTime === opt.t
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {opt.t}
                  <span className="text-xs text-gray-400">{opt.p}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <p className="text-sm text-gray-300 mb-2">Amount</p>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[500, 2000, 5000, 10000, 50000, 100000, "All"].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`py-2 rounded-lg border text-sm transition ${
                    selectedAmount === amt
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                      : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {amt === "All" ? "All" : `$${amt}`}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom Amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <span>Balance: 887.56</span>
            <span className="text-red-400">Handling fee: 0% (0 USDT)</span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-gray-400 bg-[#1e293b] hover:bg-[#2d3b50] rounded-bl-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const amt = customAmount || selectedAmount;
              alert(
                `Order confirmed:\n${direction} ${pair}\nPrice: $${price?.toFixed(
                  2
                )}\nTime: ${selectedTime}\nAmount: ${amt}`
              );
              onClose();
            }}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-br-xl font-semibold text-white"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN TRADING COMPONENT ====================
const Trading = () => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candleSeriesRef = useRef();
  const volumeSeriesRef = useRef();
  const ma5Ref = useRef();
  const ma10Ref = useRef();
  const ma30Ref = useRef();

  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [interval, setInterval] = useState("1m");
  const [isBuying, setIsBuying] = useState(false);

  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [todayHigh, setTodayHigh] = useState(null);
  const [todayLow, setTodayLow] = useState(null);

  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [trades, setTrades] = useState([]);
  const [activeTab, setActiveTab] = useState("orderBook"); // toggle

  const [showModal, setShowModal] = useState(false);
  const [modalDirection, setModalDirection] = useState("Buy");

  const coins = [
    { symbol: "BTCUSDT", name: "Bitcoin (BTC/USDT)" },
    { symbol: "ETHUSDT", name: "Ethereum (ETH/USDT)" },
    { symbol: "LTCUSDT", name: "Litecoin (LTC/USDT)" },
    { symbol: "BNBUSDT", name: "BNB (BNB/USDT)" },
    { symbol: "NEOUSDT", name: "NEO (NEO/USDT)" },
    { symbol: "QTUMUSDT", name: "Qtum (QTUM/USDT)" },
    { symbol: "EOSUSDT", name: "EOS (EOS/USDT)" },
    { symbol: "SNTUSDT", name: "Status (SNT/USDT)" },
    { symbol: "BNTUSDT", name: "Bancor (BNT/USDT)" },
    { symbol: "BCHUSDT", name: "Bitcoin Cash (BCH/USDT)" },
    { symbol: "GASUSDT", name: "NeoGas (GAS/USDT)" },
  ];

  const getWsUrl = (symbol, interval) =>
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;

  // Chart setup
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth || 600,
      height: chartContainerRef.current.clientHeight || 350,
      layout: {
        background: { type: "solid", color: "#0f172a" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.15)" },
        horzLines: { color: "rgba(255,255,255,0.15)" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "#334155" },
      timeScale: { borderColor: "#334155", timeVisible: true },
    });
    chartRef.current = chart;

    candleSeriesRef.current = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderDownColor: "#ef4444",
      borderUpColor: "#22c55e",
      wickDownColor: "#ef4444",
      wickUpColor: "#22c55e",
    });

    volumeSeriesRef.current = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });
    chart.priceScale("").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    ma5Ref.current = chart.addLineSeries({ color: "orange", lineWidth: 1 });
    ma10Ref.current = chart.addLineSeries({ color: "purple", lineWidth: 1 });
    ma30Ref.current = chart.addLineSeries({ color: "blue", lineWidth: 1 });

    return () => chart.remove();
  }, []);

  // Kline history + live updates
  useEffect(() => {
    if (!candleSeriesRef.current) return;
    let ws;

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=${interval}&limit=200`
        );
        const data = await res.json();
        const candles = data.map((d) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        candleSeriesRef.current.setData(candles);

        const volumes = data.map((d) => ({
          time: d[0] / 1000,
          value: parseFloat(d[5]),
          color: parseFloat(d[4]) >= parseFloat(d[1]) ? "#22c55e" : "#ef4444",
        }));
        volumeSeriesRef.current.setData(volumes);

        // Moving averages
        const calcMA = (period) =>
          candles
            .map((c, i, arr) =>
              i < period
                ? null
                : {
                    time: c.time,
                    value:
                      arr.slice(i - period, i).reduce((s, x) => s + x.close, 0) /
                      period,
                  }
            )
            .filter((x) => x);
        ma5Ref.current.setData(calcMA(5));
        ma10Ref.current.setData(calcMA(10));
        ma30Ref.current.setData(calcMA(30));

        const lastCandle = candles[candles.length - 1];
        setPrice(lastCandle.close);
        const prevClose = candles[candles.length - 2]?.close || lastCandle.open;
        setChange(((lastCandle.close - prevClose) / prevClose) * 100);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };

    fetchHistory();

    ws = new WebSocket(getWsUrl(selectedCoin, interval));
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.k) {
        const k = msg.k;
        const candle = {
          time: k.t / 1000,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        };
        candleSeriesRef.current.update(candle);

        const volume = {
          time: k.t / 1000,
          value: parseFloat(k.v),
          color: parseFloat(k.c) >= parseFloat(k.o) ? "#22c55e" : "#ef4444",
        };
        volumeSeriesRef.current.update(volume);

        setPrice(candle.close);
      }
    };

    return () => ws && ws.close();
  }, [interval, selectedCoin]);

  // Live High/Low
  useEffect(() => {
    let wsTicker = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`
    );
    wsTicker.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTodayHigh(parseFloat(data.h));
      setTodayLow(parseFloat(data.l));
    };
    return () => wsTicker && wsTicker.close();
  }, [selectedCoin]);

  // Order Book
  useEffect(() => {
    const wsDepth = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@depth`
    );
    wsDepth.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.b && data.a) {
        setOrderBook({
          bids: data.b.slice(0, 10).map(([p, q]) => ({
            price: parseFloat(p),
            qty: parseFloat(q),
          })),
          asks: data.a.slice(0, 10).map(([p, q]) => ({
            price: parseFloat(p),
            qty: parseFloat(q),
          })),
        });
      }
    };
    return () => wsDepth.close();
  }, [selectedCoin]);

  // Recent Trades
  useEffect(() => {
    const wsTrade = new WebSocket(
      `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@trade`
    );
    wsTrade.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const t = {
        price: parseFloat(data.p),
        qty: parseFloat(data.q),
        isBuy: data.m === false,
        time: new Date(data.T).toLocaleTimeString(),
      };
      setTrades((prev) => [t, ...prev.slice(0, 14)]);
    };
    return () => wsTrade.close();
  }, [selectedCoin]);

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] w-full h-screen flex flex-col text-white overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800 relative z-20">
        <div
          className="flex items-center cursor-pointer space-x-2 hover:text-yellow-400 relative"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <h1 className="text-xl font-bold">
            {selectedCoin.replace("USDT", "")}/USDT
          </h1>
          {showDropdown ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </div>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 mt-2 w-64 bg-[#111827] rounded-lg shadow-lg border border-gray-700 z-50 max-h-64 overflow-y-auto"
          >
            {coins.map((coin) => (
              <div
                key={coin.symbol}
                onClick={() => {
                  setSelectedCoin(coin.symbol);
                  setShowDropdown(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                  selectedCoin === coin.symbol ? "bg-gray-700" : ""
                }`}
              >
                {coin.name}
              </div>
            ))}
          </div>
        )}

        <div className="text-right">
          <p className="text-2xl font-bold">
            {price ? `$${price.toFixed(2)}` : "--"}
          </p>
          <p
            className={`text-sm ${
              change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change ? change.toFixed(2) : "--"}%
          </p>
          <p className="text-xs">
            <span className="text-green-400">
              H: {todayHigh ? todayHigh.toFixed(2) : "--"}
            </span>{" "}
            |{" "}
            <span className="text-red-400">
              L: {todayLow ? todayLow.toFixed(2) : "--"}
            </span>
          </p>
        </div>
      </div>

      {/* Timeframes */}
      <div className="flex space-x-3 px-4 py-2 border-b border-gray-800">
        {["1m", "5m", "15m", "1h", "4h", "1d"].map((intv) => (
          <button
            key={intv}
            onClick={() => setInterval(intv)}
            className={`px-2 py-0.5 text-sm font-sans transition ${
              interval === intv
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {intv.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="flex justify-center mt-4">
        <div
          ref={chartContainerRef}
          className="rounded-lg border border-gray-700 h-[350px] w-[95%]"
        />
      </div>

      {/* Buy/Sell */}
      <div className="grid grid-cols-2 gap-4 p-4 border-t border-gray-800 bg-[#111827]">
        <button
          onClick={() => {
            setModalDirection("Buy");
            setShowModal(true);
          }}
          className="bg-green-500 hover:bg-green-600 py-2 rounded-md font-semibold transition"
        >
          Buy
        </button>
        <button
          onClick={() => {
            setModalDirection("Sell");
            setShowModal(true);
          }}
          className="bg-red-500 hover:bg-red-600 py-2 rounded-md font-semibold transition"
        >
          Sell
        </button>
      </div>

      {/* Tabs: OrderBook / Trades */}
      <div className="flex border-t border-gray-800 bg-[#0f172a]">
        <button
          className={`flex-1 py-2 text-sm font-semibold ${
            activeTab === "orderBook"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("orderBook")}
        >
          Order Book
        </button>
        <button
          className={`flex-1 py-2 text-sm font-semibold ${
            activeTab === "trades"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("trades")}
        >
          Recent Trades
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#0f172a]">
        {activeTab === "orderBook" ? (
          <div>
            <h2 className="text-sm font-semibold mb-2">Order Book</h2>
            <div className="grid grid-cols-3 text-xs text-gray-400 mb-1">
              <span>Price</span>
              <span>Amount</span>
              <span>Total</span>
            </div>
            <div className="space-y-1 max-h-[200px] overflow-y-auto">
              {orderBook.asks.map((ask, i) => (
                <div
                  key={`ask-${i}`}
                  className="grid grid-cols-3 text-xs text-red-400"
                >
                  <span>{ask.price.toFixed(2)}</span>
                  <span>{ask.qty.toFixed(4)}</span>
                  <span>{(ask.price * ask.qty).toFixed(2)}</span>
                </div>
              ))}
              {orderBook.bids.map((bid, i) => (
                <div
                  key={`bid-${i}`}
                  className="grid grid-cols-3 text-xs text-green-400"
                >
                  <span>{bid.price.toFixed(2)}</span>
                  <span>{bid.qty.toFixed(4)}</span>
                  <span>{(bid.price * bid.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-sm font-semibold mb-2">Recent Trades</h2>
            <div className="grid grid-cols-3 text-xs text-gray-400 mb-1">
              <span>Price</span>
              <span>Amount</span>
              <span>Time</span>
            </div>
            <div className="space-y-1 max-h-[200px] overflow-y-auto">
              {trades.map((t, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 text-xs ${
                    t.isBuy ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <span>{t.price.toFixed(2)}</span>
                  <span>{t.qty.toFixed(4)}</span>
                  <span>{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <OrderModal
        show={showModal}
        onClose={() => setShowModal(false)}
        price={price}
        direction={modalDirection}
        pair={selectedCoin.replace("USDT", "/USDT")}
      />
    </div>
  );
};

export default Trading;
