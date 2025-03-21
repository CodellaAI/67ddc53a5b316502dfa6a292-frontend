
'use client'

import { useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaLink } from 'react-icons/fa'
import { format } from 'date-fns'
import { useAuth } from '@/hooks/useAuth'
import { followUser, unfollowUser } from '@/services/userService'
import EditProfileModal from './EditProfileModal'

export default function ProfileHeader({ profile, isOwnProfile }) {
  const { user } = useAuth()
  const [isFollowing, setIsFollowing] = useState(
    user && profile.followers?.includes(user._id)
  )
  const [followerCount, setFollowerCount] = useState(profile.followerCount || 0)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleFollowAction = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(profile._id)
        setFollowerCount(prev => prev - 1)
      } else {
        await followUser(profile._id)
        setFollowerCount(prev => prev + 1)
      }
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error('Failed to follow/unfollow user:', error)
    }
  }

  const joinDate = profile.createdAt 
    ? format(new Date(profile.createdAt), 'MMMM yyyy')
    : 'Unknown'

  return (
    <div>
      <div className="h-48 bg-primary-blue relative">
        {profile.coverImageUrl && (
          <img 
            src={profile.coverImageUrl} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        )}
        
        <div className="absolute -bottom-16 left-4">
          <img 
            src={profile.profileImageUrl || "https://via.placeholder.com/128"} 
            alt={profile.name} 
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
      </div>
      
      <div className="pt-20 px-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p className="text-secondary-dark">@{profile.username}</p>
          </div>
          
          {isOwnProfile ? (
            <button 
              onClick={() => setShowEditModal(true)}
              className="btn-outline"
            >
              Edit profile
            </button>
          ) : (
            <button 
              onClick={handleFollowAction}
              className={isFollowing ? "btn-outline" : "btn-primary"}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
        
        {profile.bio && (
          <p className="mb-3">{profile.bio}</p>
        )}
        
        <div className="flex flex-wrap text-secondary-dark mb-3 gap-y-1">
          {profile.location && (
            <div className="flex items-center mr-4">
              <FaMapMarkerAlt className="mr-1" />
              <span>{profile.location}</span>
            </div>
          )}
          
          {profile.website && (
            <div className="flex items-center mr-4">
              <FaLink className="mr-1" />
              <a 
                href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-blue hover:underline"
              >
                {profile.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            <span>Joined {joinDate}</span>
          </div>
        </div>
        
        <div className="flex mb-4">
          <div className="mr-4">
            <span className="font-bold">{profile.followingCount || 0}</span>{' '}
            <span className="text-secondary-dark">Following</span>
          </div>
          <div>
            <span className="font-bold">{followerCount}</span>{' '}
            <span className="text-secondary-dark">Followers</span>
          </div>
        </div>
      </div>
      
      {showEditModal && (
        <EditProfileModal 
          profile={profile} 
          onClose={() => setShowEditModal(false)} 
        />
      )}
    </div>
  )
}
