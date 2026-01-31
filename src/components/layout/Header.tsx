'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Search, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Places', path: '/places' },
    { name: 'Festivals', path: '/festivals' },
    { name: 'Plan Trip', path: '/planner' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FFF8F0]/80 border-b border-[#E65100]/10">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* ================= Logo ================= */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-16 h-16">
            <img
              src="/logo/icon.png"
              alt="Braj Darshan Logo"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <span className="font-serif text-xl font-bold text-[#E65100] tracking-tight">
            Braj
            <span className="text-blue-900">Darshan</span>
          </span>
        </Link>

        {/* ================= Desktop Nav ================= */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="relative text-sm font-medium text-[#2B2B2B] transition-colors
                         after:absolute after:-bottom-1 after:left-0 after:h-0.5
                         after:w-0 after:bg-linear-to-r after:from-[#E65100] after:to-orange-400
                         after:transition-all hover:after:w-full hover:text-[#E65100]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ================= Desktop Actions ================= */}
        <div className="hidden md:flex items-center gap-3">
          <button
            aria-label="Search"
            className="p-2 rounded-full text-[#2B2B2B] hover:bg-[#E65100]/10 transition-colors"
          >
            <Search size={20} />
          </button>

          <Link
            href="/admin"
            aria-label="Login"
            className="p-2 rounded-full text-[#2B2B2B] hover:bg-[#E65100]/10 transition-colors"
          >
            <User size={20} />
          </Link>

          <button
            onClick={() => router.push('/booking')}
            className="ml-2 px-5 py-2 rounded-full font-medium text-sm
                       bg-linear-to-r from-[#E65100] to-orange-500
                       text-white shadow-sm hover:shadow-md transition-all"
          >
            Begin Yatra
          </button>
        </div>

        {/* ================= Mobile Toggle ================= */}
        <button
          className="md:hidden p-2 text-[#2B2B2B]"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ================= Mobile Menu ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden bg-[#FFF8F0] border-b border-[#E65100]/10"
          >
            <nav className="flex flex-col p-5 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-[#2B2B2B] py-2 border-b border-black/5"
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-[#2B2B2B] font-medium"
                >
                  <User size={18} />
                  Login / Admin
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false)
                    router.push('/planner')
                  }}
                  className="w-full py-3 rounded-xl font-bold
                             bg-linear-to-r from-[#E65100] to-orange-500
                             text-white shadow-md"
                >
                  Begin Yatra
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
