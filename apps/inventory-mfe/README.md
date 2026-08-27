# Phase 8 — Inventory MFE

This commit implements a standalone Inventory micro-frontend (apps/inventory-mfe) with:

- Inventory list with low-stock badge, refresh, and delete
- Inventory details page
- Create and Edit forms with validation and loading states
- Reusable DataTable and Badge UI components
- inventory.service that calls the Shell API (/api/inventory)
- useInventory hook handling fetch + loading + error

How to run:
1. From repo root:
   pnpm install
2. Start Shell and Inventory MFE:
   pnpm dev:shell
   pnpm dev:inventory
3. Login via Shell (http://localhost:3000/login) to obtain the refresh cookie, then open Inventory MFE at http://localhost:3003/inventory

Notes:
- Low-stock is indicated when quantity <= reorderLevel.
- Backend enforces VIEW_INVENTORY and UPDATE_INVENTORY; the frontend uses the same API and will surface 401/403 errors where appropriate.
- Next steps: Orders MFE (Phase 9), MFE integration (Phase 10).