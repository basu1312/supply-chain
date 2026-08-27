import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="text-lg font-bold">Supply Chain Control Tower</div>
      <nav className="space-x-4">
        <Link href="/dashboard" className="text-sm text-gray-700">Dashboard</Link>
        <Link href="/shipments" className="text-sm text-gray-700">Shipments</Link>
        <Link href="/inventory" className="text-sm text-gray-700">Inventory</Link>
        <Link href="/orders" className="text-sm text-gray-700">Orders</Link>
      </nav>
    </header>
  )
}
