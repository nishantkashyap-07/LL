import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { sellerServices, vehicleServices } from '../firebase/services';
import toast from 'react-hot-toast';

const SellerVehicles = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!user) { setLoading(false); return; }
      try {
        const result = await sellerServices.getSellerVehicles(user.id);
        if (result.success) setVehicles(result.data);
        else toast.error('Failed to load vehicles');
      } catch (err) {
        console.error(err);
        toast.error('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      const result = await vehicleServices.deleteVehicle(id);
      if (result.success) {
        setVehicles(vehicles.filter(v => v.id !== id));
        toast.success('Vehicle deleted successfully');
      } else {
        toast.error('Failed to delete vehicle');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete vehicle');
    }
  };

  if (loading) return <div className="pt-20 min-h-screen bg-neutral-950 flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="My Vehicles" description="Manage your vehicle listings" />

      <div className="container-elegant py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">My Vehicles</h1>
            <p className="text-neutral-500 text-sm">Manage your vehicle listings</p>
          </div>
          <Link to="/seller/vehicles/new">
            <button className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
              <Plus size={16} /> Add Vehicle
            </button>
          </Link>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-16 text-center">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-base font-semibold text-neutral-300 mb-2">No vehicles listed yet</h3>
            <p className="text-sm text-neutral-600 mb-6">Add your first vehicle to start earning</p>
            <Link to="/seller/vehicles/new">
              <button className="bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                Add Vehicle
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vehicles.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all"
              >
                <div className="relative aspect-video bg-neutral-800">
                  {vehicle.image && <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${vehicle.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'}`}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-neutral-500 mb-0.5">{vehicle.type}</p>
                  <h3 className="text-base font-bold text-neutral-100 mb-1">{vehicle.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
                    <span>★ {vehicle.rating}</span>
                    <span>·</span>
                    <span>{vehicle.bookings} bookings</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                    <div>
                      <p className="text-xs text-neutral-500">Per day</p>
                      <p className="text-lg font-bold text-neutral-100">₹{vehicle.pricePerDay}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Link to={`/vehicles/${vehicle.id}`}>
                        <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">
                          <Eye size={15} className="text-neutral-400" />
                        </button>
                      </Link>
                      <Link to={`/seller/vehicles/${vehicle.id}/edit`}>
                        <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors">
                          <Edit size={15} className="text-neutral-400" />
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(vehicle.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                        <Trash2 size={15} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerVehicles;
