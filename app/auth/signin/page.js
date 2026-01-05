'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { LogIn } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-200 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-amber-200/50 rounded-2xl mb-4">
              <LogIn className="w-8 h-8 text-amber-700" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-2">Welcome Back</h2>
            <p className="text-amber-700">Sign in to continue reading</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSignIn()}
                className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSignIn()}
                className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/auth/signup" className="text-amber-700 hover:text-amber-800 transition-colors font-medium">
              Don't have an account? Sign up
            </Link>
          </div>

          <Link href="/" className="mt-4 block text-center py-2 text-amber-600 hover:text-amber-800 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}