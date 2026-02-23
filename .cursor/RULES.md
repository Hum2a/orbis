# Orbis Cursor Rules

Guidelines for AI and developers working on the Orbis codebase. Rules in `rules/` are `.mdc` files with YAML frontmatter; Cursor applies them based on `globs` and `alwaysApply`.

## Rule Index

| Rule | Scope | Description |
|------|-------|-------------|
| [naming-conventions.mdc](rules/naming-conventions.mdc) | `**/*.{ts,tsx,js,jsx,sql}` | Naming for files, identifiers, DB, messages |
| [typescript-implementation.mdc](rules/typescript-implementation.mdc) | `**/*.{ts,tsx}` | TypeScript standards, shared types, Zod |
| [db-schema.mdc](rules/db-schema.mdc) | `**/*.sql` | Postgres schema, tables, indexes |
| [file-organization.mdc](rules/file-organization.mdc) | Always | Monorepo layout, package structure |
| [cloudflare-backend.mdc](rules/cloudflare-backend.mdc) | `apps/worker/**/*` | Worker, Durable Objects, routing |
| [neon-backend.mdc](rules/neon-backend.mdc) | `apps/worker/**/*` | Neon Postgres, db helpers |
| [nextjs-frontend.mdc](rules/nextjs-frontend.mdc) | `apps/web/**/*` | Next.js, 3D globe, state |
| [websocket-protocol.mdc](rules/websocket-protocol.mdc) | `**/*.{ts,tsx}` | Message types, validation, diffs |

## Quick Reference

- **Shared types**: `packages/shared` – single source of truth
- **Planet scoping**: All APIs and state include `planetId`
- **Persistence**: Event log + snapshots in Postgres
- **Realtime**: WebSocket → WELCOME, SNAPSHOT, DIFF
