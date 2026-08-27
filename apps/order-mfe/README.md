# Phase 9 — Orders MFE

This commit implements a standalone Orders micro-frontend (apps/order-mfe) with:

- Orders list with create, edit, view and cancel functionality
- Order details page
- Create and Edit forms supporting multiple items (sku, quantity, unitPrice)
- Reusable DataTable component
- order.service that communicates with the Shell API (/api/orders)
- useOrders hook for fetching orders

How to run locally
1. From repo root:
   pnpm install
2. Start Shell and Orders MFE:
   pnpm dev:shell
   pnpm dev:order
3. Login via Shell (http://localhost:3000/login) to obtain the refresh cookie, then open Orders MFE at http://localhost:3004/orders

Notes
- RBAC enforced by Shell API: viewers cannot create or edit orders if they lack CREATE_ORDER / UPDATE_ORDER permissions.
- The MFE uses a refresh-first pattern to obtain an access token via the Shell's refresh endpoint and then attaches the Authorization header for API calls.
