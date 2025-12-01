// app/api/badge/route.ts

// NOTE: On retire l'import de 'fs' et 'path' pour ce test
import { ImageResponse } from '@vercel/og';

// On retire FONT_PATH et FONT_DATA
// export const runtime = 'edge'; // On peut laisser 'edge' pour l'optimisation, mais Next.js gérera si les dépendances le permettent.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Récupération des paramètres (avec valeurs par défaut)
    const text = searchParams.get('text') || 'Dynamic Badge';
    const color = searchParams.get('color') || '#A3B1C6';
    const bgColor = searchParams.get('bgColor') || '#101010'; // Fond sombre

    // 2. Rendu de l'Image (SANS POLICE CUSTOM)
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
              // FONT FAMILY UTILISE LA POLICE SANS SERRIT PAR DEFAUT DE VERCEL
              fontWeight: 700,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            }}
          >
            {decodeURIComponent(text)}
          </p>
        </div>
      ),
      {
        width: 800,
        height: 100,
        // On retire la configuration des polices
        // fonts: [...], 
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate the image (Error in code): ${e.message}`, {
      status: 500,
    });
  }
}