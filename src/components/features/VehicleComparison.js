import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Star, Fuel, Users, Settings } from 'lucide-react';
import Modal from '../ui/Modal';

const VehicleComparison = ({ isOpen, onClose, vehicles = [] }) => {
  const [compareList, setCompareList] = useState(vehicles.slice(0, 3));

  const removeVehicle = (vehicleId) => {
    setCompareList(prev => prev.filter(v => v.id !== vehicleId));
  };

  const addVehicle = (vehicle) => {
    if (compareList.length < 3) {
      setCompareList(prev => [...prev, vehicle]);
    }
  };

  const comparisonFeatures = [
    { key: 'price', label: 'Price per Day', format: (value) => `₹${value}` },
    { key: 'rating', label: 'Rating', format: (value) => (
      <div className="flex items-center">
        <Star className="w-4 h-4 text-warning-400 fill-current mr-1" />
        {value}
      </div>
    )},
    { key: 'type', label: 'Vehicle Type', format: (value) => value.charAt(0).toUpperCase() + value.slice(1) },
    { key: 'brand', label: 'Brand', format: (value) => value },
    { key: 'specs.fuel', label: 'Fuel Type', format: (value) => value || 'N/A' },
    { key: 'specs.seats', label: 'Seating', format: (value) => value ? `${value} seats` : 'N/A' },
    { key: 'specs.transmission', label: 'Transmission', format: (value) => value || 'N/A' },
    { key: 'specs.mileage', label: 'Mileage', format: (value) => value || 'N/A' }
  ];

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" title="Compare Vehicles">
      <div className="space-y-6">
        {compareList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2">No vehicles to compare</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Add vehicles to start comparing their features and specifications.
            </p>
          </div>
        ) : (
          <>
            {/* Vehicle Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {compareList.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-minimal relative"
                >
                  <button
                    onClick={() => removeVehicle(vehicle.id)}
                    className="absolute top-2 right-2 p-1 bg-error-100 dark:bg-error-900/20 text-error-600 dark:text-error-400 rounded-full hover:bg-error-200 dark:hover:bg-error-900/40 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <img
                    src={vehicle.image || vehicle.images?.[0]}
                    alt={vehicle.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  
                  <h3 className="font-semibold text-lg mb-2">{vehicle.name}</h3>
                  <div className="text-2xl font-bold text-primary-500 mb-2">
                    ₹{vehicle.price}
                    <span className="text-sm font-normal text-neutral-500 ml-1">per day</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-warning-400 fill-current mr-1" />
                      {vehicle.rating}
                    </div>
                    <span className="capitalize">{vehicle.type}</span>
                  </div>
                </motion.div>
              ))}
              
              {/* Add Vehicle Slot */}
              {compareList.length < 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-minimal border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center min-h-[200px]"
                >
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-neutral-500 dark:text-neutral-400">Add Vehicle</p>
                    <p className="text-xs text-neutral-400">Up to 3 vehicles</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Comparison Table */}
            {compareList.length > 1 && (
              <div className="card-minimal overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Feature Comparison</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-4 font-medium">Feature</th>
                      {compareList.map((vehicle) => (
                        <th key={vehicle.id} className="text-left py-3 px-4 font-medium">
                          {vehicle.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={feature.key} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                          {feature.label}
                        </td>
                        {compareList.map((vehicle) => {
                          const value = getNestedValue(vehicle, feature.key);
                          return (
                            <td key={vehicle.id} className="py-3 px-4">
                              {feature.format(value)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Features Comparison */}
            {compareList.length > 1 && (
              <div className="card-minimal">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <div className="space-y-4">
                  {compareList.map((vehicle, index) => (
                    <div key={vehicle.id}>
                      <h4 className="font-medium mb-2">{vehicle.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features?.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default VehicleComparison;

