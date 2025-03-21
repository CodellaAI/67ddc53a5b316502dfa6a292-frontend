
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layouts/MainLayout'
import NotificationItem from '@/components/notifications/NotificationItem'
import { getNotifications, markAllAsRead } from '@/services/notificationService'
import { useAuth } from '@/hooks/useAuth'

export default function NotificationsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    const loadNotifications = async () => {
      if (isAuthenticated) {
        try {
          setIsLoadingNotifications(true)
          const data = await getNotifications()
          setNotifications(data)
          
          // Mark all as read when the page loads
          await markAllAsRead()
        } catch (error) {
          console.error('Failed to fetch notifications:', error)
        } finally {
          setIsLoadingNotifications(false)
        }
      }
    }

    loadNotifications()
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold p-4 border-b">Notifications</h1>
        
        {isLoadingNotifications ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
          </div>
        ) : notifications.length > 0 ? (
          <div>
            {notifications.map((notification) => (
              <NotificationItem key={notification._id} notification={notification} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-secondary-dark text-lg mb-2">No notifications yet</p>
            <p className="text-secondary-light text-sm">When you get notifications, they'll show up here</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
