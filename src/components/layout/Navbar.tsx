import { Link } from 'react-router-dom';
import { Shield, Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn' },
    { name: 'Tools', path: '/tools' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Resources', path: '/resources' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-dark border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-cyber-primary/20 rounded-lg group-hover:bg-cyber-primary/40 transition-colors">
                <Shield className="h-6 w-6 text-cyber-neon" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-cyber-neon transition-colors">
                Cyber<span className="text-cyber-primary">Shield</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-cyber-neon transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
              
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-300" />}
              </button>

              <Link to="/dashboard" className="text-gray-300 hover:text-cyber-neon transition-colors text-sm font-medium">
                Dashboard
              </Link>

              <Link to="/login" className="px-4 py-2 rounded-md bg-cyber-primary hover:bg-cyber-primary/80 text-white font-medium transition-colors text-sm">
                Sign In
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-300" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-dark absolute w-full border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="mt-4 block w-full text-center px-4 py-2 rounded-md bg-cyber-primary hover:bg-cyber-primary/80 text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
