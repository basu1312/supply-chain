"use client";

import React from 'react'

export default function Button({ children, onClick, className = '', disabled = false }: { children: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`px-3 py-1 rounded ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
      {children}
    </button>
  )
}
