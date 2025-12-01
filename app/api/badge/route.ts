// app/api/badge/route.ts

// IMPORTANT: Le reste du code reste le même, seule la ligne shieldsUrl change.

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const text = searchParams.get('text') || 'Titre Dynamique';
        const color = searchParams.get('color') || 'green'; 
        const bgColor = searchParams.get('bgColor') || '555555'; 

        const safeText = encodeURIComponent(text.replace(/-/g, '--'));

        // *** LIGNE MODIFIÉE POUR UTILISER style=for-the-badge ***
        const shieldsUrl = `https://img.shields.io/badge/Status-${safeText}-${color}?style=for-the-badge&colorA=${bgColor}`;
        // *******************************************************

        // Redirection vers le badge Shields.io
        return new Response(null, {
            status: 302, 
            headers: {
                Location: shieldsUrl,
                'Cache-Control': 'public, max-age=86400'
            }
        });

    } catch (e: any) {
        console.error("Erreur dans l'API de redirection :", e.message);
        return new Response("Erreur dans l'API de badge.", { status: 500 });
    }
}