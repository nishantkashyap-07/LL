import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Users, Car, Calendar, DollarSign, TrendingUp, Search, MoreVertical, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { adminServices } from '../firebase/services';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ totalRevenue: 0, totalVehicles: 0, activeBookings: 0, totalUsers: 0 });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true); // eslint-disable-line no-unused-vars

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await adminServices.getStats();
        if (result.success) setStats(result.data);
      } catch { /* use defaults */ }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Revenue', value: `₹${stats.totalRevenue?.toLocaleString() || '1,24,565'}`, change: '+12.5%', icon: DollarSign, color: 'from-accent-700 to-accent-800' },
    { label: 'Total Vehicles', value: stats.totalVehicles || vehicles.length || 0, change: '+3 this month', icon: Car, color: 'from-primary-700 to-primary-800' },
    { label: 'Active Bookings', value: stats.activeBookings || 0, change: '+8 today', icon: Calendar, color: 'from-secondary-700 to-secondary-800' },
    { label: 'Total Users', value: stats.totalUsers || 0, change: '+15% this month', icon: Users, color: 'from-warning-700 to-warning-800' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'users', label: 'Users' }
  ];

  const statusBadge = (status) => {
    const map = {
      available: 'bg-accent-900/30 text-accent-300 border-accent-800/50',
      rented: 'bg-primary-900/30 text-primary-300 border-primary-800/50',
      maintenance: 'bg-warning-900/30 text-warning-300 border-warning-800/50',
      active: 'bg-accent-900/30 text-accent-300 border-accent-800/50',
      completed: 'bg-primary-900/30 text-primary-300 border-primary-800/50',
      cancelled: 'bg-error-900/30 text-error-300 border-error-800/50',
    };
    return `text-xs px-2.5 py-1 rounded-full font-medium border ${map[status] || 'bg-neutral-800 text-neutral-400 border-neutral-700'}`;
  };

  if (!user?.isAdmin) {
    return (
      <div className="pt-20 min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="card-elegant text-center max-w-sm">
          <div className="w-16 h-16 bg-error-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-error-400" />
          </div>
          <h2 className="text-xl font-bold text-neutral-100 mb-2">Access Denied</h2>
          <p className="text-neutral-400 text-sm">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  // Sample data for display when Firebase data is empty
  const sampleVehicles = [
    { id: 1, name: 'Honda Activa 6G', brand: 'Honda', type: 'scooty', price: 299, status: 'available', bookings: 45, revenue: 13455 },
    { id: 2, name: 'Maruti Swift', brand: 'Maruti', type: 'car', price: 1299, status: 'rented', bookings: 23, revenue: 29877 },
    { id: 3, name: 'Royal Enfield Classic', brand: 'Royal Enfield', type: 'bike', price: 899, status: 'maintenance', bookings: 67, revenue: 60233 }
  ];
  const sampleBookings = [
    { id: 1, user: 'Arjun Sharma', vehicle: 'Honda Activa 6G', startDate: '2024-01-15', endDate: '2024-01-18', amount: 897, status: 'active' },
    { id: 2, user: 'Priya Mehta', vehicle: 'Maruti Swift', startDate: '2024-01-10', endDate: '2024-01-12', amount: 2598, status: 'completed' }
  ];
  const sampleUsers = [
    { id: 1, name: 'Arjun Sharma', email: 'arjun@example.com', bookings: 5, totalSpent: 12450, joinDate: '2023-06-15', status: 'active' },
    { id: 2, name: 'Priya Mehta', email: 'priya@example.com', bookings: 3, totalSpent: 8900, joinDate: '2023-08-22', status: 'active' }
  ];

  const displayVehicles = vehicles.length > 0 ? vehicles : sampleVehicles;
  const displayBookings = sampleBookings;
  const displayUsers = sampleUsers;

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <div className="container-elegant py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-neutral-500 text-sm mb-1">Administration</p>
            <h1 className="text-3xl font-bold text-neutral-100">Admin <span className="text-gradient">Dashboard</span></h1>
          </div>
          <Link to="/admin/vehicles" className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold rounded-xl text-sm transition-all">
            <Plus size={16} />Manage Vehicles
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-minimal">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500 mb-1 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-100">{stat.value}</p>
                  <p className="text-xs text-accent-400 flex items-center gap-1 mt-1"><TrendingUp size={11} />{stat.change}</p>
                </div>
                <div className={`w-11 h-11 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl mb-8 w-fit">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-neutral-200'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card-minimal">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-100 mb-6">Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {displayBookings.slice(0, 5).map(booking => (
                      <div key={booking.id} className="flex justify-between items-center p-3 bg-neutral-800/50 rounded-xl border border-neutral-700/50">
                        <div>
                          <p className="font-medium text-neutral-200 text-sm">{booking.user}</p>
                          <p className="text-xs text-neutral-500">{booking.vehicle}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-neutral-100 text-sm">₹{booking.amount?.toLocaleString()}</p>
                          <span className={statusBadge(booking.status)}>{booking.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Top Vehicles</h3>
                  <div className="space-y-3">
                    {displayVehicles.slice(0, 5).map(vehicle => (
                      <div key={vehicle.id} className="flex justify-between items-center p-3 bg-neutral-800/50 rounded-xl border border-neutral-700/50">
                        <div>
                          <p className="font-medium text-neutral-200 text-sm">{vehicle.name}</p>
                          <p className="text-xs text-neutral-500">{vehicle.bookings} bookings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-neutral-100 text-sm">₹{vehicle.revenue?.toLocaleString()}</p>
                          <p className="text-xs text-neutral-500">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-neutral-100">Vehicles</h2>
                <Link to="/seller/vehicles/new" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 rounded-xl text-sm font-medium transition-colors">
                  <Plus size={16} />Add Vehicle
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      {['Vehicle', 'Type', 'Price/Day', 'Status', 'Bookings', 'Revenue', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayVehicles.map(vehicle => (
                      <tr key={vehicle.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-medium text-neutral-200">{vehicle.name}</p>
                          <p className="text-xs text-neutral-500">{vehicle.brand}</p>
                        </td>
                        <td className="py-4 px-4 text-neutral-400 capitalize">{vehicle.type}</td>
                        <td className="py-4 px-4 text-neutral-300">₹{vehicle.price}</td>
                        <td className="py-4 px-4"><span className={statusBadge(vehicle.status)}>{vehicle.status}</span></td>
                        <td className="py-4 px-4 text-neutral-300">{vehicle.bookings}</td>
                        <td className="py-4 px-4 text-neutral-300">₹{vehicle.revenue?.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-1">
                            <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-400 hover:text-neutral-200"><Eye size={15} /></button>
                            <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-400 hover:text-neutral-200"><Edit size={15} /></button>
                            <button onClick={() => { setVehicles(v => v.filter(x => x.id !== vehicle.id)); toast.success('Deleted'); }} className="p-2 hover:bg-error-900/30 rounded-lg transition-colors text-neutral-400 hover:text-error-400"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-neutral-100">Bookings</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input placeholder="Search bookings..." className="pl-9 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none w-48" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      {['ID', 'User', 'Vehicle', 'Dates', 'Amount', 'Status', ''].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayBookings.map(booking => (
                      <tr key={booking.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                        <td className="py-4 px-4 text-neutral-500 font-mono text-xs">#{String(booking.id).padStart(4, '0')}</td>
                        <td className="py-4 px-4 text-neutral-300">{booking.user}</td>
                        <td className="py-4 px-4 text-neutral-300">{booking.vehicle}</td>
                        <td className="py-4 px-4">
                          <p className="text-neutral-300">{booking.startDate}</p>
                          <p className="text-neutral-500 text-xs">to {booking.endDate}</p>
                        </td>
                        <td className="py-4 px-4 font-medium text-neutral-200">₹{booking.amount?.toLocaleString()}</td>
                        <td className="py-4 px-4"><span className={statusBadge(booking.status)}>{booking.status}</span></td>
                        <td className="py-4 px-4"><button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-400"><MoreVertical size={15} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-neutral-100">Users</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input placeholder="Search users..." className="pl-9 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none w-48" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      {['User', 'Email', 'Bookings', 'Total Spent', 'Joined', 'Status', ''].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayUsers.map(u => (
                      <tr key={u.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-700 to-secondary-600 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {u.name?.charAt(0)}
                            </div>
                            <span className="font-medium text-neutral-200">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-neutral-400">{u.email}</td>
                        <td className="py-4 px-4 text-neutral-300">{u.bookings}</td>
                        <td className="py-4 px-4 text-neutral-300">₹{u.totalSpent?.toLocaleString()}</td>
                        <td className="py-4 px-4 text-neutral-400">{u.joinDate}</td>
                        <td className="py-4 px-4"><span className={statusBadge(u.status)}>{u.status}</span></td>
                        <td className="py-4 px-4"><button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-400"><MoreVertical size={15} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
