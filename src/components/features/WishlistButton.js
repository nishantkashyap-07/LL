import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { wishlistServices } from '../../firebase/services';
import toast from 'react-hot-toast';

const WishlistButton = ({ vehicleId, className = '', compact = false }) => {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !vehicleId) return;
    wishlistServices.isInWishlist(user.id, vehicleId).then(res => {
      if (res.success) setIsWishlisted(res.data);
    });
  }, [user, vehicleId]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast.error('Please login to save vehicles'); return; }
    setLoading(true);
    try {
      if (isWishlisted) {
        await wishlistServices.removeFromWishlist(user.id, vehicleId);
        setIsWishlisted(false);
        toast.success('Removed from wishlist');
      } else {
        await wishlistServices.addToWishlist(user.id, vehicleId);
        setIsWishlisted(true);
        toast.success('Added to wishlist');
      }
    } catch {
      toast.error('Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleWishlist}
      disabled={loading}
      className={`transition-colors ${compact ? 'p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 hover:bg-black/60' : 'p-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl'} ${className}`}
    >
      <motion.div
        animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? 'text-error-400 fill-current' : 'text-neutral-400 hover:text-error-400'
          }`}
        />
      </motion.div>
    </motion.button>
  );
};

export default WishlistButton;
