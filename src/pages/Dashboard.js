import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Car, Clock, CreditCard, User, Settings, 
  MapPin, Eye, Download, Filter 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock booking data
  const mockBookings = [
    {
      id: 1,
      vehicle: {
        name: 'Honda Activa 6G',
        type: 'scooty',
        image: '/api/placeholder/100/80'
      },
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      totalAmount: 897,
      status: 'active',
      location: 'Mumbai, Maharashtra'
    },
    {
      id: 2,
      vehicle: {
        name: 'Maruti Swift',
        type: 'car',
        image: '/api/placeholder/100/80'
      },
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      totalAmount: 2598,
      status: 'completed',
      location: 'Delhi, India'
    },
    {
      id: 3,
      vehicle: {
        name: 'Royal Enfield Classic',
        type: 'bike',
        image: '/api/placeholder/100/80'
      },
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      totalAmount: 1798,
      status: 'upcoming',
      location: 'Bangalore, Karnataka'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'payments', label: 'Payment History', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    {
      label: 'Total Bookings',
      value: bookings.length,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Rentals',
      value: bookings.filter(b => b.status === 'active').length,
      icon: Car,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Total Spent',
      value: `₹${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}`,
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Upcoming',
      value: bookings.filter(b => b.status === 'upcoming').length,
      icon: Clock,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your bookings and account settings
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
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-elegant">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card-elegant">
              {activeTab === 'bookings' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">My Bookings</h2>
                    <div className="flex space-x-2">
                      <button className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center">
                        <Filter size={16} className="mr-2" />
                        Filter
                      </button>
                      <Link to="/browse" className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-elegant hover:shadow-elegant-md tracking-wide text-xs uppercase">
                        New Booking
                      </Link>
                    </div>
                  </div>

                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-neutral-200 dark:bg-neutral-700 animate-pulse h-24 rounded-xl"></div>
                      ))}
                    </div>
                  ) : bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                              <img
                                src={booking.vehicle.image}
                                alt={booking.vehicle.name}
                                className="w-16 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="font-semibold">{booking.vehicle.name}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center">
                                    <Calendar size={14} className="mr-1" />
                                    {booking.startDate} to {booking.endDate}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin size={14} className="mr-1" />
                                    {booking.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="font-semibold">₹{booking.totalAmount}</div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </div>
                              <div className="flex space-x-2">
                                <button className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-lg transition-colors">
                                  <Eye size={16} />
                                </button>
                                <button className="p-2 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-lg transition-colors">
                                  <Download size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Car size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Start your journey by booking your first vehicle
                      </p>
                      <Link to="/browse" className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-elegant hover:shadow-elegant-md tracking-wide text-xs uppercase">
                        Browse Vehicles
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {user?.name?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{user?.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
                        <button className="text-primary-500 hover:text-primary-600 text-sm mt-1">
                          Change photo
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          value={user?.name || ''}
                          className="input-elegant"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="input-elegant"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="input-elegant"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date of Birth</label>
                        <input
                          type="date"
                          className="input-elegant"
                        />
                      </div>
                    </div>

                    <button className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-elegant hover:shadow-elegant-md tracking-wide text-xs uppercase">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Payment History</h2>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{booking.vehicle.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {booking.startDate} - Payment ID: #PAY{booking.id}001
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">₹{booking.totalAmount}</div>
                            <div className="text-sm text-green-600 dark:text-green-400">Paid</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span>Email notifications</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>SMS notifications</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>Booking reminders</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Privacy</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span>Profile visibility</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span>Share data for improvements</span>
                          <input type="checkbox" className="rounded" />
                        </label>
                      </div>
                    </div>

                    <button className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-elegant hover:shadow-elegant-md tracking-wide text-xs uppercase">
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

