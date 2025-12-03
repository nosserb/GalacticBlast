"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [texte, setTexte] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      await generateImage();
    }
  };

  const generateImage = async () => {
    if (!texte.trim()) return;

    setIsLoading(true);
    try {
      const encodedText = encodeURIComponent(texte);
      const imageUrl = `/api/image?texte=${encodedText}`;
      setGeneratedUrl(imageUrl);
    } catch (error) {
      console.error("Erreur lors de la génération :", error);
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

  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 gap-8 bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Galactic Blast
        </h1>
        <p className="text-gray-300 mt-2">Générez des images avec texte personnalisé</p>
      </header>

      <main className="flex flex-col gap-6 w-full max-w-2xl">
        <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Entrez votre texte :
          </label>
          <textarea
            ref={textareaRef}
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tapez votre texte ici... (Ctrl+Entrée pour générer)"
            className="w-full h-24 p-3 bg-slate-600 text-white rounded border border-slate-500 focus:border-blue-400 focus:outline-none placeholder-gray-400 resize-none"
          />
          <p className="text-xs text-gray-400 mt-2">💡 Raccourci : Ctrl + Entrée</p>
        </div>

        {isLoading && (
          <div className="text-center">
            <p className="text-blue-400">⏳ Génération en cours...</p>
          </div>
        )}

        {generatedUrl && (
          <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Image générée :</h2>
            <div className="bg-slate-800 p-4 rounded flex justify-center mb-4">
              <img
                src={generatedUrl}
                alt="Image générée"
                className="max-w-full h-auto rounded"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={generatedUrl}
                readOnly
                className="flex-1 p-3 bg-slate-600 text-white rounded border border-slate-500 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition"
              >
                Copier
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center text-gray-400 text-sm">
        <p>© 2025 Galactic Blast - Générez vos images avec style</p>
      </footer>
    </div>
  );
}
