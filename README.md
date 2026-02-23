<p align="center">
  <img src="https://github.com/YOUR_USERNAME/orbis/actions/workflows/ci.yml/badge.svg" alt="CI" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Cloudflare-Workers%20%26%20DO-F38020?style=for-the-badge&logo=cloudflare" alt="Cloudflare" />
  <img src="https://img.shields.io/badge/Three.js-3D%20Globe-000000?style=for-the-badge&logo=three.js" alt="Three.js" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License" />
</p>

<h1 align="center">🌍 Orbis</h1>
<p align="center"><strong>Living Digital Planet</strong></p>
<p align="center">A shared, persistent, realtime 3D globe. Plant trees, water areas, and build structures. The planet evolves over time via server-authoritative simulation.</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌲 **Plant Trees** | Click anywhere to plant oak, pine, birch, willow, or maple. Trees grow over time. |
| 💧 **Water Tiles** | Water the land to boost moisture and help trees thrive. |
| 🏗️ **Build Structures** | Place wells, houses, towers, and farms. |
| 🌐 **Realtime Sync** | Two browser tabs see the same planet—changes appear in ~1 second. |
| 🗺️ **2D & 3D Views** | Toggle between an interactive globe and a flat map. |
| 📍 **Annotations** | Hover over entities to see labels (species, growth stage, structure type). |
| 🔄 **Persistent State** | World state survives refreshes with Postgres (Neon/Supabase). |
| 🪐 **Multi-Planet** | Create multiple planets—each has its own Durable Object. |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** (or pnpm)

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/orbis.git
cd orbis
npm install
```

### 2. Start the backend (Cloudflare Worker)

```bash
npm run dev:worker
```

Worker runs at `http://localhost:8787`

### 3. Start the frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → **Enter Earth** or `/planet/earth-001`

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

---

## 🏗️ Architecture

```
┌─────────────────┐     WebSocket      ┌──────────────────────┐
│   Next.js App   │ ◄────────────────► │  Cloudflare Worker   │
│  (Three.js +    │                    │  + Durable Objects    │
│   Leaflet)      │                    │  (PlanetDO per id)    │
└────────┬────────┘                    └──────────┬───────────┘
         │                                         │
         │                                         │ events, snapshots
         │                                         ▼
         │                                ┌────────────────────┐
         │                                │  Postgres (Neon)    │
         │                                └────────────────────┘
         │
         └── Static assets, API routes
```

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 16 (App Router), Three.js, r3f-globe, Leaflet, Zustand, TanStack Query |
| **Backend** | Cloudflare Workers, Durable Objects (SQLite-backed) |
| **Database** | Postgres (Neon/Supabase) for events and snapshots |

---

## 📁 Project Structure

```
orbis/
├── apps/
│   ├── web/          # Next.js frontend (globe, map, UI)
│   └── worker/       # Cloudflare Worker + Planet Durable Object
├── packages/
│   └── shared/       # Types, Zod schemas, utilities
├── package.json      # Workspace root
└── README.md
```

---

## ⚙️ Environment Variables

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

---

## 🚢 Deployment

### Deploy the Worker

```bash
cd apps/worker
npx wrangler login
npx wrangler secret put DATABASE_URL
npx wrangler secret put ADMIN_SECRET
npx wrangler deploy
```

### Deploy the Frontend

- **Cloudflare Pages**: Use [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) for Next.js on Workers
- **Vercel**: `vercel` (native Next.js support)
- **Static export**: Add `output: 'export'` to `next.config` and deploy the `out/` folder

### Create a New Planet

```bash
curl -X POST https://your-worker.workers.dev/api/planets/mars-001 \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

Then visit `/planet/mars-001`

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT © [Orbis](LICENSE)

---

> **Before publishing:** Replace `YOUR_USERNAME` in this README and `.github/` files with your GitHub username.
