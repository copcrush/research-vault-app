<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ResearchVault app

Standalone frontend repository; Go API source: https://github.com/copcrush/research-vault-api. Preserve the existing navy/slate UI. Public Vercel builds use NEXT_PUBLIC_DEMO_MODE=true: projects are synthetic/browser-only and never call the backend. Local mode (false) uses API_ORIGIN via the same-origin rewrite. Keep the demo label and source links visible. No real confidential data, secrets, authentication claims, AI, or document uploads. Use React state and fetch; avoid new libraries without a concrete need. Run lint, typecheck, build and verify demo and local modes.
