import React from "react";

const coinImages = [
  "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
  "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
  "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
];

export default function BackgroundAnimation() {
  const coins = Array.from({ length: 15 }).map((_, i) => {
    const img = coinImages[i % coinImages.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 18 + Math.random() * 10;
    const size = 45 + Math.random() * 35; // 👈 slightly bigger coins

    return (
      <img
        key={i}
        src={img}
        alt="coin"
        className="absolute opacity-80 animate-float rounded-full filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          transformOrigin: "center",
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden z-0 perspective-[800px]">
      {coins}
    </div>
  );
}
