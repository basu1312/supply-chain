import { useEffect, useState, useCallback } from 'react'
import inventoryService from '../services/inventory.service'

export default function useInventory() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const items = await inventoryService.getInventory()
      setData(items)
    } catch (e: any) {
      setError(e.message || 'Failed')
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}
