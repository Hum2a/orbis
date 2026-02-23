"use client";

import { useRef, useMemo, useCallback, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import R3fGlobe from "r3f-globe";
import * as THREE from "three";
import { usePlanetStore } from "@/lib/planet-store";
import { pointToLatLng } from "@/lib/latlng";
import { latLngFromTileId } from "@orbis/shared";
import type { TreeEntity, StructureEntity } from "@orbis/shared";

const GLOBE_RADIUS = 100;

// Cap max zoom at 8× — beyond this the tile engine stops rendering and shows water
const MAX_ZOOM_MAGNIFICATION = 8;
const MIN_CAMERA_DISTANCE = GLOBE_RADIUS * 8 / MAX_ZOOM_MAGNIFICATION;

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

  // Planet-scale: trees/buildings tiny relative to globe (not visible from space)
  const TREE_SCALE = 0.08;
  const TREE_GROWTH_SCALE = 0.12;
  const STRUCTURE_SCALE = 0.15;

  return (
    <group raycast={() => null}>
      {trees.map((tree) => {
        const pos = latLngToVector3(tree.lat, tree.lng, radius);
        const scale = TREE_SCALE + tree.growthStage * TREE_GROWTH_SCALE;
        return (
          <mesh key={tree.id} position={pos}>
            <coneGeometry args={[scale, scale * 2, 6]} />
            <meshStandardMaterial color="#2d5a27" />
          </mesh>
        );
      })}
      {structures.map((struct) => {
        const pos = latLngToVector3(struct.lat, struct.lng, radius);
        const scale = STRUCTURE_SCALE;
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

function usePovOnChange(
  globeRef: React.RefObject<{ setPointOfView?: (camera: THREE.Camera) => void } | null>
) {
  const { camera } = useThree();
  return useCallback(() => {
    try {
      globeRef.current?.setPointOfView?.(camera);
    } catch {
      // Ignore - three-globe tile engine may not be ready (avoids __kapsuleInstance error)
    }
  }, [camera, globeRef]);
}

// Scale zoom sensitivity: when zoomed in (small distance), scroll does less
function ZoomScaling({
  controlsRef,
  minDist,
  maxDist,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  minDist: number;
  maxDist: number;
}) {
  useFrame(
    () => {
      const ctrl = controlsRef.current;
      if (!ctrl) return;
      const dist = ctrl.target.distanceTo(ctrl.object.position);
      // Linear blend: at minDist use 0.25x, at maxDist use 1x
      const t = Math.max(0, Math.min(1, (dist - minDist) / (maxDist - minDist)));
      ctrl.zoomSpeed = 0.25 + 0.75 * t;
    },
    -2 // Run before OrbitControls (-1) so zoomSpeed is set when scroll is processed
  );
  return null;
}

function ZoomScaleUpdater({
  controlsRef,
  maxDist,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  maxDist: number;
}) {
  const setZoomMagnification = usePlanetStore((s) => s.setZoomMagnification);
  useFrame(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const dist = ctrl.target.distanceTo(ctrl.object.position);
    const mag = Math.max(1, maxDist / dist);
    setZoomMagnification(mag);
  });
  return null;
}

function Scene({
  onPointClick,
  autoRotate,
  panStrength,
}: {
  onPointClick: (lat: number, lng: number) => void;
  autoRotate: boolean;
  panStrength: number;
}) {
  const globeRef = useRef<{ setPointOfView?: (camera: THREE.Camera) => void } | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const onPovChange = usePovOnChange(globeRef);

  // Initial POV sync after mount (onChange may not fire until user interacts)
  const { camera } = useThree();
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        globeRef.current?.setPointOfView?.(camera);
      } catch {
        // Ignore
      }
    }, 100);
    return () => clearTimeout(t);
  }, [camera]);

  // Set pan and rotate speed every frame — ensures they're applied
  useFrame(
    () => {
      if (controlsRef.current) {
        controlsRef.current.panSpeed = panStrength;
        controlsRef.current.rotateSpeed = panStrength;
      }
    },
    -2
  );

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
      <Entities radius={GLOBE_RADIUS + 0.15} />
      <TerraformingOverlay radius={GLOBE_RADIUS} />
      <ClickRipple radius={GLOBE_RADIUS} />
      <OrbitControls
        ref={controlsRef}
        enableZoom
        enablePan
        minDistance={MIN_CAMERA_DISTANCE}
        maxDistance={GLOBE_RADIUS * 8}
        autoRotate={autoRotate}
        autoRotateSpeed={0.3}
        onChange={onPovChange}
        panSpeed={panStrength}
      />
      <ZoomScaling
        controlsRef={controlsRef}
        minDist={MIN_CAMERA_DISTANCE}
        maxDist={GLOBE_RADIUS * 8}
      />
      <ZoomScaleUpdater controlsRef={controlsRef} maxDist={GLOBE_RADIUS * 8} />
    </>
  );
}

function formatMagnification(mag: number): string {
  if (mag < 1.1) return "1×";
  if (mag < 10) return `${mag.toFixed(1)}×`;
  return `${Math.round(mag)}×`;
}

const PAN_STRENGTH_MIN = 0.5;
const PAN_STRENGTH_MAX = 4;
const PAN_STRENGTH_DEFAULT = 1;

export function Globe({
  onPointClick,
}: {
  onPointClick: (lat: number, lng: number) => void;
}) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [panStrength, setPanStrength] = useState(PAN_STRENGTH_DEFAULT);
  const zoomMagnification = usePlanetStore((s) => s.zoomMagnification);

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
          <Scene
            onPointClick={onPointClick}
            autoRotate={autoRotate}
            panStrength={panStrength}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label
            htmlFor="pan-strength"
            className="text-xs text-white/70 whitespace-nowrap"
          >
            Drag strength
          </label>
          <input
            id="pan-strength"
            type="range"
            min={PAN_STRENGTH_MIN}
            max={PAN_STRENGTH_MAX}
            step={0.25}
            value={panStrength}
            onChange={(e) => setPanStrength(parseFloat(e.target.value))}
            className="w-24 h-2 accent-emerald-500 bg-white/20 rounded-lg appearance-none cursor-pointer"
            title="Left-drag (rotate) and right-drag (pan) sensitivity"
          />
          <span className="text-xs text-white/90 tabular-nums w-8">
            {panStrength.toFixed(1)}×
          </span>
        </div>
        <div
          className="rounded-lg bg-black/60 px-3 py-2 text-sm text-white/90 backdrop-blur tabular-nums"
          title="Zoom magnification (scroll to zoom)"
        >
          Scale: {formatMagnification(zoomMagnification)}
        </div>
        <button
          type="button"
          onClick={() => setAutoRotate((v) => !v)}
          className="rounded-lg bg-black/60 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/80 transition-colors"
          title={autoRotate ? "Stop rotation" : "Start rotation"}
        >
          {autoRotate ? "⟳ Rotating" : "⏸ Paused"}
        </button>
      </div>
    </div>
  );
}
