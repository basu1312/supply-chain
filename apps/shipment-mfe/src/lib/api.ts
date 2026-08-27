import axios from 'axios'

const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
const apiClient = axios.create({ baseURL: base, headers: { 'Content-Type': 'application/json' }, withCredentials: true })

let accessToken: string | null = null

const ensureToken = async () => {
  if (accessToken) return accessToken
  try {
    const res = await apiClient.post('/auth/refresh')
    accessToken = res.data?.data?.accessToken
    return accessToken
  } catch (e) {
    return null
  }
}

const authRequest = async (config: any) => {
  const token = await ensureToken()
  if (token) {
    config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
  }
  return apiClient.request(config)
}

export default {
  request: authRequest,
  get: (url: string, params?: any) => authRequest({ method: 'get', url, params }),
  post: (url: string, data?: any) => authRequest({ method: 'post', url, data }),
  put: (url: string, data?: any) => authRequest({ method: 'put', url, data }),
  delete: (url: string) => authRequest({ method: 'delete', url })
}
