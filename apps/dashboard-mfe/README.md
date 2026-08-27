# Phase 6 — Dashboard MFE

This adds a standalone Dashboard micro frontend that runs on port 3001 and displays KPI cards and charts connected to the Shell API at /api/dashboard/metrics.

How to run (development):
1. From repo root, install dependencies:
   pnpm install

2. Start the shell and the dashboard MFE in parallel:
   pnpm dev:shell
   pnpm dev:dashboard

3. Open Dashboard MFE at http://localhost:3001 (you may need to login via Shell first at http://localhost:3000/login to obtain cookies and tokens).

Notes:
- The MFE calls the Shell API (default base http://localhost:3000/api). Configure NEXT_PUBLIC_API_BASE_URL if your Shell is on a different host.
- Charts use react-chartjs-2 and Chart.js. ShipmentVolumeLine currently uses synthetic demo data; replace with server time series in later phases.
