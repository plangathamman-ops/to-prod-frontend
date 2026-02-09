import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiBriefcase } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import useAuthStore from '../context/authStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on home page as Home.jsx has its own navbar
  if (location.pathname === '/') {
    return null;
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
          : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                <FiBriefcase className="text-white text-xl" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  OpportunityHub
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/opportunities" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/opportunities') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Opportunities
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive('/dashboard') 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/my-applications" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive('/my-applications') 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  My Applications
                </Link>
                
                {/* User Menu */}
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.firstName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Logout"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="ml-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-fadeInUp">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/opportunities"
              className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                isActive('/opportunities') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Opportunities
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive('/dashboard') 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-applications"
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive('/my-applications') 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  My Applications
                </Link>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-4 py-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all w-full font-medium"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-semibold transition-all shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
