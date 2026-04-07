import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { sellerServices } from '../firebase/services';

const SellerPayout = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [payouts, setPayouts] = useState([]);
  const [bankDetails, setBankDetails] = useState({ bankName: '', accountNumber: '', ifscCode: '', accountHolder: '', upiId: '' });

  useEffect(() => {
    if (user?.id) fetchPayoutData();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPayoutData = async () => {
    try {
      const [bankData, payoutHistory] = await Promise.all([
        sellerServices.getSellerBankDetails(user.id),
        sellerServices.getSellerPayouts(user.id)
      ]);
      if (bankData) setBankDetails(bankData);
      setPayouts(payoutHistory || []);
    } catch (err) { console.error(err); }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await sellerServices.updateSellerBankDetails(user.id, bankDetails);
      toast.success('Bank details updated!');
    } catch (err) {
      toast.error('Failed to update bank details');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-neutral-600 focus:border-neutral-300 dark:border-neutral-600 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:text-neutral-500 text-sm";

  const fields = [
    { key: 'bankName', label: 'Bank Name', placeholder: 'Bank Name' },
    { key: 'accountHolder', label: 'Account Holder', placeholder: 'Account Holder Name' },
    { key: 'accountNumber', label: 'Account Number', placeholder: 'Account Number' },
    { key: 'ifscCode', label: 'IFSC Code', placeholder: 'IFSC Code' },
    { key: 'upiId', label: 'UPI ID', placeholder: 'yourname@upi', full: true },
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Payout Settings" />

      <div className="container-elegant py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-1">Payout Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">Manage your bank details and payout history</p>
        </div>

        {/* Bank Details */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 mb-5">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-5">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {fields.map((f) => (
              <div key={f.key} className={f.full ? 'md:col-span-2' : ''}>
                <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">{f.label}</label>
                <input type="text" value={bankDetails[f.key]} onChange={(e) => setBankDetails({ ...bankDetails, [f.key]: e.target.value })} className={inputClass} placeholder={f.placeholder} />
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={loading}
              className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-50">
              {loading ? <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" /> : <><Save size={16} /><span>Save Details</span></>}
            </motion.button>
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-5">Payout History</h2>
          <div className="space-y-3">
            {payouts.length === 0 ? (
              <p className="text-neutral-600 text-sm text-center py-8">No payouts yet</p>
            ) : (
              payouts.map((payout, i) => (
                <motion.div key={payout.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-neutral-700 rounded-xl flex items-center justify-center">
                      <DollarSign size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">₹{payout.amount}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500">{payout.method} · {payout.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${payout.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {payout.status}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPayout;
