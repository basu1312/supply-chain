import Protected from '../../../components/auth/Protected'

export default function ShipmentDetailsPage({ params }: { params: { id: string } }) {
  return (
    <Protected>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Shipment {params.id}</h1>
        <p>Details placeholder</p>
      </div>
    </Protected>
  )
}
