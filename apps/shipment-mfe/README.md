# Phase 7 — Shipment MFE

This commit implements the Shipment micro-frontend with:

- Shipments list with server-side pagination, debounced search, delete confirmation
- Create (new) and Edit forms with validation and loading states
- Shipment details page
- Generic DataTable component for lists
- Axios-based service that attempts a refresh (via HttpOnly cookie) to obtain an access token and then attaches Authorization header
- Simple UI components (Button)

How to run the Shipment MFE locally
1. From repo root, install dependencies:
   pnpm install

2. Start the Shell and the Shipment MFE in parallel:
   pnpm dev:shell
   pnpm dev:shipment

3. Login via Shell first (http://localhost:3000/login) with dev credentials to obtain the refresh cookie. Then open the Shipment MFE at http://localhost:3002/shipments.

Notes and limitations
- The MFE uses the refresh cookie to obtain an access token on first request. This is a pragmatic integration method for dev-only MFEs; in production the Shell would share auth via a secure channel or use a shared auth library.
- The DataTable is minimal but supports generic rows and actions. Sorting and advanced filtering can be added in Phase 8.
- Next steps: Inventory MFE (Phase 8), Orders MFE (Phase 9), and MFE runtime integration (Phase 10).
