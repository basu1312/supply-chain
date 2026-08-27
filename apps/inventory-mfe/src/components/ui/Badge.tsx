"use client";

import React from 'react'

export default function Badge({ children, color = 'gray' }: { children: React.ReactNode; color?: string }) {
  const bg = color === 'red' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bg}`}>{children}</span>
}
