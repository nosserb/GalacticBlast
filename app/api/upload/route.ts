import { createCanvas, registerFont } from "canvas";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

type FontType = "highspeed" | "lady-radical";

const fontConfigs: Record<FontType, { name: string; file: string }> = {
  highspeed: { name: "HIGHSPEED", file: "HIGHSPEED.TTF" },
  "lady-radical": { name: "Lady Radical", file: "Lady Radical.ttf" },
};

// Enregistrer les polices
Object.entries(fontConfigs).forEach(([, config]) => {
  const fontPath = path.join(process.cwd(), "public", "fonts", config.file);
  if (fs.existsSync(fontPath)) {
    registerFont(fontPath, { family: config.name });
  }
});

async function generateImage(texte: string, fontType: FontType = "highspeed", color: string = "#3579f7", fontSize: number = 100): Promise<Buffer> {
  const fontConfig = fontConfigs[fontType];
  const canvas = createCanvas(1200, 400);
  const ctx = canvas.getContext("2d");

  // Fond transparent
  ctx.clearRect(0, 0, 1200, 400);

  // Glow effect (fond flou)
  ctx.fillStyle = color.startsWith("#") ? color + "30" : color.replace("rgb", "rgba").replace(")", ", 0.2)");
  ctx.shadowColor = color;
  ctx.shadowBlur = 50;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Texte
  ctx.font = `bold ${fontSize}px ${fontConfig.name}`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(texte, 600, 200);

  return canvas.toBuffer("image/png");
}

export async function POST(req: Request) {
  try {
    const { texte, font, color, fontSize } = await req.json();

    if (!texte || typeof texte !== "string") {
      return Response.json(
        { error: "Texte invalide" },
        { status: 400 }
      );
    }

    const fontType = (font === "lady-radical" ? "lady-radical" : "highspeed") as FontType;

    // Générer l'image
    const imageBuffer = await generateImage(texte, fontType, color || "#3579f7", fontSize || 100);
    const base64Image = imageBuffer.toString("base64");

    // Uploader sur ImgBB
    const formData = new FormData();
    formData.append("image", base64Image);
    formData.append("key", process.env.IMGBB_API_KEY || "");

    const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!imgbbResponse.ok) {
      console.error("ImgBB error:", imgbbResponse.status);
      return Response.json(
        { error: "Erreur lors de l'upload sur ImgBB" },
        { status: 500 }
      );
    }

    const imgbbData = await imgbbResponse.json() as { data?: { url?: string } };

    if (!imgbbData.data?.url) {
      return Response.json(
        { error: "Pas d'URL retournée par ImgBB" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      imageUrl: imgbbData.data.url,
    });
  } catch (error) {
    console.error("Erreur:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
