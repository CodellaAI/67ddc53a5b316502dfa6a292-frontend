
'use client'

import { createContext, useEffect, useState } from 'react'
import { checkAuthStatus, logout as logoutService } from '@/services/authService'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await checkAuthStatus()
        if (userData) {
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    const userData = await checkAuthStatus()
    setUser(userData)
    setIsAuthenticated(true)
    return userData
  }

  const logout = async () => {
    try {
      await logoutService()
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  const updateUser = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }))
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated, 
      login, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}
