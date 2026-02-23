/**
 * Postgres client for Neon. Uses HTTP driver when DATABASE_URL is set.
 * Falls back to no-op for local dev without DB.
 */

import { neon } from "@neondatabase/serverless";

export interface DbClient {
  sql: ReturnType<typeof neon>;
}

export function getDb(connectionString?: string): DbClient | null {
  if (!connectionString) return null;
  return { sql: neon(connectionString) };
}

export async function ensurePlanet(
  db: DbClient,
  planetId: string,
  name: string,
  seed: Record<string, unknown>
): Promise<void> {
  await db.sql`
    INSERT INTO planets (planet_id, name, seed)
    VALUES (${planetId}, ${name}, ${JSON.stringify(seed)})
    ON CONFLICT (planet_id) DO NOTHING
  `;
}

export async function insertEvent(
  db: DbClient,
  planetId: string,
  sessionId: string,
  actionType: string,
  payload: Record<string, unknown>
): Promise<void> {
  await db.sql`
    INSERT INTO planet_events (planet_id, session_id, action_type, payload)
    VALUES (${planetId}, ${sessionId}, ${actionType}, ${JSON.stringify(payload)})
  `;
}

export async function saveSnapshot(
  db: DbClient,
  planetId: string,
  version: number,
  snapshot: Record<string, unknown>
): Promise<void> {
  await db.sql`
    INSERT INTO planet_snapshots (planet_id, version, storage_kind, snapshot)
    VALUES (${planetId}, ${version}, 'inline', ${JSON.stringify(snapshot)})
  `;
}

export async function getLatestSnapshot(
  db: DbClient,
  planetId: string
): Promise<{ version: number; snapshot: unknown } | null> {
  const rows = await db.sql`
    SELECT version, snapshot FROM planet_snapshots
    WHERE planet_id = ${planetId}
    ORDER BY version DESC LIMIT 1
  `;
  if (rows.length === 0) return null;
  return {
    version: rows[0].version as number,
    snapshot: rows[0].snapshot as unknown,
  };
}

export async function getPlanet(
  db: DbClient,
  planetId: string
): Promise<{ planet_id: string; name: string; seed: unknown } | null> {
  const rows = await db.sql`
    SELECT planet_id, name, seed FROM planets WHERE planet_id = ${planetId}
  `;
  if (rows.length === 0) return null;
  return rows[0] as { planet_id: string; name: string; seed: unknown };
}
