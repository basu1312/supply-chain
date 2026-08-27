"use client";

import React from 'react'

interface Props {
  title: string
  value: number | string
}

export default function KpiCard({ title, value }: Props) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
