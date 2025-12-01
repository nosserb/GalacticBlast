// app/api/badge/route.ts

// Plus besoin d'importer ImageResponse ou React !

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const text = searchParams.get('text') || 'Titre Dynamique';
        const colorHex = searchParams.get('color') || '007ec6'; // Bleu par défaut (sans #)
        const bgColorHex = searchParams.get('bgColor') || '555555'; // Gris foncé par défaut (sans #)

        const safeText = encodeURIComponent(text.replace(/-/g, '--'));

        // Création du lien vers un service de badge SVG standard
        // (Exemple : Shields.io, qui est une solution très fiable)
        const shieldsUrl = `https://img.shields.io/badge/Status-${safeText}-${colorHex}?style=flat&colorA=${bgColorHex}`;

        // Redirection vers le badge Shields.io
        return new Response(null, {
            status: 302, // Code de redirection
            headers: {
                Location: shieldsUrl,
                'Cache-Control': 'public, max-age=86400' // Cache pour un jour
            }
        });

    } catch (e: any) {
        console.error("Erreur dans l'API de redirection :", e.message);
        return new Response("Erreur dans l'API de badge.", { status: 500 });
    }
}