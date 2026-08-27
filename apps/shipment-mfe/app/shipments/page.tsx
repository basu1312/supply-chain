"use client";

import React from 'react'
import ShipmentsList from '../src/components/ShipmentsList'

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Shipments</h1>
      <ShipmentsList />
    </div>
  )
}
