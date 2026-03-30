import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Camera, Shield, Upload, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { userServices } from '../firebase/services';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', dateOfBirth: '',
    address: '', city: '', state: '', pincode: '', drivingLicense: ''
  });

  useEffect(() => {
    if (user?.id) fetchUserProfile();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserProfile = async () => {
    try {
      const result = await userServices.getUser(user.id);
      const d = result.success ? result.data : null;
      if (d) setFormData({
        name: d.name || '', email: d.email || '', phone: d.phone || '',
        dateOfBirth: d.dateOfBirth || '', address: d.address || '',
        city: d.city || '', state: d.state || '', pincode: d.pincode || '',
        drivingLicense: d.drivingLicense || ''
      });
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userServices.updateUser(user.id, formData);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-neutral-600 focus:border-neutral-600 transition-all text-neutral-100 placeholder:text-neutral-500 text-sm";

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="My Profile" description="Manage your profile information" />

      <div className="container-elegant py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-1">My Profile</h1>
          <p className="text-neutral-500 text-sm">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-3xl font-bold text-neutral-200">
                {user?.photoURL
                  ? <img src={user.photoURL} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  : (user?.name?.charAt(0) || 'U')}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-8 h-8 bg-neutral-700 border border-neutral-600 rounded-full flex items-center justify-center"
              >
                <Camera size={14} className="text-neutral-300" />
              </motion.button>
            </div>

            <h2 className="text-lg font-semibold text-neutral-100 mb-0.5">{user?.name || 'User'}</h2>
            <p className="text-sm text-neutral-500 mb-3">{user?.email}</p>

            <div className="flex items-center gap-1.5 text-xs mb-6">
              {user?.emailVerified
                ? <><CheckCircle size={12} className="text-emerald-400" /><span className="text-emerald-400">Verified</span></>
                : <><AlertCircle size={12} className="text-amber-400" /><span className="text-amber-400">Not Verified</span></>}
            </div>

            <div className="w-full border-t border-neutral-800 pt-4 space-y-3">
              {[
                { label: 'Member Since', value: 'Jan 2024' },
                { label: 'Total Bookings', value: '12' },
                { label: 'Account Type', value: user?.isAdmin ? 'Admin' : user?.isSeller ? 'Seller' : 'Buyer' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">{item.label}</span>
                  <span className="text-neutral-300 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div>
                <h3 className="text-base font-semibold text-neutral-200 mb-4 flex items-center gap-2">
                  <User size={16} className="text-neutral-400" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5">Email Address</label>
                    <input type="email" name="email" value={formData.email} disabled className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-800 rounded-xl text-neutral-500 cursor-not-allowed text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-base font-semibold text-neutral-200 mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-neutral-400" /> Address Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5">Street Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your street address" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1.5">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1.5">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1.5">Pincode</label>
                      <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-base font-semibold text-neutral-200 mb-4 flex items-center gap-2">
                  <Shield size={16} className="text-neutral-400" /> Verification Documents
                </h3>
                <div className="flex items-center justify-between p-4 bg-neutral-800 border border-neutral-700 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-neutral-200 mb-0.5">Driving License</p>
                    <p className="text-xs text-neutral-500">Upload your valid driving license</p>
                  </div>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-neutral-200 rounded-lg text-xs transition-colors">
                    <Upload size={14} /> Upload
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-neutral-800">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50 text-sm"
                >
                  {loading
                    ? <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                    : <><Save size={16} /><span>Save Changes</span></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
