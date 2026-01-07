'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Sparkles, LogOut, Clock, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function DashboardClient({ user, initialNewsletters }) {
  const [newsletters, setNewsletters] = useState(initialNewsletters)
  const [selectedNewsletter, setSelectedNewsletter] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-amber-900">
            <Sparkles className="w-7 h-7" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              NewsletterHub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-700 hidden md:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-amber-900/10 text-amber-900 rounded-full hover:bg-amber-900/20 transition-all flex items-center gap-2 border border-amber-900/20"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">Latest Newsletters</h1>
          <p className="text-amber-700 text-lg">Stay updated with our curated content</p>
        </div>

        {newsletters.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-amber-700 text-xl">No newsletters yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsletters.map((newsletter, idx) => (
              <div
                key={newsletter.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 overflow-hidden hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-300/50 hover:-translate-y-1"
              >
                {idx === 0 && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-xs font-semibold z-10 shadow-lg animate-pulse">
                    NEW
                  </div>
                )}

                <div className="p-6">
                  {newsletter.category && (
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200">
                        {newsletter.category}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-amber-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {newsletter.title}
                  </h3>
                  
                  {newsletter.excerpt && (
                    <p className="text-amber-700 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {newsletter.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-amber-600 mb-4">
                    {newsletter.read_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{newsletter.read_time}</span>
                      </div>
                    )}
                    <span>{formatDate(newsletter.created_at)}</span>
                  </div>

                  <button
                    onClick={() => setSelectedNewsletter(newsletter)}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-200/0 via-orange-200/0 to-yellow-200/0 group-hover:from-amber-200/50 group-hover:via-orange-200/30 group-hover:to-yellow-200/50 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Detail Modal */}
      {selectedNewsletter && (
        <div className="fixed inset-0 bg-amber-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="relative bg-gradient-to-br from-white/95 to-amber-50/95 rounded-3xl max-w-3xl w-full border border-amber-200 shadow-2xl my-8 max-h-[85vh] overflow-y-auto">
            <div className="p-8">
              <div className="sticky top-0 z-10 -mx-8 -mt-8 mb-6 px-8 pt-8 pb-4 bg-gradient-to-br from-white/95 to-amber-50/95">
                <div className="flex justify-between items-start">
                {selectedNewsletter.category && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200">
                    {selectedNewsletter.category}
                  </span>
                )}
                  <button
                    onClick={() => setSelectedNewsletter(null)}
                    className="text-amber-400 hover:text-amber-700 transition-colors text-2xl"
                    aria-label="Close newsletter"
                  >
                    X
                  </button>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-amber-900 mb-4">{selectedNewsletter.title}</h2>
              
              <div className="flex items-center gap-4 text-sm text-amber-700 mb-8 pb-8 border-b border-amber-200/60">
                {selectedNewsletter.read_time && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedNewsletter.read_time}</span>
                    </div>
                    <span>|</span>
                  </>
                )}
                <span>{formatDate(selectedNewsletter.created_at)}</span>
              </div>

              <ReactMarkdown
                className="prose max-w-none text-amber-900 text-lg leading-relaxed"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {selectedNewsletter.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
