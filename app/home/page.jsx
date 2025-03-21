
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/layouts/MainLayout'
import TweetForm from '@/components/tweet/TweetForm'
import TweetList from '@/components/tweet/TweetList'
import { useAuth } from '@/hooks/useAuth'
import { fetchTimeline } from '@/services/tweetService'

export default function HomePage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [tweets, setTweets] = useState([])
  const [isLoadingTweets, setIsLoadingTweets] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    const loadTweets = async () => {
      if (isAuthenticated) {
        try {
          setIsLoadingTweets(true)
          const timelineTweets = await fetchTimeline()
          setTweets(timelineTweets)
        } catch (error) {
          console.error('Failed to fetch timeline:', error)
        } finally {
          setIsLoadingTweets(false)
        }
      }
    }

    loadTweets()
  }, [isAuthenticated])

  const handleNewTweet = (newTweet) => {
    setTweets([newTweet, ...tweets])
  }

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
        <h1 className="text-xl font-bold p-4 border-b">Home</h1>
        
        <TweetForm onTweetCreated={handleNewTweet} />
        
        {isLoadingTweets ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
          </div>
        ) : (
          <TweetList tweets={tweets} />
        )}
      </div>
    </MainLayout>
  )
}
