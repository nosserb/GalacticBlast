import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const texte = searchParams.get("texte") || "Aucun texte";

  return new ImageResponse(
    (
      <div
        style={{
          width: "800px",
          height: "200px",
          background: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
          color: "#000000",
          fontWeight: "bold",
          fontFamily: "Arial",
        }}
      >
        {texte}
      </div>
    ),
    { width: 800, height: 200 }
  );
