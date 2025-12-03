(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__651458b2._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/app/api/upload/route.ts [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
const runtime = "edge";
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
    const canvas = new OffscreenCanvas(1200, 400);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Cannot get canvas context");
    // Fond transparent
    ctx.clearRect(0, 0, 1200, 400);
    // Texte stylisé
    ctx.fillStyle = "rgba(53, 121, 247, 0.66)";
    ctx.font = fontConfigs[fontType].style;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Appliquer le shadow effect
    ctx.shadowColor = "rgba(29, 71, 255, 0.72)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillText(texte, 600, 200);
    return canvas.convertToBlob({
        type: "image/png"
    }).then((blob)=>blob.arrayBuffer());
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
        const imageArrayBuffer = await generateImage(texte, fontType);
        const imageBuffer = new Uint8Array(imageArrayBuffer);
        const base64Image = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(imageBuffer).toString("base64");
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
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__651458b2._.js.map