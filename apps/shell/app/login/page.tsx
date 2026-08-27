"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../src/hooks/useAuth'

export default function LoginPage() {
  const { auth, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await signIn(email, password) as any
      if (res.error) {
        setError(res.error.message || 'Login failed')
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm">Email</label>
          <input required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full border rounded p-2" placeholder="email@example.com" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="mt-1 w-full border rounded p-2" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={auth.loading}>{auth.loading ? 'Signing in...' : 'Sign in'}</button>
        </div>
      </form>
    </div>
  )
}
