"use client";

import { useRef, useMemo, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import R3fGlobe from "r3f-globe";
import * as THREE from "three";
import { usePlanetStore } from "@/lib/planet-store";
import { pointToLatLng } from "@/lib/latlng";
import { latLngFromTileId } from "@orbis/shared";
import type { TreeEntity, StructureEntity } from "@orbis/shared";

const GLOBE_RADIUS = 100;

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ESRI World Imagery - free satellite tiles, Google Earth-like quality
const tileUrl = (x: number, y: number, l: number) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${l}/${y}/${x}`;

function Entities({ radius }: { radius: number }) {
  const entitiesRecord = usePlanetStore((s) => s.entities);
  const entities = useMemo(
    () => Object.values(entitiesRecord),
    [entitiesRecord]
  );

  const trees = useMemo(
    () => entities.filter((e) => e.type === "tree") as TreeEntity[],
    [entities]
  );
  const structures = useMemo(
    () => entities.filter((e) => e.type === "structure") as StructureEntity[],
    [entities]
  );

  return (
    <group raycast={() => null}>
      {trees.map((tree) => {
        const pos = latLngToVector3(tree.lat, tree.lng, radius);
        const scale = 1.5 + tree.growthStage * 2;
        return (
          <mesh key={tree.id} position={pos}>
            <coneGeometry args={[scale, scale * 2, 6]} />
            <meshStandardMaterial color="#2d5a27" />
          </mesh>
        );
      })}
      {structures.map((struct) => {
        const pos = latLngToVector3(struct.lat, struct.lng, radius);
        const scale = 2;
        return (
          <mesh key={struct.id} position={pos}>
            <boxGeometry args={[scale, scale * 1.5, scale]} />
            <meshStandardMaterial color="#8b7355" />
          </mesh>
        );
      })}
    </group>
  );
}

const EFFECT_DURATION_MS = 800;

function ClickRipple({ radius }: { radius: number }) {
  const effect = usePlanetStore((s) => s.lastActionEffect);
  const clearEffect = usePlanetStore((s) => s.clearActionEffect);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (!effect || !meshRef.current || !matRef.current) return;
    const age = Date.now() - effect.timestamp;
    if (age > EFFECT_DURATION_MS) {
      clearEffect();
      return;
    }
    const progress = age / EFFECT_DURATION_MS;
    const scale = 3 + progress * 50;
    meshRef.current.scale.setScalar(scale);
    matRef.current.opacity = 1 - progress;
    meshRef.current.lookAt(0, 0, 0);
  });

  if (!effect) return null;

  const pos = latLngToVector3(effect.lat, effect.lng, radius);
  const color =
    effect.type === "plant"
      ? "#22c55e"
      : effect.type === "water"
        ? "#3b82f6"
        : "#a16207";

  return (
    <mesh ref={meshRef} position={pos}>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function TerraformingCircle({
  pos,
  color,
  alpha,
}: {
  pos: THREE.Vector3;
  color: string;
  alpha: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) ref.current.lookAt(0, 0, 0);
  });
  return (
    <mesh ref={ref} position={pos}>
      <circleGeometry args={[8, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={alpha}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function TerraformingOverlay({ radius }: { radius: number }) {
  const tiles = usePlanetStore((s) => s.tiles);
  const tilesArray = useMemo(
    () =>
      Object.values(tiles).filter(
        (t) => t.moisture > 0.55 || t.fertility > 0.6
      ),
    [tiles]
  );

  return (
    <group raycast={() => null}>
      {tilesArray.map((tile) => {
        const { lat, lng } = latLngFromTileId(tile.tileId);
        const pos = latLngToVector3(lat, lng, radius + 0.1);
        const moistureAlpha = Math.max(0, (tile.moisture - 0.5) * 2);
        const fertilityAlpha = Math.max(0, (tile.fertility - 0.55) * 2);
        const alpha = Math.min(0.5, moistureAlpha * 0.4 + fertilityAlpha * 0.3);
        if (alpha < 0.05) return null;
        const color = moistureAlpha > fertilityAlpha ? "#3b82f6" : "#22c55e";
        return (
          <TerraformingCircle
            key={tile.tileId}
            pos={pos}
            color={color}
            alpha={alpha}
          />
        );
      })}
    </group>
  );
}

function PovUpdater({
  globeRef,
}: {
  globeRef: React.RefObject<{ setPointOfView?: (camera: THREE.Camera) => void } | null>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    globeRef.current?.setPointOfView?.(camera);
  });
  return null;
}

function Scene({
  onPointClick,
}: {
  onPointClick: (lat: number, lng: number) => void;
}) {
  const globeRef = useRef<{ setPointOfView?: (camera: THREE.Camera) => void } | null>(null);

  const handleGlobeClick = useCallback(
    (_layer: string, _elementData: unknown, event: { point?: THREE.Vector3 }) => {
      const point = event?.point;
      if (point) {
        const { lat, lng } = pointToLatLng(point);
        onPointClick(lat, lng);
      }
    },
    [onPointClick]
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[500, 500, 500]} intensity={1} />
      <R3fGlobe
        ref={globeRef}
        globeTileEngineUrl={tileUrl}
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor="lightskyblue"
        onClick={handleGlobeClick}
      />
      <PovUpdater globeRef={globeRef} />
      <Entities radius={GLOBE_RADIUS + 2} />
      <TerraformingOverlay radius={GLOBE_RADIUS} />
      <ClickRipple radius={GLOBE_RADIUS} />
      <OrbitControls
        enableZoom
        enablePan
        minDistance={GLOBE_RADIUS * 0.2}
        maxDistance={GLOBE_RADIUS * 8}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export function Globe({
  onPointClick,
}: {
  onPointClick: (lat: number, lng: number) => void;
}) {
  return (
    <div className="absolute inset-0 bg-[#0a0f1a]">
      <Canvas
        camera={{
          position: [0, 0, GLOBE_RADIUS * 2.5],
          fov: 45,
          near: 0.1,
          far: GLOBE_RADIUS * 20,
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene onPointClick={onPointClick} />
        </Suspense>
      </Canvas>
    </div>
  );
}
