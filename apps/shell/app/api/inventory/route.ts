import { NextResponse } from 'next/server'
import { inventory } from '../../../src/mock/db'

export async function GET(req: Request) {
  return NextResponse.json({ success: true, data: inventory })
}

export async function POST(req: Request) {
  const body = await req.json()
  const newId = Math.max(...inventory.map(i => i.id), 0) + 1
  const created = { id: newId, ...body }
  inventory.push(created)
  return NextResponse.json({ success: true, data: created }, { status: 201 })
}
