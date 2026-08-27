import api from '../lib/api'

export const getShipments = async (page = 1, pageSize = 10, search = '') => {
  const res = await api.get(`/shipments?page=${page}&pageSize=${pageSize}${search ? `&q=${encodeURIComponent(search)}` : ''}`)
  return res.data.data
}

export const getShipmentById = async (id: number) => {
  const res = await api.get(`/shipments/${id}`)
  return res.data.data
}

export const createShipment = async (payload: any) => {
  const res = await api.post('/shipments', payload)
  return res.data.data
}

export const updateShipment = async (id: number, payload: any) => {
  const res = await api.put(`/shipments/${id}`, payload)
  return res.data.data
}

export const deleteShipment = async (id: number) => {
  const res = await api.delete(`/shipments/${id}`)
  return res.data
}

export default { getShipments, getShipmentById, createShipment, updateShipment, deleteShipment }
