"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../src/hooks/useAuth'

export default function Protected({ children }: { children: React.ReactNode }) {
  const { auth, tryRefresh } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not authenticated, try refresh. If still not authenticated, redirect to login.
    if (!auth.accessToken && !auth.loading) {
      tryRefresh().then((r: any) => {
        const stateAfter = (r && r.meta) ? true : false
        // If refresh did not populate token, redirect
        setTimeout(() => {
          if (!localStorage.getItem('sc_access_token')) {
            router.push('/login')
          }
        }, 200)
      }).catch(() => {
        router.push('/login')
      })
    }
  }, [])

  if (auth.loading && !auth.accessToken) {
    return <div className="p-6">Loading...</div>
  }

  if (!auth.accessToken) {
    return <div className="p-6">Redirecting to login...</div>
  }

  return <>{children}</>
}
