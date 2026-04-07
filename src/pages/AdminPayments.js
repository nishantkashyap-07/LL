import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { adminServices, paymentServices } from '../firebase/services';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = adminServices.listenToPayments((data) => { setPayments(data); setLoading(false); });
    return () => unsub();
  }, []);

  const handleVerify = async (id) => {
    try {
      await paymentServices.updatePaymentStatus(id, 'verified');
      toast.success('Payment verified');
    } catch (err) {
      toast.error('Failed to verify payment');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this payment?')) return;
    try {
      await paymentServices.updatePaymentStatus(id, 'rejected');
      toast.success('Payment rejected');
    } catch (err) {
      toast.error('Failed to reject payment');
    }
  };

  if (loading) return <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  const statusStyle = (s) => {
    const map = { verified: 'bg-emerald-500/10 text-emerald-400', rejected: 'bg-red-500/10 text-red-400' };
    return map[s] || 'bg-amber-500/10 text-amber-400';
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Payment Verification" />

      <div className="container-elegant py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">Payment Verification</h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">Review and verify payment submissions</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{payments.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">Total Payments</p>
          </div>
        </div>

        {payments.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-16 text-center">
            <p className="text-neutral-600 text-sm">No payments found</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    {['Payment ID', 'Booking', 'Customer', 'Amount', 'Method', 'Status', 'Actions'].map((h) => (
                      <th key={h} className={`px-5 py-3.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {payments.map((p, i) => (
                    <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-neutral-100 dark:bg-neutral-800/30 transition-colors">
                      <td className="px-5 py-4 text-xs font-mono text-neutral-700 dark:text-neutral-300">{p.id}</td>
                      <td className="px-5 py-4 text-sm text-neutral-800 dark:text-neutral-200">{p.bookingId || 'N/A'}</td>
                      <td className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-400">{p.userName || 'N/A'}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-neutral-800 dark:text-neutral-200">₹{p.amount || 0}</td>
                      <td className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-400">{p.method || 'whatsapp'}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(p.status)}`}>{p.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {p.screenshot && (
                            <a href={p.screenshot} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                              <Eye size={14} className="text-neutral-600 dark:text-neutral-400" />
                            </a>
                          )}
                          {p.status === 'pending_verification' && (
                            <>
                              <button onClick={() => handleVerify(p.id)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors"><CheckCircle size={14} className="text-emerald-400" /></button>
                              <button onClick={() => handleReject(p.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"><XCircle size={14} className="text-red-400" /></button>
                            </>
                          )}
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

export default AdminPayments;
