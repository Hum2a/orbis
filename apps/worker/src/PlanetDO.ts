/**
 * Planet Durable Object - authoritative state, WebSockets, ticks.
 */

import { DurableObject } from "cloudflare:workers";
import type {
  TileState,
  Entity,
  TreeEntity,
  StructureEntity,
  PlanetSnapshot,
} from "@orbis/shared";
import {
  tileIdFromLatLng,
  BIOME_OPTIONS,
  TREE_SPECIES,
  STRUCTURE_KINDS,
} from "@orbis/shared";
import {
  IntentPlantTreeSchema,
  IntentWaterTileSchema,
  IntentBuildSchema,
  ClientMessageSchema,
} from "@orbis/shared";
import type { DbClient } from "./db";
import { neon } from "@neondatabase/serverless";
import {
  ensurePlanet,
  insertEvent,
  saveSnapshot,
  getLatestSnapshot,
} from "./db";
import type { DbClient } from "./db";

const TILE_SIZE_DEG = 5;
const SMALL_TICK_MS = 2000;
const BIG_TICK_MS = 60000;
const ACTION_COOLDOWN_MS = 2000;
const MOISTURE_DECAY = 0.002;
const POLLUTION_DRIFT = 0.001;
const FERTILITY_CHANGE_RATE = 0.001;
const TREE_GROWTH_RATE = 0.02;
const TREE_HEALTH_DECAY = 0.01;
const THRESHOLD = 0.01;
const MAX_ENTITIES_PER_TILE = 10;
const SNAPSHOT_EVERY_EVENTS = 100;

export class PlanetDO extends DurableObject<Env> {
  private planetId: string;
  private tiles: Map<string, TileState> = new Map();
  private entities: Map<string, Entity> = new Map();
  private seq = 0;
  private snapshotVersion = 0;
  private eventCountSinceSnapshot = 0;
  private sessions: Map<WebSocket, { sessionId: string; lastActionAt: number }> =
    new Map();

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.planetId = env.DEFAULT_PLANET_ID || "earth-001";
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const reqPlanetId = url.searchParams.get("planetId") || this.env.DEFAULT_PLANET_ID || "earth-001";

    if (request.headers.get("Upgrade") === "websocket") {
      this.planetId = reqPlanetId;
      return this.handleWebSocket(request, reqPlanetId);
    }

    if (url.pathname.endsWith("/state") && request.method === "GET") {
      return this.handleGetState(reqPlanetId);
    }

    return new Response("Not Found", { status: 404 });
  }

  async handleWebSocket(request: Request, planetId: string): Promise<Response> {
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();

    const sessionId = crypto.randomUUID();
    this.sessions.set(server, { sessionId, lastActionAt: 0 });

    const db = this.getDb();

    if (db) {
      await ensurePlanet(db as DbClient, planetId, `Planet ${planetId}`, {});
      await this.loadFromDb(db as DbClient, planetId);
    } else {
      this.ensureInitialState(planetId);
    }

    this.send(server, {
      type: "WELCOME",
      planetId: this.planetId,
      serverTime: Date.now(),
      tickRate: SMALL_TICK_MS,
      you: { sessionId },
    });

    const snapshot = this.buildSnapshot();
    this.send(server, snapshot);

    server.addEventListener("message", async (event: MessageEvent) => {
      try {
        const data = typeof event.data === "string" ? event.data : "";
        const parsed = JSON.parse(data);
        const result = ClientMessageSchema.safeParse(parsed);
        if (!result.success) return;

        const msg = result.data;
        if (msg.type === "PING") {
          this.send(server, { type: "PONG", t: msg.t });
          return;
        }

        const session = this.sessions.get(server);
        if (!session) return;

        const now = Date.now();
        if (now - session.lastActionAt < ACTION_COOLDOWN_MS) {
          this.send(server, {
            type: "REJECTED",
            planetId: this.planetId,
            requestId: (msg as { requestId?: string }).requestId || "",
            reason: "rate_limited",
          });
          return;
        }

        let rejected: string | null = null;
        if (msg.type === "INTENT_PLANT_TREE") {
          rejected = this.handlePlantTree(msg, sessionId);
        } else if (msg.type === "INTENT_WATER_TILE") {
          rejected = this.handleWaterTile(msg, sessionId);
        } else if (msg.type === "INTENT_BUILD") {
          rejected = this.handleBuild(msg, sessionId);
        }

        if (rejected) {
          this.send(server, {
            type: "REJECTED",
            planetId: this.planetId,
            requestId: msg.requestId,
            reason: rejected,
          });
          return;
        }

        session.lastActionAt = now;

        const diff = this.buildDiff();
        this.broadcast(diff);

        if (db) {
          const actionType = msg.type;
          const payload = msg.type === "INTENT_PLANT_TREE"
            ? { lat: msg.lat, lng: msg.lng, species: msg.species }
            : msg.type === "INTENT_WATER_TILE"
            ? { tileId: msg.tileId, amount: msg.amount }
            : { lat: msg.lat, lng: msg.lng, kind: msg.kind };
          await insertEvent(db as DbClient, this.planetId, sessionId, actionType, payload);
          this.eventCountSinceSnapshot++;
          if (this.eventCountSinceSnapshot >= SNAPSHOT_EVERY_EVENTS) {
            this.snapshotToDb(db as DbClient);
          }
        }
      } catch {
        // ignore parse errors
      }
    });

    server.addEventListener("close", () => {
      this.sessions.delete(server);
    });

    this.ctx.storage.setAlarm(Date.now() + SMALL_TICK_MS);

    return new Response(null, { status: 101, webSocket: client });
  }

  async alarm(): Promise<void> {
    this.runSmallTick();
    const now = Date.now();
    if (now % BIG_TICK_MS < SMALL_TICK_MS) {
      this.runBigTick();
    }
    this.ctx.storage.setAlarm(Date.now() + SMALL_TICK_MS);
  }


  private ensureInitialState(planetId: string): void {
    if (this.tiles.size > 0) return;
    this.planetId = planetId;
    for (let latIdx = 0; latIdx < 36; latIdx++) {
      for (let lngIdx = 0; lngIdx < 72; lngIdx++) {
        const tileId = `${latIdx}:${lngIdx}`;
        this.tiles.set(tileId, {
          tileId,
          moisture: 0.5,
          fertility: 0.5,
          pollution: 0.1,
          biome: "grassland",
        });
      }
    }
  }

  private async loadFromDb(db: DbClient, planetId: string): Promise<void> {
    const latest = await getLatestSnapshot(db, planetId);
    if (latest && latest.snapshot && typeof latest.snapshot === "object") {
      const sn = latest.snapshot as PlanetSnapshot;
      this.snapshotVersion = sn.snapshotVersion ?? latest.version;
      this.tiles = new Map(Object.entries(sn.tiles || {}));
      this.entities = new Map(Object.entries(sn.entities || {}));
      return;
    }
    this.ensureInitialState(planetId);
  }

  private handlePlantTree(
    msg: { requestId: string; lat: number; lng: number; species: string },
    sessionId: string
  ): string | null {
    if (!TREE_SPECIES.includes(msg.species as (typeof TREE_SPECIES)[number])) {
      return "invalid_species";
    }
    const tileId = tileIdFromLatLng(msg.lat, msg.lng);
    const tile = this.tiles.get(tileId);
    if (!tile) return "invalid_tile";
    const count = [...this.entities.values()].filter(
      (e) => tileIdFromLatLng(e.lat, e.lng) === tileId
    ).length;
    if (count >= MAX_ENTITIES_PER_TILE) return "tile_full";
    const id = `tree-${crypto.randomUUID().slice(0, 8)}`;
    const entity: TreeEntity = {
      id,
      type: "tree",
      lat: msg.lat,
      lng: msg.lng,
      species: msg.species as TreeEntity["species"],
      createdAt: Date.now(),
      health: 1,
      growthStage: 0.3,
    };
    this.entities.set(id, entity);
    return null;
  }

  private handleWaterTile(
    msg: { requestId: string; tileId: string; amount: number },
    _sessionId: string
  ): string | null {
    const tile = this.tiles.get(msg.tileId);
    if (!tile) return "invalid_tile";
    tile.moisture = Math.min(1, tile.moisture + msg.amount);
    return null;
  }

  private handleBuild(
    msg: { requestId: string; lat: number; lng: number; kind: string },
    _sessionId: string
  ): string | null {
    if (!STRUCTURE_KINDS.includes(msg.kind as (typeof STRUCTURE_KINDS)[number])) {
      return "invalid_kind";
    }
    const tileId = tileIdFromLatLng(msg.lat, msg.lng);
    const count = [...this.entities.values()].filter(
      (e) => tileIdFromLatLng(e.lat, e.lng) === tileId
    ).length;
    if (count >= MAX_ENTITIES_PER_TILE) return "tile_full";
    const id = `struct-${crypto.randomUUID().slice(0, 8)}`;
    const entity: StructureEntity = {
      id,
      type: "structure",
      lat: msg.lat,
      lng: msg.lng,
      kind: msg.kind as StructureEntity["kind"],
      createdAt: Date.now(),
      integrity: 1,
    };
    this.entities.set(id, entity);
    return null;
  }

  private runSmallTick(): void {
    const tilesChanged: TileState[] = [];
    const entitiesUpsert: Entity[] = [];

    for (const [tileId, tile] of this.tiles) {
      const prev = { ...tile };
      tile.moisture = Math.max(0, tile.moisture - MOISTURE_DECAY);
      tile.pollution = Math.min(1, Math.max(0, tile.pollution + (Math.random() - 0.5) * POLLUTION_DRIFT * 2));
      tile.fertility = Math.min(
        1,
        Math.max(
          0,
          tile.fertility +
            (tile.moisture > 0.3 && tile.pollution < 0.5 ? FERTILITY_CHANGE_RATE : -FERTILITY_CHANGE_RATE)
        )
      );
      if (
        Math.abs(tile.moisture - prev.moisture) > THRESHOLD ||
        Math.abs(tile.fertility - prev.fertility) > THRESHOLD ||
        Math.abs(tile.pollution - prev.pollution) > THRESHOLD
      ) {
        tilesChanged.push({ ...tile });
      }
    }

    for (const entity of this.entities.values()) {
      if (entity.type === "tree") {
        const tileId = tileIdFromLatLng(entity.lat, entity.lng);
        const tile = this.tiles.get(tileId);
        if (tile) {
          const prevHealth = entity.health;
          const prevStage = entity.growthStage;
          if (tile.moisture < 0.2) {
            entity.health = Math.max(0, entity.health - TREE_HEALTH_DECAY);
          } else if (tile.moisture > 0.4) {
            entity.growthStage = Math.min(1, entity.growthStage + TREE_GROWTH_RATE);
          }
          if (
            Math.abs(entity.health - prevHealth) > THRESHOLD ||
            Math.abs(entity.growthStage - prevStage) > THRESHOLD
          ) {
            entitiesUpsert.push({ ...entity });
          }
        }
      }
    }

    if (tilesChanged.length > 0 || entitiesUpsert.length > 0) {
      this.seq++;
      const diff = this.buildDiffWithChanges(tilesChanged, entitiesUpsert, []);
      this.broadcast(diff);
    }
  }

  private runBigTick(): void {
    const tilesChanged: TileState[] = [];
    const entitiesUpsert: Entity[] = [];

    for (const tile of this.tiles.values()) {
      const prevBiome = tile.biome;
      tile.biome = this.deriveBiome(tile);
      if (tile.biome !== prevBiome) {
        tilesChanged.push({ ...tile });
      }
    }

    for (const entity of this.entities.values()) {
      if (entity.type === "structure") {
        const tileId = tileIdFromLatLng(entity.lat, entity.lng);
        const tile = this.tiles.get(tileId);
        if (tile && tile.pollution > 0.7) {
          entity.integrity = Math.max(0, entity.integrity - 0.01);
          entitiesUpsert.push({ ...entity });
        }
      }
    }

    if (tilesChanged.length > 0 || entitiesUpsert.length > 0) {
      this.seq++;
      const diff = this.buildDiffWithChanges(tilesChanged, entitiesUpsert, []);
      this.broadcast(diff);
    }
  }

  private deriveBiome(tile: TileState): (typeof BIOME_OPTIONS)[number] {
    if (tile.moisture < 0.2 && tile.fertility < 0.3) return "desert";
    if (tile.moisture > 0.8) return "wetland";
    if (tile.moisture > 0.6 && tile.fertility > 0.5) return "forest";
    if (tile.moisture > 0.3 && tile.fertility > 0.4) return "grassland";
    if (tile.moisture < 0.4 && tile.pollution > 0.5) return "tundra";
    return "grassland";
  }

  private buildSnapshot(): {
    type: "SNAPSHOT";
    planetId: string;
    snapshotVersion: number;
    serverTime: number;
    tiles: Record<string, TileState>;
    entities: Record<string, Entity>;
  } {
    const tiles: Record<string, TileState> = {};
    const entities: Record<string, Entity> = {};
    for (const [k, v] of this.tiles) tiles[k] = v;
    for (const [k, v] of this.entities) entities[k] = v;
    return {
      type: "SNAPSHOT",
      planetId: this.planetId,
      snapshotVersion: this.snapshotVersion,
      serverTime: Date.now(),
      tiles,
      entities,
    };
  }

  private buildDiff(): unknown {
    return this.buildDiffWithChanges([], [], []);
  }

  private buildDiffWithChanges(
    tilesChanged: TileState[],
    entitiesUpsert: Entity[],
    entitiesRemove: string[]
  ): unknown {
    this.seq++;
    return {
      type: "DIFF",
      planetId: this.planetId,
      seq: this.seq,
      serverTime: Date.now(),
      tilesChanged,
      entitiesUpsert,
      entitiesRemove,
    };
  }

  private broadcast(msg: unknown): void {
    const data = JSON.stringify(msg);
    for (const ws of this.sessions.keys()) {
      try {
        ws.send(data);
      } catch {
        this.sessions.delete(ws);
      }
    }
  }

  private send(ws: WebSocket, msg: unknown): void {
    try {
      ws.send(JSON.stringify(msg));
    } catch {
      this.sessions.delete(ws);
    }
  }

  private async snapshotToDb(db: DbClient): Promise<void> {
    this.snapshotVersion++;
    const snapshot = this.buildSnapshot();
    await saveSnapshot(db, this.planetId, this.snapshotVersion, snapshot as unknown as Record<string, unknown>);
    this.eventCountSinceSnapshot = 0;
  }

  private getDb(): DbClient | null {
    if (!this.env.DATABASE_URL) return null;
    return { sql: neon(this.env.DATABASE_URL) };
  }

  private async handleGetState(planetId: string): Promise<Response> {
    if (this.tiles.size === 0) {
      this.ensureInitialState(planetId);
    }
    return Response.json(this.buildSnapshot());
  }
}
