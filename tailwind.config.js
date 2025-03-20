import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        fredoka: ["var(--font-fredoka)"],
      },
      colors: {
        primary: "#8338EC",
        toStart: "#F7BC30",
        inProgress: "#FB5607",
        readyForTesting: "#FF006E",
        ended: "#3A86FF",
        design: "#FF66A8",
        grey: "#DEE2E6",
        darkGrey: "#6C757D",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
