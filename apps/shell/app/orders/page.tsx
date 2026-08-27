import Protected from '../../components/auth/Protected'

export default function OrdersPage() {
  return (
    <Protected>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Orders (Shell)</h1>
        <p className="text-gray-600">Orders MFE placeholder</p>
      </div>
    </Protected>
  )
}
