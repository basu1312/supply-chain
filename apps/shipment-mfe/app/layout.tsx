"use client";

import './globals.css'
import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Shipment MFE — Supply Chain Control Tower',
  description: 'Shipment MFE'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
            <div className="text-lg font-bold">Shipment MFE</div>
            <nav className="space-x-4">
              <Link href="/" className="text-sm text-gray-700">Home</Link>
              <Link href="/shipments" className="text-sm text-gray-700">Shipments</Link>
            </nav>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
