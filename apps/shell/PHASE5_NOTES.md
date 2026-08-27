# Phase 5 — RBAC & Backend Permission Enforcement

What I implemented in Phase 5:

1) Permission types + mapping
   - apps/shell/src/types/index.ts: added `Permission` type
   - apps/shell/src/lib/permissions.ts: role -> permission map and `hasPermission` helper

2) Server-side token verification and auth helper
   - apps/shell/src/lib/auth.ts: `verifyAccessToken(req)` reads the Authorization header, verifies JWT and returns payload (throws on missing/invalid)

3) API route enforcement
   - Updated API routes to verify access tokens and enforce permissions directly in the mock API (returns 401 for missing/invalid tokens and 403 for forbidden).
   - Updated routes: /api/shipments (GET/POST), /api/shipments/:id (GET/PUT/DELETE), /api/inventory (GET/POST), /api/orders (GET/POST), /api/dashboard/metrics (GET).

4) Client-side RBAC helper
   - apps/shell/components/auth/Can.tsx now uses the `hasPermission` helper with the live Redux-auth state (auth.user.role).

How to verify locally (after starting shell):

1. Sign in as different users:
   - admin@example.com / password
   - manager@example.com / password
   - viewer@example.com / password

2. Use curl with the access token to test permissions (example):

   # login and capture accessToken and cookie
   curl -i -c cookies.txt -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"manager@example.com","password":"password"}'

   # extract accessToken (copy from response body) and use it in Authorization header
   curl -H "Authorization: Bearer <accessToken>" http://localhost:3000/api/shipments

   # manager can CREATE_SHIPMENT (POST)
   curl -X POST -H "Authorization: Bearer <accessToken>" -H "Content-Type: application/json" --data '{"trackingNumber":"SC-NEW","status":"PENDING","origin":"X","destination":"Y","carrier":"Z","expectedDeliveryDate":"2026-09-01T00:00:00.000Z"}' http://localhost:3000/api/shipments

   # viewer should receive 403 when attempting POST

Notes and rationale
- Backend must be the true security boundary: the mock API now validates JWT and permissions.
- Frontend <Can> is a UX helper; server enforces permissions.

Next (Phase 6):
- Dashboard MFE: implement charts (Chart.js via react-chartjs-2), KPI cards, connect to /api/dashboard/metrics, and add loading/error states.

If you'd like, I can run Phase 6 now. Reply "Proceed Phase 6" to continue.