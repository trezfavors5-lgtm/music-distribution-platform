'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Music } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Registration failed')
      }

      router.push('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-dark-900 rounded-lg border border-dark-200">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Music className="text-purple-600" size={32} />
          <h1 className="text-2xl font-bold">SoundVault</h1>
        </div>
        
        <h2 className="text-xl font-bold mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-900 text-red-100 rounded text-sm">{error}</div>}
          
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-dark-800 border border-dark-200 rounded" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-dark-800 border border-dark-200 rounded" required />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 bg-dark-800 border border-dark-200 rounded" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 bg-dark-800 border border-dark-200 rounded" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 bg-dark-800 border border-dark-200 rounded" required />

          <button type="submit" disabled={loading} className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-dark-200 mt-6">
          Have an account? <Link href="/login" className="text-purple-600">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
