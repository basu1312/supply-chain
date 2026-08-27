"use client";

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import shipmentService from '../src/services/shipment.service'

export default function ShipmentDetailsPage({ params }: { params: { id: string } }) {
  const [shipment, setShipment] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const id = params.id

  useEffect(() => {
    let mounted = true
    setLoading(true)
    shipmentService.getShipmentById(Number(id)).then(s => {
      if (mounted) setShipment(s)
    }).catch(e => {
      if (mounted) setError(e.message)
    }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!shipment) return <div>Not found</div>

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{shipment.trackingNumber}</h2>
      <div className="space-y-2">
        <div><strong>Status:</strong> {shipment.status}</div>
        <div><strong>Origin:</strong> {shipment.origin}</div>
        <div><strong>Destination:</strong> {shipment.destination}</div>
        <div><strong>Carrier:</strong> {shipment.carrier}</div>
        <div><strong>Expected:</strong> {new Date(shipment.expectedDeliveryDate).toLocaleString()}</div>
        <div><strong>Actual:</strong> {shipment.actualDeliveryDate ? new Date(shipment.actualDeliveryDate).toLocaleString() : 'N/A'}</div>
      </div>
    </div>
  )
}
