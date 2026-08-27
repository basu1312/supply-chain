import { useAppDispatch, useAppSelector } from '../store/hooks'
import { login, logout, refresh } from '../store/slices/authSlice'
import type { AuthState } from '../types'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((s: any) => s.auth as AuthState)

  const signIn = async (email: string, password: string) => {
    return dispatch(login({ email, password }))
  }

  const signOut = async () => {
    return dispatch(logout())
  }

  const tryRefresh = async () => {
    return dispatch(refresh())
  }

  return { auth, signIn, signOut, tryRefresh }
}
