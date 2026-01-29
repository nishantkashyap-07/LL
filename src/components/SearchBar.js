import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Car, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
    vehicleType: 'all'
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to browse page with search parameters
    const params = new URLSearchParams(searchData);
    navigate(`/browse?${params.toString()}`);
  };

  const vehicleTypes = [
    { value: 'all', label: 'All Vehicles', icon: '🚗' },
    { value: 'bike', label: 'Bikes', icon: '🏍️' },
    { value: 'scooty', label: 'Scooties', icon: '🛵' },
    { value: 'car', label: 'Cars', icon: '🚙' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-8 shadow-2xl max-w-6xl mx-auto"
    >
      <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Location */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-neutral-300 mb-3">
            Pickup Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter city or area..."
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              className="w-full pl-12 pr-4 py-4 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 text-white placeholder:text-neutral-400 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Pickup Date */}
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-3">
            Pickup Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="date"
              value={searchData.pickupDate}
              onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
              className="w-full pl-12 pr-4 py-4 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 text-white backdrop-blur-sm"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-3">
            Return Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="date"
              value={searchData.returnDate}
              onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
              className="w-full pl-12 pr-4 py-4 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 text-white backdrop-blur-sm"
              min={searchData.pickupDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-3">
            Vehicle Type
          </label>
          <div className="relative">
            <Car className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <select
              value={searchData.vehicleType}
              onChange={(e) => setSearchData({ ...searchData, vehicleType: e.target.value })}
              className="w-full pl-12 pr-4 py-4 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 text-white backdrop-blur-sm appearance-none cursor-pointer"
            >
              {vehicleTypes.map((type) => (
                <option key={type.value} value={type.value} className="bg-neutral-800 text-white">
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:flex lg:items-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-white hover:bg-neutral-100 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center h-14"
          >
            <Search className="w-5 h-5 mr-3" />
            Search Vehicles
          </motion.button>
        </div>
      </form>

      {/* Quick Filters */}
      <div className="mt-8 pt-6 border-t border-neutral-800/50">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-neutral-400 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Quick Filters:
          </span>
          {[
            { label: 'Today', action: () => {
              const today = new Date().toISOString().split('T')[0];
              setSearchData(prev => ({ ...prev, pickupDate: today }));
            }},
            { label: 'This Weekend', action: () => {
              const today = new Date();
              const weekend = new Date(today);
              weekend.setDate(today.getDate() + (6 - today.getDay()));
              setSearchData(prev => ({ ...prev, pickupDate: weekend.toISOString().split('T')[0] }));
            }},
            { label: 'Bikes Only', action: () => setSearchData(prev => ({ ...prev, vehicleType: 'bike' })) },
            { label: 'Cars Only', action: () => setSearchData(prev => ({ ...prev, vehicleType: 'car' })) }
          ].map((filter, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={filter.action}
              className="px-4 py-2 text-sm bg-neutral-800/50 hover:bg-neutral-700/50 text-neutral-300 hover:text-white rounded-xl transition-all duration-300 font-medium backdrop-blur-sm border border-neutral-700/30"
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;

