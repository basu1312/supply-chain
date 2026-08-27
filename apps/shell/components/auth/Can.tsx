"use client";

import React from 'react'
import { useAuth } from '../../src/hooks/useAuth'
import { hasPermission } from '../../src/lib/permissions'

export default function Can({ permission, children, fallback = null }: { permission: string; children: React.ReactNode; fallback?: React.ReactNode }) {
  const { auth } = useAuth()
  const role = auth.user?.role as any

  const allowed = hasPermission(role, permission as any)

  return <>{allowed ? children : fallback}</>
}
