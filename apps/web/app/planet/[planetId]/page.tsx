"use client";

import { useCallback, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Globe } from "@/components/Globe";
import { usePlanetWebSocket } from "@/lib/use-planet-ws";
import { usePlanetStore } from "@/lib/planet-store";
import { tileIdFromLatLng } from "@orbis/shared";

const Map2D = dynamic(() => import("@/components/Map2D").then((m) => m.Map2D), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1a] text-zinc-400">
      Loading map…
    </div>
  ),
});

function EpicDailyCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["nasa-epic"],
    queryFn: async () => {
      const res = await fetch("/api/nasa/epic");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading || !data?.imageUrl) return null;

  return (
    <a
      href="https://epic.gsfc.nasa.gov/about"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 block rounded-lg overflow-hidden bg-black/40 border border-white/10 hover:border-white/20 transition-colors"
    >
      <img
        src={data.imageUrl}
        alt={data.caption}
        className="w-[200px] h-[200px] object-cover"
      />
      <p className="px-2 py-1 text-[10px] text-zinc-400">
        Today&apos;s Earth · NASA EPIC
      </p>
    </a>
  );
}

export default function PlanetPage() {
  const params = useParams();
  const planetId = (params?.planetId as string) || "earth-001";
  const { send } = usePlanetWebSocket(planetId);
  const { actionMode, connected } = usePlanetStore();

  const triggerActionEffect = usePlanetStore((s) => s.triggerActionEffect);

  const handlePointClick = useCallback(
    (lat: number, lng: number) => {
      if (!connected) return;
      triggerActionEffect(lat, lng, actionMode);
      const requestId = crypto.randomUUID().slice(0, 8);
      if (actionMode === "plant") {
        send({
          type: "INTENT_PLANT_TREE",
          requestId,
          planetId,
          lat,
          lng,
          species: "oak",
        });
      } else if (actionMode === "water") {
        const tileId = tileIdFromLatLng(lat, lng);
        send({
          type: "INTENT_WATER_TILE",
          requestId,
          planetId,
          tileId,
          amount: 0.2,
        });
      } else if (actionMode === "build") {
        send({
          type: "INTENT_BUILD",
          requestId,
          planetId,
          lat,
          lng,
          kind: "well",
        });
      }
    },
    [connected, actionMode, planetId, send, triggerActionEffect]
  );

  const setActionMode = usePlanetStore((s) => s.setActionMode);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");
  const [mapKey, setMapKey] = useState(0);

  const setViewModeAndKey = useCallback((mode: "2d" | "3d") => {
    if (mode === "2d") setMapKey((k) => k + 1);
    setViewMode(mode);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {viewMode === "3d" ? (
        <Globe onPointClick={handlePointClick} />
      ) : (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1a] text-zinc-400">
              Loading map…
            </div>
          }
        >
          <Map2D key={mapKey} onPointClick={handlePointClick} />
        </Suspense>
      )}

      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        <div className="rounded-lg bg-black/60 px-4 py-2 text-sm text-white backdrop-blur">
          {connected ? (
            <span className="text-emerald-400">● Connected</span>
          ) : (
            <span className="text-amber-400">○ Connecting...</span>
          )}
        </div>
        <div className="flex gap-2">
          {(["plant", "water", "build"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActionMode(mode)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                actionMode === mode
                  ? "bg-emerald-600 text-white"
                  : "bg-black/40 text-zinc-300 hover:bg-black/60"
              }`}
            >
              {mode === "plant" ? "Plant Tree" : mode === "water" ? "Water" : "Build"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["2d", "3d"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewModeAndKey(mode)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
                viewMode === mode
                  ? "bg-emerald-600 text-white"
                  : "bg-black/40 text-zinc-300 hover:bg-black/60"
              }`}
            >
              {mode === "2d" ? "2D Map" : "3D Globe"}
            </button>
          ))}
        </div>
        <p className="max-w-[200px] text-xs text-zinc-500">
          Click the {viewMode === "3d" ? "globe" : "map"} to {actionMode}. Trees grow over time; water helps them.
        </p>
        <EpicDailyCard />
      </div>
    </div>
  );
}
