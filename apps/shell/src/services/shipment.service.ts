import apiClient from '../lib/axios'
import { Shipment, Pagination, ApiResponse } from '../types'

export const getShipments = async (page = 1, pageSize = 10): Promise<Pagination<Shipment>> => {
  const res = await apiClient.get<ApiResponse<Pagination<Shipment>>>('/shipments?page=' + page + '&pageSize=' + pageSize)
  if (!res.data || !res.data.success) throw new Error(res.data?.message || 'Failed to fetch shipments')
  return res.data.data as Pagination<Shipment>
}

export const getShipmentById = async (id: number): Promise<Shipment> => {
  const res = await apiClient.get<ApiResponse<Shipment>>(`/shipments/${id}`)
  if (!res.data || !res.data.success) throw new Error(res.data?.message || 'Failed to fetch shipment')
  return res.data.data as Shipment
}

export const createShipment = async (payload: Partial<Shipment>): Promise<Shipment> => {
  const res = await apiClient.post<ApiResponse<Shipment>>('/shipments', payload)
  if (!res.data || !res.data.success) throw new Error(res.data?.message || 'Create failed')
  return res.data.data as Shipment
}

export const updateShipment = async (id: number, payload: Partial<Shipment>): Promise<Shipment> => {
  const res = await apiClient.put<ApiResponse<Shipment>>(`/shipments/${id}`, payload)
  if (!res.data || !res.data.success) throw new Error(res.data?.message || 'Update failed')
  return res.data.data as Shipment
}

export const deleteShipment = async (id: number): Promise<void> => {
  await apiClient.delete(`/shipments/${id}`)
}
