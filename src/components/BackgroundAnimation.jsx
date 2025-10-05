// src/components/BackgroundAnimation.jsx
import React from "react";
import Particles from "react-tsparticles";

const BackgroundAnimation = () => {
  const coinImages = [
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", // Bitcoin
    "https://assets.coingecko.com/coins/images/279/large/ethereum.png", // Ethereum
    "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png", // USDT
    "https://assets.coingecko.com/coins/images/271/large/cardano.png", // ADA
    "https://assets.coingecko.com/coins/images/2/large/litecoin.png", // Litecoin
  ];

  const particleImages = coinImages.map((src) => ({
    src,
    width: 32,
    height: 32,
  }));

  return (
    <Particles
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false }, // render inside parent div
        fpsLimit: 60,
        background: { color: "#0f0f1a" },
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          shape: {
            type: ["image", "circle"], // fallback circle if image fails
            image: particleImages,
          },
          color: { value: ["#f2a900", "#3c3c3d", "#00d1ff"] },
          opacity: { value: 0.8 },
          size: { value: { min: 20, max: 40 } },
          move: {
            enable: true,
            speed: 3,
            direction: "bottom",
            outModes: "out",
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default BackgroundAnimation;
