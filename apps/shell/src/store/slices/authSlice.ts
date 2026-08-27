import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { login as loginService, refresh as refreshService, logout as logoutService } from '../../../src/services/auth.service'
import { AuthState, User } from '../../types'

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null
}

export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  const data = await loginService(email, password)
  return data
})

export const refresh = createAsyncThunk('auth/refresh', async () => {
  const data = await refreshService()
  return data
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutService()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSetUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user
        state.loading = false
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      .addCase(refresh.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
        state.accessToken = null
      })
  }
})

export const { authSetUser } = authSlice.actions
export default authSlice.reducer
