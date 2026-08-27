import Protected from '../../components/auth/Protected'

export default function ShipmentsPage() {
  return (
    <Protected>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Shipments (Shell)</h1>
        <p className="text-gray-600">Shipment MFE will be loaded here in Phase 10. For now this is a placeholder.</p>
      </div>
    </Protected>
  )
}
