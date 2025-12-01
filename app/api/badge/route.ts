import { ImageResponse } from '@vercel/og';
import * as fs from 'fs';
import * as path from 'path';

// Le chemin vers votre police dans le dossier public
const FONT_PATH = path.join(process.cwd(), 'public', 'fonts', 'HIGHSPEED.TTF');
const FONT_DATA = fs.readFileSync(FONT_PATH);

// On va utiliser Satori/Vercel OG pour générer le SVG, qui est ensuite rendu en PNG par ImageResponse.
// Si le rendu en SVG pur est nécessaire, il faudrait utiliser une librairie Node.js dédiée (ex: satori + resvg).
// Pour la simplicité, restons sur ImageResponse, qui est bien gérée par Next.js.

export const runtime = 'edge'; // On force l'exécution sur un environnement léger

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Récupération des paramètres (avec valeurs par défaut)
    const text = searchParams.get('text') || 'Dynamic Badge';
    const color = searchParams.get('color') || '#A3B1C6';
    const bgColor = searchParams.get('bgColor') || '#101010'; // Fond sombre

    // 2. Calcul des dimensions (simplifié pour un badge)
    // Les dimensions finales seront ajustées par le moteur de rendu, mais nous devons donner un point de départ.
    const width = 800;
    const height = 100;

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            color: color,
            padding: '0 20px',
            borderRadius: '10px',
            border: `5px solid ${color}`,
          }}
        >
          <p
            style={{
              fontSize: 60,
              fontFamily: 'HighSpeed',
              fontWeight: 700,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              // Ajout de l'effet de lueur (shadow)
              textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            }}
          >
            {decodeURIComponent(text)}
          </p>
        </div>
      ),
      {
        width: width,
        height: height,
        fonts: [
          {
            name: 'HighSpeed',
            data: FONT_DATA,
            style: 'normal',
          },
        ],
        // ImageResponse retourne par défaut une image PNG.
      },
    );
  } catch (e) {
    console.error(e);
    // En cas d'erreur (police non trouvée, etc.), renvoyer une image d'erreur ou un message 500
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}