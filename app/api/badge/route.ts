// app/api/badge/route.ts - Version de test pour confirmer le fonctionnement du routage

export async function GET() {
  // Cette réponse ne nécessite AUCUNE dépendance Next.js, React, ou @vercel/og
  return new Response("API is running! Routing check SUCCESS.", {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}