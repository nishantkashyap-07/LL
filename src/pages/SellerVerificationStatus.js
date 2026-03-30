import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';
import { useAuth } from '../contexts/AuthContext';
import { sellerServices } from '../firebase/services';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const statusConfig = {
  pending:  { icon: Clock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', title: 'Verification Pending', message: "Your application is under review. We'll notify you once it's processed." },
  approved: { icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', title: 'Verification Approved', message: 'Congratulations! Your seller account has been verified. You can now list vehicles.' },
  rejected: { icon: XCircle, color: 'text-red-400 bg-red-500/10 border-red-500/20', title: 'Verification Rejected', message: 'Unfortunately, your application was rejected. Please review the feedback and reapply.' },
};

const timeline = [
  { step: 'Application Submitted', date: '2024-02-15', done: true },
  { step: 'Document Verification', date: '2024-02-16', done: true },
  { step: 'Background Check', date: 'In Progress', done: false },
  { step: 'Final Approval', date: 'Pending', done: false },
];

const SellerVerificationStatus = () => {
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!user) return;
      try {
        const result = await sellerServices.getApplicationByUserId(user.id);
        if (result.success) setApplication(result.data);
        else toast.error('No application found');
      } catch (err) {
        console.error(err);
        toast.error('Failed to load application status');
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [user]);

  if (loading) return <div className="pt-20 min-h-screen bg-neutral-950 flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  if (!application) return (
    <div className="pt-20 min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center max-w-sm">
        <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-neutral-100 mb-2">No Application Found</h2>
        <p className="text-neutral-500 text-sm mb-6">You haven't submitted a seller application yet.</p>
        <Link to="/seller/apply">
          <button className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
            Apply Now <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  );

  const status = application.status || 'pending';
  const cfg = statusConfig[status];
  const StatusIcon = cfg.icon;

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="Verification Status" description="Check your seller verification status" />

      <div className="container-elegant py-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-50 mb-1">Verification Status</h1>
          <p className="text-neutral-500 text-sm">Track your seller application progress</p>
        </div>

        {/* Status Card */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className={`bg-neutral-900 border rounded-2xl p-8 text-center mb-5 ${cfg.color}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${cfg.color}`}>
            <StatusIcon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-100 mb-2">{cfg.title}</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">{cfg.message}</p>
        </motion.div>

        {/* Timeline */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-5">
          <h3 className="text-base font-semibold text-neutral-100 mb-5">Application Timeline</h3>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-neutral-800 border border-neutral-700'}`}>
                  {item.done ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-neutral-500" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${item.done ? 'text-neutral-200' : 'text-neutral-500'}`}>{item.step}</p>
                  <p className="text-xs text-neutral-600">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-5">
          <h3 className="text-base font-semibold text-neutral-100 mb-4">Submitted Documents</h3>
          <div className="grid grid-cols-3 gap-3">
            {['Aadhaar Card', 'PAN Card', 'Driving License'].map((doc) => (
              <div key={doc} className="flex items-center justify-between p-3 bg-neutral-800 rounded-xl">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs text-neutral-300">{doc}</span>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {status === 'approved' && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-neutral-200 mb-0.5">Ready to Start Selling?</p>
              <p className="text-xs text-neutral-500">List your first vehicle and start earning today!</p>
            </div>
            <Link to="/seller/vehicles/new">
              <button className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                Add Vehicle <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        )}

        {status === 'rejected' && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
            <p className="text-sm font-semibold text-neutral-200 mb-2">Rejection Reason</p>
            <p className="text-xs text-neutral-500 mb-4">Your documents could not be verified. Please ensure all information is accurate and documents are clear.</p>
            <Link to="/seller/apply">
              <button className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                Reapply <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerVerificationStatus;
