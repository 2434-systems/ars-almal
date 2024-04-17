import type { Config } from "tailwindcss";
const { violet, blackA, mauve, green } = require("@radix-ui/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
      keyframes: {
        "fall-and-fade-left": {
          "0%": { transform: "translate(-50%, 0) rotate(0)", opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translate(-75%, 100vh) rotate(-30deg)",
            opacity: "0",
          },
        },
        "fall-and-fade-right": {
          "0%": { transform: "translate(-50%, 0) rotate(0)", opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translate(-25%, 100vh) rotate(30deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        "fall-left": "fall-and-fade-left 4s linear forwards",
        "fall-right": "fall-and-fade-right 4s linear forwards",
      },
    },
  },
  plugins: [],
};
export default config;
