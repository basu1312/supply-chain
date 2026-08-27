import { NextResponse } from 'next/server'
import { inventory } from '../../../src/mock/db'
import { verifyAccessToken } from '../../../src/lib/auth'
import { hasPermission } from '../../../src/lib/permissions'

export async function GET(req: Request) {
  try {
    const payload = verifyAccessToken(req)
    if (!hasPermission(payload.role, 'VIEW_INVENTORY')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: true, data: inventory })
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
    if (!hasPermission(payload.role, 'UPDATE_INVENTORY')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }
    const body = await req.json()
    const newId = Math.max(...inventory.map(i => i.id), 0) + 1
    const created = { id: newId, ...body }
    inventory.push(created)
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (e: any) {
    if (e.message === 'Missing Authorization' || e.message === 'Invalid token') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
