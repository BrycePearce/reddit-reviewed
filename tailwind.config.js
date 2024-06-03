/** @type {import('tailwindcss').Config} */

const redditPrimary = "#FF4500";
const redditSecondary = "oklab(0.594179 0.168254 0.119583)";
const redditDisabledHidden = "oklch(0.660199 0.229356 35.4025 / none)";
const redditDisabledOpaque = "oklch(0.660199 0.229356 35.4025 / 0.15)";

module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fill: {
        redditPrimary,
        redditSecondary,
        redditDisabledHidden,
        redditDisabledOpaque
      },
      transitionDuration: {
        '250': '250ms', // 'duration-250' util
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        reddit: {
          primary: redditPrimary,
          secondary: redditSecondary,
          accent: "#888888",
          neutral: "#FF450066",
          "base-100": "#ffffff",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          disabled: redditDisabledHidden,
          "disabled-opacity": "0.5",
        },
      },
    ],
  },
};
