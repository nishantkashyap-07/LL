import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Phone, MessageCircle, Download, Eye, XCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { bookingServices } from '../firebase/services';
import toast from 'react-hot-toast';

const statusConfig = {
  upcoming: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Clock, label: 'Upcoming' },
  ongoing:  { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle, label: 'Ongoing' },
  completed:{ color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: CheckCircle, label: 'Completed' },
  cancelled:{ color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: XCircle, label: 'Cancelled' },
};

const Bookings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) { setLoading(false); return; }
      try {
        const result = await bookingServices.getUserBookings(user.id);
        if (result.success) setBookings(result.data);
        else toast.error('Failed to load bookings');
      } catch (err) {
        console.error(err);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filtered = activeTab === 'all' ? bookings : bookings.filter(b => b.status === activeTab);

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="My Bookings" description="View and manage your vehicle bookings" />

      <div className="container-elegant py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">My Bookings</h1>
            <p className="text-neutral-500 text-sm">Track and manage all your vehicle rentals</p>
          </div>
          <Link to="/browse">
            <button className="bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
              + New Booking
            </button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const count = tab.id === 'all' ? bookings.length : bookings.filter(b => b.status === tab.id).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-700'
                }`}
              >
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-neutral-900/20' : 'bg-neutral-700'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Loading bookings..." />
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((booking, i) => {
                const cfg = statusConfig[booking.status] || statusConfig.upcoming;
                const StatusIcon = cfg.icon;
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Image */}
                      <div className="lg:col-span-3">
                        <div className="relative rounded-xl overflow-hidden aspect-video lg:aspect-square bg-neutral-800">
                          {booking.vehicle?.image && (
                            <img src={booking.vehicle.image} alt={booking.vehicle.name} className="w-full h-full object-cover" />
                          )}
                          <div className="absolute top-2 right-2">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${cfg.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {cfg.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                            <span className="text-neutral-300 font-medium">#{booking.id}</span>
                            <span>·</span>
                            <span>{booking.vehicle?.type}</span>
                          </div>
                          <h3 className="text-xl font-bold text-neutral-100">{booking.vehicle?.name}</h3>
                          <p className="text-sm text-neutral-500">{booking.vehicle?.brand}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-neutral-500 mb-0.5">Rental Period</p>
                              <p className="text-sm text-neutral-200">{booking.startDate}</p>
                              <p className="text-sm text-neutral-200">to {booking.endDate}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-neutral-500 mb-0.5">Location</p>
                              <p className="text-sm text-neutral-200">{booking.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-3 border-t border-neutral-800 text-xs text-neutral-500">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{booking.seller?.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${booking.paymentStatus === 'paid' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            <span className="capitalize">{booking.paymentStatus}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-3 flex lg:flex-col justify-between lg:justify-start items-end lg:items-stretch gap-4">
                        <div className="lg:mb-auto">
                          <p className="text-xs text-neutral-500 mb-0.5">Total Amount</p>
                          <p className="text-2xl font-bold text-neutral-100">₹{booking.totalAmount}</p>
                        </div>
                        <div className="flex lg:flex-col gap-2 w-full">
                          <button className="flex-1 flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 px-3 py-2 rounded-lg text-xs transition-colors">
                            <Eye size={14} /> View
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 px-3 py-2 rounded-lg text-xs transition-colors">
                            <MessageCircle size={14} /> Contact
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 px-3 py-2 rounded-lg text-xs transition-colors">
                            <Download size={14} /> Receipt
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-16 text-center">
            <AlertCircle className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-200 mb-2">No bookings found</h3>
            <p className="text-neutral-500 text-sm mb-6">
              {activeTab === 'all' ? "You haven't made any bookings yet" : `No ${activeTab} bookings at the moment`}
            </p>
            <Link to="/browse">
              <button className="bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                Browse Vehicles
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
