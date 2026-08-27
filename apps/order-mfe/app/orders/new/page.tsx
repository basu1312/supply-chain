"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import orderService from '../src/services/order.service'

export default function NewOrderPage() {
  const [form, setForm] = useState({ orderNumber: '', customer: '', items: [{ sku: '', quantity: 1, unitPrice: 0 }] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const updateItem = (idx: number, key: string, value: any) => {
    const items = [...form.items]
    items[idx] = { ...items[idx], [key]: value }
    setForm({ ...form, items })
  }

  const addItem = () => setForm({ ...form, items: [...form.items, { sku: '', quantity: 1, unitPrice: 0 }] })
  const removeItem = (idx: number) => setForm({ ...form, items: form.items.filter((_, i) => i !== idx) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await orderService.createOrder(form)
      router.push('/orders')
    } catch (err: any) {
      setError(err.message || 'Failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Order</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Order Number</label>
          <input required value={form.orderNumber} onChange={e => setForm({ ...form, orderNumber: e.target.value })} className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Customer</label>
          <input required value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Items</div>
            <button type="button" onClick={addItem} className="px-2 py-1 border rounded">Add Item</button>
          </div>
          <div className="space-y-2 mt-2">
            {form.items.map((it, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-2">
                <input required placeholder="SKU" value={it.sku} onChange={e => updateItem(idx, 'sku', e.target.value)} className="border p-2 rounded" />
                <input type="number" min={1} value={it.quantity} onChange={e => updateItem(idx, 'quantity', Number(e.target.value))} className="border p-2 rounded" />
                <input type="number" step="0.01" value={it.unitPrice} onChange={e => updateItem(idx, 'unitPrice', Number(e.target.value))} className="border p-2 rounded" />
                <button type="button" onClick={() => removeItem(idx)} className="text-red-600">Remove</button>
              </div>
            ))}
          </div>
        </div>

        {error && <div className="text-red-600">{error}</div>}
        <div className="flex items-center gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
