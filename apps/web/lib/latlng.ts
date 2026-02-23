import * as THREE from "three";

/**
 * Convert a 3D point on a unit sphere (centered at origin) to lat/lng.
 * Use with R3F event.point from onClick/onPointerDown.
 */
export function pointToLatLng(point: THREE.Vector3): { lat: number; lng: number } {
  const p = point.clone().normalize();
  const phi = Math.acos(Math.max(-1, Math.min(1, p.y)));
  const theta = Math.atan2(p.z, p.x);
  const lat = 90 - phi * (180 / Math.PI);
  const lng = theta * (180 / Math.PI);
  return { lat, lng };
}
