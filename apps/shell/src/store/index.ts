import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import shipmentReducer from './slices/shipmentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipment: shipmentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
