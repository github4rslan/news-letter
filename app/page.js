import Link from 'next/link'
import { Mail, Sparkles, Clock, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-200 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        {/* Header */}
        <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-amber-900">
            <Sparkles className="w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              NewsletterHub
            </span>
          </div>
          <Link
            href="/auth/signin"
            className="px-6 py-2.5 bg-amber-900/10 backdrop-blur-sm text-amber-900 rounded-full hover:bg-amber-900/20 transition-all duration-300 flex items-center gap-2 border border-amber-900/20"
          >
            Sign In
          </Link>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-amber-200/50 backdrop-blur-sm rounded-full border border-amber-300/50">
            <span className="text-amber-800 text-sm font-medium">✨ Curated insights, delivered beautifully</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-amber-900 mb-6 leading-tight">
            Your Premium
            <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Newsletter Collection
            </span>
          </h1>
          
          <p className="text-xl text-amber-800 mb-12 max-w-2xl mx-auto leading-relaxed">
            Access exclusive insights, stories, and updates crafted just for you. 
            Sign up to unlock a world of curated content.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="group px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center gap-2 text-lg font-semibold"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-4 bg-amber-900/10 backdrop-blur-sm text-amber-900 rounded-full hover:bg-amber-900/20 transition-all duration-300 border border-amber-900/20 text-lg font-semibold"
            >
              Sign In
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-24 text-left">
            {[
              { icon: Mail, title: "Curated Content", desc: "Hand-picked newsletters with the best insights" },
              { icon: Sparkles, title: "Beautiful Design", desc: "Elegant reading experience on any device" },
              { icon: Clock, title: "Always Updated", desc: "New content delivered as it's published" }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-200 hover:bg-white/80 transition-all duration-300 group hover:shadow-lg">
                <feature.icon className="w-10 h-10 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-amber-900 text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-amber-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}