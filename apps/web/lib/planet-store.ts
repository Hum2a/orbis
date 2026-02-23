import { create } from "zustand";
import type { TileState, Entity } from "@orbis/shared";

export type ActionEffectType = "plant" | "water" | "build";

interface ActionEffect {
  lat: number;
  lng: number;
  type: ActionEffectType;
  timestamp: number;
}

interface PlanetState {
  planetId: string | null;
  sessionId: string | null;
  tiles: Record<string, TileState>;
  entities: Record<string, Entity>;
  snapshotVersion: number;
  serverTime: number;
  connected: boolean;
  actionMode: "plant" | "water" | "build";
  lastActionEffect: ActionEffect | null;

  setConnected: (connected: boolean) => void;
  setSessionId: (id: string) => void;
  triggerActionEffect: (lat: number, lng: number, type: ActionEffectType) => void;
  clearActionEffect: () => void;
  applySnapshot: (data: {
    planetId: string;
    snapshotVersion: number;
    serverTime: number;
    tiles: Record<string, TileState>;
    entities: Record<string, Entity>;
  }) => void;
  applyDiff: (data: {
    seq: number;
    serverTime: number;
    tilesChanged: TileState[];
    entitiesUpsert: Entity[];
    entitiesRemove: string[];
  }) => void;
  setActionMode: (mode: "plant" | "water" | "build") => void;
  reset: () => void;
}

const initialState = {
  planetId: null,
  sessionId: null,
  tiles: {},
  entities: {},
  snapshotVersion: 0,
  serverTime: 0,
  connected: false,
  actionMode: "plant" as const,
  lastActionEffect: null as ActionEffect | null,
};

export const usePlanetStore = create<PlanetState>((set) => ({
  ...initialState,
  setConnected: (connected) => set({ connected }),
  setSessionId: (sessionId) => set({ sessionId }),
  applySnapshot: (data) =>
    set({
      planetId: data.planetId,
      snapshotVersion: data.snapshotVersion,
      serverTime: data.serverTime,
      tiles: data.tiles || {},
      entities: data.entities || {},
    }),
  applyDiff: ({ serverTime, tilesChanged, entitiesUpsert, entitiesRemove }) =>
    set((state) => {
      const tiles = { ...state.tiles };
      for (const t of tilesChanged || []) {
        tiles[t.tileId] = t;
      }
      const entities = { ...state.entities };
      for (const e of entitiesUpsert || []) {
        entities[e.id] = e;
      }
      for (const id of entitiesRemove || []) {
        delete entities[id];
      }
      return { tiles, entities, serverTime };
    }),
  setActionMode: (actionMode) => set({ actionMode }),
  triggerActionEffect: (lat, lng, type) =>
    set({ lastActionEffect: { lat, lng, type, timestamp: Date.now() } }),
  clearActionEffect: () => set({ lastActionEffect: null }),
  reset: () => set(initialState),
}));
