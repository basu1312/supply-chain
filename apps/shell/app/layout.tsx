"use client";

import './globals.css'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'

export const metadata = {
  title: 'Supply Chain Control Tower',
  description: 'Shell — Supply Chain Control Tower'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
