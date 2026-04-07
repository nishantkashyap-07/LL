import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Ban, CheckCircle, Eye, Trash2, UserCheck } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import { adminServices } from '../firebase/services';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = adminServices.listenToUsers((data) => { setUsers(data); setLoading(false); });
    return () => unsub();
  }, []);

  const handleBan = async (id) => {
    if (!window.confirm('Ban this user?')) return;
    const r = await adminServices.updateUserStatus(id, { status: 'banned', isBanned: true });
    r.success ? toast.success('User banned') : toast.error('Failed to ban user');
  };

  const handleUnban = async (id) => {
    const r = await adminServices.updateUserStatus(id, { status: 'active', isBanned: false });
    r.success ? toast.success('User unbanned') : toast.error('Failed to unban user');
  };

  const handleVerify = async (id) => {
    const r = await adminServices.updateUserStatus(id, { status: 'active', isVerified: true });
    r.success ? toast.success('User verified') : toast.error('Failed to verify user');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    const r = await adminServices.deleteUser(id);
    r.success ? toast.success('User deleted') : toast.error('Failed to delete user');
  };

  const getStatusStyle = (u) => {
    if (u.isBanned) return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (u.isVerified || u.emailVerified) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  const getStatusText = (u) => u.isBanned ? 'banned' : (u.isVerified || u.emailVerified) ? 'active' : 'pending';

  const formatDate = (ts) => {
    if (!ts) return 'N/A';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString();
  };

  const filtered = users.filter(u => {
    const matchSearch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const role = u.isSeller ? 'seller' : 'buyer';
    return matchSearch && (filterRole === 'all' || role === filterRole);
  });

  if (loading) return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="User Management" description="Manage platform users" />

      <div className="container-elegant py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">User Management</h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">Manage all platform users</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{users.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">Total Users</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {['all', 'buyer', 'seller'].map((role) => (
              <button key={role} onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${filterRole === role ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700'}`}>
                {role}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 dark:text-neutral-500 focus:outline-none focus:border-neutral-300 dark:border-neutral-600" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  {['User', 'Role', 'Status', 'Bookings', 'Joined', 'Actions'].map((h) => (
                    <th key={h} className={`px-5 py-3.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filtered.map((u, i) => (
                  <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-neutral-100 dark:bg-neutral-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{u.name || 'N/A'}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500">{u.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-medium capitalize">{u.isSeller ? 'seller' : 'buyer'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getStatusStyle(u)}`}>{getStatusText(u)}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-neutral-700 dark:text-neutral-300">{u.bookingsCount || 0}</td>
                    <td className="px-5 py-4 text-xs text-neutral-500 dark:text-neutral-500">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"><Eye size={14} className="text-neutral-600 dark:text-neutral-400" /></button>
                        {!u.isBanned && !u.isVerified && !u.emailVerified && (
                          <button onClick={() => handleVerify(u.id)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors"><UserCheck size={14} className="text-emerald-400" /></button>
                        )}
                        {!u.isBanned
                          ? <button onClick={() => handleBan(u.id)} className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors"><Ban size={14} className="text-amber-400" /></button>
                          : <button onClick={() => handleUnban(u.id)} className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors"><CheckCircle size={14} className="text-emerald-400" /></button>
                        }
                        <button onClick={() => handleDelete(u.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 size={14} className="text-red-400" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
