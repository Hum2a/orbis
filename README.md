# Orbis — Living Digital Planet

A shared, persistent, realtime 3D globe. Plant trees, water areas, and build structures. The planet evolves over time via server-authoritative simulation ticks.

## Architecture

- **Frontend**: Next.js (App Router) + Three.js + Zustand + TanStack Query
- **Backend**: Cloudflare Workers + Durable Objects (one DO per `planetId`)
- **Database**: Postgres (Neon/Supabase) for events and snapshots

## Local Development

### Prerequisites

- Node.js 18+
- npm (or pnpm)

### 1. Install dependencies

```bash
npm install
```

### 2. Start the Cloudflare Worker (realtime backend)

```bash
npm run dev:worker
```

The worker runs at `http://localhost:8787`. WebSocket: `ws://localhost:8787/api/ws?planetId=earth-001`

### 3. Start the Next.js frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Go to **Enter Earth** or `/planet/earth-001`.

### 4. (Optional) Postgres for persistence

1. Create a [Neon](https://neon.tech) database
2. Run the schema:

```bash
psql $DATABASE_URL -f apps/worker/schema.sql
```

3. Add to `apps/worker/.dev.vars`:

```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
ADMIN_SECRET=your-admin-secret
```

## Environment Variables

### Web app (`apps/web`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WS_URL` | Worker URL for WebSocket (default: `http://localhost:8787`) |

### Worker (`apps/worker`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon/Supabase Postgres connection string |
| `ADMIN_SECRET` | Secret for `POST /api/planets` (create planet) |
| `DEFAULT_PLANET_ID` | Default planet (default: `earth-001`) |

## Creating a New Planet

1. Deploy the worker with `ADMIN_SECRET` set
2. Create planet:

```bash
curl -X POST https://your-worker.workers.dev/api/planets/mars-001 \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

3. Visit `/planet/mars-001`

## Acceptance Checklist

- [x] Two browser tabs see the same planet
- [x] Planting a tree in tab A shows in tab B within ~1 second
- [x] Refreshing preserves world state (with Postgres)
- [x] Trees grow (growthStage) over time via ticks
- [x] Watering affects tile moisture and tree health
- [x] All code paths include `planetId` for multi-planet support

## Project Structure

```
orbis/
├── apps/
│   ├── web/          # Next.js frontend
│   └── worker/       # Cloudflare Worker + Planet Durable Object
├── packages/
│   └── shared/       # Types, Zod schemas
├── package.json      # Workspace root
└── README.md
```
