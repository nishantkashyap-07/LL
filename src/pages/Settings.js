import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Globe, Eye, EyeOff, Save, Trash2, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { userServices } from '../firebase/services';

const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
    <div className="w-10 h-5 bg-neutral-700 rounded-full peer peer-checked:bg-neutral-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
  </label>
);

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: true, push: false, bookingReminders: true, promotions: false });
  const [privacy, setPrivacy] = useState({ profileVisibility: true, shareData: false, showBookingHistory: true });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (user?.id) fetchSettings();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSettings = async () => {
    try {
      const result = await userServices.getUser(user.id);
      const d = result.success ? result.data : null;
      if (d?.settings) {
        setNotifications(prev => ({ ...prev, ...d.settings.notifications }));
        setPrivacy(prev => ({ ...prev, ...d.settings.privacy }));
      }
    } catch (err) { console.error(err); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      toast.info('Password update requires re-authentication. Please use "Forgot Password".');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await userServices.updateUser(user.id, { settings: { notifications, privacy } });
      toast.success('Settings saved!');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-neutral-600 focus:border-neutral-300 dark:border-neutral-600 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:text-neutral-500 text-sm";

  const sidebarItems = [
    { label: 'Notifications', icon: Bell },
    { label: 'Privacy', icon: Shield },
    { label: 'Security', icon: Lock },
    { label: 'Language', icon: Globe },
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Settings" description="Manage your account settings and preferences" />

      <div className="container-elegant py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-1">Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">Manage your account preferences and security</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3">
              {sidebarItems.map((item) => (
                <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:bg-neutral-800 transition-colors text-left">
                  <item.icon size={16} className="text-neutral-600 dark:text-neutral-400" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-5">
            {/* Notifications */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-5 flex items-center gap-2">
                <Bell size={16} className="text-neutral-600 dark:text-neutral-400" /> Notifications
              </h2>
              <div className="space-y-3">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive booking updates via email' },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Get important alerts via SMS' },
                  { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'bookingReminders', label: 'Booking Reminders', desc: 'Reminders before pickup/return' },
                  { key: 'promotions', label: 'Promotional Emails', desc: 'Offers and discounts' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.label}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={notifications[item.key]} onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))} />
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-5 flex items-center gap-2">
                <Shield size={16} className="text-neutral-600 dark:text-neutral-400" /> Privacy
              </h2>
              <div className="space-y-3">
                {[
                  { key: 'profileVisibility', label: 'Profile Visibility', desc: 'Make your profile visible to sellers' },
                  { key: 'shareData', label: 'Share Analytics Data', desc: 'Help us improve our services' },
                  { key: 'showBookingHistory', label: 'Show Booking History', desc: 'Display your booking history' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.label}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={privacy[item.key]} onChange={() => setPrivacy(prev => ({ ...prev, [item.key]: !prev[item.key] }))} />
                  </div>
                ))}
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-5 flex items-center gap-2">
                <Lock size={16} className="text-neutral-600 dark:text-neutral-400" /> Change Password
              </h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input type={showCurrentPw ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required className={`${inputClass} pr-12`} placeholder="Enter current password" />
                    <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300">
                      {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">New Password</label>
                  <div className="relative">
                    <input type={showNewPw ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required className={`${inputClass} pr-12`} placeholder="Enter new password" />
                    <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300">
                      {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Confirm New Password</label>
                  <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required className={inputClass} placeholder="Confirm new password" />
                </div>
                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium px-5 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50">
                  {loading ? <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" /> : <><Lock size={14} /><span>Update Password</span></>}
                </button>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="bg-white dark:bg-neutral-900 border border-red-900/30 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-red-400 mb-4 flex items-center gap-2">
                <Trash2 size={16} /> Danger Zone
              </h2>
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">Delete Account</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-4">Once you delete your account, there is no going back.</p>
                <button
                  onClick={() => toast.error('Account deletion requested. Our team will contact you.')}
                  className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-xs transition-colors"
                >
                  <Trash2 size={14} /> Delete My Account
                </button>
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleSaveSettings} disabled={loading}
                className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-50"
              >
                {loading ? <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" /> : <><Save size={16} /><span>Save All Settings</span></>}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
