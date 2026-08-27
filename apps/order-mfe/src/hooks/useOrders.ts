import { useEffect, useState, useCallback } from 'react'
import orderService from '../services/order.service'

export default function useOrders() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const items = await orderService.getOrders()
      setData(items)
    } catch (e: any) {
      setError(e.message || 'Failed')
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}
