
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { 
  FaTwitter, 
  FaHome, 
  FaHashtag, 
  FaBell, 
  FaUser, 
  FaSignOutAlt 
} from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Sidebar() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Successfully logged out')
      router.push('/')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="w-64 p-4 sticky top-0 h-screen">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center p-3 mb-6">
            <FaTwitter className="text-primary-blue text-3xl" />
          </div>
          
          <nav className="space-y-2">
            <Link href="/home" className="flex items-center p-3 rounded-full hover:bg-secondary-ultraLight transition-colors">
              <FaHome className="text-xl mr-4" />
              <span className="text-xl font-bold">Home</span>
            </Link>
            
            <Link href="/explore" className="flex items-center p-3 rounded-full hover:bg-secondary-ultraLight transition-colors">
              <FaHashtag className="text-xl mr-4" />
              <span className="text-xl font-bold">Explore</span>
            </Link>
            
            <Link href="/notifications" className="flex items-center p-3 rounded-full hover:bg-secondary-ultraLight transition-colors">
              <FaBell className="text-xl mr-4" />
              <span className="text-xl font-bold">Notifications</span>
            </Link>
            
            <Link href={`/profile/${user?.username}`} className="flex items-center p-3 rounded-full hover:bg-secondary-ultraLight transition-colors">
              <FaUser className="text-xl mr-4" />
              <span className="text-xl font-bold">Profile</span>
            </Link>
          </nav>
          
          <button className="btn-primary w-full mt-6">
            Tweet
          </button>
        </div>
        
        <div className="mb-4">
          {user && (
            <div className="flex items-center justify-between p-3 rounded-full hover:bg-secondary-ultraLight cursor-pointer">
              <div className="flex items-center">
                <img 
                  src={user.profileImageUrl || "https://via.placeholder.com/40"} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-secondary-dark">@{user.username}</p>
                </div>
              </div>
              <button onClick={handleLogout}>
                <FaSignOutAlt className="text-secondary-dark" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
