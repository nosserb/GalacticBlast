import { createCanvas } from "canvas";

export default function handler(req, res) {

  const texte = req.query.texte || "Aucun texte";
  
  // Taille de l'image
  const width = 800;
  const height = 200;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fond blanc
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Texte
  ctx.fillStyle = "#000000";
  ctx.font = "bold 40px Arial";
  ctx.fillText(texte, 50, 120);

  // Retourner l'image
  res.setHeader("Content-Type", "image/png");
  res.send(canvas.toBuffer());
}
