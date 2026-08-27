"use client";

import React from 'react'
import useOrders from '../hooks/useOrders'
import DataTable from './data-table/DataTable'
import Link from 'next/link'
import orderService from '../services/order.service'

export default function OrdersList() {
  const { data, loading, error, refetch } = useOrders()

  const handleCancel = async (id: number) => {
    if (!confirm('Cancel this order?')) return
    try {
      await orderService.updateOrder(id, { status: 'CANCELLED' })
      refetch()
    } catch (e: any) {
      alert(e.message || 'Failed to cancel')
    }
  }

  const columns = [
    { header: 'Order #', accessor: (r: any) => r.orderNumber },
    { header: 'Status', accessor: (r: any) => r.status },
    { header: 'Customer', accessor: (r: any) => r.customer },
    { header: 'Items Count', accessor: (r: any) => r.items.length },
    { header: 'Created', accessor: (r: any) => new Date(r.createdAt).toLocaleDateString() }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/orders/new" className="bg-blue-600 text-white px-3 py-1 rounded">Create Order</Link>
        </div>
        <div>
          <button onClick={() => refetch()} className="px-3 py-1 border rounded">Refresh</button>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <DataTable data={data} columns={columns} loading={loading} actions={(row: any) => (
        <div className="flex gap-2">
          <Link href={`/orders/${row.id}`} className="text-blue-600">View</Link>
          <Link href={`/orders/${row.id}/edit`} className="text-green-600">Edit</Link>
          {row.status !== 'CANCELLED' && <button onClick={() => handleCancel(row.id)} className="text-red-600">Cancel</button>}
        </div>
      )} />
    </div>
  )
}
