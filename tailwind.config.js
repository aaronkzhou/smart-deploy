/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        void: {
          950: "#050608",
          900: "#0a0c10",
          850: "#0e1116",
          800: "#12151c",
          750: "#171b23",
          700: "#1d222b",
          600: "#2a303b",
          500: "#3d4552",
        },
        signal: {
          400: "#7de3c8",
          500: "#4dd4a8",
          600: "#2fb98d",
        },
        risk: {
          low: "#4dd4a8",
          medium: "#e8b84b",
          high: "#e8763f",
          critical: "#e14a4a",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(77,212,168,0.15), transparent)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(77,212,168,0.35)",
        "glow-sm": "0 0 20px -6px rgba(77,212,168,0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scan: "scan 2.4s linear infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
