import { apiRequest, clearSession, saveSession } from './api.js'

export function registerUser(data) {
  return apiRequest('/auth/register', { method: 'POST', body: data })
}

export async function loginUser(credentials) {
  const response = await apiRequest('/auth/login', { method: 'POST', body: credentials })

  if (!response.token || !response.user) {
    throw new Error('La réponse de connexion est incomplète.')
  }

  saveSession(response)
  return response
}

export function logoutUser() {
  clearSession()
}
