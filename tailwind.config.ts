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
        "letter-bg": "#fef5f8",
        "letter-parchment": "#fce4ec",
        "letter-ink": "#3d2c2e",
        "letter-ink-soft": "#7d6b6e",
        "letter-accent": "#c97b8a",
        "letter-accent-light": "#e8b4be",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
