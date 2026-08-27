# Supply Chain Control Tower — Phase 1

This repository is organized as a small monorepo for the Supply Chain Control Tower project. Phase 1 sets up the workspace, the Shell (host) Next.js application and placeholder Micro Frontend (MFE) apps.

What I created in Phase 1:

- Monorepo workspace (apps/*)
- `apps/shell` Next.js + TypeScript + Tailwind skeleton (App Router)
- Placeholder MFE apps: `dashboard-mfe`, `shipment-mfe`, `inventory-mfe`, `order-mfe` (Next.js placeholders)
- Basic shared TS config and README instructions to run the shell locally

How to run (local dev for Phase 1):

1. Install dependencies (recommended: pnpm or npm):

   pnpm install

2. Start the Shell app (the host):

   pnpm dev:shell

3. Open http://localhost:3000

Notes:
- Each MFE is a standalone Next.js app under `apps/*`. They are placeholders for now and can be developed independently.
- Phase 2 will add the mock API, types, Axios client and services.

Next steps (after you confirm):
- Implement mock API and shared types
- Create Axios client and service layer
- Implement Redux slices and async thunks

