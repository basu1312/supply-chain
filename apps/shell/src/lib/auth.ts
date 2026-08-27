import jwt from 'jsonwebtoken'
import { Role } from '../types'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

export interface TokenPayload {
  sub: number | string
  name?: string
  role?: Role
  iat?: number
  exp?: number
}

export const verifyAccessToken = (req: Request): TokenPayload => {
  const auth = req.headers.get('authorization') || ''
  if (!auth.startsWith('Bearer ')) throw new Error('Missing Authorization')
  const token = auth.replace('Bearer ', '')
  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload
    return payload
  } catch (e) {
    throw new Error('Invalid token')
  }
}
