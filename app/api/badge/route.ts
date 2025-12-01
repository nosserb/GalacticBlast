// app/api/badge/route.ts

// IMPORTANT: Retirez toute ligne d'importation de React, ImageResponse ou @vercel/og !

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // --- 1. PARAMÈTRES ---
        const text = searchParams.get('text') || 'Titre Dynamique';
        const color = searchParams.get('color') || 'success'; // Couleur du badge (vert par défaut)
        const bgColor = searchParams.get('bgColor') || '555555'; // Couleur de fond (gris foncé)

        // Encode le texte pour les URL Shields.io
        const safeText = encodeURIComponent(text.replace(/-/g, '--'));

        // --- 2. URL DE REDIRECTION (Shields.io) ---
        // On construit l'URL pour demander à Shields.io de générer le badge SVG
        const shieldsUrl = `https://img.shields.io/badge/Status-${safeText}-${color}?style=flat&colorA=${bgColor}`;

        // --- 3. RÉPONSE : Redirection 302 ---
        // L'API renvoie une simple instruction au navigateur (ou GitHub) de "regarder à cette autre adresse"
        return new Response(null, {
            status: 302, 
            headers: {
                Location: shieldsUrl,
                'Cache-Control': 'public, max-age=86400', // Cache pour un jour
            }
        });

    } catch (e: any) {
        // Cette erreur est peu probable car il n'y a pas de code complexe
        console.error("Erreur dans l'API de redirection :", e.message);
        return new Response("Erreur dans l'API de badge.", { status: 500 });
    }
}