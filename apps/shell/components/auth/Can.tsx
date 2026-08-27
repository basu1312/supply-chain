"use client";

import React from 'react'
import { useAuth } from '../../src/hooks/useAuth'

export default function Can({ permission, children, fallback = null }: { permission: string; children: React.ReactNode; fallback?: React.ReactNode }) {
  const { auth } = useAuth()
  const role = auth.user?.role

  // Simple permission mapping for Phase 4: expand in Phase 5 to a full permission map
  const allowed = (() => {
    if (!role) return false
    if (permission.startsWith('VIEW')) return true
    if (permission.startsWith('CREATE') || permission.startsWith('UPDATE')) return role === 'ADMIN' || role === 'MANAGER'
    if (permission.startsWith('DELETE')) return role === 'ADMIN'
    return false
  })()

  return <>{allowed ? children : fallback}</>
}
