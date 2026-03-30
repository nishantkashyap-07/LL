import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, CheckCircle, Clock, XCircle, Calendar, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { paymentServices } from '../firebase/services';

const statusConfig = {
  completed: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle, label: 'Completed' },
  pending:   { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Clock, label: 'Pending' },
  refunded:  { color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: CheckCircle, label: 'Refunded' },
  failed:    { color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: XCircle, label: 'Failed' },
};

const Payments = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // eslint-disable-line no-unused-vars

  useEffect(() => {
    if (user?.id) fetchPayments();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const result = await paymentServices.getUserPayments(user.id);
      if (result.success) setPayments(result.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const filtered = payments.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter;
    const matchSearch = (p.vehicleName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (p.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalPaid = payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);

  const statCards = [
    { label: 'Total Paid', value: `₹${totalPaid.toLocaleString()}`, icon: CheckCircle, color: 'text-emerald-400' },
    { label: 'Pending', value: `₹${totalPending.toLocaleString()}`, icon: Clock, color: 'text-amber-400' },
    { label: 'Transactions', value: payments.length, icon: CreditCard, color: 'text-blue-400' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="Payment History" description="View your payment transactions" />

      <div className="container-elegant py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-1">Payment History</h1>
          <p className="text-neutral-500 text-sm">Track all your payment transactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-neutral-100">{s.value}</p>
              </div>
              <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {['all', 'completed', 'pending', 'refunded'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  filter === s
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search payments..."
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((payment, i) => {
              const cfg = statusConfig[payment.status] || statusConfig.pending;
              const StatusIcon = cfg.icon;
              return (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                        <span className="text-neutral-300 font-medium">{payment.id}</span>
                        <span>·</span>
                        <span>Booking: {payment.bookingId}</span>
                      </div>
                      <h3 className="text-base font-semibold text-neutral-100 mb-1">{payment.vehicleName}</h3>
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{payment.date}</span>
                        <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" />{payment.method}</span>
                      </div>
                    </div>
                    <div className="lg:col-span-3">
                      <p className="text-xs text-neutral-500 mb-1">Transaction ID</p>
                      <p className="text-xs font-mono text-neutral-300 bg-neutral-800 px-2.5 py-1.5 rounded-lg inline-block">{payment.transactionId}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-xs text-neutral-500 mb-1">Amount</p>
                      <p className="text-xl font-bold text-neutral-100">₹{payment.amount}</p>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border mt-1.5 ${cfg.color}`}>
                        <StatusIcon className="w-3 h-3" />{cfg.label}
                      </span>
                    </div>
                    <div className="lg:col-span-2">
                      <button
                        onClick={() => toast.success(`Receipt for ${payment.id} downloaded!`)}
                        className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 px-4 py-2.5 rounded-lg text-xs transition-colors"
                      >
                        <Download size={14} /> Receipt
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-16 text-center">
              <CreditCard className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
              <h3 className="text-base font-semibold text-neutral-300 mb-2">No payments found</h3>
              <p className="text-sm text-neutral-600">{searchTerm ? 'Try adjusting your search' : 'No payment transactions yet'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
