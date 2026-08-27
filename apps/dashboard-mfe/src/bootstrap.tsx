"use client";

import React from 'react'
import useDashboard from './src/hooks/useDashboard'
import KpiCard from './src/components/kpis/KpiCard'
import ShipmentStatusDoughnut from './src/components/charts/ShipmentStatusDoughnut'
import ShipmentVolumeLine from './src/components/charts/ShipmentVolumeLine'

export default function DashboardApp() {
  const { data, loading, error, refetch } = useDashboard()

  if (loading) return <div>Loading metrics...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard (Remote)</h1>
        <div>
          <button onClick={() => refetch()} className="px-3 py-1 bg-blue-600 text-white rounded">Refresh</button>
        </div>
      </div>

      {data && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <KpiCard title="Total Shipments" value={data.totalShipments} />
            <KpiCard title="Delivered" value={data.delivered} />
            <KpiCard title="In Transit" value={data.inTransit} />
            <KpiCard title="Delayed" value={data.delayed} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-medium mb-2">Shipment Status</h3>
              <ShipmentStatusDoughnut metrics={data} />
            </div>

            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-medium mb-2">Shipment Volume</h3>
              <ShipmentVolumeLine />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
