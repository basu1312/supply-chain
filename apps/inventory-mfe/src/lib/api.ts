import api from '../lib/api'

const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
const apiClient = api // reuse same pattern as shipment MFE: this app uses a small api helper

export default apiClient
