"use client"

import { useEffect, useState } from "react"

export default function Page() {
  const [title, setTitle] = useState("GALACTIC BLAST")
  const [color, setColor] = useState("#ADD8E6")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    // Récupérer le texte
    const textParam = params.get("text")
    if (textParam) {
      // Utilisez decodeURIComponent pour gérer les espaces et caractères spéciaux
      setTitle(decodeURIComponent(textParam))
    }

    // Récupérer la couleur
    const colorParam = params.get("color")
    if (colorParam) {
      // S'assurer que la couleur est un format hexadécimal ou un nom de couleur valide
      setColor(decodeURIComponent(colorParam))
    }
  }, [])

  // Construction de la chaîne de drop-shadow en utilisant la couleur dynamique
  const glowFilter = `drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color}) drop-shadow(0 0 15px ${color})`

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0c29]">
      <svg className="w-[80%] max-w-[800px] h-auto" width="800" height="150" viewBox="0 0 800 150">
        {/* Suppression de la section <defs> et du filtre <filter id="glow"> */}
        
        <rect width="100%" height="100%" rx="20" ry="20" fill="#0f0c29" />
        <text
          x="50%"
          y="50%"
          style={{
            fontFamily: "HIGHSPEED, Arial, sans-serif",
            fontSize: "60px",
            textAnchor: "middle",
            dominantBaseline: "middle",
            fill: color, // Couleur de remplissage dynamique
            letterSpacing: "1px",
            // Application du filtre de lueur dynamique
            filter: glowFilter,
          }}
        >
          {title} {/* Titre dynamique */}
        </text>
      </svg>
      {/* Le style jsx global n'est plus nécessaire car le filtre est appliqué en inline */}
      {/* <style jsx global>{`
        svg text {
          filter: drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 30px ${color});
        }
      `}</style> */}
    </div>
  )
}