
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaTwitter } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/home')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="bg-primary-blue md:w-1/2 flex justify-center items-center p-10">
        <FaTwitter className="text-white text-9xl" />
      </div>
      
      <div className="md:w-1/2 flex flex-col justify-center p-10">
        <FaTwitter className="text-primary-blue text-5xl mb-10" />
        
        <h1 className="text-5xl font-bold mb-8">Happening now</h1>
        <h2 className="text-3xl font-bold mb-8">Join Chirp today.</h2>
        
        <div className="space-y-4 max-w-sm">
          <Link href="/auth/signup" className="btn-primary block text-center">
            Sign up with email
          </Link>
          
          <div className="flex items-center">
            <div className="flex-1 border-t border-secondary-light"></div>
            <span className="px-4 text-secondary-dark">or</span>
            <div className="flex-1 border-t border-secondary-light"></div>
          </div>
          
          <p className="font-bold">Already have an account?</p>
          <Link href="/auth/signin" className="btn-outline block text-center">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
