/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,astro}"],
  theme: {
    extend: {
      fontFamily: {
        sans:   ["DM Sans", "system-ui", "sans-serif"],
        serif:  ["Fraunces", "Georgia", "serif"],
        mono:   ["JetBrains Mono", "monospace"],
      },
      colors: {
        background:  "hsl(var(--bg))",
        foreground:  "hsl(var(--ink))",
        surface:     "hsl(var(--surface))",
        border:      "hsl(var(--border))",
        ink:         "hsl(var(--ink))",
        muted:       "hsl(var(--muted))",
        faint:       "hsl(var(--faint))",
        terracotta:  "hsl(var(--terracotta))",
        sage:        "hsl(var(--sage))",
        lavender:    "hsl(var(--lavender))",
        "slate-blue":"hsl(var(--slate-blue))",
        coral:       "hsl(var(--coral))",
        primary: {
          DEFAULT:    "hsl(var(--terracotta))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--surface))",
          foreground: "hsl(var(--ink))",
        },
        card: {
          DEFAULT:    "hsl(var(--surface))",
          foreground: "hsl(var(--ink))",
        },
        destructive: { DEFAULT: "hsl(0 84% 60%)", foreground: "hsl(0 0% 100%)" },
        ring:        "hsl(var(--terracotta))",
        input:       "hsl(var(--surface))",
        popover:     { DEFAULT: "hsl(var(--surface))", foreground: "hsl(var(--ink))" },
        accent:      { DEFAULT: "hsl(var(--surface))", foreground: "hsl(var(--ink))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "2rem", lg: "4rem", xl: "5rem" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
