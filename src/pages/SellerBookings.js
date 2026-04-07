import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, MessageCircle, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetaTags from '../components/SEO/MetaTags';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { sellerServices, bookingServices } from '../firebase/services';

const statusConfig = {
  pending:   { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Clock },
  approved:  { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle },
  completed: { color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: CheckCircle },
  rejected:  { color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: XCircle },
};

const SellerBookings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) fetchSellerBookings();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSellerBookings = async () => {
    try {
      setLoading(true);
      const result = await sellerServices.getSellerBookings(user.id);
      setBookings(result.success ? (result.data || []) : []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await bookingServices.updateBooking(id, { status: 'approved' });
      toast.success('Booking approved!');
      fetchSellerBookings();
    } catch (err) {
      toast.error('Failed to approve booking');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this booking?')) return;
    try {
      await bookingServices.updateBooking(id, { status: 'rejected' });
      toast.success('Booking rejected');
      fetchSellerBookings();
    } catch (err) {
      toast.error('Failed to reject booking');
    }
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'completed', label: 'Completed' },
  ];

  const filtered = activeTab === 'all' ? bookings : bookings.filter(b => b.status === activeTab);

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Seller Bookings" description="Manage your vehicle bookings" />

      <div className="container-elegant py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-1">My Bookings</h1>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">Manage bookings for your vehicles</p>
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
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white dark:bg-neutral-900/20' : 'bg-neutral-700'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><LoadingSpinner size="lg" text="Loading bookings..." /></div>
        ) : filtered.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((booking, i) => {
                const cfg = statusConfig[booking.status] || statusConfig.pending;
                const StatusIcon = cfg.icon;
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-neutral-200 dark:border-neutral-700 transition-all"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <div className="lg:col-span-6">
                        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500 mb-2">
                          <span className="text-neutral-700 dark:text-neutral-300 font-medium">#{booking.id}</span>
                          <span>·</span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.color}`}>
                            <StatusIcon className="w-3 h-3" />{booking.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-3">{booking.vehicleName}</h3>
                        <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-500">
                          <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{booking.startDate} to {booking.endDate}</div>
                          <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{booking.customerName} — {booking.customerPhone}</div>
                        </div>
                      </div>

                      <div className="lg:col-span-3">
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-1">Amount</p>
                        <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">₹{booking.amount}</p>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${booking.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {booking.paymentStatus}
                        </span>
                      </div>

                      <div className="lg:col-span-3 flex flex-col gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button onClick={() => handleApprove(booking.id)} className="flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 py-2 rounded-lg text-xs transition-colors">
                              <CheckCircle size={13} /> Approve
                            </button>
                            <button onClick={() => handleReject(booking.id)} className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-2 rounded-lg text-xs transition-colors">
                              <XCircle size={13} /> Reject
                            </button>
                          </>
                        )}
                        <button className="flex items-center justify-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 py-2 rounded-lg text-xs transition-colors">
                          <MessageCircle size={13} /> Contact
                        </button>
                        <button className="flex items-center justify-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 py-2 rounded-lg text-xs transition-colors">
                          <Eye size={13} /> Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-16 text-center">
            <Calendar className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-2">No bookings found</h3>
            <p className="text-sm text-neutral-600">{activeTab === 'all' ? "You don't have any bookings yet" : `No ${activeTab} bookings at the moment`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerBookings;
