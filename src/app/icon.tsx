import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#FFD700",
          borderRadius: "6px",
          fontSize: "18px",
          fontWeight: 800,
          color: "#00205B",
        }}
      >
        FI
      </div>
    ),
    { ...size }
  );
}
