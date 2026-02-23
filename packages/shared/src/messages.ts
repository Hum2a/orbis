/**
 * WebSocket message schemas (Zod) for client-server communication.
 */

import { z } from "zod";
// Re-export for Zod - tree species/kind enums match types
// --- Server → Client ---

export const WelcomeMessageSchema = z.object({
  type: z.literal("WELCOME"),
  planetId: z.string(),
  serverTime: z.number(),
  tickRate: z.number(),
  you: z.object({ sessionId: z.string() }),
});

export const SnapshotMessageSchema = z.object({
  type: z.literal("SNAPSHOT"),
  planetId: z.string(),
  snapshotVersion: z.number(),
  serverTime: z.number(),
  tiles: z.record(z.any()),
  entities: z.record(z.any()),
});

export const DiffMessageSchema = z.object({
  type: z.literal("DIFF"),
  planetId: z.string(),
  seq: z.number(),
  serverTime: z.number(),
  tilesChanged: z.array(z.any()).optional().default([]),
  entitiesUpsert: z.array(z.any()).optional().default([]),
  entitiesRemove: z.array(z.string()).optional().default([]),
});

export const RejectedMessageSchema = z.object({
  type: z.literal("REJECTED"),
  planetId: z.string(),
  requestId: z.string(),
  reason: z.string(),
});

// --- Client → Server (Intents) ---

export const IntentPlantTreeSchema = z.object({
  type: z.literal("INTENT_PLANT_TREE"),
  requestId: z.string(),
  planetId: z.string(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  species: z.enum(["oak", "pine", "birch", "willow", "maple"]),
});

export const IntentWaterTileSchema = z.object({
  type: z.literal("INTENT_WATER_TILE"),
  requestId: z.string(),
  planetId: z.string(),
  tileId: z.string(),
  amount: z.number().min(0.01).max(1),
});

export const IntentBuildSchema = z.object({
  type: z.literal("INTENT_BUILD"),
  requestId: z.string(),
  planetId: z.string(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  kind: z.enum(["house", "well", "tower", "farm"]),
});

export const PingSchema = z.object({
  type: z.literal("PING"),
  t: z.number(),
});

export const ClientMessageSchema = z.union([
  IntentPlantTreeSchema,
  IntentWaterTileSchema,
  IntentBuildSchema,
  PingSchema,
]);

export type WelcomeMessage = z.infer<typeof WelcomeMessageSchema>;
export type SnapshotMessage = z.infer<typeof SnapshotMessageSchema>;
export type DiffMessage = z.infer<typeof DiffMessageSchema>;
export type RejectedMessage = z.infer<typeof RejectedMessageSchema>;
export type IntentPlantTree = z.infer<typeof IntentPlantTreeSchema>;
export type IntentWaterTile = z.infer<typeof IntentWaterTileSchema>;
export type IntentBuild = z.infer<typeof IntentBuildSchema>;
export type PingMessage = z.infer<typeof PingSchema>;
export type ClientMessage = z.infer<typeof ClientMessageSchema>;
