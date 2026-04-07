import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar, Car, Heart, Star, ArrowRight, ChevronRight,
  Clock, CheckCircle, AlertCircle, XCircle, TrendingUp,
  User, Settings, MessageCircle, Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { bookingServices } from '../firebase/services';
import MetaTags from '../components/SEO/MetaTags';

/* ─── helpers ─────────────────────────────────────────────────────────── */
const staggerChild = (i) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 26, delay: i * 0.08 },
});

const getStatusStyle = (status) => {
  switch (status) {
    case 'confirmed': return { icon: CheckCircle, cls: 'text-accent-400', bg: 'bg-accent-900/20 border-accent-800/40', label: 'Confirmed' };
    case 'pending': return { icon: Clock, cls: 'text-secondary-400', bg: 'bg-secondary-900/20 border-secondary-800/40', label: 'Pending' };
    case 'cancelled': return { icon: XCircle, cls: 'text-error-400', bg: 'bg-error-900/20 border-error-800/40', label: 'Cancelled' };
    case 'completed': return { icon: CheckCircle, cls: 'text-primary-400', bg: 'bg-primary-900/20 border-primary-800/40', label: 'Completed' };
    default: return { icon: AlertCircle, cls: 'text-neutral-400', bg: 'bg-neutral-800/40 border-neutral-700/40', label: status };
  }
};

/* ─── Quick Action Card ─────────────────────────────────────────────────── */
const QuickActionCard = ({ icon: Icon, title, desc, to, color, index }) => (
  <motion.div {...staggerChild(index)}>
    <Link to={to} className="group block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-1 hover:shadow-elegant-lg transition-all duration-300">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm mb-0.5">{title}</h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed">{desc}</p>
      <div className="mt-3 flex items-center gap-1 text-xs text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
        Go <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  </motion.div>
);

/* ─── Stat Card ─────────────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, number, label, color, index }) => (
  <motion.div {...staggerChild(index)}>
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{number}</div>
        <div className="text-xs text-neutral-500 dark:text-neutral-500">{label}</div>
      </div>
    </div>
  </motion.div>
);

/* ─── Dashboard ─────────────────────────────────────────────────────────── */
const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ upcoming: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) { setLoading(false); return; }
      try {
        const result = await bookingServices.getUserBookings(user.id);
        if (result.success) {
          const data = result.data || [];
          setBookings(data.slice(0, 5));
          setStats({
            upcoming: data.filter(b => b.status === 'confirmed').length,
            completed: data.filter(b => b.status === 'completed').length,
            pending: data.filter(b => b.status === 'pending').length,
          });
        }
      } catch (err) {
        console.error('Failed to load bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const firstName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Rider';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const statCards = [
    { icon: Calendar, number: stats.upcoming, label: 'Upcoming Bookings', color: 'bg-gradient-to-br from-blue-600 to-blue-700' },
    { icon: CheckCircle, number: stats.completed, label: 'Completed Trips', color: 'bg-gradient-to-br from-emerald-600 to-emerald-700' },
    { icon: Clock, number: stats.pending, label: 'Pending Approval', color: 'bg-gradient-to-br from-amber-600 to-amber-700' },
    { icon: TrendingUp, number: bookings.length > 0 ? '4.9★' : '—', label: 'Avg. Rating', color: 'bg-gradient-to-br from-purple-600 to-purple-700' },
  ];

  const quickActions = [
    { icon: Car, title: 'Browse Vehicles', desc: 'Find your perfect ride', to: '/browse', color: 'bg-gradient-to-br from-blue-600 to-indigo-700', index: 0 },
    { icon: Calendar, title: 'My Bookings', desc: 'View & manage trips', to: '/bookings', color: 'bg-gradient-to-br from-emerald-600 to-teal-700', index: 1 },
    { icon: Heart, title: 'Wishlist', desc: 'Saved vehicles', to: '/wishlist', color: 'bg-gradient-to-br from-pink-600 to-rose-700', index: 2 },
    { icon: User, title: 'My Profile', desc: 'Update your info', to: '/profile', color: 'bg-gradient-to-br from-amber-600 to-orange-700', index: 3 },
    { icon: MessageCircle, title: 'Messages', desc: 'Chat with support', to: '/messages', color: 'bg-gradient-to-br from-violet-600 to-purple-700', index: 4 },
    { icon: Settings, title: 'Settings', desc: 'Account preferences', to: '/settings', color: 'bg-gradient-to-br from-neutral-600 to-neutral-700', index: 5 },
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Dashboard — LivinLease" description="Manage your bookings, wishlist, and profile." />

      <div className="container-elegant py-10">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 mb-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-900/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-900/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-secondary-400" />
                <span className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">{greeting}</span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                Welcome back, <span className="text-gradient">{firstName}</span> 👋
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Ready for your next adventure?</p>
            </div>
            <Link to="/browse"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl transition-all duration-300 shadow-elegant hover:shadow-elegant-md hover:-translate-y-0.5 text-sm flex-shrink-0"
            >
              Book a Ride <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <StatCard key={i} {...s} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="font-bold text-neutral-900 dark:text-neutral-100">Recent Bookings</h2>
                <Link to="/bookings" className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors">
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loading ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 animate-pulse">
                      <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded w-3/4" />
                        <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : bookings.length > 0 ? (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {bookings.map((booking, i) => {
                    const { icon: StatusIcon, cls, bg, label } = getStatusStyle(booking.status);
                    return (
                      <motion.div key={booking.id || i} {...staggerChild(i)} className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Car className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">{booking.vehicleName || 'Vehicle'}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500 truncate">{booking.dates || booking.pickupDate}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold ${bg} ${cls}`}>
                            <StatusIcon className="w-3 h-3" />
                            {label}
                          </span>
                          {booking.totalAmount && (
                            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">₹{booking.totalAmount.toLocaleString()}</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 text-sm">No bookings yet</h3>
                  <p className="text-neutral-500 dark:text-neutral-500 text-xs mb-5">Your booking history will appear here</p>
                  <Link to="/browse" className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-xl text-sm font-medium transition-colors border border-neutral-200 dark:border-neutral-700">
                    Browse Vehicles <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="font-bold text-neutral-900 dark:text-neutral-100 mb-4"
            >
              Quick Actions
            </motion.h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <QuickActionCard key={action.to} {...action} />
              ))}
            </div>

            {/* Seller CTA */}
            {!user?.isSeller && !user?.isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Earn with your vehicle</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">List & earn monthly</p>
                  </div>
                </div>
                <Link to="/seller/apply" className="w-full flex items-center justify-center gap-2 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold transition-colors border border-neutral-200 dark:border-neutral-700">
                  Become a Seller <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
