import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, Eye, Fuel, Users, Settings, MapPin, Shield 
} from 'lucide-react';
import WishlistButton from '../components/features/WishlistButton';

const VehicleCard = ({ vehicle }) => {
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'bike':
        return '🏍️';
      case 'scooty':
        return '🛵';
      case 'car':
        return '🚗';
      default:
        return '🚗';
    }
  };

  const getVehicleColor = (type) => {
    switch (type) {
      case 'bike':
        return 'from-primary-500 to-primary-600';
      case 'scooty':
        return 'from-secondary-500 to-secondary-600';
      case 'car':
        return 'from-accent-500 to-accent-600';
      default:
        return 'from-primary-500 to-primary-600';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="card-elegant group overflow-hidden hover-elegant"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl mb-6">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Vehicle Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`bg-gradient-to-r ${getVehicleColor(vehicle.type)} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
            {getVehicleIcon(vehicle.type)} {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}
          </span>
        </div>
        
        {/* Wishlist Button */}
        <div className="absolute top-4 right-4">
          <WishlistButton vehicleId={vehicle.id} />
        </div>

        {/* Quick Actions - Visible on Hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex space-x-3">
            <Link
              to={`/vehicle/${vehicle.id}`}
              className="flex-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 py-3 px-4 rounded-lg font-medium text-center hover:bg-white dark:hover:bg-neutral-800 transition-all"
            >
              <Eye className="w-4 h-4 inline mr-2" />
              View Details
            </Link>
            <Link
              to={`/vehicle/${vehicle.id}?book=true`}
              className="flex-1 bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-all shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-display font-semibold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors mb-2">
              {vehicle.name}
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-warning-400 fill-current" />
                <span className="text-sm font-semibold ml-1">{vehicle.rating}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-1">
                  ({vehicle.reviews})
                </span>
              </div>
              {vehicle.location && (
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{vehicle.location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-500">
              ₹{vehicle.price}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">per day</div>
          </div>
        </div>

        {/* Features */}
        {vehicle.features && (
          <div className="flex flex-wrap gap-2">
            {vehicle.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full border border-primary-200 dark:border-primary-800"
              >
                {feature}
              </span>
            ))}
            {vehicle.features.length > 3 && (
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium rounded-full">
                +{vehicle.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Specifications */}
        {vehicle.specs && (
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-200 dark:border-neutral-700">
            {vehicle.specs.fuel && (
              <div className="flex flex-col items-center text-center">
                <Fuel className="w-4 h-4 text-neutral-400 mb-1" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Fuel</span>
                <span className="text-sm font-medium">{vehicle.specs.fuel}</span>
              </div>
            )}
            {vehicle.specs.seats && (
              <div className="flex flex-col items-center text-center">
                <Users className="w-4 h-4 text-neutral-400 mb-1" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Seats</span>
                <span className="text-sm font-medium">{vehicle.specs.seats}</span>
              </div>
            )}
            {vehicle.specs.transmission && (
              <div className="flex flex-col items-center text-center">
                <Settings className="w-4 h-4 text-neutral-400 mb-1" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Type</span>
                <span className="text-sm font-medium">{vehicle.specs.transmission}</span>
              </div>
            )}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-4 text-xs text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1 text-success-500" />
              <span>Verified</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-success-500 rounded-full mr-1"></span>
              <span>Available</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to={`/vehicle/${vehicle.id}`}
              className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase"
            >
              Details
            </Link>
            <Link
              to={`/vehicle/${vehicle.id}?book=true`}
              className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-elegant hover:shadow-elegant-md tracking-wide text-xs uppercase"
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;

