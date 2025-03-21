
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const searchContent = async (query, type = 'all', page = 1, limit = 20) => {
  const response = await axios.get(
    `${API_URL}/api/search?q=${query}&type=${type}&page=${page}&limit=${limit}`, 
    { withCredentials: true }
  )
  return response.data
}

export const getExploreContent = async (page = 1, limit = 20) => {
  const response = await axios.get(
    `${API_URL}/api/explore?page=${page}&limit=${limit}`, 
    { withCredentials: true }
  )
  return response.data
}

export const getTrends = async (limit = 5) => {
  const response = await axios.get(
    `${API_URL}/api/trends?limit=${limit}`, 
    { withCredentials: true }
  )
  return response.data
}
