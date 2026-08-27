import axios from 'axios'
import { DashboardMetrics, ApiResponse } from 'apps/shell/src/types' // type import path — will be duplicated locally if needed

const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
const apiClient = axios.create({ baseURL: base, headers: { 'Content-Type': 'application/json' }, withCredentials: true })

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const res = await apiClient.get<ApiResponse<DashboardMetrics>>('/dashboard/metrics')
  if (!res.data || !res.data.success) throw new Error(res.data?.message || 'Failed to fetch metrics')
  return res.data.data as DashboardMetrics
}

export default { getDashboardMetrics }
