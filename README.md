# ResearchVault App

A research project workspace built with **Next.js App Router, TypeScript, and Tailwind CSS**. This frontend accompanies [research-vault-api](https://github.com/copcrush/research-vault-api), an idiomatic Go REST API backed by PostgreSQL.

## Portfolio demo

The Vercel deployment runs an explicitly labeled, browser-only demo. Explore seeded synthetic projects, create your own sample project, edit it, and archive it. Refresh preserves changes in that browser's local storage. Reset demo restores the original samples. No project content is sent to the Go API; visitors do not share a database. Use sample content only.

The public demo demonstrates frontend interaction. The companion repository contains the real PostgreSQL-backed implementation and its tests; it is not used by the public demo.

## Features

- Responsive navy/slate workspace, accessible forms and navigation.
- Active/archived project lists, detail, create, edit, and idempotent archive.
- Validation, loading, empty, error, and not-found states.
- Typed fetch client and same-origin Next.js proxy for local Go development.
- Separate demo adapter; no additional state-management library.

Documents, AI/RAG, authentication, teams, and citations are future work. This is not a production confidential-data system.

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev:demo
```

Open http://localhost:3000/projects. To use the real API instead, start the companion backend and run `npm run dev` (demo mode defaults to false). Its default destination is `http://127.0.0.1:8080`; set server-side `API_ORIGIN` if needed. `.env.example` documents the options. Never put database secrets in `NEXT_PUBLIC_` variables.

```sh
npm run lint
npm run build
npm run typecheck
```

## Vercel

Import **research-vault-app** from GitHub, use the repository root and the Next.js preset. `vercel.json` explicitly enables demo mode for build/runtime. No backend/database credentials are needed. Pushes to main deploy through the Git integration.

## Architecture

App Router pages → React components → typed project client → either browser demo storage or same-origin Go API rewrite. Live persistence and business rules are implemented in the companion Go repository. Demo storage models the same user workflow but is not a backend or security boundary.
