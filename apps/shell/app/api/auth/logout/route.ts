import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const res = NextResponse.json({ success: true })
  // clear cookie
  res.cookies.set('sc_refresh_token', '', { httpOnly: true, maxAge: 0, path: '/api/auth/refresh' })
  return res
}
