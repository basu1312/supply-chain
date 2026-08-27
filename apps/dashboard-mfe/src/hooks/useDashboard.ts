import { useEffect, useState, useCallback } from 'react'
import dashboardService from '../services/dashboard.service'
import { DashboardMetrics } from 'apps/shell/src/types'

export default function useDashboard() {
  const [data, setData] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const metrics = await dashboardService.getDashboardMetrics()
      setData(metrics)
    } catch (e: any) {
      setError(e.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}
