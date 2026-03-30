import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, DollarSign, Calendar, TrendingUp, Plus, Eye, Edit, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MetaTags from '../components/SEO/MetaTags';
import { sellerServices } from '../firebase/services';
import toast from 'react-hot-toast';

const statusCls = {
  active:    'bg-accent-900/20 text-accent-400 border-accent-800/40',
  inactive:  'bg-neutral-800 text-neutral-400 border-neutral-700',
  pending:   'bg-warning-900/20 text-warning-400 border-warning-800/40',
  confirmed: 'bg-primary-900/20 text-primary-400 border-primary-800/40',
  completed: 'bg-neutral-800 text-neutral-400 border-neutral-700',
  cancelled: 'bg-error-900/20 text-error-400 border-error-800/40',
};

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${statusCls[status] || statusCls.inactive}`}>
    {status}
  </span>
);

const SellerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalVehicles: 0, activeBookings: 0, totalEarnings: 0, monthlyEarnings: 0 });
  const [vehicles, setVehicles] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) fetchData();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      const [vRes, bRes, eRes] = await Promise.all([
        sellerServices.getSellerVehicles(user.id),
        sellerServices.getSellerBookings(user.id),
        sellerServices.getSellerEarnings(user.id)
      ]);
      const vData = vRes.success ? vRes.data : [];
      const bData = bRes.success ? bRes.data : [];
      const eData = eRes.success ? eRes.data : {};
      setVehicles(vData.slice(0, 4));
      setRecentBookings(bData.slice(0, 4));
      setStats({
        totalVehicles: vData.length,
        activeBookings: bData.filter(b => ['pending', 'confirmed', 'active'].includes(b.status)).length,
        totalEarnings: eData.totalEarnings || 0,
        monthlyEarnings: eData.monthlyEarnings || 0
      });
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Vehicles', value: stats.totalVehicles, icon: Car, color: 'from-primary-700 to-primary-800' },
    { label: 'Active Bookings', value: stats.activeBookings, icon: Calendar, color: 'from-accent-700 to-accent-800' },
    { label: 'Total Earnings', value: `₹${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'from-secondary-700 to-secondary-800' },
    { label: 'This Month', value: `₹${stats.monthlyEarnings.toLocaleString()}`, icon: TrendingUp, color: 'from-warning-700 to-warning-800' },
  ];

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-neutral-700 border-t-neutral-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="Seller Dashboard" description="Manage your vehicles and bookings" />
      <div className="container-elegant py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-neutral-500 text-sm mb-1">Seller Portal</p>
            <h1 className="text-3xl font-bold text-neutral-100">
              Welcome, <span className="text-gradient">{user?.name || 'Seller'}</span>
            </h1>
          </div>
          <Link to="/seller/vehicles/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold rounded-xl text-sm transition-all">
            <Plus className="w-4 h-4" />Add Vehicle
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="card-minimal">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-neutral-100">{s.value}</p>
                </div>
                <div className={`w-10 h-10 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center text-white`}>
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Vehicles */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-minimal">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-neutral-200">My Vehicles</h2>
                <Link to="/seller/vehicles" className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1 transition-colors">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {vehicles.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Car className="w-6 h-6 text-neutral-600" />
                  </div>
                  <p className="text-neutral-500 text-sm mb-4">No vehicles listed yet</p>
                  <Link to="/seller/vehicles/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" />Add your first vehicle
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {vehicles.map((v, i) => (
                    <motion.div key={v.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                      className="flex items-center justify-between p-3 bg-neutral-800/40 rounded-xl border border-neutral-700/40">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 bg-neutral-700 rounded-lg overflow-hidden flex-shrink-0">
                          {(v.images?.[0] || v.image) ? (
                            <img src={v.images?.[0] || v.image} alt={v.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Car className="w-5 h-5 text-neutral-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-200">{v.name}</p>
                          <p className="text-xs text-neutral-500 capitalize">{v.type} · ₹{v.price || v.pricePerDay}/day</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={v.status || 'active'} />
                        <Link to={`/vehicles/${v.id}`} className="p-1.5 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-500 hover:text-neutral-300">
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link to={`/seller/vehicles/edit/${v.id}`} className="p-1.5 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-500 hover:text-neutral-300">
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Recent Bookings */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="card-minimal">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-neutral-200">Recent Bookings</h2>
                <Link to="/seller/bookings" className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1 transition-colors">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {recentBookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-5 h-5 text-neutral-600" />
                  </div>
                  <p className="text-neutral-500 text-sm">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentBookings.map((b, i) => (
                    <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      className="p-3 bg-neutral-800/40 rounded-xl border border-neutral-700/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-neutral-500 font-mono">#{b.id?.slice(-6) || '------'}</span>
                        <StatusBadge status={b.status} />
                      </div>
                      <p className="text-sm font-medium text-neutral-200 mb-1">{b.vehicleName || 'Vehicle'}</p>
                      <p className="text-xs text-neutral-500 mb-2">{b.userName || b.customerName || 'Customer'}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">{b.pickupDate}</span>
                        <span className="font-semibold text-neutral-200">₹{b.totalAmount?.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Links */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="card-minimal mt-4">
              <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Quick Links</h2>
              <div className="space-y-2">
                {[
                  { label: 'Earnings', to: '/seller/earnings', icon: DollarSign },
                  { label: 'Payout Settings', to: '/seller/payout', icon: TrendingUp },
                  { label: 'All Bookings', to: '/seller/bookings', icon: Calendar },
                ].map(link => (
                  <Link key={link.to} to={link.to}
                    className="flex items-center gap-3 p-2.5 hover:bg-neutral-800 rounded-xl transition-colors group">
                    <div className="w-7 h-7 bg-neutral-800 group-hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors">
                      <link.icon className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                    <span className="text-sm text-neutral-300 group-hover:text-neutral-100 transition-colors">{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-400 ml-auto transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
