import type { Config } from "tailwindcss";

// Design tokens for the dark Zorr web design (2026-10). The default palette is
// fully replaced so no stock Tailwind colour can drift into the UI.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#FFFFFF", // link hover
      bg: "#0C0B0A", // page background
      surface: "#151412", // cards
      "surface-2": "#1C1A18", // option rows inside cards
      "surface-3": "#121110", // chip demo well
      phone: "#1B1917", // phone bezel, floating chips
      screen: "#100F0E", // phone screen
      cell: "#1A1816", // empty grid cell, footer wordmark
      line: "#24211E", // hairline
      "line-strong": "#33302C", // stronger hairline
      "line-soft": "#262320", // rows inside the phone
      "line-warm": "#2E2A26", // rows inside the accent card
      control: "#3A3631", // chip border, bars
      "control-2": "#2A2724", // progress track, bars
      "control-3": "#4A4540", // underlines, dashed outlines
      fg: "#F4F1EC", // primary text
      soft: "#D9D4CC", // secondary text, links
      muted: "#A39E96", // body copy on dark
      dim: "#8C877F", // labels, the crossed-out template
      "on-light-dim": "#5A554E", // label on the cream floating chip
      "on-accent": "#0C0B0A", // text on accent
      "on-accent-soft": "#2A1A12", // body copy on accent
      accent: "#FF5C1F",
    },
    fontFamily: {
      display: ["var(--font-archivo)", "system-ui", "sans-serif"],
      sans: ["var(--font-geist)", "Helvetica Neue", "Helvetica", "sans-serif"],
      mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
    },
    extend: {
      fontWeight: {
        heavy: "850",
      },
      letterSpacing: {
        label: "0.08em",
        "label-tight": "0.06em",
        tightest: "-0.03em",
      },
      maxWidth: {
        page: "1240px",
      },
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        ticker: "ticker 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
