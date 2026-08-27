import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getShipments } from '../../../src/services/shipment.service'
import { Shipment } from '../../types'

interface ShipmentState {
  items: Shipment[]
  page: number
  pageSize: number
  total: number
  loading: boolean
  error: string | null
}

const initialState: ShipmentState = {
  items: [],
  page: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  error: null
}

export const fetchShipments = createAsyncThunk('shipment/fetch', async ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) => {
  const res = await getShipments(page, pageSize)
  return res
})

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShipments.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShipments.fulfilled, (state, action: PayloadAction<{ items: Shipment[]; page: number; pageSize: number; total: number }>) => {
        state.items = action.payload.items
        state.page = action.payload.page
        state.pageSize = action.payload.pageSize
        state.total = action.payload.total
        state.loading = false
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch shipments'
      })
  }
})

export default shipmentSlice.reducer
