"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import inventoryService from '../../../src/services/inventory.service'

export default function EditInventoryPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    inventoryService.getInventoryById(id).then(i => { if (mounted) setForm(i) }).catch(e => { if (mounted) setError(e.message) }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!form) return <div>Not found</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await inventoryService.updateInventory(id, form)
      router.push('/inventory')
    } catch (err: any) {
      setError(err.message || 'Failed')
    } finally { setSaving(false) }
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Inventory</h2>
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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
