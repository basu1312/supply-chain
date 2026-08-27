import jwt from 'jsonwebtoken'
import { Role } from '../types'
import cookie from 'cookie'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

export interface TokenPayload {
  sub: number | string
  name?: string
  role?: Role
  iat?: number
  exp?: number
}

export const verifyAccessToken = (req: Request): TokenPayload => {
  // Try Authorization header first, then fallback to sc_access_token cookie
  const auth = req.headers.get('authorization') || ''
  let token: string | undefined
  if (auth.startsWith('Bearer ')) {
    token = auth.replace('Bearer ', '')
  } else {
    const cookieHeader = req.headers.get('cookie') || ''
    const parsed = cookie.parse(cookieHeader || '')
    token = parsed['sc_access_token']
  }

  if (!token) throw new Error('Missing Authorization')
  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload
    return payload
  } catch (e) {
    throw new Error('Invalid token')
  }
}
