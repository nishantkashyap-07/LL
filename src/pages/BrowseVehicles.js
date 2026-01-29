import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, SlidersHorizontal, X, Search, MapPin } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import Pagination from '../components/ui/Pagination';
import { useLocation } from 'react-router-dom';

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

  // Mock vehicle data
  const mockVehicles = [
    {
      id: 1,
      name: 'Honda Activa 6G',
      type: 'scooty',
      brand: 'Honda',
      image: '/api/placeholder/300/200',
      price: 299,
      rating: 4.8,
      reviews: 124,
      features: ['Fuel Efficient', 'Comfortable', 'Reliable'],
      specs: { fuel: 'Petrol', mileage: '60 kmpl', engine: '109.51cc' }
    },
    {
      id: 2,
      name: 'Maruti Swift',
      type: 'car',
      brand: 'Maruti',
      image: '/api/placeholder/300/200',
      price: 1299,
      rating: 4.9,
      reviews: 89,
      features: ['AC', 'Automatic', '5 Seater'],
      specs: { fuel: 'Petrol', seats: 5, transmission: 'Automatic' }
    },
    {
      id: 3,
      name: 'Royal Enfield Classic',
      type: 'bike',
      brand: 'Royal Enfield',
      image: '/api/placeholder/300/200',
      price: 899,
      rating: 4.7,
      reviews: 156,
      features: ['Powerful', 'Stylish', 'Adventure Ready'],
      specs: { fuel: 'Petrol', engine: '349cc', transmission: 'Manual' }
    },
    {
      id: 4,
      name: 'TVS Jupiter',
      type: 'scooty',
      brand: 'TVS',
      image: '/api/placeholder/300/200',
      price: 279,
      rating: 4.6,
      reviews: 98,
      features: ['Lightweight', 'Economical', 'Easy Handling'],
      specs: { fuel: 'Petrol', mileage: '62 kmpl', engine: '109.7cc' }
    },
    {
      id: 5,
      name: 'Hyundai i20',
      type: 'car',
      brand: 'Hyundai',
      image: '/api/placeholder/300/200',
      price: 1499,
      rating: 4.8,
      reviews: 67,
      features: ['Premium Interior', 'Touchscreen', 'Safety Features'],
      specs: { fuel: 'Petrol', seats: 5, transmission: 'Manual' }
    },
    {
      id: 6,
      name: 'KTM Duke 200',
      type: 'bike',
      brand: 'KTM',
      image: '/api/placeholder/300/200',
      price: 999,
      rating: 4.9,
      reviews: 203,
      features: ['Sporty', 'High Performance', 'ABS'],
      specs: { fuel: 'Petrol', engine: '199.5cc', transmission: 'Manual' }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVehicles(mockVehicles);
      setFilteredVehicles(mockVehicles);
      setLoading(false);
    }, 1000);

    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    const vehicleType = params.get('vehicleType');
    if (vehicleType && vehicleType !== 'all') {
      setFilters(prev => ({ ...prev, type: vehicleType }));
    }
  }, [location.search]);

  useEffect(() => {
    // Apply filters and search
    let filtered = vehicles;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.type === filters.type);
    }

    // Brand filter
    if (filters.brand !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.brand === filters.brand);
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(vehicle => vehicle.rating >= filters.rating);
    }

    // Price filter
    filtered = filtered.filter(
      vehicle => vehicle.price >= filters.priceRange[0] && vehicle.price <= filters.priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredVehicles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, vehicles, searchQuery, sortBy]);

  const brands = ['all', ...new Set(mockVehicles.map(v => v.brand))];
  const vehicleTypes = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'bike', label: 'Bikes' },
    { value: 'scooty', label: 'Scooties' },
    { value: 'car', label: 'Cars' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Rating (High to Low)' }
  ];

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);

  const SkeletonCard = () => (
    <div className="card-elegant">
      <div className="bg-neutral-200 dark:bg-neutral-700 animate-pulse h-48 rounded-xl mb-4"></div>
      <div className="space-y-3">
        <div className="bg-neutral-200 dark:bg-neutral-700 animate-pulse h-6 w-3/4 rounded"></div>
        <div className="bg-neutral-200 dark:bg-neutral-700 animate-pulse h-4 w-1/2 rounded"></div>
        <div className="flex space-x-2">
          <div className="bg-neutral-200 dark:bg-neutral-700 animate-pulse h-6 w-16 rounded-full"></div>
          <div className="bg-neutral-200 dark:bg-neutral-700 animate-pulse h-6 w-20 rounded-full"></div>
        </div>
        <div className="bg-neutral-200 dark:bg-neutral-700 animate-pulse h-10 w-full rounded-xl"></div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Browse <span className="text-gradient">Vehicles</span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              {loading ? 'Loading...' : `${filteredVehicles.length} vehicles available`}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 card-minimal rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-neutral-800/50 hover:bg-neutral-700/50 text-white font-medium px-6 py-3 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-neutral-700/30 flex items-center space-x-2"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={false}
            animate={{ 
              width: showFilters ? 'auto' : 0,
              opacity: showFilters ? 1 : 0
            }}
            className={`${showFilters ? 'lg:w-80' : 'w-0'} overflow-hidden`}
          >
          <div className="glass-card sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">Vehicle Type</label>
                  <div className="space-y-2">
                    {vehicleTypes.map((type) => (
                      <label key={type.value} className="flex items-center">
                        <input
                          type="radio"
                          name="vehicleType"
                          value={type.value}
                          checked={filters.type === type.value}
                          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                          className="mr-3 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-sm">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                    })}
                    className="w-full"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium mb-3">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className="input-elegant"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand === 'all' ? 'All Brands' : brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium mb-3">Minimum Rating</label>
                  <div className="space-y-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating}
                          onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                          className="mr-3 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-sm">
                          {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => setFilters({
                    type: 'all',
                    priceRange: [0, 5000],
                    rating: 0,
                    brand: 'all',
                    fuel: 'all'
                  })}
                  className="w-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>

          {/* Vehicles Grid */}
          <div className="flex-1">
            {loading ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {[...Array(6)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : paginatedVehicles.length > 0 ? (
              <>
                <motion.div
                  layout
                  className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}
                >
                  {paginatedVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <VehicleCard vehicle={vehicle} />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      totalItems={filteredVehicles.length}
                      itemsPerPage={itemsPerPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() => setFilters({
                    type: 'all',
                    priceRange: [0, 5000],
                    rating: 0,
                    brand: 'all',
                    fuel: 'all'
                  })}
                  className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-elegant hover:shadow-elegant-md tracking-wide text-xs uppercase"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseVehicles;

