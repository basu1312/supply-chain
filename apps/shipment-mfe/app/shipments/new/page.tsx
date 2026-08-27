"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import shipmentService from '../src/services/shipment.service'

export default function NewShipmentPage() {
  const [form, setForm] = useState({ trackingNumber: '', status: 'PENDING', origin: '', destination: '', carrier: '', expectedDeliveryDate: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await shipmentService.createShipment(form as any)
      router.push('/shipments')
    } catch (err: any) {
      setError(err.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Shipment</h2>
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
          <input type="datetime-local" value={form.expectedDeliveryDate} onChange={e => setForm({ ...form, expectedDeliveryDate: e.target.value })} className="mt-1 w-full border rounded p-2" />
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
