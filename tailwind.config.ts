import type { Config } from "tailwindcss";

// Design tokens for the Zorr website, matched to the iPhone app's "Plates" design
// (Zorr_Final/zorr_frontend/design-v2/theme/tokens.ts, approved 2026-11-13).
// The default palette is fully replaced so no stock Tailwind colour can drift in.
//
// Colour rules, the same as the app's:
//   • Graphite canvas. Chalk (`accent`) is every primary button and selected state.
//   • Plate colours code SESSION TYPES and nothing else.
//   • Orange (`now`) means "happening now" (today, the current step) and Kai's voice.
//     Nothing else, or it stops meaning "now".
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#FFFFFF", // link hover
      bg: "#0F1011", // graphite page background
      surface: "#17181A", // cards
      "surface-2": "#1F2023", // rows and tiles inside cards
      "surface-3": "#141517", // inputs, wells
      phone: "#0B0B0C", // phone bezel
      screen: "#0F1011", // phone screen
      cell: "#1F2023", // rest day, empty grid cell
      hub: "#2E3034", // plate hub, footer wordmark
      line: "#232427", // hairline (white at 8% on graphite)
      "line-strong": "#37383B", // stronger hairline
      "line-soft": "#26272A", // rows inside cards
      "line-warm": "#2A2C2F", // rows inside raised cards
      control: "#3A3C40", // chip and input border
      "control-2": "#2A2C2F", // tracks
      "control-3": "#4A4C51", // underlines, dashed outlines, rest dots
      fg: "#EDEBE6", // chalk text
      soft: "#C9C7C2", // secondary text, links
      muted: "#9C9C97", // body copy on graphite
      dim: "#85857F", // labels, the tonal half of a headline
      ink: "#121212", // text on chalk
      "chalk-band": "#E6E4DF", // the one light section
      "on-light-dim": "#55554F", // labels on the chalk band
      accent: "#EDEBE6", // chalk: buttons, selections, focus
      "on-accent": "#121212", // text on chalk
      "on-accent-soft": "#3A3A36", // body copy on chalk
      now: "#FF5B22", // orange: now and Kai, nothing else
      "on-now": "#1C0C04", // text on orange
      win: "#3EA673", // done, saved
      danger: "#F0645A", // errors, destructive actions
      "plate-red": "#D8443A",
      "plate-blue": "#3B7AD6",
      "plate-yellow": "#E8B43B",
      "plate-green": "#3EA673",
      "plate-white": "#CFCDC7",
      "plate-steel": "#6E7075",
    },
    fontFamily: {
      display: ["var(--font-archivo)", "system-ui", "sans-serif"],
      sans: ["var(--font-archivo)", "system-ui", "-apple-system", "sans-serif"],
      mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
    },
    extend: {
      fontWeight: {
        heavy: "850",
      },
      letterSpacing: {
        label: "0.13em",
        "label-tight": "0.08em",
        tightest: "-0.03em",
      },
      maxWidth: {
        page: "1200px",
      },
      borderRadius: {
        card: "26px",
      },
    },
  },
  plugins: [],
};

export default config;
