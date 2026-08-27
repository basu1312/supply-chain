import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { users } from '../../../../src/mock/db'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'
const ACCESS_TOKEN_EXPIRES_IN = '15m'

export async function POST(req: Request) {
  try {
    const refreshToken = req.cookies.get('sc_refresh_token')?.value
    if (!refreshToken) return NextResponse.json({ success: false, message: 'No refresh token' }, { status: 401 })

    try {
      const payload: any = jwt.verify(refreshToken, JWT_SECRET)
      const user = users.find(u => u.id === Number(payload.sub))
      if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 })
      const accessToken = jwt.sign({ sub: user.id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })

      const res = NextResponse.json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email, role: user.role } } })
      res.cookies.set('sc_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15
      })
      return res
    } catch (e) {
      return NextResponse.json({ success: false, message: 'Invalid refresh token' }, { status: 401 })
    }
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
