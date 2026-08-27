"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import inventoryService from '../src/services/inventory.service'

export default function InventoryDetails({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const id = Number(params.id)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    inventoryService.getInventoryById(id).then(i => { if (mounted) setItem(i) }).catch(e => { if (mounted) setError(e.message) }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!item) return <div>Not found</div>

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{item.productName}</h2>
      <div className="space-y-2">
        <div><strong>SKU:</strong> {item.sku}</div>
        <div><strong>Warehouse ID:</strong> {item.warehouseId}</div>
        <div><strong>Quantity:</strong> {item.quantity} {item.quantity <= item.reorderLevel && <span className="text-sm text-red-600">(LOW STOCK)</span>}</div>
        <div><strong>Reorder Level:</strong> {item.reorderLevel}</div>
        <div><strong>Unit Price:</strong> ${item.unitPrice.toFixed(2)}</div>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => router.push(`/inventory/${id}/edit`)} className="px-3 py-1 bg-green-600 text-white rounded">Edit</button>
        <button onClick={() => router.back()} className="px-3 py-1 border rounded">Back</button>
      </div>
    </div>
  )
}
