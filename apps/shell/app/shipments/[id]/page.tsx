export default function ShipmentDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Shipment {params.id}</h1>
      <p>Details placeholder</p>
    </div>
  )
}
