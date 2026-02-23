(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/lib/planet-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanetStore",
    ()=>usePlanetStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const initialState = {
    planetId: null,
    sessionId: null,
    tiles: {},
    entities: {},
    snapshotVersion: 0,
    serverTime: 0,
    connected: false,
    actionMode: "plant"
};
const usePlanetStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        ...initialState,
        setConnected: (connected)=>set({
                connected
            }),
        setSessionId: (sessionId)=>set({
                sessionId
            }),
        applySnapshot: (data)=>set({
                planetId: data.planetId,
                snapshotVersion: data.snapshotVersion,
                serverTime: data.serverTime,
                tiles: data.tiles || {},
                entities: data.entities || {}
            }),
        applyDiff: ({ seq: _seq, serverTime, tilesChanged, entitiesUpsert, entitiesRemove })=>set((state)=>{
                const tiles = {
                    ...state.tiles
                };
                for (const t of tilesChanged || []){
                    tiles[t.tileId] = t;
                }
                const entities = {
                    ...state.entities
                };
                for (const e of entitiesUpsert || []){
                    entities[e.id] = e;
                }
                for (const id of entitiesRemove || []){
                    delete entities[id];
                }
                return {
                    tiles,
                    entities,
                    serverTime
                };
            }),
        setActionMode: (actionMode)=>set({
                actionMode
            }),
        reset: ()=>set(initialState)
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Globe",
    ()=>Globe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/three/build/three.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/lib/planet-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function latLngToVector3(lat, lng, radius) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = lng * Math.PI / 180;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
}
function Entities({ radius }) {
    _s();
    const entitiesRecord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetStore"])({
        "Entities.usePlanetStore[entitiesRecord]": (s)=>s.entities
    }["Entities.usePlanetStore[entitiesRecord]"]);
    const entities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Entities.useMemo[entities]": ()=>Object.values(entitiesRecord)
    }["Entities.useMemo[entities]"], [
        entitiesRecord
    ]);
    const trees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Entities.useMemo[trees]": ()=>entities.filter({
                "Entities.useMemo[trees]": (e)=>e.type === "tree"
            }["Entities.useMemo[trees]"])
    }["Entities.useMemo[trees]"], [
        entities
    ]);
    const structures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Entities.useMemo[structures]": ()=>entities.filter({
                "Entities.useMemo[structures]": (e)=>e.type === "structure"
            }["Entities.useMemo[structures]"])
    }["Entities.useMemo[structures]"], [
        entities
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            trees.map((tree)=>{
                const pos = latLngToVector3(tree.lat, tree.lng, radius);
                const scale = 0.015 + tree.growthStage * 0.02;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: pos,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                            args: [
                                scale,
                                scale * 2,
                                6
                            ]
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: "#2d5a27"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)
                    ]
                }, tree.id, true, {
                    fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this);
            }),
            structures.map((struct)=>{
                const pos = latLngToVector3(struct.lat, struct.lng, radius);
                const scale = 0.02;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: pos,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                            args: [
                                scale,
                                scale * 1.5,
                                scale
                            ]
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: "#8b7355"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this)
                    ]
                }, struct.id, true, {
                    fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(Entities, "VXyQkkVIag6TvN98d2026SKpQhM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetStore"]
    ];
});
_c = Entities;
function EarthSphere({ radius, onPointClick }) {
    _s1();
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EarthSphere.useCallback[handlePointerDown]": (e)=>{
            e.stopPropagation();
            if (!meshRef.current || !e.pointer) return;
            const result = ndcToLatLng(e.pointer.x, e.pointer.y, camera, meshRef.current);
            if (result) onPointClick(result.lat, result.lng);
        }
    }["EarthSphere.useCallback[handlePointerDown]"], [
        camera,
        onPointClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: meshRef,
        position: [
            0,
            0,
            0
        ],
        onPointerDown: handlePointerDown,
        receiveShadow: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    radius,
                    64,
                    64
                ]
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: "#1e3a5f",
                roughness: 0.8,
                metalness: 0.05
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s1(EarthSphere, "4BB83a1F7XfQMYxODnVhpRrXW2w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"]
    ];
});
_c1 = EarthSphere;
function Scene({ onPointClick }) {
    const radius = 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.4
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    5,
                    5,
                    5
                ],
                intensity: 1,
                castShadow: true
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EarthSphere, {
                radius: radius,
                onPointClick: onPointClick
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Entities, {
                radius: radius + 0.02
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                enableZoom: true,
                enablePan: true,
                minDistance: 1.5,
                maxDistance: 5,
                autoRotate: true,
                autoRotateSpeed: 0.3
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c2 = Scene;
function Globe({ onPointClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 bg-[#0a0f1a]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            camera: {
                position: [
                    0,
                    0,
                    2.5
                ],
                fov: 45
            },
            gl: {
                antialias: true
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene, {
                onPointClick: onPointClick
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
            lineNumber: 137,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_c3 = Globe;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Entities");
__turbopack_context__.k.register(_c1, "EarthSphere");
__turbopack_context__.k.register(_c2, "Scene");
__turbopack_context__.k.register(_c3, "Globe");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/lib/use-planet-ws.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlanetWebSocket",
    ()=>usePlanetWebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/lib/planet-store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const getWsUrl = (planetId)=>{
    const base = ("TURBOPACK compile-time value", "http://localhost:8787") || "http://localhost:8787";
    const wsProtocol = base.startsWith("https") ? "wss" : "ws";
    const host = base.replace(/^https?:\/\//, "");
    return `${wsProtocol}://${host}/api/ws?planetId=${planetId}`;
};
function usePlanetWebSocket(planetId) {
    _s();
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const reconnectAttempts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const { applySnapshot, applyDiff, setConnected, setSessionId, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePlanetWebSocket.useEffect": ()=>{
            reset();
            let cancelled = false;
            const connect = {
                "usePlanetWebSocket.useEffect.connect": ()=>{
                    if (cancelled) return;
                    const url = getWsUrl(planetId);
                    const ws = new WebSocket(url);
                    wsRef.current = ws;
                    ws.onopen = ({
                        "usePlanetWebSocket.useEffect.connect": ()=>{
                            reconnectAttempts.current = 0;
                            setConnected(true);
                        }
                    })["usePlanetWebSocket.useEffect.connect"];
                    ws.onmessage = ({
                        "usePlanetWebSocket.useEffect.connect": (event)=>{
                            try {
                                const msg = JSON.parse(event.data);
                                if (msg.type === "WELCOME") {
                                    setSessionId(msg.you?.sessionId || "");
                                } else if (msg.type === "SNAPSHOT") {
                                    applySnapshot({
                                        planetId: msg.planetId,
                                        snapshotVersion: msg.snapshotVersion,
                                        serverTime: msg.serverTime,
                                        tiles: msg.tiles || {},
                                        entities: msg.entities || {}
                                    });
                                } else if (msg.type === "DIFF") {
                                    applyDiff({
                                        seq: msg.seq,
                                        serverTime: msg.serverTime,
                                        tilesChanged: msg.tilesChanged || [],
                                        entitiesUpsert: msg.entitiesUpsert || [],
                                        entitiesRemove: msg.entitiesRemove || []
                                    });
                                }
                            } catch  {
                            // ignore parse errors
                            }
                        }
                    })["usePlanetWebSocket.useEffect.connect"];
                    ws.onclose = ({
                        "usePlanetWebSocket.useEffect.connect": ()=>{
                            setConnected(false);
                            if (cancelled) return;
                            const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
                            reconnectAttempts.current++;
                            reconnectTimeoutRef.current = setTimeout(connect, delay);
                        }
                    })["usePlanetWebSocket.useEffect.connect"];
                    ws.onerror = ({
                        "usePlanetWebSocket.useEffect.connect": ()=>{
                            ws.close();
                        }
                    })["usePlanetWebSocket.useEffect.connect"];
                }
            }["usePlanetWebSocket.useEffect.connect"];
            connect();
            return ({
                "usePlanetWebSocket.useEffect": ()=>{
                    cancelled = true;
                    if (reconnectTimeoutRef.current) {
                        clearTimeout(reconnectTimeoutRef.current);
                    }
                    wsRef.current?.close();
                    wsRef.current = null;
                }
            })["usePlanetWebSocket.useEffect"];
        }
    }["usePlanetWebSocket.useEffect"], [
        planetId,
        applySnapshot,
        applyDiff,
        setConnected,
        setSessionId,
        reset
    ]);
    const send = (msg)=>{
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(msg));
        }
    };
    return {
        send
    };
}
_s(usePlanetWebSocket, "7ss4jXUOOW1V9V4JH/Y7ELk3pr4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documents/Programming/Personal/orbis/packages/shared/src/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Orbis - Living Digital Planet
 * Shared types for planet state, entities, tiles, and messages.
 */ // --- Tiles ---
__turbopack_context__.s([
    "BIOME_OPTIONS",
    ()=>BIOME_OPTIONS,
    "STRUCTURE_KINDS",
    ()=>STRUCTURE_KINDS,
    "TILE_SIZE_DEG",
    ()=>TILE_SIZE_DEG,
    "TREE_SPECIES",
    ()=>TREE_SPECIES,
    "isStructureEntity",
    ()=>isStructureEntity,
    "isTreeEntity",
    ()=>isTreeEntity,
    "latLngFromTileId",
    ()=>latLngFromTileId,
    "tileIdFromLatLng",
    ()=>tileIdFromLatLng
]);
const TILE_SIZE_DEG = 5;
const BIOME_OPTIONS = [
    "ocean",
    "desert",
    "grassland",
    "forest",
    "tundra",
    "wetland"
];
function tileIdFromLatLng(lat, lng) {
    const latIndex = Math.floor((lat + 90) / TILE_SIZE_DEG);
    const lngIndex = Math.floor((lng + 180) / TILE_SIZE_DEG);
    return `${latIndex}:${lngIndex}`;
}
function latLngFromTileId(tileId) {
    const [latIdx, lngIdx] = tileId.split(":").map(Number);
    const lat = latIdx * TILE_SIZE_DEG - 90 + TILE_SIZE_DEG / 2;
    const lng = lngIdx * TILE_SIZE_DEG - 180 + TILE_SIZE_DEG / 2;
    return {
        lat,
        lng
    };
}
const TREE_SPECIES = [
    "oak",
    "pine",
    "birch",
    "willow",
    "maple"
];
const STRUCTURE_KINDS = [
    "house",
    "well",
    "tower",
    "farm"
];
function isTreeEntity(e) {
    return e.type === "tree";
}
function isStructureEntity(e) {
    return e.type === "structure";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documents/Programming/Personal/orbis/packages/shared/src/messages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientMessageSchema",
    ()=>ClientMessageSchema,
    "DiffMessageSchema",
    ()=>DiffMessageSchema,
    "IntentBuildSchema",
    ()=>IntentBuildSchema,
    "IntentPlantTreeSchema",
    ()=>IntentPlantTreeSchema,
    "IntentWaterTileSchema",
    ()=>IntentWaterTileSchema,
    "PingSchema",
    ()=>PingSchema,
    "RejectedMessageSchema",
    ()=>RejectedMessageSchema,
    "SnapshotMessageSchema",
    ()=>SnapshotMessageSchema,
    "WelcomeMessageSchema",
    ()=>WelcomeMessageSchema
]);
/**
 * WebSocket message schemas (Zod) for client-server communication.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/packages/shared/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
;
const WelcomeMessageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("WELCOME"),
    planetId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    serverTime: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    tickRate: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    you: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        sessionId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })
});
const SnapshotMessageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("SNAPSHOT"),
    planetId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    snapshotVersion: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    serverTime: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    tiles: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()),
    entities: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any())
});
const DiffMessageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("DIFF"),
    planetId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    seq: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    serverTime: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    tilesChanged: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional().default([]),
    entitiesUpsert: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional().default([]),
    entitiesRemove: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional().default([])
});
const RejectedMessageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("REJECTED"),
    planetId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    requestId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    reason: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const IntentPlantTreeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("INTENT_PLANT_TREE"),
    requestId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    planetId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    lat: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(-90).max(90),
    lng: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(-180).max(180),
    species: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "oak",
        "pine",
        "birch",
        "willow",
        "maple"
    ])
});
const IntentWaterTileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("INTENT_WATER_TILE"),
    requestId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    planetId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    tileId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0.01).max(1)
});
const IntentBuildSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("INTENT_BUILD"),
    requestId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    planetId: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    lat: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(-90).max(90),
    lng: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(-180).max(180),
    kind: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "house",
        "well",
        "tower",
        "farm"
    ])
});
const PingSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("PING"),
    t: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
});
const ClientMessageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
    IntentPlantTreeSchema,
    IntentWaterTileSchema,
    IntentBuildSchema,
    PingSchema
]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documents/Programming/Personal/orbis/packages/shared/src/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/packages/shared/src/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$src$2f$messages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/packages/shared/src/messages.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanetPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$components$2f$Globe$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/components/Globe.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$use$2d$planet$2d$ws$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/lib/use-planet-ws.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/lib/planet-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/packages/shared/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Programming/Personal/orbis/packages/shared/src/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function PlanetPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const planetId = params?.planetId || "earth-001";
    const { send } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$use$2d$planet$2d$ws$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetWebSocket"])(planetId);
    const { actionMode, connected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetStore"])();
    const handlePointClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanetPage.useCallback[handlePointClick]": (lat, lng)=>{
            if (!connected) return;
            const requestId = crypto.randomUUID().slice(0, 8);
            if (actionMode === "plant") {
                send({
                    type: "INTENT_PLANT_TREE",
                    requestId,
                    planetId,
                    lat,
                    lng,
                    species: "oak"
                });
            } else if (actionMode === "water") {
                const tileId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$packages$2f$shared$2f$src$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tileIdFromLatLng"])(lat, lng);
                send({
                    type: "INTENT_WATER_TILE",
                    requestId,
                    planetId,
                    tileId,
                    amount: 0.2
                });
            } else if (actionMode === "build") {
                send({
                    type: "INTENT_BUILD",
                    requestId,
                    planetId,
                    lat,
                    lng,
                    kind: "well"
                });
            }
        }
    }["PlanetPage.useCallback[handlePointClick]"], [
        connected,
        actionMode,
        planetId,
        send
    ]);
    const setActionMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetStore"])({
        "PlanetPage.usePlanetStore[setActionMode]": (s)=>s.setActionMode
    }["PlanetPage.usePlanetStore[setActionMode]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-screen w-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$components$2f$Globe$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Globe"], {
                onPointClick: handlePointClick
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-4 top-4 z-10 flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg bg-black/60 px-4 py-2 text-sm text-white backdrop-blur",
                        children: connected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-emerald-400",
                            children: "● Connected"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-amber-400",
                            children: "○ Connecting..."
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            "plant",
                            "water",
                            "build"
                        ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActionMode(mode),
                                className: `rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${actionMode === mode ? "bg-emerald-600 text-white" : "bg-black/40 text-zinc-300 hover:bg-black/60"}`,
                                children: mode === "plant" ? "Plant Tree" : mode === "water" ? "Water" : "Build"
                            }, mode, false, {
                                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "max-w-[200px] text-xs text-zinc-500",
                        children: [
                            "Click the globe to ",
                            actionMode,
                            ". Trees grow over time; water helps them."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Documents/Programming/Personal/orbis/apps/web/app/planet/[planetId]/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(PlanetPage, "KtDLg0CXtpqydNbEDSEJsmBxA1c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$use$2d$planet$2d$ws$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetWebSocket"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Programming$2f$Personal$2f$orbis$2f$apps$2f$web$2f$lib$2f$planet$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanetStore"]
    ];
});
_c = PlanetPage;
var _c;
__turbopack_context__.k.register(_c, "PlanetPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Documents_Programming_Personal_orbis_45375946._.js.map