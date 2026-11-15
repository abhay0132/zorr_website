import { ImageResponse } from "next/og";

// Share card for Open Graph and Twitter. Generated at build time; no font fetch,
// so it uses the renderer's default sans with heavy weight and tight tracking.
export const alt = "Zorr: a coach built around your actual life";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F1011",
          color: "#EDEBE6",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 900, letterSpacing: "0.02em" }}>ZORR</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
          <span style={{ color: "#85857F" }}>A coach built around</span>
          <span>your actual life.</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9C9C97", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Free on the web · iPhone app soon
        </div>
      </div>
    ),
    size,
  );
}
