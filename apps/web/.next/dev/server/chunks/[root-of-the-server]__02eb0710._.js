module.exports = [
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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/api/nasa/epic/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET() {
    const apiKey = process.env.NASA_API_KEY;
    if (!apiKey) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "NASA_API_KEY not configured"
        }, {
            status: 503
        });
    }
    try {
        const res = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!res.ok) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "NASA EPIC API request failed"
            }, {
                status: 502
            });
        }
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No EPIC imagery available"
            }, {
                status: 404
            });
        }
        const latest = data[0];
        const { image, date } = latest;
        const [year, month, day] = date.split("-");
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image}.png`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            imageUrl,
            date,
            caption: latest.caption ?? `Earth from DSCOVR - ${date}`
        });
    } catch (e) {
        console.error("NASA EPIC fetch error:", e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch EPIC imagery"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02eb0710._.js.map