import * as THREE from "three";

/**
 * Convert a 3D point on a unit sphere (centered at origin) to lat/lng.
 * Use with R3F event.point from onClick/onPointerDown.
 */
export function pointToLatLng(point: THREE.Vector3): { lat: number; lng: number } {
  const phi = Math.acos(Math.max(-1, Math.min(1, point.y)));
  const theta = Math.atan2(point.z, point.x);
  const lat = 90 - phi * (180 / Math.PI);
  const lng = theta * (180 / Math.PI);
  return { lat, lng };
}
