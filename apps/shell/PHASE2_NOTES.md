# Phase 2 Notes

Files added:
- apps/shell/src/types/index.ts
- apps/shell/src/lib/axios.ts
- apps/shell/src/lib/tokenService.ts
- apps/shell/src/services/auth.service.ts
- apps/shell/src/services/shipment.service.ts
- apps/shell/src/mock/db.ts
- apps/shell/app/api/auth/login/route.ts
- apps/shell/app/api/auth/refresh/route.ts
- apps/shell/app/api/auth/logout/route.ts
- apps/shell/app/api/shipments/route.ts
- apps/shell/app/api/shipments/[id]/route.ts
- apps/shell/app/api/inventory/route.ts
- apps/shell/app/api/orders/route.ts
- apps/shell/app/api/dashboard/metrics/route.ts

Run verification locally:
1. pnpm install (root)
2. pnpm dev:shell (starts shell on :3000)

Test login (dev credentials):
- POST http://localhost:3000/api/auth/login
  { "email": "admin@example.com", "password": "password" }
  -> returns accessToken and sets HttpOnly sc_refresh_token cookie

Test refresh:
- POST http://localhost:3000/api/auth/refresh (with cookie) -> new accessToken

Test shipments:
- GET http://localhost:3000/api/shipments
- GET http://localhost:3000/api/shipments/1

Security notes:
- This mock infrastructure is development-only. Tokens are signed with a development secret.
- Refresh token is set as HttpOnly cookie and access token is returned in body (for demo). In production prefer rotating refresh tokens and storing access tokens in memory.

