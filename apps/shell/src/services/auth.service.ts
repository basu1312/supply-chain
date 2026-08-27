import apiClient from '../lib/axios'
import { ApiResponse, AuthTokens } from '../types'

export const login = async (email: string, password: string): Promise<AuthTokens> => {
  const resp = await apiClient.post<ApiResponse<AuthTokens>>('/auth/login', { email, password }, { withCredentials: true })
  if (!resp.data || !resp.data.success) throw new Error(resp.data?.message || 'Login failed')
  return resp.data.data as AuthTokens
}

export const refresh = async (): Promise<AuthTokens> => {
  const resp = await apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', {}, { withCredentials: true })
  if (!resp.data || !resp.data.success) throw new Error(resp.data?.message || 'Refresh failed')
  return resp.data.data as AuthTokens
}

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout', {}, { withCredentials: true })
}
