
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getNotifications = async (page = 1, limit = 20) => {
  const response = await axios.get(`${API_URL}/api/notifications?page=${page}&limit=${limit}`, {
    withCredentials: true
  })
  return response.data
}

export const markAsRead = async (notificationId) => {
  const response = await axios.put(`${API_URL}/api/notifications/${notificationId}/read`, {}, {
    withCredentials: true
  })
  return response.data
}

export const markAllAsRead = async () => {
  const response = await axios.put(`${API_URL}/api/notifications/read-all`, {}, {
    withCredentials: true
  })
  return response.data
}

export const getUnreadCount = async () => {
  const response = await axios.get(`${API_URL}/api/notifications/unread-count`, {
    withCredentials: true
  })
  return response.data.count
}
