/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.04)",
        input: "rgba(255, 255, 255, 0.08)",
        ring: "#c5a880",
        background: "#050508",
        foreground: "#e8e8f0",
        primary: {
          DEFAULT: "#c5a880",
          foreground: "#050508",
        },
        secondary: {
          DEFAULT: "rgba(255, 255, 255, 0.02)",
          foreground: "#e8e8f0",
        },
        destructive: {
          DEFAULT: "#eb5e55",
          foreground: "#e8e8f0",
        },
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          foreground: "#8888aa",
        },
        accent: {
          DEFAULT: "#c5a880",
          foreground: "#050508",
        },
        popover: {
          DEFAULT: "#0c0c10",
          foreground: "#e8e8f0",
        },
        card: {
          DEFAULT: "#0c0c10",
          foreground: "#e8e8f0",
        },
        gold: {
          muted: "#c5a880",
          hover: "#d5b890",
        },
        charcoal: {
          dark: "#0c0c10",
        },
        obsidian: "#050508",
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      fontFamily: {
        heading: ["Playfair Display", "Cinzel", "Syne", "serif"],
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}
