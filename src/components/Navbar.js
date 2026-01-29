import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '../logo/final.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Vehicles', path: '/browse' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800"
    >
      <div className="container-elegant">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src={logoImage} 
                alt="LivinLease" 
                className="w-12 h-12 rounded-xl object-cover shadow-elegant group-hover:shadow-elegant-md transition-all duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">LivinLease</span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-wider uppercase">Premium Rentals</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300"
                >
                  <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 card-minimal"
                    >
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-3 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User size={16} className="mr-3" />
                          Dashboard
                        </Link>
                        {user.isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-3 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User size={16} className="mr-3" />
                            Admin Panel
                          </Link>
                        )}
                        <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 text-sm hover:bg-error-50 dark:hover:bg-error-900/20 hover:text-error-600 dark:hover:text-error-400 rounded-lg transition-colors"
                        >
                          <LogOut size={16} className="mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-neutral-400 hover:text-white font-medium px-6 py-3 rounded-2xl transition-all duration-300 hover:bg-neutral-800/50"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-white hover:bg-neutral-100 text-black font-semibold px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-8 space-y-6 border-t border-neutral-200 dark:border-neutral-800"
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={item.path} 
                      className="block text-lg font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex items-center justify-end pt-6 border-t border-neutral-200 dark:border-neutral-800">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <Link 
                      to="/dashboard" 
                      className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-4 py-2 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700" 
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="bg-white hover:bg-neutral-100 text-black font-semibold px-4 py-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link 
                      to="/login" 
                      className="bg-neutral-800/50 hover:bg-neutral-700/50 text-white font-medium px-4 py-2 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-neutral-700/30" 
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-white hover:bg-neutral-100 text-black font-semibold px-4 py-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl" 
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

