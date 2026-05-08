import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        ink: {
          900: "#0a0a0a",
          700: "#1f1f1f",
          500: "#525252",
          300: "#a3a3a3",
          100: "#f5f5f5",
        },
        accent: {
          DEFAULT: "#10b981",
          dark: "#047857",
        },
      },
    },
  },
  plugins: [],
};

export default config;
