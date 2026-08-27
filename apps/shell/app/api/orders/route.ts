import { NextResponse } from 'next/server'
import { orders } from '../../../src/mock/db'

export async function GET(req: Request) {
  return NextResponse.json({ success: true, data: orders })
}

export async function POST(req: Request) {
  const body = await req.json()
  const newId = Math.max(...orders.map(o => o.id), 0) + 1
  const created = { id: newId, ...body }
  orders.push(created)
  return NextResponse.json({ success: true, data: created }, { status: 201 })
}
