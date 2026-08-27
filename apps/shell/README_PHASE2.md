# Phase 2 — Mock API, Types, Axios and Services

This commit adds the Phase 2 pieces:

- Strongly typed domain models (apps/shell/src/types)
- Simple in-memory mock database and controllers (apps/shell/src/mock)
- Next.js App Router API routes under apps/shell/app/api for auth, shipments, inventory, orders and dashboard metrics
- Axios client with request/response interceptors and a single-refresh mechanism (apps/shell/src/lib/axios.ts)
- Token service for access token storage (apps/shell/src/lib/tokenService.ts)
- Service layer calling the mock API (apps/shell/src/services/*)

Run the shell and call the endpoints locally for development. The mock auth issues JWTs (signed using a development secret) and sets a HttpOnly refresh cookie to demonstrate the refresh flow.

Next steps after verification:
- Implement Redux slices and hooks
- Implement frontend auth flow/useAuth hook
- Implement UI pages to use services

