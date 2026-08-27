"use client";

import React from 'react'
import useInventory from '../hooks/useInventory'
import DataTable from './data-table/DataTable'
import Badge from './ui/Badge'
import Link from 'next/link'
import inventoryService from '../services/inventory.service'

export default function InventoryList() {
  const { data, loading, error, refetch } = useInventory()

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return
    try {
      await inventoryService.deleteInventory(id)
      refetch()
    } catch (e: any) {
      alert(e.message || 'Failed to delete')
    }
  }

  const columns = [
    { header: 'SKU', accessor: (r: any) => r.sku },
    { header: 'Product', accessor: (r: any) => r.productName },
    { header: 'Warehouse', accessor: (r: any) => r.warehouseId },
    { header: 'Quantity', accessor: (r: any) => (
      <div className="flex items-center gap-2">{r.quantity} {r.quantity <= r.reorderLevel && <Badge color="red">Low</Badge>}</div>
    ) },
    { header: 'Unit Price', accessor: (r: any) => `$${r.unitPrice.toFixed(2)}` }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/inventory/new" className="bg-blue-600 text-white px-3 py-1 rounded">Add Item</Link>
        </div>
        <div>
          <button onClick={() => refetch()} className="px-3 py-1 border rounded">Refresh</button>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <DataTable data={data} columns={columns} loading={loading} actions={(row: any) => (
        <div className="flex gap-2">
          <Link href={`/inventory/${row.id}`} className="text-blue-600">View</Link>
          <Link href={`/inventory/${row.id}/edit`} className="text-green-600">Edit</Link>
          <button onClick={() => handleDelete(row.id)} className="text-red-600">Delete</button>
        </div>
      )} />
    </div>
  )
}
