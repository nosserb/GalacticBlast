"use client"

import { useEffect, useState } from "react"

export default function Page() {
  const [title, setTitle] = useState("GALACTIC BLAST")
  const [color, setColor] = useState("rgba(173, 216, 230, 0.8)")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const text = params.get("text")
    if (text) {
      setTitle(decodeURIComponent(text))
    }

    const colorParam = params.get("color")
    if (colorParam) {
      setColor(colorParam)
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0c29]">
      <svg className="w-[80%] max-w-[800px] h-auto block" width="800" height="150" viewBox="0 0 800 150">
        <rect width="100%" height="100%" rx="20" ry="20" fill="#0f0c29" />
        <text
          x="50%"
          y="50%"
          className="glowing-text"
          style={{
            fontFamily: "HIGHSPEED, Arial, sans-serif",
            fontSize: "60px",
            textAnchor: "middle",
            dominantBaseline: "middle",
            fill: color, // Use dynamic color from state
            letterSpacing: "1px",
          }}
        >
          {title}
        </text>
      </svg>
    </div>
  )
}
