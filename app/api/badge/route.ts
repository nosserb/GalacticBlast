// app/api/badge/route.ts

import { ImageResponse } from '@vercel/og';
// On retire l'import de FONT_URL et le fetch de fontData.

// Reste en Edge pour l'efficacité, car c'est une fonctionnalité clé de Vercel/Next.js.
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // --- 1. PARAMÈTRES ET VALEURS PAR DÉFAUT ---
    const text = searchParams.get('text') || 'Titre Dynamique';
    const color = searchParams.get('color') || '#00BFFF'; // Couleur du texte
    const bgColor = searchParams.get('bgColor') || '#1F2937'; // Couleur de fond (Gris foncé)

    // --- 2. RENDU DE L'IMAGE (Utilisation de police par défaut) ---
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // On définit une taille standard pour les badges GitHub
            width: '100%', 
            height: '100%',
            backgroundColor: bgColor,
            color: color,
            padding: '0 25px',
            borderRadius: '5px',
            border: `3px solid ${color}`,
          }}
        >
          <p
            style={{
              fontSize: 32, // Taille optimisée pour le format badge
              // Utilisation d'une police SANS SERRIT par défaut (fiable)
              fontFamily: 'sans-serif', 
              fontWeight: 700,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              letterSpacing: '0.1em'
            }}
          >
            {decodeURIComponent(text)}
          </p>
        </div>
      ),
      {
        width: 400, // Largeur réduite pour un badge classique
        height: 60, // Hauteur réduite
        // On retire le tableau 'fonts'
      },
    );
  } catch (e: any) {
    console.error('Erreur de génération de badge (simplifié):', e.message);
    // Renvoie une erreur 500 avec le message de l'erreur pour le débogage
    return new Response(`Erreur: ${e.message}`, {
      status: 500,
    });
  }
}