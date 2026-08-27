"use client";

import React from 'react'

interface Column<T> {
  header: string
  accessor: (row: T) => React.ReactNode
}

export default function DataTable<T>({ data, columns, loading, emptyMessage = 'No data', actions }: { data: T[]; columns: Column<T>[]; loading?: boolean; emptyMessage?: string; actions?: (row: T) => React.ReactNode }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="px-4 py-2 text-left text-sm text-gray-600">{c.header}</th>
            ))}
            {actions && <th className="px-4 py-2 text-left text-sm text-gray-600">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length + (actions ? 1 : 0)} className="p-4">Loading...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length + (actions ? 1 : 0)} className="p-4">{emptyMessage}</td></tr>
          ) : (
            data.map((row: any, idx: number) => (
              <tr key={idx} className="border-t">
                {columns.map((c, i) => <td key={i} className="px-4 py-2 text-sm">{c.accessor(row)}</td>)}
                {actions && <td className="px-4 py-2">{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
