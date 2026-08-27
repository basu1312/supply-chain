import api from '../lib/api'

export const getInventory = async () => {
  const res = await api.get('/inventory')
  return res.data.data
}

export const getInventoryById = async (id: number) => {
  const res = await api.get(`/inventory/${id}`)
  return res.data.data
}

export const createInventory = async (payload: any) => {
  const res = await api.post('/inventory', payload)
  return res.data.data
}

export const updateInventory = async (id: number, payload: any) => {
  const res = await api.put(`/inventory/${id}`, payload)
  return res.data.data
}

export const deleteInventory = async (id: number) => {
  const res = await api.delete(`/inventory/${id}`)
  return res.data
}

export default { getInventory, getInventoryById, createInventory, updateInventory, deleteInventory }
