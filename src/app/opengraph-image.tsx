import { ImageResponse } from "next/og";

export const alt = "FenerIndex - The Pulse of Fenerbahce Fans";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #00205B 0%, #001440 50%, #000B20 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "#FFD700",
              fontSize: "36px",
              fontWeight: 800,
              color: "#00205B",
            }}
          >
            FI
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            FenerIndex
          </span>
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#FFD700",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "20px",
          }}
        >
          Fan-Powered Intelligence
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Vote on transfer rumors, call cap on fake news, and see what the hive mind really thinks.
        </div>
      </div>
    ),
    { ...size }
  );
}
