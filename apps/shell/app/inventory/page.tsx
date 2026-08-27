import Protected from '../../components/auth/Protected'

export default function InventoryPage() {
  return (
    <Protected>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Inventory (Shell)</h1>
        <p className="text-gray-600">Inventory MFE placeholder</p>
      </div>
    </Protected>
  )
}
