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
      setTitle(decodeURIComponent(textParam))
    }

    // Récupérer la couleur
    const colorParam = params.get("color")
    if (colorParam) {
      setColor(decodeURIComponent(colorParam))
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0c29]">
      <svg className="w-[80%] max-w-[800px] h-auto" width="800" height="150" viewBox="0 0 800 150">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" rx="20" ry="20" fill="#0f0c29" />
        <text
          x="50%"
          y="50%"
          style={{
            fontFamily: "HIGHSPEED, Arial, sans-serif",
            fontSize: "60px",
            textAnchor: "middle",
            dominantBaseline: "middle",
            fill: color,
            letterSpacing: "1px",
          }}
          filter="url(#glow)"
        >
          {title}
        </text>
      </svg>
      <style jsx global>{`
        svg text {
          filter: drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}) drop-shadow(0 0 30px ${color});
        }
      `}</style>
    </div>
  )
}
