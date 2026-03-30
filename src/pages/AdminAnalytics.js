import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Car, DollarSign, Calendar, BarChart2 } from 'lucide-react';
import { Container, Card, Stack } from '../components/Layout';
import MetaTags from '../components/SEO/MetaTags';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { adminServices } from '../firebase/services';

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminServices.getAnalyticsData().then(result => {
      if (result.success) setData(result.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const stats = [
    { label: 'Total Users', value: data?.totalUsers || 0, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Vehicles', value: data?.totalVehicles || 0, icon: Car, color: 'from-green-500 to-green-600' },
    { label: 'Total Bookings', value: data?.totalBookings || 0, icon: Calendar, color: 'from-purple-500 to-purple-600' },
    {
      label: 'Total Revenue',
      value: `₹${(data?.totalRevenue || 0).toLocaleString()}`,
      sub: data?.revenueChange > 0 ? `+${data.revenueChange}% vs last month` : `${data?.revenueChange || 0}% vs last month`,
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const monthlyRevenue = data?.monthlyRevenue || [];
  const monthlyBookings = data?.monthlyBookings || [];
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue), 1);
  const maxBookings = Math.max(...monthlyBookings.map(m => m.bookings), 1);
  const typeBreakdown = Object.entries(data?.typeBreakdown || {});
  const statusBreakdown = Object.entries(data?.statusBreakdown || {});

  const statusColors = {
    pending: 'bg-yellow-500',
    confirmed: 'bg-blue-500',
    active: 'bg-green-500',
    completed: 'bg-neutral-500',
    cancelled: 'bg-red-500'
  };

  return (
    <div className="pt-20 min-h-screen">
      <MetaTags title="Analytics - Admin" />
      <Container size="xl" className="py-12">
        <Stack spacing="xl">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Analytics</h1>
            <p className="text-sm text-neutral-400">Live data from Firebase</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-neutral-400 mb-1 truncate">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-white truncate">{stat.value}</p>
                      {stat.sub && <p className="text-xs text-neutral-500 mt-0.5 truncate">{stat.sub}</p>}
                    </div>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 ml-2`}>
                      <stat.icon size={20} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue */}
            <Card variant="glass" padding="lg">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart2 size={18} className="text-primary-400" />
                <h2 className="text-lg font-semibold text-white">Monthly Revenue</h2>
              </div>
              {monthlyRevenue.every(m => m.revenue === 0) ? (
                <div className="h-40 flex items-center justify-center text-neutral-500 text-sm">No revenue data yet</div>
              ) : (
                <div className="flex items-end space-x-2 h-40">
                  {monthlyRevenue.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="text-[10px] text-neutral-400 mb-1">
                        {m.revenue > 0 ? `₹${(m.revenue / 1000).toFixed(0)}k` : ''}
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max((m.revenue / maxRevenue) * 100, 4)}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="w-full bg-primary-700 hover:bg-primary-600 rounded-t-md transition-colors"
                      />
                      <div className="text-[10px] text-neutral-500 mt-1">{m.month}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Monthly Bookings */}
            <Card variant="glass" padding="lg">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp size={18} className="text-secondary-400" />
                <h2 className="text-lg font-semibold text-white">Monthly Bookings</h2>
              </div>
              {monthlyBookings.every(m => m.bookings === 0) ? (
                <div className="h-40 flex items-center justify-center text-neutral-500 text-sm">No booking data yet</div>
              ) : (
                <div className="flex items-end space-x-2 h-40">
                  {monthlyBookings.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="text-[10px] text-neutral-400 mb-1">
                        {m.bookings > 0 ? m.bookings : ''}
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max((m.bookings / maxBookings) * 100, 4)}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="w-full bg-secondary-700 hover:bg-secondary-600 rounded-t-md transition-colors"
                      />
                      <div className="text-[10px] text-neutral-500 mt-1">{m.month}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Vehicle Type Breakdown */}
            <Card variant="glass" padding="lg">
              <h2 className="text-lg font-semibold text-white mb-4">Vehicle Types</h2>
              {typeBreakdown.length === 0 ? (
                <p className="text-neutral-500 text-sm">No vehicles yet</p>
              ) : (
                <div className="space-y-3">
                  {typeBreakdown.map(([type, count]) => {
                    const total = typeBreakdown.reduce((s, [, c]) => s + c, 0);
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-300 capitalize">{type}</span>
                          <span className="text-neutral-400">{count} ({pct}%)</span>
                        </div>
                        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-primary-600 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Booking Status Breakdown */}
            <Card variant="glass" padding="lg">
              <h2 className="text-lg font-semibold text-white mb-4">Booking Status</h2>
              {statusBreakdown.length === 0 ? (
                <p className="text-neutral-500 text-sm">No bookings yet</p>
              ) : (
                <div className="space-y-3">
                  {statusBreakdown.map(([status, count]) => {
                    const total = statusBreakdown.reduce((s, [, c]) => s + c, 0);
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-300 capitalize">{status}</span>
                          <span className="text-neutral-400">{count} ({pct}%)</span>
                        </div>
                        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8 }}
                            className={`h-full rounded-full ${statusColors[status] || 'bg-neutral-600'}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </Stack>
      </Container>
    </div>
  );
};

export default AdminAnalytics;
