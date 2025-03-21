
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { updateProfile } from '@/services/userService'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'

export default function EditProfileModal({ profile, onClose }) {
  const { updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: profile.name || '',
      bio: profile.bio || '',
      location: profile.location || '',
      website: profile.website || '',
    }
  })
  
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const updatedProfile = await updateProfile(data)
      updateUser(updatedProfile)
      toast.success('Profile updated successfully')
      onClose()
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary-ultraLight">
              <FaTimes />
            </button>
            <h2 className="font-bold text-xl ml-4">Edit profile</h2>
          </div>
          <button 
            onClick={handleSubmit(onSubmit)} 
            className="btn-primary py-1 px-4"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
        
        <form className="p-4">
          <div className="h-48 bg-primary-blue relative rounded-xl mb-16">
            {profile.coverImageUrl && (
              <img 
                src={profile.coverImageUrl} 
                alt="Cover" 
                className="w-full h-full object-cover rounded-xl"
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
          
          <div className="space-y-4 mt-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="input-field"
                {...register('name', { 
                  required: 'Name is required',
                  maxLength: {
                    value: 50,
                    message: 'Name cannot exceed 50 characters'
                  }
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                rows="3"
                className="input-field resize-none"
                {...register('bio', { 
                  maxLength: {
                    value: 160,
                    message: 'Bio cannot exceed 160 characters'
                  }
                })}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="input-field"
                {...register('location', { 
                  maxLength: {
                    value: 30,
                    message: 'Location cannot exceed 30 characters'
                  }
                })}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                id="website"
                type="text"
                className="input-field"
                {...register('website', { 
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message: 'Please enter a valid URL'
                  }
                })}
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
