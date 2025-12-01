// app/api/badge/route.ts

import { ImageResponse } from '@vercel/og'; // Assurez-vous que @vercel/og est bien dans package.json

export const runtime = 'edge'; // Pour une exécution rapide sur Vercel

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Récupération des paramètres
    const text = searchParams.get('text') || 'Dynamic Title';
    const color = searchParams.get('color') || '#00BFFF';
    const bgColor = searchParams.get('bgColor') || '#1F2937';

    // Rendu de l'Image (Utilisation d'une police SANS SERRIT standard)
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
            borderRadius: '5px',
            border: `3px solid ${color}`,
            fontFamily: 'sans-serif', // Police de secours
          }}
        >
          <p
            style={{
              fontSize: 36, 
              fontWeight: 700,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {decodeURIComponent(text)}
          </p>
        </div>
      ),
      {
        width: 400,
        height: 60,
        // Pas de tableau 'fonts' nécessaire ici, ce qui évite le crash
      },
    );
  } catch (e: any) {
    console.error('Erreur interne de l’API:', e.message);
    // Important : renvoie un code d'état d'erreur pour indiquer le crash
    return new Response(`API Crash: ${e.message}`, { status: 500 });
  }
}