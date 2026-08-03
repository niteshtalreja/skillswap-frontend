import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { useState, useEffect, useRef } from 'react'

const Navbar = () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  // Click outside dropdown close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-heading font-bold text-gradient">SWAP</span>
          </Link>

          {/* Desktop Nav */}
          {token ? (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/matches" className="text-gray-300 hover:text-white transition-colors">Matches</Link>
              <Link to="/requests" className="text-gray-300 hover:text-white transition-colors">Requests</Link>
              
              {/* ✅ Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                  <span className="text-sm">{user.name || 'User'}</span>
                  <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-xl border border-white/10 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        👤 My Profile
                      </Link>
                      <Link
                        to="/profile/edit"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        ✏️ Edit Profile
                      </Link>
                      <hr className="border-white/5 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login"><Button size="sm" variant="ghost">Login</Button></Link>
              <Link to="/register"><Button size="sm">Sign Up</Button></Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            {token ? (
              <div className="flex flex-col gap-3 text-gray-300">
                <Link to="/dashboard" className="hover:text-white transition-colors px-2 py-1">Dashboard</Link>
                <Link to="/matches" className="hover:text-white transition-colors px-2 py-1">Matches</Link>
                <Link to="/requests" className="hover:text-white transition-colors px-2 py-1">Requests</Link>
                <Link to="/profile" className="hover:text-white transition-colors px-2 py-1">My Profile</Link>
                <Link to="/profile/edit" className="hover:text-white transition-colors px-2 py-1">Edit Profile</Link>
                <Button size="sm" variant="ghost" onClick={handleLogout} className="text-left text-red-400">Logout</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login"><Button size="sm" variant="ghost" className="w-full">Login</Button></Link>
                <Link to="/register"><Button size="sm" className="w-full">Sign Up</Button></Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar