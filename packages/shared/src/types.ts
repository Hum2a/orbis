/**
 * Orbis - Living Digital Planet
 * Shared types for planet state, entities, tiles, and messages.
 */

// --- Tiles ---

export const TILE_SIZE_DEG = 5;

export const BIOME_OPTIONS = [
  "ocean",
  "desert",
  "grassland",
  "forest",
  "tundra",
  "wetland",
] as const;

export type Biome = (typeof BIOME_OPTIONS)[number];

export interface TileState {
  tileId: string;
  moisture: number; // 0-1
  fertility: number; // 0-1
  pollution: number; // 0-1
  biome: Biome;
}

export function tileIdFromLatLng(lat: number, lng: number): string {
  const latIndex = Math.floor((lat + 90) / TILE_SIZE_DEG);
  const lngIndex = Math.floor((lng + 180) / TILE_SIZE_DEG);
  return `${latIndex}:${lngIndex}`;
}

export function latLngFromTileId(tileId: string): { lat: number; lng: number } {
  const [latIdx, lngIdx] = tileId.split(":").map(Number);
  const lat = latIdx * TILE_SIZE_DEG - 90 + TILE_SIZE_DEG / 2;
  const lng = lngIdx * TILE_SIZE_DEG - 180 + TILE_SIZE_DEG / 2;
  return { lat, lng };
}

// --- Entities ---

export const TREE_SPECIES = ["oak", "pine", "birch", "willow", "maple"] as const;
export type TreeSpecies = (typeof TREE_SPECIES)[number];

export const STRUCTURE_KINDS = ["house", "well", "tower", "farm"] as const;
export type StructureKind = (typeof STRUCTURE_KINDS)[number];

export interface BaseEntity {
  id: string;
  type: "tree" | "structure";
  lat: number;
  lng: number;
  createdAt: number;
}

export interface TreeEntity extends BaseEntity {
  type: "tree";
  species: TreeSpecies;
  health: number; // 0-1
  growthStage: number; // 0-1
}

export interface StructureEntity extends BaseEntity {
  type: "structure";
  kind: StructureKind;
  integrity: number; // 0-1
}

export type Entity = TreeEntity | StructureEntity;

export function isTreeEntity(e: Entity): e is TreeEntity {
  return e.type === "tree";
}

export function isStructureEntity(e: Entity): e is StructureEntity {
  return e.type === "structure";
}

// --- Planet State ---

export interface PlanetSnapshot {
  planetId: string;
  snapshotVersion: number;
  serverTime: number;
  tiles: Record<string, TileState>;
  entities: Record<string, Entity>;
}
