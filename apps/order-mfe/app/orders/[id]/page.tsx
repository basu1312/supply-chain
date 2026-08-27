"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import orderService from '../src/services/order.service'

export default function OrderDetails({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const id = Number(params.id)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    orderService.getOrderById(id).then(o => { if (mounted) setOrder(o) }).catch(e => { if (mounted) setError(e.message) }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!order) return <div>Not found</div>

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Order {order.orderNumber}</h2>
      <div className="space-y-2">
        <div><strong>Status:</strong> {order.status}</div>
        <div><strong>Customer:</strong> {order.customer}</div>
        <div><strong>Items:</strong>
          <ul className="ml-4 list-disc">
            {order.items.map((it: any, idx: number) => (
              <li key={idx}>{it.sku} — {it.quantity} × ${it.unitPrice.toFixed(2)}</li>
            ))}
          </ul>
        </div>
        <div><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</div>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => router.push(`/orders/${id}/edit`)} className="px-3 py-1 bg-green-600 text-white rounded">Edit</button>
        <button onClick={() => router.back()} className="px-3 py-1 border rounded">Back</button>
      </div>
    </div>
  )
}
