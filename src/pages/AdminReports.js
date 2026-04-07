import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Flag } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import { adminServices } from '../firebase/services';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = adminServices.listenToReports((reportsData) => {
      setReports(reportsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const priorityStyle = (priority) => {
    if (priority === 'high') return 'bg-red-500/10 text-red-400 border border-red-500/20';
    if (priority === 'medium') return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
  };

  const statusStyle = (status) => {
    if (status === 'resolved' || status === 'closed') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    if (status === 'in_progress') return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Reports" />
      <div className="container-elegant py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">Reports & Complaints</h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">Review and manage user-submitted reports</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400">
            Total: <span className="text-neutral-900 dark:text-neutral-100 font-semibold">{reports.length}</span>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-16 text-center">
            <Flag size={40} className="text-neutral-700 mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400">No reports found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${priorityStyle(report.priority || 'medium')}`}>
                        {report.priority || 'medium'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyle(report.status)}`}>
                        {report.status || 'open'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1 truncate">
                      {report.subject || 'No subject'}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-2">
                      {report.description || 'No description'}
                    </p>
                    <p className="text-neutral-600 text-xs">
                      Type: {report.type || 'N/A'} &bull;{' '}
                      {report.createdAt
                        ? new Date(report.createdAt.seconds * 1000).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <button
                    className="p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors flex-shrink-0"
                    title="View Details"
                  >
                    <Eye size={18} className="text-neutral-700 dark:text-neutral-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
