
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import MainLayout from '@/components/layouts/MainLayout'
import TweetList from '@/components/tweet/TweetList'
import ProfileHeader from '@/components/profile/ProfileHeader'
import { getUserProfile, getUserTweets } from '@/services/userService'
import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [tweets, setTweets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setIsLoading(true)
        const profileData = await getUserProfile(username)
        const userTweets = await getUserTweets(username)
        
        setProfile(profileData)
        setTweets(userTweets)
      } catch (error) {
        console.error('Failed to load profile data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (username) {
      loadProfileData()
    }
  }, [username])

  const isOwnProfile = user && profile && user._id === profile._id

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
        </div>
      </MainLayout>
    )
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-xl font-bold">User not found</h1>
          <p>The user you're looking for doesn't exist or has been removed.</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <ProfileHeader 
          profile={profile} 
          isOwnProfile={isOwnProfile} 
        />
        
        <div className="border-b border-secondary-extraLight">
          <div className="flex">
            <button className="flex-1 py-4 font-bold text-center border-b-2 border-primary-blue text-primary-blue">
              Tweets
            </button>
            <button className="flex-1 py-4 font-medium text-center text-secondary-dark">
              Likes
            </button>
          </div>
        </div>
        
        <TweetList tweets={tweets} />
      </div>
    </MainLayout>
  )
}
