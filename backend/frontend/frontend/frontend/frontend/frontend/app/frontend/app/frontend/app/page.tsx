'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Music } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-purple-900 to-dark-950">
      <nav className="border-b border-dark-200 bg-dark-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Music className="text-purple-600" size={32} />
            <span className="text-2xl font-bold">SoundVault</span>
          </div>
          <div className="space-x-4">
            <Link href="/login" className="px-6 py-2 hover:text-purple-400">Sign In</Link>
            <Link href="/register" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Distribute Your Music Globally</h1>
        <p className="text-xl text-dark-200 mb-8 max-w-2xl mx-auto">Get your tracks on Spotify, Apple Music, Amazon Music, and 100+ platforms. Build your fanbase. Earn royalties.</p>
        <Link href="/register" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">Start Free</Link>
      </div>
    </div>
  )
}
