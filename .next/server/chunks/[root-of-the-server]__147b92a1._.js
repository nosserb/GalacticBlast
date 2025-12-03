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
"[externals]/canvas [external] (canvas, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("canvas", () => require("canvas"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

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
var __TURBOPACK__imported__module__$5b$externals$5d2f$canvas__$5b$external$5d$__$28$canvas$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/canvas [external] (canvas, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
const runtime = "nodejs";
const fontConfigs = {
    highspeed: {
        name: "HIGHSPEED",
        file: "HIGHSPEED.TTF"
    },
    "lady-radical": {
        name: "Lady Radical",
        file: "Lady Radical.ttf"
    }
};
// Enregistrer les polices
Object.entries(fontConfigs).forEach(([, config])=>{
    const fontPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "fonts", config.file);
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(fontPath)) {
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$canvas__$5b$external$5d$__$28$canvas$2c$__cjs$29$__["registerFont"])(fontPath, {
            family: config.name
        });
    }
});
async function generateImage(texte, fontType = "highspeed", color = "#3579f7", fontSize = 100) {
    const fontConfig = fontConfigs[fontType];
    const canvas = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$canvas__$5b$external$5d$__$28$canvas$2c$__cjs$29$__["createCanvas"])(1200, 400);
    const ctx = canvas.getContext("2d");
    // Fond transparent
    ctx.clearRect(0, 0, 1200, 400);
    // Glow effect (fond flou)
    ctx.fillStyle = color.startsWith("#") ? color + "30" : color.replace("rgb", "rgba").replace(")", ", 0.2)");
    ctx.shadowColor = color;
    ctx.shadowBlur = 50;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    // Texte
    ctx.font = `bold ${fontSize}px ${fontConfig.name}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(texte, 600, 200);
    return canvas.toBuffer("image/png");
}
async function POST(req) {
    try {
        const { texte, font, color, fontSize } = await req.json();
        if (!texte || typeof texte !== "string") {
            return Response.json({
                error: "Texte invalide"
            }, {
                status: 400
            });
        }
        const fontType = font === "lady-radical" ? "lady-radical" : "highspeed";
        // Générer l'image
        const imageBuffer = await generateImage(texte, fontType, color || "#3579f7", fontSize || 100);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__147b92a1._.js.map