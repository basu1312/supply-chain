import { NextResponse } from 'next/server'
import { calculateMetrics } from '../../../src/mock/db'

export async function GET(req: Request) {
  const metrics = calculateMetrics()
  return NextResponse.json({ success: true, data: metrics })
}
