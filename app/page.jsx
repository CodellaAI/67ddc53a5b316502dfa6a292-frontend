
import { redirect } from 'next/navigation'
import LandingPage from '@/components/landing/LandingPage'

export default function Home() {
  // If the user is logged in, redirect to /home
  // This is a placeholder, actual auth check will be done in client components
  
  return (
    <main>
      <LandingPage />
    </main>
  )
}
