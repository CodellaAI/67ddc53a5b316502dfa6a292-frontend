
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { FaImage, FaSmile } from 'react-icons/fa'
import { createTweet } from '@/services/tweetService'
import { toast } from 'react-toastify'

export default function TweetForm({ onTweetCreated }) {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)
  
  const MAX_CHARS = 280
  
  const handleContentChange = (e) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      setContent(text)
      setCharCount(text.length)
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      return
    }
    
    try {
      setIsLoading(true)
      const newTweet = await createTweet({ content })
      setContent('')
      setCharCount(0)
      
      if (onTweetCreated) {
        onTweetCreated(newTweet)
      }
      
      toast.success('Tweet posted!')
    } catch (error) {
      console.error('Failed to create tweet:', error)
      toast.error('Failed to post tweet')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="border-b border-secondary-extraLight p-4">
      <div className="flex">
        <img 
          src={user?.profileImageUrl || "https://via.placeholder.com/48"} 
          alt={user?.name} 
          className="w-12 h-12 rounded-full mr-4"
        />
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="What's happening?"
              className="w-full resize-none border-none focus:outline-none text-xl mb-4"
              rows="3"
              value={content}
              onChange={handleContentChange}
              disabled={isLoading}
            />
            
            <div className="flex items-center justify-between border-t border-secondary-extraLight pt-3">
              <div className="flex space-x-2 text-primary-blue">
                <button type="button" className="p-2 rounded-full hover:bg-primary-blue/10">
                  <FaImage />
                </button>
                <button type="button" className="p-2 rounded-full hover:bg-primary-blue/10">
                  <FaSmile />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`text-sm ${charCount > MAX_CHARS * 0.8 ? 'text-yellow-500' : 'text-secondary-dark'}`}>
                  {charCount}/{MAX_CHARS}
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary px-5"
                  disabled={isLoading || !content.trim() || charCount > MAX_CHARS}
                >
                  {isLoading ? 'Posting...' : 'Tweet'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
