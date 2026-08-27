import { NextResponse } from 'next/server'
import { calculateMetrics } from '../../../src/mock/db'
import { verifyAccessToken } from '../../../src/lib/auth'
import { hasPermission } from '../../../src/lib/permissions'

export async function GET(req: Request) {
  try {
    const payload = verifyAccessToken(req)
    if (!hasPermission(payload.role, 'VIEW_DASHBOARD')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }
    const metrics = calculateMetrics()
    return NextResponse.json({ success: true, data: metrics })
  } catch (e: any) {
    if (e.message === 'Missing Authorization' || e.message === 'Invalid token') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
