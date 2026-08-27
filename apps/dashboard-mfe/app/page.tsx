"use client";

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import useDashboard from '../src/hooks/useDashboard'
import KpiCard from '../src/components/kpis/KpiCard'

const ShipmentStatusDoughnut = dynamic(() => import('../src/components/charts/ShipmentStatusDoughnut'), { ssr: false })
const ShipmentVolumeLine = dynamic(() => import('../src/components/charts/ShipmentVolumeLine'), { ssr: false })

export default function Page() {
  const { data, loading, error, refetch } = useDashboard()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div>
          <button onClick={() => refetch()} className="px-3 py-1 bg-blue-600 text-white rounded">Refresh</button>
        </div>
      </div>

      {loading && <div>Loading metrics...</div>}
      {error && <div className="text-red-600">{error}</div>}

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
              <Suspense fallback={<div>Loading chart...</div>}>
                <ShipmentStatusDoughnut metrics={data} />
              </Suspense>
            </div>

            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-medium mb-2">Shipment Volume</h3>
              <Suspense fallback={<div>Loading chart...</div>}>
                <ShipmentVolumeLine />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
