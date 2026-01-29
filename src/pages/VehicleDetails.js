import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Star, Share2, Calendar, MapPin, Fuel, 
  Settings, Shield, CheckCircle, ArrowLeft, MessageCircle 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import WhatsAppPayment from '../components/WhatsAppPayment';
import ImageGallery from '../components/ui/ImageGallery';
import WishlistButton from '../components/features/WishlistButton';
import toast from 'react-hot-toast';

const VehicleDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    pickup: '',
    return: ''
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showWhatsAppPayment, setShowWhatsAppPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock vehicle data
  const mockVehicle = {
    id: 1,
    name: 'Honda Activa 6G',
    type: 'scooty',
    brand: 'Honda',
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    price: 299,
    rating: 4.8,
    reviews: 124,
    description: 'The Honda Activa 6G is a reliable and fuel-efficient scooter perfect for city commuting. With its comfortable seating and smooth ride quality, it\'s ideal for daily transportation needs.',
    features: ['Fuel Efficient', 'Comfortable Seating', 'Reliable Engine', 'Easy Handling'],
    specs: {
      engine: '109.51cc',
      mileage: '60 kmpl',
      fuel: 'Petrol',
      transmission: 'Automatic',
      topSpeed: '83 kmph',
      fuelCapacity: '5.3L'
    },
    included: [
      'Helmet (2 pieces)',
      'Basic Insurance',
      'Roadside Assistance',
      'Free Delivery & Pickup'
    ],
    location: 'Mumbai, Maharashtra',
    owner: {
      name: 'Rajesh Kumar',
      rating: 4.9,
      reviews: 45,
      avatar: '/api/placeholder/60/60'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVehicle(mockVehicle);
      setLoading(false);
    }, 1000);

    // Check if booking modal should be shown
    if (searchParams.get('book') === 'true') {
      setShowBookingModal(true);
    }
  }, [id, searchParams]);

  const handleBooking = () => {
    if (!user) {
      toast.error('Please login to book a vehicle');
      return;
    }

    if (!selectedDates.pickup || !selectedDates.return) {
      toast.error('Please select pickup and return dates');
      return;
    }

    // Calculate total days and price
    const pickup = new Date(selectedDates.pickup);
    const returnDate = new Date(selectedDates.return);
    const days = Math.ceil((returnDate - pickup) / (1000 * 60 * 60 * 24));
    const basePrice = days * vehicle.price;
    const serviceFee = 99;
    const totalPrice = basePrice + serviceFee;

    // Prepare booking data
    const booking = {
      vehicleName: vehicle.name,
      vehicleId: vehicle.id,
      days: days,
      dates: `${selectedDates.pickup} to ${selectedDates.return}`,
      baseAmount: basePrice,
      serviceFee: serviceFee,
      totalAmount: totalPrice,
      pickupDate: selectedDates.pickup,
      returnDate: selectedDates.return
    };

    setBookingData(booking);
    setShowWhatsAppPayment(true);
  };

  const handlePaymentComplete = (paymentData) => {
    // Here you would typically save the booking to your database
    console.log('Booking completed:', { ...bookingData, payment: paymentData });
    
    // Navigate to confirmation page with booking data
    navigate('/booking-confirmation', {
      state: {
        booking: { ...bookingData, payment: paymentData }
      }
    });
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold mb-2">Vehicle not found</h2>
          <p className="text-gray-600 dark:text-gray-300">The vehicle you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 mb-6 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-elegant"
            >
              <ImageGallery images={vehicle.images} alt={vehicle.name} />
            </motion.div>

            {/* Vehicle Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-elegant"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{vehicle.rating}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        ({vehicle.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{vehicle.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <WishlistButton vehicleId={vehicle.id} />
                  <button className="p-3 card-minimal rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {vehicle.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(vehicle.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                        {key === 'fuel' && <Fuel className="w-4 h-4 text-primary-500" />}
                        {key === 'transmission' && <Settings className="w-4 h-4 text-primary-500" />}
                        {(key === 'engine' || key === 'topSpeed') && <Settings className="w-4 h-4 text-primary-500" />}
                        {(key === 'mileage' || key === 'fuelCapacity') && <Fuel className="w-4 h-4 text-primary-500" />}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="font-medium">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-elegant"
            >
              <h3 className="text-lg font-semibold mb-4">What's Included</h3>
              <div className="space-y-3">
                {vehicle.included.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-elegant sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-500 mb-1">
                  ₹{vehicle.price}
                </div>
                <div className="text-gray-500 dark:text-gray-400">per day</div>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={selectedDates.pickup}
                      onChange={(e) => setSelectedDates({ ...selectedDates, pickup: e.target.value })}
                      className="input-elegant input-with-icon"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={selectedDates.return}
                      onChange={(e) => setSelectedDates({ ...selectedDates, return: e.target.value })}
                      className="input-elegant input-with-icon"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              {selectedDates.pickup && selectedDates.return && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span>Base price</span>
                    <span>₹{vehicle.price} × {Math.ceil((new Date(selectedDates.return) - new Date(selectedDates.pickup)) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Service fee</span>
                    <span>₹99</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>₹{Math.ceil((new Date(selectedDates.return) - new Date(selectedDates.pickup)) / (1000 * 60 * 60 * 24)) * vehicle.price + 99}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                className="w-full bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase mb-4 flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Book via WhatsApp
              </button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                Secure payment via WhatsApp • No upfront charges
              </div>

              {/* Owner Info */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                <h4 className="font-semibold mb-3">Hosted by</h4>
                <div className="flex items-center space-x-3">
                  <img
                    src={vehicle.owner.avatar}
                    alt={vehicle.owner.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{vehicle.owner.name}</div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {vehicle.owner.rating} ({vehicle.owner.reviews} reviews)
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Features */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-6">
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Protected by LivinLease insurance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WhatsApp Payment Modal */}
      {showWhatsAppPayment && bookingData && (
        <WhatsAppPayment
          booking={bookingData}
          onClose={() => setShowWhatsAppPayment(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default VehicleDetails;

