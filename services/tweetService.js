
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const createTweet = async (tweetData) => {
  const response = await axios.post(`${API_URL}/api/tweets`, tweetData, {
    withCredentials: true
  })
  return response.data
}

export const fetchTimeline = async (page = 1, limit = 20) => {
  const response = await axios.get(`${API_URL}/api/tweets/timeline?page=${page}&limit=${limit}`, {
    withCredentials: true
  })
  return response.data
}

export const getTweet = async (tweetId) => {
  const response = await axios.get(`${API_URL}/api/tweets/${tweetId}`, {
    withCredentials: true
  })
  return response.data
}

export const likeTweet = async (tweetId) => {
  const response = await axios.post(`${API_URL}/api/tweets/${tweetId}/like`, {}, {
    withCredentials: true
  })
  return response.data
}

export const unlikeTweet = async (tweetId) => {
  const response = await axios.delete(`${API_URL}/api/tweets/${tweetId}/like`, {
    withCredentials: true
  })
  return response.data
}

export const retweet = async (tweetId) => {
  const response = await axios.post(`${API_URL}/api/tweets/${tweetId}/retweet`, {}, {
    withCredentials: true
  })
  return response.data
}

export const unretweet = async (tweetId) => {
  const response = await axios.delete(`${API_URL}/api/tweets/${tweetId}/retweet`, {
    withCredentials: true
  })
  return response.data
}

export const replyToTweet = async (tweetId, content) => {
  const response = await axios.post(`${API_URL}/api/tweets/${tweetId}/reply`, { content }, {
    withCredentials: true
  })
  return response.data
}

export const deleteTweet = async (tweetId) => {
  const response = await axios.delete(`${API_URL}/api/tweets/${tweetId}`, {
    withCredentials: true
  })
  return response.data
}
