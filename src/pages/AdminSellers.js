import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { adminServices } from '../firebase/services';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { sendSellerApproved, sendSellerRejected } from '../utils/emailNotifications';

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = adminServices.listenToSellers((data) => { setSellers(data); setLoading(false); });
    return () => unsub();
  }, []);

  const handleApprove = async (id) => {
    try {
      const seller = sellers.find(s => s.id === id);
      await adminServices.updateSellerStatus(id, 'approved');
      if (seller?.email) sendSellerApproved({ toEmail: seller.email, toName: seller.fullName || 'Seller' });
      toast.success('Seller approved');
    } catch (err) {
      toast.error('Failed to approve seller');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this seller application?')) return;
    try {
      const seller = sellers.find(s => s.id === id);
      await adminServices.updateSellerStatus(id, 'rejected');
      if (seller?.email) sendSellerRejected({ toEmail: seller.email, toName: seller.fullName || 'Seller' });
      toast.success('Seller rejected');
    } catch (err) {
      toast.error('Failed to reject seller');
    }
  };

  if (loading) return <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  const statusStyle = (s) => {
    const map = { approved: 'bg-emerald-500/10 text-emerald-400', rejected: 'bg-red-500/10 text-red-400' };
    return map[s] || 'bg-amber-500/10 text-amber-400';
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Seller Verification" />

      <div className="container-elegant py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">Seller Verification</h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">Review and approve seller applications</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{sellers.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">Applications</p>
          </div>
        </div>

        {sellers.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-16 text-center">
            <p className="text-neutral-600 text-sm">No seller applications found</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    {['Seller', 'Contact', 'Status', 'Applied', 'Actions'].map((h) => (
                      <th key={h} className={`px-5 py-3.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {sellers.map((seller, i) => (
                    <motion.tr key={seller.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-neutral-100 dark:bg-neutral-800/30 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{seller.fullName || 'N/A'}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">{seller.email || 'N/A'}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-400">{seller.phone || 'N/A'}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(seller.status)}`}>{seller.status}</span>
                      </td>
                      <td className="px-5 py-4 text-xs text-neutral-500 dark:text-neutral-500">
                        {seller.createdAt ? new Date(seller.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="p-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors" title="View Documents">
                            <FileText size={14} className="text-neutral-600 dark:text-neutral-400" />
                          </button>
                          {seller.status === 'pending' && (
                            <>
                              <button onClick={() => handleApprove(seller.id)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors" title="Approve">
                                <CheckCircle size={14} className="text-emerald-400" />
                              </button>
                              <button onClick={() => handleReject(seller.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors" title="Reject">
                                <XCircle size={14} className="text-red-400" />
                              </button>
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

export default AdminSellers;
