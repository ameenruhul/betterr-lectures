
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9b87f5",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#7E69AB",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#f8fafc",
          foreground: "#0f172a",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        // New AI-themed gradient colors with red-violet-purple scheme
        ai: {
          red: "#ea384c",
          pink: "#D946EF",
          purple: "#9b87f5",
          violet: "#7E69AB",
          magenta: "#D946EF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.8",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "blue-purple-gradient": "linear-gradient(90deg, #0EA5E9, #8B5CF6)",
        "purple-pink-gradient": "linear-gradient(90deg, #8B5CF6, #EC4899)",
        "blue-indigo-gradient": "linear-gradient(90deg, #0EA5E9, #6366f1)",
        "teal-blue-gradient": "linear-gradient(90deg, #14b8a6, #0EA5E9)",
        "hero-gradient": "linear-gradient(to bottom right, rgba(14, 165, 233, 0.15), rgba(139, 92, 246, 0.15))",
        // New red-violet-purple gradients
        "red-violet-gradient": "linear-gradient(90deg, #ea384c, #7E69AB)",
        "violet-purple-gradient": "linear-gradient(90deg, #7E69AB, #9b87f5)",
        "red-purple-gradient": "linear-gradient(90deg, #ea384c, #9b87f5)",
        "magenta-violet-gradient": "linear-gradient(90deg, #D946EF, #7E69AB)",
        "red-magenta-gradient": "linear-gradient(90deg, #ea384c, #D946EF)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
