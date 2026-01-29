import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const WishlistButton = ({ vehicleId, className = '' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if vehicle is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('livinlease_wishlist') || '[]');
    setIsWishlisted(wishlist.includes(vehicleId));
  }, [vehicleId]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const wishlist = JSON.parse(localStorage.getItem('livinlease_wishlist') || '[]');
      
      if (isWishlisted) {
        // Remove from wishlist
        const newWishlist = wishlist.filter(id => id !== vehicleId);
        localStorage.setItem('livinlease_wishlist', JSON.stringify(newWishlist));
        setIsWishlisted(false);
        toast.success('Removed from wishlist');
      } else {
        // Add to wishlist
        const newWishlist = [...wishlist, vehicleId];
        localStorage.setItem('livinlease_wishlist', JSON.stringify(newWishlist));
        setIsWishlisted(true);
        toast.success('Added to wishlist');
      }
      
      setLoading(false);
    }, 300);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleWishlist}
      disabled={loading}
      className={`p-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-neutral-800 transition-all shadow-elegant ${className}`}
    >
      <motion.div
        animate={{
          scale: isWishlisted ? [1, 1.3, 1] : 1,
          rotate: isWishlisted ? [0, 10, -10, 0] : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${
            isWishlisted 
              ? 'text-error-500 fill-current' 
              : 'text-neutral-600 dark:text-neutral-300 hover:text-error-500'
          }`}
        />
      </motion.div>
    </motion.button>
  );
};

export default WishlistButton;

