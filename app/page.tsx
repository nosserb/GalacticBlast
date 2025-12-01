"use client"

import { useEffect, useState } from "react"

export default function Page() {
  // État initial
  const [title, setTitle] = useState("GALACTIC BLAST")
  const [color, setColor] = useState("#ADD8E6") // Couleur par défaut (LightBlue)

  useEffect(() => {
    // S'exécute uniquement côté client pour lire l'URL
    const params = new URLSearchParams(window.location.search)

    // Récupérer et décoder le texte
    const textParam = params.get("text")
    if (textParam) {
      // Met le texte en majuscules pour correspondre au style de la police
      setTitle(decodeURIComponent(textParam.toUpperCase()))
    }

    // Récupérer et décoder la couleur
    const colorParam = params.get("color")
    if (colorParam) {
      // S'assurer que le code couleur est un format CSS valide (ex: #FF0000)
      setColor(decodeURIComponent(colorParam))
    }
  }, [])

  // 1. Définir le filtre de lueur en utilisant la couleur dynamique
  const glowFilter = `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}) drop-shadow(0 0 24px ${color})`
  
  // 2. Définir la couleur du fond (pour le contraste)
  const backgroundColor = "#0f0c29"

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: backgroundColor }}>
      <svg className="w-[80%] max-w-[800px] h-auto" width="800" height="150" viewBox="0 0 800 150">
        
        {/* L'arrière-plan du SVG (utile pour l'effet de lueur) */}
        <rect width="100%" height="100%" rx="20" ry="20" fill={backgroundColor} />
        
        <text
          x="50%"
          y="50%"
          style={{
            // La police est déclarée dans global.css
            fontFamily: "HIGHSPEED, Arial, sans-serif", 
            fontSize: "60px",
            textAnchor: "middle",
            dominantBaseline: "middle",
            fill: color, // Couleur du texte
            letterSpacing: "1px",
            // APPLICATION DU FILTRE DE LUEUR DYNAMIQUE
            filter: glowFilter,
            userSelect: 'none', 
          }}
        >
          {title} {/* Titre dynamique par URL */}
        </text>
      </svg>
    </div>
  )
}