import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Andival-Sei Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: "bold", marginBottom: "20px" }}>
          Andival-Sei
        </div>
        <div style={{ fontSize: 48, opacity: 0.9 }}>Frontend разработчик</div>
        <div style={{ fontSize: 32, opacity: 0.7, marginTop: "20px" }}>
          React · Next.js · TypeScript
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
