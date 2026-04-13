import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#0A2318",
          800: "#1B4332",
          700: "#2D6A4F",
          600: "#40916C",
          500: "#52B788",
          400: "#74C69D",
          300: "#95D5B2",
        },
        lime: {
          400: "#A3E635",
          300: "#BEF264",
        },
        cream: "#FAFAF7",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-ibm-plex)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
