import api from '../lib/api'

export const getOrders = async () => {
  const res = await api.get('/orders')
  return res.data.data
}

export const getOrderById = async (id: number) => {
  const res = await api.get(`/orders/${id}`)
  return res.data.data
}

export const createOrder = async (payload: any) => {
  const res = await api.post('/orders', payload)
  return res.data.data
}

export const updateOrder = async (id: number, payload: any) => {
  const res = await api.put(`/orders/${id}`, payload)
  return res.data.data
}

export const deleteOrder = async (id: number) => {
  const res = await api.delete(`/orders/${id}`)
  return res.data
}

export default { getOrders, getOrderById, createOrder, updateOrder, deleteOrder }
