"use client";

import React from 'react'
import OrdersList from '../src/components/OrdersList'

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <OrdersList />
    </div>
  )
}
