const ACCESS_TOKEN_KEY = 'sc_access_token'

export const setAccessToken = (token: string) => {
  try {
    // Store in memory if available, fallback to localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token)
    }
  } catch (e) {
    // ignore
  }
}

export const getAccessToken = (): string | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(ACCESS_TOKEN_KEY)
    }
  } catch (e) {
    // ignore
  }
  return null
}

export const clearAccessToken = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
  } catch (e) {
    // ignore
  }
}
