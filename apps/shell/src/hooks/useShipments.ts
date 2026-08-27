import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchShipments } from '../store/slices/shipmentSlice'

export const useShipments = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((s: any) => s.shipment)

  const load = (page = 1, pageSize = 10) => dispatch(fetchShipments({ page, pageSize }))

  return { ...state, load }
}
