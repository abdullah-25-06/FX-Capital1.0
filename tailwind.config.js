module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "poloniex-blue": "#1666f6",
        "poloniex-dark": "#0f172a",
        "poloniex-gray": "#1e293b",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "25%": { opacity: "0.5" },
          "50%": { transform: "translateY(-10vh) rotate(360deg)", opacity: "1" },
          "100%": { transform: "translateY(-120vh) rotate(720deg)", opacity: "0" },
        },
        slowspin: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        float: "float linear infinite",
        spin3d: "slowspin 8s linear infinite", // 🌀 new 3D spin
        marquee: "marquee 15s linear infinite",
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
