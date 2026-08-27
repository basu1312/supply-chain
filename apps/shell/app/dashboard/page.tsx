import Protected from '../../components/auth/Protected'

export default function DashboardPage() {
  return (
    <Protected>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Dashboard (Shell)</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded shadow">KPI: Total Shipments</div>
          <div className="p-4 bg-white rounded shadow">KPI: Delivered</div>
          <div className="p-4 bg-white rounded shadow">KPI: In Transit</div>
          <div className="p-4 bg-white rounded shadow">KPI: Delayed</div>
        </div>
        <div className="mt-6 bg-white p-4 rounded shadow">Placeholder for charts / remote dashboard MFE</div>
      </div>
    </Protected>
  )
}
