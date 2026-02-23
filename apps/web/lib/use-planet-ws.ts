"use client";

import { useEffect, useRef } from "react";
import { usePlanetStore } from "./planet-store";
import type { ClientMessage } from "@orbis/shared";

const getWsUrl = (planetId: string) => {
  const base = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8787";
  const wsProtocol = base.startsWith("https") ? "wss" : "ws";
  const host = base.replace(/^https?:\/\//, "");
  return `${wsProtocol}://${host}/api/ws?planetId=${planetId}`;
};

export function usePlanetWebSocket(planetId: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const reconnectAttempts = useRef(0);
  const {
    applySnapshot,
    applyDiff,
    setConnected,
    setSessionId,
    reset,
  } = usePlanetStore();

  useEffect(() => {
    reset();
    let cancelled = false;

    const connect = () => {
      if (cancelled) return;
      const url = getWsUrl(planetId);
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectAttempts.current = 0;
        setConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data as string);
          if (msg.type === "WELCOME") {
            setSessionId(msg.you?.sessionId || "");
          } else if (msg.type === "SNAPSHOT") {
            applySnapshot({
              planetId: msg.planetId,
              snapshotVersion: msg.snapshotVersion,
              serverTime: msg.serverTime,
              tiles: msg.tiles || {},
              entities: msg.entities || {},
            });
          } else if (msg.type === "DIFF") {
            applyDiff({
              seq: msg.seq,
              serverTime: msg.serverTime,
              tilesChanged: msg.tilesChanged || [],
              entitiesUpsert: msg.entitiesUpsert || [],
              entitiesRemove: msg.entitiesRemove || [],
            });
          }
        } catch {
          // ignore parse errors
        }
      };

      ws.onclose = () => {
        setConnected(false);
        if (cancelled) return;
        const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
        reconnectAttempts.current++;
        reconnectTimeoutRef.current = setTimeout(connect, delay);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();
    return () => {
      cancelled = true;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [planetId, applySnapshot, applyDiff, setConnected, setSessionId, reset]);

  const send = (msg: ClientMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { send };
}
