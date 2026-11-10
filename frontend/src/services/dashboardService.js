import { apiRequest } from './api.js'

export const getDashboardStats = () => apiRequest('/dashboard/stats')
