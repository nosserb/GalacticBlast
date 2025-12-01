// app/api/badge/route.ts

import { ImageResponse } from '@vercel/og';

// VERCEL HACK POUR LE CHEMIN DE LA POLICE
// Le chemin relatif doit remonter de app/api/badge/route.ts pour atteindre public/fonts
// D'où l'utilisation de '../../../'
export const FONT_URL = new URL(
  '../../../public/fonts/HIGHSPEED.ttf', 
  import.meta.url,
);

// Nécessaire pour forcer l'exécution sur l'infrastructure Edge de Vercel, optimisée pour ce type d'API
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // --- 1. PARAMÈTRES ET VALEURS PAR DÉFAUT ---
    const text = searchParams.get('text') || 'API en Ligne';
    const color = searchParams.get('color') || '#A3B1C6'; // Couleur du texte
    const bgColor = searchParams.get('bgColor') || '#101010'; // Couleur de fond

    // --- 2. CHARGEMENT DE LA POLICE ---
    // On fetch le fichier de police via son URL pour obtenir le ArrayBuffer
    const fontResponse = await fetch(FONT_URL);
    const fontData = await fontResponse.arrayBuffer();

    // --- 3. RENDU DE L'IMAGE ---
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
              // Doit correspondre au nom de la police dans le tableau 'fonts' ci-dessous
              fontFamily: 'Highspeed', 
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
        fonts: [
          {
            name: 'Highspeed', // Nom utilisé dans 'fontFamily'
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e: any) {
    console.error('Erreur de génération de badge:', e.message);
    // Renvoie une erreur 500 avec le message de l'erreur pour le débogage
    return new Response(`Erreur Interne lors de la génération du badge: ${e.message}`, {
      status: 500,
    });
  }
}