export const setAccessToken = (_token: string) => {
  // No-op: access token is stored as HttpOnly cookie by the server in production
}

export const getAccessToken = (): string | null => {
  return null
}

export const clearAccessToken = () => {
  // No-op
}
