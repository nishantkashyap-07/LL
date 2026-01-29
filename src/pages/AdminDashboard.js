import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Eye, Users, Car, Calendar, 
  DollarSign, TrendingUp, Search, Filter, MoreVertical 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  // Mock data
  const mockVehicles = [
    {
      id: 1,
      name: 'Honda Activa 6G',
      type: 'scooty',
      brand: 'Honda',
      price: 299,
      status: 'available',
      bookings: 45,
      revenue: 13455
    },
    {
      id: 2,
      name: 'Maruti Swift',
      type: 'car',
      brand: 'Maruti',
      price: 1299,
      status: 'rented',
      bookings: 23,
      revenue: 29877
    },
    {
      id: 3,
      name: 'Royal Enfield Classic',
      type: 'bike',
      brand: 'Royal Enfield',
      price: 899,
      status: 'maintenance',
      bookings: 67,
      revenue: 60233
    }
  ];

  const mockBookings = [
    {
      id: 1,
      user: 'John Doe',
      vehicle: 'Honda Activa 6G',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      amount: 897,
      status: 'active'
    },
    {
      id: 2,
      user: 'Jane Smith',
      vehicle: 'Maruti Swift',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      amount: 2598,
      status: 'completed'
    }
  ];

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      bookings: 5,
      totalSpent: 12450,
      joinDate: '2023-06-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      bookings: 3,
      totalSpent: 8900,
      joinDate: '2023-08-22',
      status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setVehicles(mockVehicles);
      setBookings(mockBookings);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      label: 'Total Revenue',
      value: '₹1,24,565',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Total Vehicles',
      value: vehicles.length,
      change: '+3',
      icon: Car,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Bookings',
      value: bookings.filter(b => b.status === 'active').length,
      change: '+8',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Total Users',
      value: users.length,
      change: '+15%',
      icon: Users,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'users', label: 'Users' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rented':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast.success('Vehicle deleted successfully');
  };

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage vehicles, bookings, and users
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-elegant"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/50 dark:bg-gray-800/50 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="card-elegant">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{booking.user}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {booking.vehicle}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">₹{booking.amount}</div>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Vehicles */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Top Performing Vehicles</h3>
                  <div className="space-y-3">
                    {vehicles.slice(0, 5).map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{vehicle.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {vehicle.bookings} bookings
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">₹{vehicle.revenue}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
                          </div>
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
                <h2 className="text-xl font-semibold">Vehicles Management</h2>
                <button
                  onClick={() => setShowAddVehicle(true)}
                  className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-elegant hover:shadow-elegant-md tracking-wide text-xs uppercase flex items-center"
                >
                  <Plus size={20} className="mr-2" />
                  Add Vehicle
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 px-4">Vehicle</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Price/Day</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Bookings</th>
                      <th className="text-left py-3 px-4">Revenue</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium">{vehicle.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{vehicle.brand}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 capitalize">{vehicle.type}</td>
                        <td className="py-4 px-4">₹{vehicle.price}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">{vehicle.bookings}</td>
                        <td className="py-4 px-4">₹{vehicle.revenue}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-lg transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-lg transition-colors">
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteVehicle(vehicle.id)}
                              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
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
                <h2 className="text-xl font-semibold">Bookings Management</h2>
                <div className="flex space-x-2">
                  <button className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center">
                    <Search size={16} className="mr-2" />
                    Search
                  </button>
                  <button className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 px-4">Booking ID</th>
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Vehicle</th>
                      <th className="text-left py-3 px-4">Dates</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-4 px-4">#{booking.id.toString().padStart(4, '0')}</td>
                        <td className="py-4 px-4">{booking.user}</td>
                        <td className="py-4 px-4">{booking.vehicle}</td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div>{booking.startDate}</div>
                            <div className="text-gray-500 dark:text-gray-400">to {booking.endDate}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">₹{booking.amount}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-lg transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </td>
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
                <h2 className="text-xl font-semibold">Users Management</h2>
                <div className="flex space-x-2">
                  <button className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center">
                    <Search size={16} className="mr-2" />
                    Search
                  </button>
                  <button className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Bookings</th>
                      <th className="text-left py-3 px-4">Total Spent</th>
                      <th className="text-left py-3 px-4">Join Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">{user.email}</td>
                        <td className="py-4 px-4">{user.bookings}</td>
                        <td className="py-4 px-4">₹{user.totalSpent}</td>
                        <td className="py-4 px-4">{user.joinDate}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-lg transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </td>
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

