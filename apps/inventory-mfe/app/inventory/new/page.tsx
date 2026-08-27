"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import inventoryService from '../../src/services/inventory.service'

export default function NewInventoryPage() {
  const [form, setForm] = useState({ sku: '', productName: '', warehouseId: 1, quantity: 0, reorderLevel: 0, unitPrice: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await inventoryService.createInventory(form)
      router.push('/inventory')
    } catch (err: any) {
      setError(err.message || 'Failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Inventory Item</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">SKU</label>
          <input required value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Product Name</label>
          <input required value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })} className="mt-1 w-full border rounded p-2" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm">Warehouse ID</label>
            <input type="number" value={form.warehouseId} onChange={e => setForm({ ...form, warehouseId: Number(e.target.value) })} className="mt-1 w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm">Quantity</label>
            <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} className="mt-1 w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm">Reorder Level</label>
            <input type="number" value={form.reorderLevel} onChange={e => setForm({ ...form, reorderLevel: Number(e.target.value) })} className="mt-1 w-full border rounded p-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm">Unit Price</label>
          <input type="number" step="0.01" value={form.unitPrice} onChange={e => setForm({ ...form, unitPrice: Number(e.target.value) })} className="mt-1 w-full border rounded p-2" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex items-center gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
