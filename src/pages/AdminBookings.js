import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import { adminServices } from '../firebase/services';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = adminServices.listenToBookings((data) => { setBookings(data); setLoading(false); });
    return () => unsub();
  }, []);

  if (loading) return <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  const statusStyle = (s) => {
    const map = { completed: 'bg-emerald-500/10 text-emerald-400', active: 'bg-blue-500/10 text-blue-400', confirmed: 'bg-blue-500/10 text-blue-400', cancelled: 'bg-red-500/10 text-red-400' };
    return map[s] || 'bg-amber-500/10 text-amber-400';
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Booking Management" />

      <div className="container-elegant py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">Booking Management</h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">Monitor all platform bookings</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{bookings.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">Total Bookings</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-16 text-center">
            <p className="text-neutral-600 text-sm">No bookings found</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    {['Booking ID', 'Vehicle', 'Customer', 'Seller', 'Amount', 'Status', 'Actions'].map((h) => (
                      <th key={h} className={`px-5 py-3.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {bookings.map((b, i) => (
                    <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-neutral-100 dark:bg-neutral-800/30 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-neutral-700 dark:text-neutral-300">{b.id}</td>
                      <td className="px-5 py-4 text-sm text-neutral-800 dark:text-neutral-200">{b.vehicleName || 'N/A'}</td>
                      <td className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-400">{b.userName || 'N/A'}</td>
                      <td className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-400">{b.sellerName || 'N/A'}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-neutral-800 dark:text-neutral-200">₹{b.totalAmount || 0}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(b.status)}`}>{b.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <button className="p-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"><Eye size={14} className="text-neutral-600 dark:text-neutral-400" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
