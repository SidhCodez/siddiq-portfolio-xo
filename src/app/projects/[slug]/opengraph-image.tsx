import { ImageResponse } from "next/og";
import { ALL_PROJECTS } from "@/data/projects";

export const runtime = "nodejs";
export const alt = "Project case study — Siddiq";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ slug: string }>;
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export default async function OpengraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((item) => item.slug === slug);

  const title = truncate(project?.title ?? "Case Study", 60);
  const subtitle = truncate(project?.subtitle ?? "", 120);
  const category = project?.category ?? "PROJECTS";
  const usp = project?.metrics ?? "";

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
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #2E2427",
            paddingBottom: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "16px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#C2434B",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                background: "#C2434B",
                transform: "rotate(45deg)",
              }}
            />
            <div>{category}</div>
          </div>
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6F6266",
            }}
          >
            {`CASE STUDY · ${project?.year ?? ""}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "70px", fontWeight: 700, lineHeight: 1.05 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: "24px", lineHeight: 1.4, color: "#B8A8A4" }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2E2427",
            paddingTop: "22px",
            fontSize: "16px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6C5A5E",
          }}
        >
          <div style={{ color: "#C2434B" }}>{usp}</div>
          <div>siddiq · frontend engineering</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
