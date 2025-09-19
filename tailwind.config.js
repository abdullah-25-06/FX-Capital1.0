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
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(10deg)" },
        },
        slowspin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        slowspin: "slowspin 20s linear infinite",
        marquee: "marquee 15s linear infinite",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        reddit: ["'Reddit Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
