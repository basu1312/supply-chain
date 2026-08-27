import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { login as loginService, refresh as refreshService, logout as logoutService } from '../../../src/services/auth.service'
import { AuthState, User } from '../../types'
import { setAccessToken, clearAccessToken, getAccessToken } from '../../lib/tokenService'

const initialState: AuthState = {
  user: null,
  accessToken: getAccessToken(),
  loading: false,
  error: null
}

function parseJwt(token: string | null): User | null {
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    const json = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
    return { id: Number(json.sub), name: json.name, email: '', role: json.role }
  } catch (e) {
    return null
  }
}

export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  const tokens = await loginService(email, password)
  return tokens
})

export const refresh = createAsyncThunk('auth/refresh', async () => {
  const tokens = await refreshService()
  return tokens
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutService()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ accessToken: string }>) => {
        const token = action.payload.accessToken
        setAccessToken(token)
        state.accessToken = token
        state.user = parseJwt(token)
        state.loading = false
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      .addCase(refresh.fulfilled, (state, action: PayloadAction<{ accessToken: string }>) => {
        const token = action.payload.accessToken
        setAccessToken(token)
        state.accessToken = token
        state.user = parseJwt(token)
      })
      .addCase(logout.fulfilled, state => {
        clearAccessToken()
        state.accessToken = null
        state.user = null
      })
  }
})

export default authSlice.reducer
