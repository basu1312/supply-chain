import { NextResponse } from 'next/server'
import { shipments } from '../../../../src/mock/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const found = shipments.find(s => s.id === id)
  if (!found) return NextResponse.json({ success: false, message: 'Shipment not found', code: 'SHIPMENT_NOT_FOUND' }, { status: 404 })
  return NextResponse.json({ success: true, data: found })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const idx = shipments.findIndex(s => s.id === id)
  if (idx === -1) return NextResponse.json({ success: false, message: 'Shipment not found' }, { status: 404 })
  const body = await req.json()
  shipments[idx] = { ...shipments[idx], ...body }
  return NextResponse.json({ success: true, data: shipments[idx] })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const idx = shipments.findIndex(s => s.id === id)
  if (idx === -1) return NextResponse.json({ success: false, message: 'Shipment not found' }, { status: 404 })
  shipments.splice(idx, 1)
  return NextResponse.json({ success: true, message: 'Deleted' }, { status: 204 })
}
