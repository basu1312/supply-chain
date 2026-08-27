"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import shipmentService from '../services/shipment.service'
import DataTable from './data-table/DataTable'
import useDebounce from '../hooks/useDebounce'
import usePagination from '../hooks/usePagination'
import Link from 'next/link'

export default function ShipmentsList() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search, 500)
  const { page, setPage, pageSize } = usePagination()
  const [total, setTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    shipmentService.getShipments(page, pageSize, debounced).then((res: any) => {
      if (!mounted) return
      setItems(res.items)
      setTotal(res.total)
    }).catch((e: any) => {
      setError(e.message || 'Failed to fetch')
    }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [page, pageSize, debounced])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this shipment?')) return
    try {
      await shipmentService.deleteShipment(id)
      setItems(it => it.filter(i => i.id !== id))
    } catch (e: any) {
      alert(e.message || 'Failed to delete')
    }
  }

  const columns = [
    { header: 'Tracking', accessor: (r: any) => r.trackingNumber },
    { header: 'Status', accessor: (r: any) => r.status },
    { header: 'Origin', accessor: (r: any) => r.origin },
    { header: 'Destination', accessor: (r: any) => r.destination },
    { header: 'Expected', accessor: (r: any) => new Date(r.expectedDeliveryDate).toLocaleDateString() }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input placeholder="Search shipments" value={search} onChange={e => setSearch(e.target.value)} className="border p-2 rounded" />
          <button onClick={() => router.push('/shipments/new')} className="bg-blue-600 text-white px-3 py-1 rounded">Create</button>
        </div>
        <div>Page {page} / {Math.max(1, Math.ceil(total / pageSize))}</div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <DataTable data={items} columns={columns} loading={loading} actions={(row: any) => (
        <div className="flex gap-2">
          <Link href={`/shipments/${row.id}`} className="text-blue-600">View</Link>
          <Link href={`/shipments/${row.id}/edit`} className="text-green-600">Edit</Link>
          <button onClick={() => handleDelete(row.id)} className="text-red-600">Delete</button>
        </div>
      )} />

      <div className="flex items-center gap-2">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
        <button onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  )
}
