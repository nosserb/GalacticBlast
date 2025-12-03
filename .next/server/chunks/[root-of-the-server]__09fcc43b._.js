module.exports = [
"[project]/.next-internal/server/app/api/upload/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/sharp [external] (sharp, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("sharp", () => require("sharp"));

module.exports = mod;
}),
"[project]/app/api/upload/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/sharp [external] (sharp, cjs)");
;
const runtime = "nodejs";
const fontConfigs = {
    font1: {
        name: "Arial",
        style: "bold 120px Arial"
    },
    font2: {
        name: "Courier",
        style: "bold 120px Courier New, monospace"
    }
};
async function generateImage(texte, fontType = "font1") {
    const fontStyle = fontConfigs[fontType].style;
    // Créer une image SVG avec le texte
    const svg = Buffer.from(`
    <svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <text x="600" y="200" font-size="120" font-weight="bold" 
            text-anchor="middle" dominant-baseline="middle"
            fill="rgba(53, 121, 247, 0.66)" 
            style="font-family: ${fontStyle.split(" ").pop() || "Arial"}; filter: url(#glow);"
            filter="url(#glow)">
        ${texte}
      </text>
    </svg>
  `);
    return await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$sharp__$5b$external$5d$__$28$sharp$2c$__cjs$29$__["default"])(svg).png().toBuffer();
}
async function POST(req) {
    try {
        const { texte, font } = await req.json();
        if (!texte || typeof texte !== "string") {
            return Response.json({
                error: "Texte invalide"
            }, {
                status: 400
            });
        }
        const fontType = font === "font2" ? "font2" : "font1";
        // Générer l'image
        const imageBuffer = await generateImage(texte, fontType);
        const base64Image = imageBuffer.toString("base64");
        // Uploader sur ImgBB
        const formData = new FormData();
        formData.append("image", base64Image);
        formData.append("key", process.env.IMGBB_API_KEY || "");
        const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData
        });
        if (!imgbbResponse.ok) {
            console.error("ImgBB error:", imgbbResponse.status);
            return Response.json({
                error: "Erreur lors de l'upload sur ImgBB"
            }, {
                status: 500
            });
        }
        const imgbbData = await imgbbResponse.json();
        if (!imgbbData.data?.url) {
            return Response.json({
                error: "Pas d'URL retournée par ImgBB"
            }, {
                status: 500
            });
        }
        return Response.json({
            success: true,
            imageUrl: imgbbData.data.url
        });
    } catch (error) {
        console.error("Erreur:", error);
        return Response.json({
            error: "Erreur serveur"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__09fcc43b._.js.map