import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetaTags from '../components/SEO/MetaTags';
import { sellerServices } from '../firebase/services';
import toast from 'react-hot-toast';

const SellerEarnings = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalEarnings: 0, monthlyEarnings: 0, pendingPayout: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) fetchEarnings();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const result = await sellerServices.getSellerEarnings(user.id);
      if (result.success) {
        const d = result.data;
        setStats({ totalEarnings: d.totalEarnings || 0, monthlyEarnings: d.monthlyEarnings || 0, pendingPayout: d.pendingPayout || 0 });
        setTransactions(d.transactions || []);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load earnings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="pt-20 min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const statCards = [
    { label: 'Total Earnings', value: `₹${stats.totalEarnings.toLocaleString()}`, change: '+15%', icon: DollarSign, color: 'text-emerald-400' },
    { label: 'This Month', value: `₹${stats.monthlyEarnings.toLocaleString()}`, change: '+20%', icon: TrendingUp, color: 'text-blue-400' },
    { label: 'Pending Payout', value: `₹${stats.pendingPayout.toLocaleString()}`, change: '', icon: Calendar, color: 'text-amber-400' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="Earnings" />

      <div className="container-elegant py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-1">Earnings</h1>
          <p className="text-neutral-500 text-sm">Track your revenue and transactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-neutral-100">{s.value}</p>
                {s.change && <p className="text-xs text-emerald-400 mt-0.5">{s.change}</p>}
              </div>
              <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-neutral-100 mb-5">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-neutral-600 text-sm text-center py-8">No transactions yet</p>
            ) : (
              transactions.map((txn, i) => (
                <motion.div key={txn.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 bg-neutral-800 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{txn.vehicle}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Booking: {txn.booking} · {txn.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-neutral-100">₹{txn.amount}</p>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${txn.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{txn.status}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerEarnings;
