import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useState } from 'react';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

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
            <div className="hidden md:flex items-center gap-6 text-gray-300">
              <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link to="/matches" className="hover:text-white transition-colors">Matches</Link>
              <Link to="/requests" className="hover:text-white transition-colors">Requests</Link>
              <span className="text-sm text-gray-400">👋 {user.name || 'User'}</span>
              <Button size="sm" variant="ghost" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                 <Button size="sm" variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                 <Button size="sm" variant="primary">Sign Up</Button>
              </Link>
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
                <span className="text-sm text-gray-400 px-2 py-1">👋 {user.name || 'User'}</span>
                <Button size="sm" variant="ghost" onClick={handleLogout} className="text-left">Logout</Button>
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
  );
};

export default Navbar;