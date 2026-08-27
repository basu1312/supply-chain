import { NextResponse } from 'next/server'
import { shipments } from '../../../../src/mock/db'
import { verifyAccessToken } from '../../../../src/lib/auth'
import { hasPermission } from '../../../../src/lib/permissions'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const payload = verifyAccessToken(req)
    if (!hasPermission(payload.role, 'VIEW_SHIPMENT')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const id = Number(params.id)
    const found = shipments.find(s => s.id === id)
    if (!found) return NextResponse.json({ success: false, message: 'Shipment not found', code: 'SHIPMENT_NOT_FOUND' }, { status: 404 })
    return NextResponse.json({ success: true, data: found })
  } catch (e: any) {
    if (e.message === 'Missing Authorization' || e.message === 'Invalid token') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const payload = verifyAccessToken(req)
    if (!hasPermission(payload.role, 'UPDATE_SHIPMENT')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const id = Number(params.id)
    const idx = shipments.findIndex(s => s.id === id)
    if (idx === -1) return NextResponse.json({ success: false, message: 'Shipment not found' }, { status: 404 })
    const body = await req.json()
    shipments[idx] = { ...shipments[idx], ...body }
    return NextResponse.json({ success: true, data: shipments[idx] })
  } catch (e: any) {
    if (e.message === 'Missing Authorization' || e.message === 'Invalid token') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const payload = verifyAccessToken(req)
    if (!hasPermission(payload.role, 'DELETE_SHIPMENT')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const id = Number(params.id)
    const idx = shipments.findIndex(s => s.id === id)
    if (idx === -1) return NextResponse.json({ success: false, message: 'Shipment not found' }, { status: 404 })
    shipments.splice(idx, 1)
    return NextResponse.json({ success: true, message: 'Deleted' }, { status: 204 })
  } catch (e: any) {
    if (e.message === 'Missing Authorization' || e.message === 'Invalid token') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
