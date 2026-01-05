'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { UserPlus } from 'lucide-react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      setSuccess('Please confirm your email to activate your account. Check your inbox and follow the verification link.')
      setPassword('')
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
              <UserPlus className="w-8 h-8 text-amber-700" />
            </div>
            <h2 className="text-3xl font-bold text-amber-900 mb-2">Create Account</h2>
            <p className="text-amber-700">Sign up to start reading</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSignUp()}
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
                onKeyPress={(e) => e.key === 'Enter' && handleSignUp()}
                className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/auth/signin" className="text-amber-700 hover:text-amber-800 transition-colors font-medium">
              Already have an account? Sign in
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
