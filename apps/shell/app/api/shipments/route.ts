import { NextResponse } from 'next/server'
import { shipments } from '../../../src/mock/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get('page') || '1')
  const pageSize = Number(url.searchParams.get('pageSize') || '10')
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = shipments.slice(start, end)
  const total = shipments.length
  return NextResponse.json({ success: true, data: { items, page, pageSize, total } })
}

export async function POST(req: Request) {
  const body = await req.json()
  const newId = Math.max(...shipments.map(s => s.id), 0) + 1
  const created = { id: newId, ...body }
  shipments.push(created)
  return NextResponse.json({ success: true, data: created }, { status: 201 })
}
