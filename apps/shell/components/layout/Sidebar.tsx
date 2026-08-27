import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-6 border-r min-h-screen">
      <div className="mb-8">
        <div className="font-semibold">User</div>
        <div className="text-sm text-gray-600">Anonymous</div>
      </div>
      <ul className="space-y-3">
        <li><Link href="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-200">Dashboard</Link></li>
        <li><Link href="/shipments" className="block py-2 px-3 rounded hover:bg-gray-200">Shipments</Link></li>
        <li><Link href="/inventory" className="block py-2 px-3 rounded hover:bg-gray-200">Inventory</Link></li>
        <li><Link href="/orders" className="block py-2 px-3 rounded hover:bg-gray-200">Orders</Link></li>
      </ul>
    </aside>
  )
}
