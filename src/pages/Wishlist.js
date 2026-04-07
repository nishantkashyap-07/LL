import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Calendar, MapPin, Fuel, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { wishlistServices, vehicleServices } from '../firebase/services';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) { setLoading(false); return; }
      try {
        const result = await wishlistServices.getUserWishlist(user.id);
        if (result.success && result.data.length > 0) {
          const vehicleResults = await Promise.all(result.data.map(id => vehicleServices.getVehicle(id)));
          setWishlist(vehicleResults.filter(r => r.success).map(r => r.data));
        } else if (!result.success) {
          toast.error('Failed to load wishlist');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user]);

  const handleRemove = async (vehicleId) => {
    if (!user) return;
    try {
      const result = await wishlistServices.removeFromWishlist(user.id, vehicleId);
      if (result.success) {
        setWishlist(wishlist.filter(v => v.id !== vehicleId));
        toast.success('Removed from wishlist');
      } else {
        toast.error('Failed to remove from wishlist');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleClearAll = async () => {
    if (!user || !window.confirm('Clear your entire wishlist?')) return;
    try {
      await Promise.all(wishlist.map(v => wishlistServices.removeFromWishlist(user.id, v.id)));
      setWishlist([]);
      toast.success('Wishlist cleared');
    } catch (err) {
      toast.error('Failed to clear wishlist');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="My Wishlist" description="Your saved vehicles" />

      <div className="container-elegant py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">My Wishlist</h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">
              {wishlist.length > 0 ? `${wishlist.length} vehicle${wishlist.length > 1 ? 's' : ''} saved` : 'No vehicles saved yet'}
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-red-400 px-4 py-2.5 rounded-xl text-sm transition-colors"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Loading wishlist..." />
          </div>
        ) : wishlist.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {wishlist.map((vehicle, i) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, x: -60 }}
                  transition={{ delay: i * 0.05 }}
                  layout
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-200 dark:border-neutral-700 transition-all group"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    {vehicle.image && (
                      <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                        <Link to={`/vehicles/${vehicle.id}`} className="flex-1">
                          <button className="w-full bg-neutral-100 hover:bg-white text-neutral-900 font-medium py-2 rounded-lg text-sm transition-colors">
                            View Details
                          </button>
                        </Link>
                        <button onClick={() => handleRemove(vehicle.id)} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${vehicle.available ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        {vehicle.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    <button onClick={() => handleRemove(vehicle.id)} className="absolute top-3 right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Heart size={14} fill="currentColor" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">{vehicle.type}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-amber-400">★</span>
                        <span className="text-neutral-700 dark:text-neutral-300">{vehicle.rating}</span>
                        <span className="text-neutral-600">({vehicle.reviews})</span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">{vehicle.name}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-3">{vehicle.brand}</p>

                    <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500 mb-3">
                      <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" />{vehicle.fuel}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{vehicle.seats} Seats</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{vehicle.transmission}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500 mb-4">
                      <MapPin className="w-3.5 h-3.5" />{vehicle.location}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">Per day</p>
                        <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">₹{vehicle.pricePerDay}</p>
                      </div>
                      <Link to={`/vehicles/${vehicle.id}`}>
                        <button disabled={!vehicle.available} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${vehicle.available ? 'bg-neutral-100 hover:bg-white text-neutral-900' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-500 cursor-not-allowed'}`}>
                          {vehicle.available ? 'Book Now' : 'Unavailable'}
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-16 text-center">
            <Heart className="w-14 h-14 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-6 max-w-sm mx-auto">Start adding vehicles to your wishlist to keep track of your favorites</p>
            <Link to="/browse">
              <button className="bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
                Browse Vehicles
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
