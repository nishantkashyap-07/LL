import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, SlidersHorizontal, X, Search, Car, Bike } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import Pagination from '../components/ui/Pagination';
import { useLocation } from 'react-router-dom';
import { vehicleServices } from '../firebase/services';

const BrowseVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: [0, 5000],
    rating: 0,
    brand: 'all',
    fuel: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const itemsPerPage = 9;
  const location = useLocation();

  const fallbackVehicles = [
    { id: 1, name: 'Honda Activa 6G', type: 'scooty', brand: 'Honda', image: '/images/vehicles/hondo-activa-6G.png', price: 299, rating: 4.8, reviews: 124, specs: { fuel: 'Petrol', mileage: '60 kmpl', engine: '109.51cc' } },
    { id: 2, name: 'Maruti Swift', type: 'car', brand: 'Maruti', image: '/images/vehicles/maruti-swift.jpg', price: 1299, rating: 4.9, reviews: 89, specs: { fuel: 'Petrol', seats: 5, transmission: 'Automatic' } },
    { id: 3, name: 'Royal Enfield Classic', type: 'bike', brand: 'Royal Enfield', image: '/images/vehicles/royal-enfield.jpg', price: 899, rating: 4.7, reviews: 156, specs: { fuel: 'Petrol', engine: '349cc', transmission: 'Manual' } },
    { id: 4, name: 'TVS Jupiter', type: 'scooty', brand: 'TVS', image: '/images/vehicles/activa-6G-2.png', price: 279, rating: 4.6, reviews: 98, specs: { fuel: 'Petrol', mileage: '62 kmpl', engine: '109.7cc' } },
    { id: 5, name: 'Hyundai i20', type: 'car', brand: 'Hyundai', image: '/images/vehicles/maruti-swift.jpg', price: 1499, rating: 4.8, reviews: 67, specs: { fuel: 'Petrol', seats: 5, transmission: 'Manual' } },
    { id: 6, name: 'KTM Duke 200', type: 'bike', brand: 'KTM', image: '/images/vehicles/royal-enfield.jpg', price: 999, rating: 4.9, reviews: 203, specs: { fuel: 'Petrol', engine: '199.5cc', transmission: 'Manual' } }
  ];

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const result = await vehicleServices.getAllVehicles();
        const data = result.success && result.data.length > 0 ? result.data : fallbackVehicles;
        setVehicles(data);
        setFilteredVehicles(data);
      } catch {
        setVehicles(fallbackVehicles);
        setFilteredVehicles(fallbackVehicles);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();

    const params = new URLSearchParams(location.search);
    const vehicleType = params.get('vehicleType');
    if (vehicleType && vehicleType !== 'all') {
      setFilters(prev => ({ ...prev, type: vehicleType }));
    }
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let filtered = [...vehicles];
    if (searchQuery) {
      filtered = filtered.filter(v =>
        v.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.type !== 'all') filtered = filtered.filter(v => v.type === filters.type);
    if (filters.brand !== 'all') filtered = filtered.filter(v => v.brand === filters.brand);
    if (filters.rating > 0) filtered = filtered.filter(v => v.rating >= filters.rating);
    filtered = filtered.filter(v => v.price >= filters.priceRange[0] && v.price <= filters.priceRange[1]);
    filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name?.localeCompare(b.name);
    });
    setFilteredVehicles(filtered);
    setCurrentPage(1);
  }, [filters, vehicles, searchQuery, sortBy]);

  const brands = ['all', ...new Set(vehicles.map(v => v.brand).filter(Boolean))];
  const vehicleTypes = [
    { value: 'all', label: 'All Vehicles', icon: <Car className="w-4 h-4" /> },
    { value: 'bike', label: 'Bikes', icon: <Bike className="w-4 h-4" /> },
    { value: 'scooty', label: 'Scooties', icon: <Bike className="w-4 h-4" /> },
    { value: 'car', label: 'Cars', icon: <Car className="w-4 h-4" /> }
  ];
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' }
  ];

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => setFilters({ type: 'all', priceRange: [0, 5000], rating: 0, brand: 'all', fuel: 'all' });

  const SkeletonCard = () => (
    <div className="card-minimal animate-pulse">
      <div className="bg-neutral-100 dark:bg-neutral-800 h-52 rounded-xl mb-4"></div>
      <div className="space-y-3">
        <div className="bg-neutral-100 dark:bg-neutral-800 h-5 w-3/4 rounded"></div>
        <div className="bg-neutral-100 dark:bg-neutral-800 h-4 w-1/2 rounded"></div>
        <div className="bg-neutral-100 dark:bg-neutral-800 h-10 w-full rounded-xl mt-4"></div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container-elegant py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <h1 className="text-3xl font-bold mb-1">
              Browse <span className="text-gradient">Vehicles</span>
            </h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">
              {loading ? 'Loading vehicles...' : `${filteredVehicles.length} vehicles available`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.1 }}
            className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full md:w-auto"
          >
            {/* Search */}
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 dark:text-neutral-500 focus:outline-none focus:border-neutral-300 dark:border-neutral-600 w-full lg:w-48"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-neutral-300 dark:border-neutral-600"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {/* View Toggle */}
            <div className="flex items-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-neutral-700 text-white' : 'text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300'}`}>
                <Grid size={16} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-neutral-700 text-white' : 'text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300'}`}>
                <List size={16} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${showFilters ? 'bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-white' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-200 dark:border-neutral-700'}`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence mode="wait">
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="flex-shrink-0 overflow-hidden w-full lg:w-auto"
              >
                <div className="card-minimal lg:sticky lg:top-24 w-full lg:w-[280px]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="p-1.5 hover:bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-colors text-neutral-600 dark:text-neutral-400">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Vehicle Type */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">Vehicle Type</label>
                      <div className="space-y-1">
                        {vehicleTypes.map(type => (
                          <button
                            key={type.value}
                            onClick={() => setFilters({ ...filters, type: type.value })}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${filters.type === type.value ? 'bg-neutral-700 text-white' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:bg-neutral-800 hover:text-neutral-800 dark:text-neutral-200'}`}
                          >
                            {type.icon}
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">
                        Max Price: <span className="text-neutral-800 dark:text-neutral-200">₹{filters.priceRange[1]}/day</span>
                      </label>
                      <input
                        type="range" min="0" max="5000" step="100"
                        value={filters.priceRange[1]}
                        onChange={e => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                        className="w-full accent-neutral-400"
                      />
                      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                        <span>₹0</span><span>₹5000</span>
                      </div>
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">Brand</label>
                      <select
                        value={filters.brand}
                        onChange={e => setFilters({ ...filters, brand: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none"
                      >
                        {brands.map(b => <option key={b} value={b}>{b === 'all' ? 'All Brands' : b}</option>)}
                      </select>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">Min Rating</label>
                      <div className="space-y-1">
                        {[{ v: 0, l: 'Any Rating' }, { v: 3, l: '3+ Stars' }, { v: 4, l: '4+ Stars' }, { v: 4.5, l: '4.5+ Stars' }].map(r => (
                          <button
                            key={r.v}
                            onClick={() => setFilters({ ...filters, rating: r.v })}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${filters.rating === r.v ? 'bg-neutral-700 text-white' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:bg-neutral-800 hover:text-neutral-800 dark:text-neutral-200'}`}
                          >
                            {r.l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={clearFilters} className="w-full py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:border-neutral-600 rounded-lg transition-colors">
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vehicles Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paginatedVehicles.length > 0 ? (
              <>
                <motion.div
                  layout
                  className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedVehicles.map((vehicle, index) => (
                      <motion.div
                        key={vehicle.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.08,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <VehicleCard vehicle={vehicle} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={filteredVehicles.length} itemsPerPage={itemsPerPage} />
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-6"
                >
                  <Car className="w-10 h-10 text-neutral-500" />
                </motion.div>
                <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">No vehicles found</h3>
                <p className="text-neutral-500 dark:text-neutral-500 mb-6 max-w-sm">Try adjusting your filters or search query to see more results.</p>
                <button onClick={clearFilters} className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-sm font-medium transition-colors border border-neutral-200 dark:border-neutral-700">
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseVehicles;
