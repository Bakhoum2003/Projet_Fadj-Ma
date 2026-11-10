import { apiRequest } from './api.js'

export const getMedicines = () => apiRequest('/medicines')
export const createMedicine = (data) => apiRequest('/medicines', { method: 'POST', body: data })
export const updateMedicine = (id, data) => apiRequest(`/medicines/${id}`, { method: 'PUT', body: data })
export const deleteMedicine = (id) => apiRequest(`/medicines/${id}`, { method: 'DELETE' })
