import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, User, LogOut, ChevronDown, LayoutDashboard,
  Car, Calendar, MessageCircle, Heart, Settings, Store
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '../logo/final.jpg';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Vehicles', path: '/browse' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/80 shadow-elegant-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-elegant">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <img src={logoImage} alt="LivinLease" className="w-10 h-10 rounded-xl object-cover shadow-elegant group-hover:shadow-elegant-md transition-all duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-semibold text-neutral-100 tracking-tight">LivinLease</span>
              <span className="text-[10px] text-neutral-500 font-medium tracking-widest uppercase">Premium Rentals</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <Link key={item.name} to={item.path}
                className={`relative text-sm font-medium transition-colors duration-200 py-1 group ${
                  isActive(item.path) ? 'text-neutral-100' : 'text-neutral-400 hover:text-neutral-100'
                }`}>
                {item.name}
                <span className={`absolute bottom-0 left-0 h-px bg-neutral-100 transition-all duration-300 ${
                  isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setShowUserMenu(v => !v)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 transition-all duration-200">
                  <div className="w-7 h-7 bg-gradient-to-br from-primary-700 to-secondary-600 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {(user.name || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-neutral-200 max-w-[100px] truncate">{user.name || user.email?.split('@')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-elegant-xl overflow-hidden z-20 py-1.5"
                      >
                        {[
                          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                          { to: '/bookings', icon: Calendar, label: 'My Bookings' },
                          { to: '/messages', icon: MessageCircle, label: 'Messages' },
                          { to: '/wishlist', icon: Heart, label: 'Wishlist' },
                        ].map(item => (
                          <Link key={item.to} to={item.to} onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 transition-colors">
                            <item.icon className="w-4 h-4 text-neutral-500" />{item.label}
                          </Link>
                        ))}
                        {(user.isSeller || user.isAdmin) && (
                          <Link to="/seller/dashboard" onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 transition-colors">
                            <Store className="w-4 h-4 text-neutral-500" />Seller Dashboard
                          </Link>
                        )}
                        {!user.isSeller && !user.isAdmin && (
                          <Link to="/seller/apply" onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 transition-colors">
                            <Car className="w-4 h-4 text-neutral-500" />Become a Seller
                          </Link>
                        )}
                        {user.isAdmin && (
                          <Link to="/admin" onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 transition-colors">
                            <Settings className="w-4 h-4 text-neutral-500" />Admin Panel
                          </Link>
                        )}
                        <div className="my-1 border-t border-neutral-800" />
                        <Link to="/profile" onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 transition-colors">
                          <User className="w-4 h-4 text-neutral-500" />Profile
                        </Link>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-error-400 hover:bg-error-900/20 transition-colors">
                          <LogOut className="w-4 h-4" />Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-neutral-400 hover:text-neutral-100 px-4 py-2.5 rounded-xl hover:bg-neutral-800/50 transition-all duration-200">
                  Sign In
                </Link>
                <Link to="/signup" className="text-sm font-semibold bg-neutral-100 hover:bg-white text-neutral-900 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-elegant hover:shadow-elegant-md hover:-translate-y-px">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setIsOpen(v => !v)}
            className="lg:hidden p-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/50 transition-all duration-200">
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5 text-neutral-200" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5 text-neutral-200" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-neutral-800/60"
            >
              <div className="py-6 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div key={item.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link to={item.path} onClick={() => setIsOpen(false)}
                      className={`block px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive(item.path) ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50'
                      }`}>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 border-t border-neutral-800 flex gap-3">
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-xl transition-colors border border-neutral-700">
                        Dashboard
                      </Link>
                      <button onClick={() => { handleLogout(); setIsOpen(false); }}
                        className="flex-1 py-2.5 bg-neutral-100 hover:bg-white text-neutral-900 text-sm font-semibold rounded-xl transition-colors">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-xl transition-colors border border-neutral-700">
                        Sign In
                      </Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-2.5 bg-neutral-100 hover:bg-white text-neutral-900 text-sm font-semibold rounded-xl transition-colors">
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
