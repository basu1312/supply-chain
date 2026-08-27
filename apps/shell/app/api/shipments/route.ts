import { NextResponse } from 'next/server'
import { shipments } from '../../../src/mock/db'
import { verifyAccessToken } from '../../../src/lib/auth'
import { hasPermission } from '../../../src/lib/permissions'

export async function GET(req: Request) {
  try {
    const payload = verifyAccessToken(req)
    if (!hasPermission(payload.role, 'VIEW_SHIPMENT')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(req.url)
    const page = Number(url.searchParams.get('page') || '1')
    const pageSize = Number(url.searchParams.get('pageSize') || '10')
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = shipments.slice(start, end)
    const total = shipments.length
    return NextResponse.json({ success: true, data: { items, page, pageSize, total } })
  } catch (e: any) {
    if (e.message === 'Missing Authorization' || e.message === 'Invalid token') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const payload = verifyAccessToken(req)
    if (!hasPermission(payload.role, 'CREATE_SHIPMENT')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }
    const body = await req.json()
    const newId = Math.max(...shipments.map(s => s.id), 0) + 1
    const created = { id: newId, ...body }
    shipments.push(created)
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (e: any) {
    if (e.message === 'Missing Authorization' || e.message === 'Invalid token') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
