
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSuggestedUsers } from '@/services/userService'
import { getTrends } from '@/services/searchService'

export default function RightSidebar() {
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [trends, setTrends] = useState([])
  
  useEffect(() => {
    const loadSidebarData = async () => {
      try {
        const [usersData, trendsData] = await Promise.all([
          getSuggestedUsers(),
          getTrends()
        ])
        
        setSuggestedUsers(usersData)
        setTrends(trendsData)
      } catch (error) {
        console.error('Failed to load sidebar data:', error)
      }
    }
    
    loadSidebarData()
  }, [])

  return (
    <div className="w-80 p-4 sticky top-0 h-screen overflow-y-auto">
      <div className="bg-secondary-ultraLight rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-xl mb-4">Trends for you</h2>
        
        {trends.map((trend, index) => (
          <div key={index} className="py-3 hover:bg-secondary-extraLight rounded-lg px-2 cursor-pointer">
            <p className="text-secondary-dark text-sm">Trending in {trend.location}</p>
            <p className="font-bold">{trend.topic}</p>
            <p className="text-secondary-dark text-sm">{trend.tweetCount} Tweets</p>
          </div>
        ))}
        
        <Link href="/explore" className="text-primary-blue hover:underline block mt-2">
          Show more
        </Link>
      </div>
      
      <div className="bg-secondary-ultraLight rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4">Who to follow</h2>
        
        {suggestedUsers.map((user) => (
          <Link 
            key={user._id} 
            href={`/profile/${user.username}`}
            className="flex items-center justify-between py-3 hover:bg-secondary-extraLight rounded-lg px-2"
          >
            <div className="flex items-center">
              <img 
                src={user.profileImageUrl || "https://via.placeholder.com/40"} 
                alt={user.name} 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-secondary-dark">@{user.username}</p>
              </div>
            </div>
            
            <button className="btn-outline py-1 px-3 text-sm">
              Follow
            </button>
          </Link>
        ))}
        
        <Link href="/explore" className="text-primary-blue hover:underline block mt-2">
          Show more
        </Link>
      </div>
    </div>
  )
}
