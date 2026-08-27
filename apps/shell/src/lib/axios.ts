import axios, { AxiosError } from 'axios'
import { getAccessToken, setAccessToken, clearAccessToken } from './tokenService'

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
})

let isRefreshing = false
let refreshCall: Promise<string | null> | null = null
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (err: any) => void; config: any }> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error)
    } else {
      if (token) {
        p.config.headers['Authorization'] = `Bearer ${token}`
      }
      p.resolve(apiClient(p.config))
    }
  })
  failedQueue = []
}

apiClient.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

apiClient.interceptors.response.use(
  res => res,
  async (err: AxiosError & { config?: any }) => {
    const originalConfig = err.config
    if (!originalConfig) return Promise.reject(err)

    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalConfig })
        })
      }

      originalConfig._retry = true
      isRefreshing = true
      refreshCall = (async () => {
        try {
          const response = await axios.post('/api/auth/refresh', {}, { withCredentials: true })
          const { accessToken } = response.data || {}
          if (accessToken) {
            setAccessToken(accessToken)
            processQueue(null, accessToken)
            return accessToken
          }
          processQueue(new Error('Refresh failed'))
          return null
        } catch (refreshError) {
          processQueue(refreshError, null)
          clearAccessToken()
          return null
        } finally {
          isRefreshing = false
          refreshCall = null
        }
      })()

      const newToken = await refreshCall
      if (newToken) {
        originalConfig.headers['Authorization'] = `Bearer ${newToken}`
        return apiClient(originalConfig)
      }
    }

    return Promise.reject(err)
  }
)

export default apiClient
