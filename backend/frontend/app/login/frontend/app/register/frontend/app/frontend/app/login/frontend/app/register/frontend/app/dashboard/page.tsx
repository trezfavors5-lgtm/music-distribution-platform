'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Music } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setStats(data.stats)
        setUser(JSON.parse(localStorage.getItem('user') || '{}'))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-dark-950">
      <header className="bg-dark-900 border-b border-dark-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Music className="text-purple-600" size={32} />
            <h1 className="text-2xl font-bold">SoundVault</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded hover:bg-dark-800">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold">Welcome back, {user?.name}</h2>
          <p className="text-dark-200">Here's your music distribution overview</p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-dark-900 border border-dark-200 rounded-lg p-6">
              <h3 className="text-dark-200 text-sm font-medium mb-2">Total Releases</h3>
              <p className="text-3xl font-bold">{stats.totalReleases}</p>
            </div>
            <div className="bg-dark-900 border border-dark-200 rounded-lg p-6">
              <h3 className="text-dark-200 text-sm font-medium mb-2">Total Streams</h3>
              <p className="text-3xl font-bold">{stats.totalStreams.toLocaleString()}</p>
            </div>
            <div className="bg-dark-900 border border-dark-200 rounded-lg p-6">
              <h3 className="text-dark-200 text-sm font-medium mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-dark-900 border border-dark-200 rounded-lg p-6">
              <h3 className="text-dark-200 text-sm font-medium mb-2">Per Stream</h3>
              <p className="text-3xl font-bold">${stats.averageRevenuePerStream}</p>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/releases" className="bg-dark-900 border border-dark-200 rounded-lg p-6 hover:border-purple-600 cursor-pointer">
            <h3 className="text-lg font-bold mb-2">📦 My Releases</h3>
            <p className="text-dark-200">Manage your uploaded music</p>
          </a>
          <a href="/distribute" className="bg-dark-900 border border-dark-200 rounded-lg p-6 hover:border-purple-600 cursor-pointer">
            <h3 className="text-lg font-bold mb-2">🌍 Distribute</h3>
            <p className="text-dark-200">Send to DSPs worldwide</p>
          </a>
          <a href="/analytics" className="bg-dark-900 border border-dark-200 rounded-lg p-6 hover:border-purple-600 cursor-pointer">
            <h3 className="text-lg font-bold mb-2">📊 Analytics</h3>
            <p className="text-dark-200">View your statistics</p>
          </a>
        </div>
      </main>
    </div>
  )
}
