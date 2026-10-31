import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const alt = "Siddiq — Frontend Engineer & UI Architect";
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
          background: "#0F0C0D",
          color: "#F5EDE9",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "18px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#B8A8A4",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              background: "#C2434B",
              transform: "rotate(45deg)",
            }}
          />
          <div>SIDDIQ · EDITION 01</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "82px", fontWeight: 700, lineHeight: 1.02 }}>
            Quiet luxury,
          </div>
          <div
            style={{
              fontSize: "82px",
              fontWeight: 700,
              lineHeight: 1.02,
              color: "#C2434B",
              fontStyle: "italic",
            }}
          >
            crafted code.
          </div>
          <div
            style={{
              marginTop: "26px",
              fontSize: "26px",
              color: "#B8A8A4",
              letterSpacing: "0.02em",
            }}
          >
            Frontend engineering · UI systems · digital craft
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2E2427",
            paddingTop: "26px",
            fontSize: "16px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6F6266",
          }}
        >
          <div>{new URL(SITE_URL).host}</div>
          <div>DEVELOPER &amp; DESIGNER</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
