import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Charger la police via fetch (fonctionne dans Edge)
const fontData = await fetch(new URL("../../../public/fonts/HIGHSPEED.TTF", import.meta.url)).then(res => res.arrayBuffer());

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const texte = searchParams.get("texte") || "Aucun texte";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "400px",
          background: "rgba(255, 0, 0, 0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 120,
          color: "rgba(53, 121, 247, 0.66)",
          fontWeight: "bold",
          fontFamily: "HIGHSPEED",
          textShadow: "0 0 20px #305eddad, 0 0 40px rgba(29, 71, 255, 0.72), 0 0 60px rgba(40, 124, 250, 0.92)",
        }}
      >
        {texte}
      </div>
    ),
    {
      width: 1200,
      height: 400,
      fonts: [
        {
          name: "HIGHSPEED",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
