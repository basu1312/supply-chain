"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import shipmentService from '../../services/shipment.service'

export default function EditPage({ params }: { params: { id: string } }) {
  const id = params.id
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    shipmentService.getShipmentById(Number(id)).then(s => { if (mounted) setForm(s) }).catch(e => { if (mounted) setError(e.message) }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!form) return <div>Not found</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await shipmentService.updateShipment(Number(id), form)
      router.push('/shipments')
    } catch (e: any) {
      setError(e.message || 'Failed')
    } finally { setSaving(false) }
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Shipment</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Tracking Number</label>
          <input required value={form.trackingNumber} onChange={e => setForm({ ...form, trackingNumber: e.target.value })} className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Origin</label>
          <input required value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Destination</label>
          <input required value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Carrier</label>
          <input value={form.carrier} onChange={e => setForm({ ...form, carrier: e.target.value })} className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Expected Delivery Date</label>
          <input type="datetime-local" value={form.expectedDeliveryDate ? new Date(form.expectedDeliveryDate).toISOString().slice(0,16) : ''} onChange={e => setForm({ ...form, expectedDeliveryDate: e.target.value })} className="mt-1 w-full border rounded p-2" />
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
