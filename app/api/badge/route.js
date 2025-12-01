// Fichier : app/api/badge/route.ts (Solution Vercel)
import { NextRequest } from 'next/server';

const generateSvg = (text: string, color: string): string => {
  const formattedText = text.toUpperCase(); 
  const backgroundColor = "#0f0c29";
  const glowFilter = `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}) drop-shadow(0 0 24px ${color})`;
  const font = "HIGHSPEED, Arial, sans-serif";
  const fontSize = "60px";

  // Attention: Pour le support de la police dans un SVG côté serveur, il est plus sûr
  // d'intégrer la police, mais nous allons d'abord essayer avec l'URL relative.
  // Vercel gère mieux les assets que GitHub Pages.

  return `
    <svg width="800" height="150" viewBox="0 0 800 150" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face {
            font-family: "HIGHSPEED";
            /* Assurez-vous que Vercel peut accéder à /fonts/HIGHSPEED.TTF */
            src: url("/fonts/HIGHSPEED.TTF") format("truetype"); 
            font-weight: normal;
            font-style: normal;
          }
          text {
            font-family: ${font};
            font-size: ${fontSize};
            text-anchor: middle;
            dominant-baseline: middle;
            fill: ${color};
            letter-spacing: 1px;
            filter: ${glowFilter};
          }
        </style>
      </defs>
      
      <rect width="100%" height="100%" rx="20" ry="20" fill="${backgroundColor}" />
      
      <text x="400" y="75">
        ${formattedText}
      </text>
    </svg>
  `.trim();
};


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const textParam = searchParams.get('text');
  const colorParam = searchParams.get('color');

  const title = textParam ? decodeURIComponent(textParam) : "GALACTIC BLAST";
  const color = colorParam ? decodeURIComponent(colorParam) : "#ADD8E6";

  const svgContent = generateSvg(title, color);

  return new Response(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    status: 200,
  });
}