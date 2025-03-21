
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials, {
    withCredentials: true
  })
  return response.data
}

export const logout = async () => {
  const response = await axios.post(`${API_URL}/api/auth/logout`, {}, {
    withCredentials: true
  })
  return response.data
}

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/me`, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    return null
  }
}
