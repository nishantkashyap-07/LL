import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Settings } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { adminServices } from '../firebase/services';

const DEFAULT_SETTINGS = {
  platformName: 'LivinLease',
  commissionRate: '10',
  minBookingDays: '1',
  maxBookingDays: '30',
  supportEmail: 'support@livinlease.com',
  supportPhone: '9387033404'
};

const AdminSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    adminServices.getSettings().then(result => {
      if (result.success && result.data) {
        setSettings({ ...DEFAULT_SETTINGS, ...result.data });
      }
      setFetching(false);
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await adminServices.saveSettings(settings);
      if (result.success) {
        toast.success('Settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:text-neutral-500 outline-none";

  const fields = [
    { label: 'Platform Name', key: 'platformName', type: 'text' },
    { label: 'Commission Rate (%)', key: 'commissionRate', type: 'number' },
    { label: 'Min Booking Days', key: 'minBookingDays', type: 'number' },
    { label: 'Max Booking Days', key: 'maxBookingDays', type: 'number' },
    { label: 'Support Email', key: 'supportEmail', type: 'email' },
    { label: 'Support Phone', key: 'supportPhone', type: 'tel' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Admin Settings" />
      <div className="container-elegant py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-1">Platform Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">Configure global platform parameters</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
              <Settings size={18} className="text-neutral-700 dark:text-neutral-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">General Configuration</h2>
              <p className="text-neutral-500 dark:text-neutral-500 text-xs">Changes apply platform-wide</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {fields.map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">{label}</label>
                <input
                  type={type}
                  value={settings[key]}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-8 py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Settings</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
