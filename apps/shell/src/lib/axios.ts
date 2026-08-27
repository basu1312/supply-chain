import axios, { AxiosError } from 'axios'
import { store } from '../store'
import { authSetUser } from '../store/slices/authSlice'

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000,
  withCredentials: true
})

let isRefreshing = false
let refreshCall: Promise<boolean> | null = null
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (err: any) => void; config: any }> = []

const processQueue = (error: any, ok = false) => {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error)
    } else {
      p.resolve(apiClient(p.config))
    }
  })
  failedQueue = []
}

apiClient.interceptors.request.use(
  config => {
    // cookies are sent automatically via withCredentials
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
          if (response.data && response.data.success) {
            // If refresh returned user info, update redux
            const user = response.data.data?.user
            if (user) {
              try { store.dispatch(authSetUser(user)) } catch (e) { /* ignore */ }
            }
            processQueue(null, true)
            return true
          }
          processQueue(new Error('Refresh failed'))
          return false
        } catch (refreshError) {
          processQueue(refreshError, false)
          return false
        } finally {
          isRefreshing = false
          refreshCall = null
        }
      })()

      const ok = await refreshCall
      if (ok) {
        return apiClient(originalConfig)
      }
    }

    return Promise.reject(err)
  }
)

export default apiClient
