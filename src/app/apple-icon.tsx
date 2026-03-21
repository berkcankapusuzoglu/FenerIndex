import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FFD700 0%, #FFC107 100%)",
          borderRadius: "40px",
          fontSize: "90px",
          fontWeight: 800,
          color: "#00205B",
          letterSpacing: "-0.03em",
        }}
      >
        FI
      </div>
    ),
    { ...size }
  );
}
