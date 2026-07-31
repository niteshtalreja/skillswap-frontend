import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const Navbar = () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-heading font-bold text-gradient">SWAP</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-gray-300">
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/matches" className="hover:text-white transition-colors">Matches</Link>
            <Link to="/requests" className="hover:text-white transition-colors">Requests</Link>
          </div>
          <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 hidden sm:block">👋 {user.name || 'User'}</span>
                <Button size="sm" variant="ghost" onClick={() => { localStorage.clear(); window.location.href = '/login' }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"><Button size="sm" variant="ghost">Login</Button></Link>
                <Link to="/register"><Button size="sm">Sign Up</Button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar