"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { usePlanetStore } from "@/lib/planet-store";
import { latLngFromTileId } from "@orbis/shared";
import type { TreeEntity, StructureEntity } from "@orbis/shared";

const TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

export function Map2D({
  onPointClick,
}: {
  onPointClick: (lat: number, lng: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  const entitiesRecord = usePlanetStore((s) => s.entities);
  const tiles = usePlanetStore((s) => s.tiles);
  const lastActionEffect = usePlanetStore((s) => s.lastActionEffect);
  const clearActionEffect = usePlanetStore((s) => s.clearActionEffect);

  // Create map imperatively — full control over init/cleanup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = L.map(container, {
      center: [51.5, -0.1],
      zoom: 5,
      attributionControl: false,
    });

    L.tileLayer(TILE_URL).addTo(map);

    map.on("click", (e) => {
      onPointClick(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [onPointClick]);

  // Update overlays when store changes
  const updateOverlays = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old overlays
    layersRef.current.forEach((layer) => map.removeLayer(layer));
    layersRef.current = [];

    const entities = Object.values(entitiesRecord);
    const trees = entities.filter((e) => e.type === "tree") as TreeEntity[];
    const structures = entities.filter(
      (e) => e.type === "structure"
    ) as StructureEntity[];

    trees.forEach((tree) => {
      const stage = Math.min(4, Math.floor(tree.growthStage * 4) + 1);
      const label = `${tree.species} tree · Stage ${stage}`;
      const circle = L.circleMarker([tree.lat, tree.lng], {
        radius: 4 + tree.growthStage * 4,
        color: "#166534",
        fillColor: "#22c55e",
        fillOpacity: 0.9,
        weight: 1,
      });
      circle.bindTooltip(label, {
        permanent: false,
        direction: "top",
        className: "entity-tooltip",
      });
      circle.addTo(map);
      layersRef.current.push(circle);
    });

    structures.forEach((struct) => {
      const kindLabel = struct.kind.charAt(0).toUpperCase() + struct.kind.slice(1);
      const circle = L.circleMarker([struct.lat, struct.lng], {
        radius: 6,
        color: "#6b5344",
        fillColor: "#8b7355",
        fillOpacity: 0.9,
        weight: 1,
      });
      circle.bindTooltip(kindLabel, {
        permanent: false,
        direction: "top",
        className: "entity-tooltip",
      });
      circle.addTo(map);
      layersRef.current.push(circle);
    });

    // Terraforming
    Object.values(tiles)
      .filter((t) => t.moisture > 0.55 || t.fertility > 0.6)
      .forEach((tile) => {
        const { lat, lng } = latLngFromTileId(tile.tileId);
        const moistureAlpha = Math.max(0, (tile.moisture - 0.5) * 2);
        const fertilityAlpha = Math.max(0, (tile.fertility - 0.55) * 2);
        const alpha = Math.min(0.5, moistureAlpha * 0.4 + fertilityAlpha * 0.3);
        if (alpha < 0.05) return;
        const color = moistureAlpha > fertilityAlpha ? "#3b82f6" : "#22c55e";
        const circle = L.circle([lat, lng], {
          radius: 40000,
          color,
          fillColor: color,
          fillOpacity: alpha,
          weight: 0,
        });
        circle.addTo(map);
        layersRef.current.push(circle);
      });

    // Click ripple
    if (lastActionEffect) {
      const color =
        lastActionEffect.type === "plant"
          ? "#22c55e"
          : lastActionEffect.type === "water"
            ? "#3b82f6"
            : "#a16207";
      const ripple = L.circle([lastActionEffect.lat, lastActionEffect.lng], {
        radius: 8000,
        color,
        fillColor: color,
        fillOpacity: 0.4,
        weight: 2,
      });
      ripple.addTo(map);
      layersRef.current.push(ripple);

      setTimeout(clearActionEffect, 800);
    }
  }, [
    entitiesRecord,
    tiles,
    lastActionEffect,
    clearActionEffect,
  ]);

  useEffect(() => {
    updateOverlays();
  }, [updateOverlays]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
