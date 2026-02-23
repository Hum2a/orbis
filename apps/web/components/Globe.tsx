"use client";

import { useRef, useMemo, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { usePlanetStore } from "@/lib/planet-store";
import { pointToLatLng } from "@/lib/latlng";
import type { TreeEntity, StructureEntity } from "@orbis/shared";

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

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
        const scale = 0.015 + tree.growthStage * 0.02;
        return (
          <mesh key={tree.id} position={pos}>
            <coneGeometry args={[scale, scale * 2, 6]} />
            <meshStandardMaterial color="#2d5a27" />
          </mesh>
        );
      })}
      {structures.map((struct) => {
        const pos = latLngToVector3(struct.lat, struct.lng, radius);
        const scale = 0.02;
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

// unpkg doesn't include example textures; use jsdelivr from the GitHub repo
const EARTH_TEXTURE_URL =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r169/examples/textures/planets/earth_atmos_2048.jpg";

function EarthSphereFallback({
  radius,
  onPointClick,
}: {
  radius: number;
  onPointClick: (lat: number, lng: number) => void;
}) {
  const handleClick = useCallback(
    (e: { stopPropagation: () => void; point: THREE.Vector3 }) => {
      e.stopPropagation();
      const { lat, lng } = pointToLatLng(e.point);
      onPointClick(lat, lng);
    },
    [onPointClick]
  );
  return (
    <mesh
      position={[0, 0, 0]}
      onClick={handleClick}
      onPointerDown={(e) => e.stopPropagation()}
      receiveShadow
    >
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial color="#1e3a5f" roughness={0.8} metalness={0.05} />
    </mesh>
  );
}

function EarthSphere({
  radius,
  onPointClick,
}: {
  radius: number;
  onPointClick: (lat: number, lng: number) => void;
}) {
  const [colorMap] = useTexture([EARTH_TEXTURE_URL]);
  const handleClick = useCallback(
    (e: { stopPropagation: () => void; point: THREE.Vector3 }) => {
      e.stopPropagation();
      const { lat, lng } = pointToLatLng(e.point);
      onPointClick(lat, lng);
    },
    [onPointClick]
  );

  return (
    <mesh
      position={[0, 0, 0]}
      onClick={handleClick}
      onPointerDown={(e) => e.stopPropagation()}
      receiveShadow
    >
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

function Scene({
  onPointClick,
}: {
  onPointClick: (lat: number, lng: number) => void;
}) {
  const radius = 1;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <Suspense fallback={<EarthSphereFallback radius={radius} onPointClick={onPointClick} />}>
        <EarthSphere radius={radius} onPointClick={onPointClick} />
      </Suspense>
      <Entities radius={radius + 0.02} />
      <OrbitControls
        enableZoom
        enablePan
        minDistance={1.5}
        maxDistance={5}
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
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene onPointClick={onPointClick} />
        </Suspense>
      </Canvas>
    </div>
  );
}
