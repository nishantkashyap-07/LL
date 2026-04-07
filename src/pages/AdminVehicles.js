import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import { adminServices } from '../firebase/services';
import toast from 'react-hot-toast';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = adminServices.listenToVehicles((data) => { setVehicles(data); setLoading(false); });
    return () => unsub();
  }, []);

  const handleApprove = async (id) => {
    const r = await adminServices.updateVehicleStatus(id, 'approved', { isActive: true });
    r.success ? toast.success('Vehicle approved') : toast.error('Failed to approve vehicle');
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this vehicle listing?')) return;
    const r = await adminServices.updateVehicleStatus(id, 'rejected', { isActive: false });
    r.success ? toast.success('Vehicle rejected') : toast.error('Failed to reject vehicle');
  };

  if (loading) return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Vehicle Management" />

      <div className="container-elegant py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">Vehicle Management</h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">Review and approve vehicle listings</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{vehicles.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">Total Vehicles</p>
          </div>
        </div>

        <div className="space-y-4">
          {vehicles.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-16 text-center">
              <p className="text-neutral-600 text-sm">No vehicles found</p>
            </div>
          ) : (
            vehicles.map((vehicle, i) => (
              <motion.div key={vehicle.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-neutral-200 dark:border-neutral-700 transition-all">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={vehicle.image || vehicle.images?.[0] || '/images/vehicles/hondo-activa-6G.png'}
                      alt={vehicle.name}
                      className="w-20 h-14 object-cover rounded-lg flex-shrink-0 bg-neutral-100 dark:bg-neutral-800"
                    />
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{vehicle.name || vehicle.model || 'N/A'}</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">Seller: {vehicle.sellerName || vehicle.ownerId || 'N/A'}</p>
                      <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mt-0.5">₹{vehicle.price || vehicle.pricePerDay || 0}/day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                      vehicle.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>{vehicle.status}</span>
                    {vehicle.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(vehicle.id)} className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors">
                          <CheckCircle size={16} className="text-emerald-400" />
                        </button>
                        <button onClick={() => handleReject(vehicle.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                          <XCircle size={16} className="text-red-400" />
                        </button>
                      </>
                    )}
                    <button className="p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                      <Eye size={16} className="text-neutral-600 dark:text-neutral-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminVehicles;
