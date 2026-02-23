/**
 * Orbis Worker - routes HTTP and WebSocket to Planet Durable Objects.
 */

import { PlanetDO } from "./PlanetDO";

export { PlanetDO };

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // WebSocket upgrade: /api/ws?planetId=earth-001
    if (url.pathname === "/api/ws" || url.pathname === "/ws") {
      const planetId = url.searchParams.get("planetId") || env.DEFAULT_PLANET_ID || "earth-001";
      if (request.headers.get("Upgrade") !== "websocket") {
        return new Response("Expected WebSocket upgrade", { status: 426 });
      }
      const id = env.PLANET_DO.idFromName(planetId);
      const stub = env.PLANET_DO.get(id);
      const wsUrl = new URL(request.url);
      wsUrl.searchParams.set("planetId", planetId);
      const wsRequest = new Request(wsUrl, { headers: request.headers });
      return stub.fetch(wsRequest);
    }

    // HTTP API: planet metadata, snapshot
    const planetMatch = url.pathname.match(/^\/api\/planets\/([^/]+)(?:\/(.+))?$/);
    if (planetMatch) {
      const planetId = planetMatch[1];
      const subpath = planetMatch[2];
      const id = env.PLANET_DO.idFromName(planetId);
      const stub = env.PLANET_DO.get(id);

      if (request.method === "GET") {
        if (!subpath || subpath === "snapshot" || subpath === "snapshot/latest") {
          const stateUrl = `https://planet.local/state?planetId=${planetId}`;
          const res = await stub.fetch(stateUrl, { method: "GET" });
          if (subpath?.includes("snapshot")) {
            return res;
          }
          const data = await res.json();
          return Response.json({
            planetId: data.planetId,
            name: `Planet ${planetId}`,
            snapshotVersion: data.snapshotVersion,
            serverTime: data.serverTime,
          });
        }
      }

      if (request.method === "POST" && !subpath) {
        const auth = request.headers.get("Authorization");
        const adminSecret = env.ADMIN_SECRET;
        if (adminSecret && auth !== `Bearer ${adminSecret}` && auth !== adminSecret) {
          return new Response("Unauthorized", { status: 401 });
        }
        return Response.json({ planetId, created: true }, { status: 201 });
      }

      const stateUrl = `https://planet.local/state?planetId=${planetId}`;
      return stub.fetch(stateUrl, { method: "GET" });
    }

    return new Response("Orbis Worker - use /api/ws?planetId=earth-001", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  },
};
