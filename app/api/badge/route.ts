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

    // Rendu de l'Image (Le JSX DOIT ÊTRE ENFERMÉ DANS DES PARENTHÈSES)
    return new ImageResponse(
      (
        // C'est cette parenthèse ouverte qui était probablement manquante ou mal placée
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
      ), // Et la parenthèse fermée ici
      {
        width: 400,
        height: 60,
      },
    );
  } catch (e: any) {
    console.error('Erreur interne de l’API:', e.message);
    return new Response(`API Crash: ${e.message}`, { status: 500 });
  }
}