import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { users } from '../mock/db'
import cookie from 'cookie'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'
const ACCESS_TOKEN_EXPIRES_IN = '15m'
const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7 // seconds

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body || {}
    // In development only: accept "password" as the password for all users
    const user = users.find(u => u.email === email)
    if (!user || password !== 'password') {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }

    const accessToken = jwt.sign({ sub: user.id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })
    const refreshToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })

    // Set both access and refresh tokens as HttpOnly cookies
    const res = NextResponse.json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email, role: user.role } }, message: 'Logged in' })

    res.cookies.set('sc_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15 // 15 minutes
    })

    res.cookies.set('sc_refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth/refresh',
      maxAge: REFRESH_TOKEN_EXPIRES_IN
    })
    return res
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
