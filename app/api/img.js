import { createCanvas } from "@napi-rs/canvas";

export default function handler(req, res) {
  const texte = req.query.texte || "Aucun texte";

  const width = 800;
  const height = 200;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#000000";
  ctx.font = "bold 40px Arial";
  ctx.fillText(texte, 50, 120);

  res.setHeader("Content-Type", "image/png");
  res.send(canvas.toBuffer("image/png"));
}
