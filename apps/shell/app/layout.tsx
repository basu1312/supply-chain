"use client";

import './globals.css'
import React from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { Provider } from 'react-redux'
import { store } from '../src/store'

export const metadata = {
  title: 'Supply Chain Control Tower',
  description: 'Shell — Supply Chain Control Tower'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1">
              <Header />
              <main className="p-6">{children}</main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  )
}
