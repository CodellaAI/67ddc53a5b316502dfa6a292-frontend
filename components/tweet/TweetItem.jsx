
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { FaRegComment, FaRetweet, FaRegHeart, FaHeart, FaShare } from 'react-icons/fa'
import { likeTweet, unlikeTweet, retweet } from '@/services/tweetService'
import { useAuth } from '@/hooks/useAuth'

export default function TweetItem({ tweet }) {
  const { user } = useAuth()
  const [likes, setLikes] = useState(tweet.likes?.length || 0)
  const [isLiked, setIsLiked] = useState(
    user && tweet.likes?.includes(user._id)
  )
  const [retweetCount, setRetweetCount] = useState(tweet.retweetCount || 0)
  const [isRetweeted, setIsRetweeted] = useState(
    user && tweet.retweetedBy?.includes(user._id)
  )

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikeTweet(tweet._id)
        setLikes(prev => prev - 1)
      } else {
        await likeTweet(tweet._id)
        setLikes(prev => prev + 1)
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Failed to like/unlike tweet:', error)
    }
  }

  const handleRetweet = async () => {
    try {
      await retweet(tweet._id)
      if (!isRetweeted) {
        setRetweetCount(prev => prev + 1)
      }
      setIsRetweeted(true)
    } catch (error) {
      console.error('Failed to retweet:', error)
    }
  }

  const formattedDate = formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })

  return (
    <div className="p-4 border-b border-secondary-extraLight hover:bg-secondary-ultraLight transition-colors">
      {tweet.isRetweet && (
        <div className="flex items-center text-secondary-dark text-sm mb-2 ml-6">
          <FaRetweet className="mr-2" />
          <span>{tweet.retweetedBy?.username || 'Someone'} retweeted</span>
        </div>
      )}
      
      <div className="flex">
        <Link href={`/profile/${tweet.user.username}`} className="flex-shrink-0 mr-3">
          <img 
            src={tweet.user.profileImageUrl || "https://via.placeholder.com/48"} 
            alt={tweet.user.name} 
            className="w-12 h-12 rounded-full"
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            <Link href={`/profile/${tweet.user.username}`} className="font-bold hover:underline mr-1">
              {tweet.user.name}
            </Link>
            <Link href={`/profile/${tweet.user.username}`} className="text-secondary-dark hover:underline mr-1">
              @{tweet.user.username}
            </Link>
            <span className="text-secondary-dark">·</span>
            <span className="text-secondary-dark ml-1">{formattedDate}</span>
          </div>
          
          <p className="mb-3 whitespace-pre-wrap">{tweet.content}</p>
          
          {tweet.image && (
            <div className="mb-3 rounded-2xl overflow-hidden">
              <img src={tweet.image} alt="Tweet media" className="w-full h-auto" />
            </div>
          )}
          
          <div className="flex justify-between max-w-md text-secondary-dark">
            <button className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500">
                <FaRegComment />
              </div>
              <span className="ml-1">{tweet.commentCount || 0}</span>
            </button>
            
            <button 
              className={`flex items-center group ${isRetweeted ? 'text-green-500' : ''}`}
              onClick={handleRetweet}
            >
              <div className="p-2 rounded-full group-hover:bg-green-50 group-hover:text-green-500">
                <FaRetweet />
              </div>
              <span className="ml-1">{retweetCount}</span>
            </button>
            
            <button 
              className={`flex items-center group ${isLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <div className="p-2 rounded-full group-hover:bg-red-50 group-hover:text-red-500">
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </div>
              <span className="ml-1">{likes}</span>
            </button>
            
            <button className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500">
                <FaShare />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
