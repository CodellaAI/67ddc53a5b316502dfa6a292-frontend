
'use client'

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-secondary-dark" />
        </div>
        <input
          type="text"
          placeholder="Search Chirp"
          className="bg-secondary-extraLight w-full py-3 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-blue focus:bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  )
}
