"use client";

import { useState } from "react";

export default function Home() {
  const [texte, setTexte] = useState("");
  const [font, setFont] = useState("highspeed");
  const [color, setColor] = useState("#ff9500");
  const [fontSize, setFontSize] = useState(100);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!texte.trim()) {
      setError("Veuillez entrer du texte");
      return;
    }

    setIsLoading(true);
    setError("");
    setGeneratedUrl("");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texte, font, color, fontSize }),
      });

      const data = await response.json() as { success?: boolean; imageUrl?: string; error?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de l'upload");
      }

      setGeneratedUrl(data.imageUrl || "");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur serveur";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      alert("Lien copié !");
    }
  };

  const copyMarkdown = () => {
    if (generatedUrl) {
      const markdown = `![img](${generatedUrl})`;
      navigator.clipboard.writeText(markdown);
      alert("Format Markdown copié !");
    }
  };

  const copyHTML = () => {
    if (generatedUrl) {
      const html = `<p align="center">
  <a href="${generatedUrl}">
    <img src="${generatedUrl}" alt="Image">
  </a>
</p>`;
      navigator.clipboard.writeText(html);
      alert("Format HTML copié !");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950 to-slate-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-amber-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center items-center">
            <img src="https://i.ibb.co/20swhkhL/2f70d3760058.png" alt="Galactic Blast" className="h-20 w-auto" />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight mb-6">
              Créez des images<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300">
                avec style
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            </p>
          </div>

          {/* Main Grid */}
          <div className="flex justify-center items-center">
            <div className="max-w-2xl w-full">
              <div className="bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur border border-amber-900/20 p-8 rounded">
                
                <div className="mb-8">
                  <label className="block text-amber-300/80 text-sm tracking-widest uppercase mb-3 font-light">
                    Texte
                  </label>
                  <textarea
                    value={texte}
                    onChange={(e) => setTexte(e.target.value)}
                    placeholder="Entrez votre texte..."
                    className="w-full h-24 p-4 bg-slate-900/50 text-white border border-amber-900/30 focus:border-amber-600/50 focus:outline-none placeholder-gray-600 resize-none text-sm"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-amber-300/80 text-sm tracking-widest uppercase mb-3 font-light">
                    Police
                  </label>
                  <select
                    value={font}
                    onChange={(e) => setFont(e.target.value)}
                    className="w-full p-3 bg-slate-900/50 text-white border border-amber-900/30 focus:border-amber-600/50 focus:outline-none text-sm"
                  >
                    <option value="highspeed">HIGHSPEED</option>
                    <option value="lady-radical">Lady Radical</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-amber-300/80 text-sm tracking-widest uppercase mb-3 font-light">
                    Couleur
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-14 h-12 cursor-pointer border border-amber-900/30"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="#ff9500"
                      className="flex-1 p-3 bg-slate-900/50 text-white border border-amber-900/30 focus:border-amber-600/50 focus:outline-none text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-amber-300/80 text-sm tracking-widest uppercase mb-3 font-light">
                    Taille: <span className="text-amber-300">{fontSize}px</span>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="200"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !texte.trim()}
                  className="w-full py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-light tracking-wide uppercase transition-all duration-300 disabled:opacity-50 text-sm"
                >
                  {isLoading ? "Génération..." : "Générer"}
                </button>

                {error && (
                  <div className="mt-6 p-4 bg-red-900/20 border border-red-700/30">
                    <p className="text-red-300 text-sm">⚠ {error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Result Section */}
          {generatedUrl && (
            <div className="flex justify-center items-center mt-12">
              <div className="max-w-2xl w-full">
                <div className="bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur border border-amber-900/20 p-8 rounded">
              <h3 className="text-amber-300 text-sm tracking-widest uppercase mb-8 font-light">
                ✓ Image générée et uploadée
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900/50 border border-amber-900/20 p-6 flex justify-center">
                  <img src={generatedUrl} alt="Résultat" className="max-h-96 object-contain" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-amber-300/60 text-xs tracking-widest uppercase mb-2 font-light">Lien direct</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={generatedUrl}
                        readOnly
                        className="flex-1 p-3 bg-slate-900/50 text-white border border-amber-900/30 text-xs font-mono"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm transition whitespace-nowrap"
                      >
                        Copier
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-amber-300/60 text-xs tracking-widest uppercase mb-2 font-light">Markdown</p>
                    <button
                      onClick={copyMarkdown}
                      className="w-full py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white text-sm border border-amber-900/30 transition"
                    >
                      ![img](url)
                    </button>
                  </div>

                  <div>
                    <p className="text-amber-300/60 text-xs tracking-widest uppercase mb-2 font-light">HTML</p>
                    <button
                      onClick={copyHTML}
                      className="w-full py-2 bg-slate-800/50 hover:bg-slate-700/50 text-white text-sm border border-amber-900/30 transition"
                    >
                      &lt;img&gt; Tag
                    </button>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-amber-900/30 backdrop-blur-sm mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
            © 2025 Galactic Blast. All rights reserved.
          </div>
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
            created by nosserb
          </div>
        </footer>
      </div>
    </div>
  );
}
