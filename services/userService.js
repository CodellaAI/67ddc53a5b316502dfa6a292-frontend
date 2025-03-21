
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getUserProfile = async (username) => {
  const response = await axios.get(`${API_URL}/api/users/${username}`, {
    withCredentials: true
  })
  return response.data
}

export const getUserTweets = async (username, page = 1, limit = 20) => {
  const response = await axios.get(`${API_URL}/api/users/${username}/tweets?page=${page}&limit=${limit}`, {
    withCredentials: true
  })
  return response.data
}

export const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/api/users/profile`, profileData, {
    withCredentials: true
  })
  return response.data
}

export const followUser = async (userId) => {
  const response = await axios.post(`${API_URL}/api/users/${userId}/follow`, {}, {
    withCredentials: true
  })
  return response.data
}

export const unfollowUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/api/users/${userId}/follow`, {
    withCredentials: true
  })
  return response.data
}

export const getSuggestedUsers = async (limit = 3) => {
  const response = await axios.get(`${API_URL}/api/users/suggestions?limit=${limit}`, {
    withCredentials: true
  })
  return response.data
}

export const getFollowers = async (username, page = 1, limit = 20) => {
  const response = await axios.get(`${API_URL}/api/users/${username}/followers?page=${page}&limit=${limit}`, {
    withCredentials: true
  })
  return response.data
}

export const getFollowing = async (username, page = 1, limit = 20) => {
  const response = await axios.get(`${API_URL}/api/users/${username}/following?page=${page}&limit=${limit}`, {
    withCredentials: true
  })
  return response.data
}
