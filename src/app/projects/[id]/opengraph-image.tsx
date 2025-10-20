import { ImageResponse } from "next/og";

import { getProjectById } from "@/data/projects";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return new ImageResponse(
      <div style={{ display: "flex" }}>Проект не найден</div>
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #1e293b, #0f172a)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: "bold", textAlign: "center" }}>
          {project.title}
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.8,
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          {project.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
