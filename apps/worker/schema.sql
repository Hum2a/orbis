-- Orbis planet persistence schema (Neon Postgres)
-- Run: psql $DATABASE_URL -f schema.sql

CREATE TABLE IF NOT EXISTS planets (
  planet_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  seed JSONB DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS planet_events (
  id BIGSERIAL PRIMARY KEY,
  planet_id TEXT NOT NULL,
  ts TIMESTAMP DEFAULT now(),
  session_id TEXT,
  action_type TEXT NOT NULL,
  payload JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_planet_events_planet_ts ON planet_events(planet_id, ts);

CREATE TABLE IF NOT EXISTS planet_snapshots (
  id BIGSERIAL PRIMARY KEY,
  planet_id TEXT NOT NULL,
  ts TIMESTAMP DEFAULT now(),
  version INT NOT NULL,
  storage_kind TEXT DEFAULT 'inline',
  blob_key TEXT,
  snapshot JSONB
);

CREATE INDEX IF NOT EXISTS idx_planet_snapshots_planet_version ON planet_snapshots(planet_id, version);
CREATE INDEX IF NOT EXISTS idx_planet_snapshots_planet_ts ON planet_snapshots(planet_id, ts DESC);
