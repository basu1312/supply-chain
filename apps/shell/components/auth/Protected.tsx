"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../src/hooks/useAuth'

export default function Protected({ children }: { children: React.ReactNode }) {
  const { auth, tryRefresh } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not authenticated, try refresh. If still not authenticated, redirect to login.
    if (!auth.user && !auth.loading) {
      tryRefresh().then((r: any) => {
        // after refresh, if still no user, redirect
        setTimeout(() => {
          if (!auth.user) {
            router.push('/login')
          }
        }, 200)
      }).catch(() => {
        router.push('/login')
      })
    }
  }, [])

  if (auth.loading && !auth.user) {
    return <div className="p-6">Loading...</div>
  }

  if (!auth.user) {
    return <div className="p-6">Redirecting to login...</div>
  }

  return <>{children}</>
}
