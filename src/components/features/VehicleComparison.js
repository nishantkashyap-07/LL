import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Star } from 'lucide-react';
import Modal from '../ui/Modal';

const VehicleComparison = ({ isOpen, onClose, vehicles = [] }) => {
  const [compareList, setCompareList] = useState(vehicles.slice(0, 3));

  const removeVehicle = (vehicleId) => {
    setCompareList(prev => prev.filter(v => v.id !== vehicleId));
  };

  const comparisonFeatures = [
    { key: 'price', label: 'Price per Day', format: (v) => v ? `₹${v}` : 'N/A' },
    { key: 'rating', label: 'Rating', format: (v) => v ? (
      <div className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />{v}
      </div>
    ) : 'N/A' },
    { key: 'type', label: 'Vehicle Type', format: (v) => v ? v.charAt(0).toUpperCase() + v.slice(1) : 'N/A' },
    { key: 'brand', label: 'Brand', format: (v) => v || 'N/A' },
    { key: 'specs.fuel', label: 'Fuel Type', format: (v) => v || 'N/A' },
    { key: 'specs.seats', label: 'Seating', format: (v) => v ? `${v} seats` : 'N/A' },
    { key: 'specs.transmission', label: 'Transmission', format: (v) => v || 'N/A' },
    { key: 'specs.mileage', label: 'Mileage', format: (v) => v || 'N/A' },
  ];

  const getNestedValue = (obj, path) =>
    path.split('.').reduce((cur, key) => cur?.[key], obj);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" title="Compare Vehicles">
      <div className="space-y-6">
        {compareList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">No vehicles to compare</h3>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">Add vehicles to start comparing their features.</p>
          </div>
        ) : (
          <>
            {/* Vehicle Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {compareList.map((vehicle, index) => (
                <motion.div key={vehicle.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 relative">
                  <button onClick={() => removeVehicle(vehicle.id)}
                    className="absolute top-3 right-3 p-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {(vehicle.image || vehicle.images?.[0]) && (
                    <img src={vehicle.image || vehicle.images?.[0]} alt={vehicle.name}
                      className="w-full h-32 object-cover rounded-xl mb-4" />
                  )}
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">{vehicle.name}</h3>
                  <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    ₹{vehicle.price}<span className="text-xs font-normal text-neutral-500 dark:text-neutral-500 ml-1">/ day</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />{vehicle.rating}
                    </div>
                    <span className="capitalize">{vehicle.type}</span>
                  </div>
                </motion.div>
              ))}

              {compareList.length < 3 && (
                <div className="bg-white dark:bg-neutral-900 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-2xl flex items-center justify-center min-h-[180px]">
                  <div className="text-center">
                    <Plus className="w-7 h-7 text-neutral-600 mx-auto mb-2" />
                    <p className="text-neutral-500 dark:text-neutral-500 text-sm">Add Vehicle</p>
                    <p className="text-xs text-neutral-600">Up to 3 vehicles</p>
                  </div>
                </div>
              )}
            </div>

            {/* Comparison Table */}
            {compareList.length > 1 && (
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Feature Comparison</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-100 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
                        <th className="text-left py-3 px-5 text-xs font-medium text-neutral-600 dark:text-neutral-400">Feature</th>
                        {compareList.map((v) => (
                          <th key={v.id} className="text-left py-3 px-5 text-xs font-medium text-neutral-700 dark:text-neutral-300">{v.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {comparisonFeatures.map((feature) => (
                        <tr key={feature.key}>
                          <td className="py-3 px-5 text-xs font-medium text-neutral-600 dark:text-neutral-400">{feature.label}</td>
                          {compareList.map((v) => (
                            <td key={v.id} className="py-3 px-5 text-sm text-neutral-700 dark:text-neutral-300">
                              {feature.format(getNestedValue(v, feature.key))}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Features */}
            {compareList.length > 1 && (
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Features</h3>
                <div className="space-y-4">
                  {compareList.map((vehicle) => (
                    <div key={vehicle.id}>
                      <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{vehicle.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features?.map((f, idx) => (
                          <span key={idx} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-full">{f}</span>
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
