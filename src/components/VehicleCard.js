import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, Fuel, Users, Settings, MapPin, Shield, Heart
} from 'lucide-react';

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
        return 'bg-blue-500';
      case 'scooty':
        return 'bg-green-500';
      case 'car':
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-64 object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {/* Vehicle Type Badge */}
        <div className="absolute top-4 left-4">
          <div className={`${getVehicleColor(vehicle.type)} px-3 py-1.5 rounded-full flex items-center space-x-1.5`}>
            <span className="text-sm">{getVehicleIcon(vehicle.type)}</span>
            <span className="text-white text-sm font-medium capitalize">{vehicle.type}</span>
          </div>
        </div>
        
        {/* Wishlist Button */}
        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-black/30 transition-all">
            <Heart className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Status Indicators */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="flex items-center bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
            <span className="text-white text-xs font-medium">Available</span>
          </div>
          <div className="flex items-center bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <Shield className="w-3 h-3 text-green-400 mr-1" />
            <span className="text-white text-xs font-medium">Verified</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">
              {vehicle.name}
            </h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-white ml-1">{vehicle.rating}</span>
                <span className="text-sm text-neutral-400 ml-1">({vehicle.reviews})</span>
              </div>
              {vehicle.location && (
                <div className="flex items-center text-sm text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  <span>{vehicle.location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              ₹{vehicle.price}
            </div>
            <div className="text-sm text-neutral-400 font-medium">per day</div>
          </div>
        </div>

        {/* Specifications */}
        {vehicle.specs && (
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-800">
            {vehicle.specs.fuel && (
              <div className="text-center">
                <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Fuel className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="text-xs text-neutral-500 mb-1">Fuel</div>
                <div className="text-sm font-medium text-white">{vehicle.specs.fuel}</div>
              </div>
            )}
            {vehicle.specs.transmission && (
              <div className="text-center">
                <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Settings className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="text-xs text-neutral-500 mb-1">Transmission</div>
                <div className="text-sm font-medium text-white">{vehicle.specs.transmission}</div>
              </div>
            )}
            {vehicle.specs.seats && (
              <div className="text-center">
                <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="text-xs text-neutral-500 mb-1">Seats</div>
                <div className="text-sm font-medium text-white">{vehicle.specs.seats} Seater</div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-200 text-center text-sm"
          >
            Details
          </Link>
          <Link
            to={`/vehicle/${vehicle.id}?book=true`}
            className="flex-1 bg-white hover:bg-neutral-100 text-black font-semibold py-3 px-4 rounded-2xl transition-all duration-200 text-center text-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;

