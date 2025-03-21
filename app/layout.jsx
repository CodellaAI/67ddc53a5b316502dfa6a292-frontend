
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/auth/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chirp Social - Connect and Share',
  description: 'A modern social media platform for sharing thoughts and connecting with others',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-secondary-ultraLight`}>
        <AuthProvider>
          {children}
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  )
}
