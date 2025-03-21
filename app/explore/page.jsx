
'use client'

import { useEffect, useState } from 'react'
import MainLayout from '@/components/layouts/MainLayout'
import TweetList from '@/components/tweet/TweetList'
import SearchBar from '@/components/common/SearchBar'
import { getExploreContent, searchContent } from '@/services/searchService'

export default function ExplorePage() {
  const [content, setContent] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadExploreContent = async () => {
      try {
        setIsLoading(true)
        const exploreData = await getExploreContent()
        setContent(exploreData)
      } catch (error) {
        console.error('Failed to load explore content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadExploreContent()
  }, [])

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      try {
        setIsLoading(true)
        const results = await searchContent(query)
        setContent(results)
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setIsLoading(false)
      }
    } else {
      // If search is cleared, load explore content again
      const exploreData = await getExploreContent()
      setContent(exploreData)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 bg-white z-10 p-2">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <h1 className="text-xl font-bold p-4 border-b">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Explore'}
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
          </div>
        ) : (
          <TweetList tweets={content} />
        )}
      </div>
    </MainLayout>
  )
}
