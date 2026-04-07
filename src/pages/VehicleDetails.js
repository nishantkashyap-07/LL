import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Star, Share2, Calendar, MapPin, Fuel, Settings, Shield, CheckCircle, ArrowLeft, MessageCircle, Users, AlertCircle, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { vehicleServices, bookingServices, reviewServices } from '../firebase/services';
import WhatsAppPayment from '../components/WhatsAppPayment';
import ImageGallery from '../components/ui/ImageGallery';
import WishlistButton from '../components/features/WishlistButton';
import toast from 'react-hot-toast';

const VehicleDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rentalType, setRentalType] = useState('daily'); // 'hourly' or 'daily'
  const [selectedDates, setSelectedDates] = useState({ pickup: '', return: '', pickupTime: '10:00', returnTime: '10:00' });
  const [showWhatsAppPayment, setShowWhatsAppPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [availabilityMsg, setAvailabilityMsg] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const fallbackVehicle = {
    id: 1, name: 'Honda Activa 6G', type: 'scooty', brand: 'Honda',
    images: ['/images/vehicles/hondo-activa-6G.png', '/images/vehicles/activa-6G-2.png', '/images/vehicles/activa-6G-3.png'],
    price: 299, pricePerHour: 99, rating: 4.8, reviews: 124,
    description: 'The Honda Activa 6G is a reliable and fuel-efficient scooter perfect for city commuting. With its comfortable seating and smooth ride quality, it\'s ideal for daily transportation needs.',
    features: ['Fuel Efficient', 'Comfortable Seating', 'Reliable Engine', 'Easy Handling'],
    specs: { engine: '109.51cc', mileage: '60 kmpl', fuel: 'Petrol', transmission: 'Automatic', topSpeed: '83 kmph', fuelCapacity: '5.3L' },
    included: ['Helmet (2 pieces)', 'Basic Insurance', 'Roadside Assistance', 'Free Delivery & Pickup'],
    location: 'Mumbai, Maharashtra',
    owner: { name: 'Rajesh Kumar', rating: 4.9, reviews: 45 }
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const result = await vehicleServices.getVehicle(id);
        setVehicle(result.success ? result.data : fallbackVehicle);
        // Fetch reviews
        const revResult = await reviewServices.getVehicleReviews(id);
        if (revResult.success) setReviews(revResult.data);
      } catch { setVehicle(fallbackVehicle); }
      finally { setLoading(false); }
    };
    fetchVehicle();
    if (searchParams.get('book') === 'true') setShowWhatsAppPayment(true);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check availability when dates change
  useEffect(() => {
    if (!selectedDates.pickup || !selectedDates.return) { setAvailabilityMsg(''); return; }
    bookingServices.checkAvailability(id, selectedDates.pickup, selectedDates.return).then(res => {
      setAvailabilityMsg(res.available ? 'available' : 'unavailable');
    });
  }, [selectedDates.pickup, selectedDates.return, id]);

  const handleBooking = () => {
    if (!user) { toast.error('Please login to book a vehicle'); return; }
    if (!selectedDates.pickup || !selectedDates.return) { toast.error('Please select pickup and return dates'); return; }
    
    let duration, baseAmount;
    if (rentalType === 'hourly') {
      if (!selectedDates.pickupTime || !selectedDates.returnTime) { toast.error('Please select pickup and return times'); return; }
      const pickupDateTime = new Date(`${selectedDates.pickup}T${selectedDates.pickupTime}`);
      const returnDateTime = new Date(`${selectedDates.return}T${selectedDates.returnTime}`);
      const hours = Math.ceil((returnDateTime - pickupDateTime) / 3600000);
      if (hours <= 0) { toast.error('Return time must be after pickup time'); return; }
      duration = hours;
      const pricePerHour = vehicle.pricePerHour || Math.round(vehicle.price / 8); // fallback: daily price / 8 hours
      baseAmount = hours * pricePerHour;
    } else {
      const days = Math.ceil((new Date(selectedDates.return) - new Date(selectedDates.pickup)) / 86400000);
      if (days <= 0) { toast.error('Return date must be after pickup date'); return; }
      duration = days;
      baseAmount = days * vehicle.price;
    }
    
    if (availabilityMsg === 'unavailable') { toast.error('Vehicle is not available for selected dates'); return; }
    
    const booking = {
      vehicleName: vehicle.name, vehicleId: vehicle.id || id,
      rentalType, duration,
      dates: `${selectedDates.pickup} to ${selectedDates.return}`,
      pickupDate: selectedDates.pickup, returnDate: selectedDates.return,
      pickupTime: selectedDates.pickupTime, returnTime: selectedDates.returnTime,
      baseAmount, serviceFee: 99, totalAmount: baseAmount + 99,
      sellerId: vehicle.sellerId || '', sellerName: vehicle.owner?.name || ''
    };
    setBookingData(booking);
    setShowWhatsAppPayment(true);
  };

  const handlePaymentComplete = async (paymentData) => {
    // Save booking to Firestore
    try {
      const result = await bookingServices.createBooking({
        ...bookingData,
        userId: user.id,
        userName: user.name || user.email,
        paymentMethod: paymentData.method || 'whatsapp',
        paymentScreenshot: paymentData.screenshot || '',
        status: 'pending'
      });
      const bookingId = result.success ? result.id : null;
      navigate('/booking-confirmation', {
        state: { booking: { ...bookingData, payment: paymentData, bookingId } }
      });
    } catch (err) {
      console.error('Failed to save booking:', err);
      // Navigate anyway so user isn't stuck
      navigate('/booking-confirmation', { state: { booking: { ...bookingData, payment: paymentData } } });
    }
  };

  const handleSubmitReview = async () => {
    if (!user) { toast.error('Please login to leave a review'); return; }
    if (!reviewForm.comment.trim()) { toast.error('Please write a comment'); return; }
    setSubmittingReview(true);
    try {
      const result = await reviewServices.addReview({
        vehicleId: id,
        userId: user.id,
        userName: user.name || user.email,
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim()
      });
      if (result.success) {
        toast.success('Review submitted!');
        setReviewForm({ rating: 5, comment: '' });
        // Refresh reviews
        const revResult = await reviewServices.getVehicleReviews(id);
        if (revResult.success) setReviews(revResult.data);
      } else {
        toast.error('Failed to submit review');
      }
    } catch { toast.error('Failed to submit review'); }
    finally { setSubmittingReview(false); }
  };

  // Calculate duration and price based on rental type
  let duration = 0, baseAmount = 0, pricePerUnit = 0;
  if (rentalType === 'hourly' && selectedDates.pickup && selectedDates.return && selectedDates.pickupTime && selectedDates.returnTime) {
    const pickupDateTime = new Date(`${selectedDates.pickup}T${selectedDates.pickupTime}`);
    const returnDateTime = new Date(`${selectedDates.return}T${selectedDates.returnTime}`);
    duration = Math.ceil((returnDateTime - pickupDateTime) / 3600000);
    pricePerUnit = vehicle.pricePerHour || Math.round(vehicle.price / 8);
    baseAmount = duration * pricePerUnit;
  } else if (rentalType === 'daily' && selectedDates.pickup && selectedDates.return) {
    duration = Math.ceil((new Date(selectedDates.return) - new Date(selectedDates.pickup)) / 86400000);
    pricePerUnit = vehicle.price;
    baseAmount = duration * pricePerUnit;
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-neutral-300 dark:border-neutral-600 border-t-neutral-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="card-elegant text-center max-w-sm">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-neutral-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Vehicle not found</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">The vehicle you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container-elegant py-10">
        {/* Back */}
        <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:text-neutral-200 text-sm mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-minimal overflow-hidden p-0">
              <ImageGallery images={vehicle.images} alt={vehicle.name} />
            </motion.div>

            {/* Vehicle Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-minimal">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">{vehicle.name}</h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-secondary-400 fill-current" />
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">{vehicle.rating}</span>
                      <span className="text-neutral-500 dark:text-neutral-500 text-sm">({vehicle.reviews} reviews)</span>
                    </div>
                    {vehicle.location && (
                      <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-500 text-sm">
                        <MapPin className="w-3.5 h-3.5" />{vehicle.location}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <WishlistButton vehicleId={vehicle.id} />
                  <button className="p-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:text-neutral-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">{vehicle.description}</p>

              {/* Features */}
              {vehicle.features?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((f, i) => (
                      <span key={i} className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium">{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs */}
              {vehicle.specs && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-4">Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(vehicle.specs).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl">
                        <div className="w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          {key === 'fuel' || key === 'mileage' || key === 'fuelCapacity' ? <Fuel className="w-4 h-4 text-neutral-600 dark:text-neutral-400" /> : key === 'seats' ? <Users className="w-4 h-4 text-neutral-600 dark:text-neutral-400" /> : <Settings className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />}
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Included */}
            {vehicle.included?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-minimal">
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-4">What's Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-minimal">
              <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-4">
                Reviews {reviews.length > 0 && <span className="text-neutral-500 dark:text-neutral-500 normal-case font-normal">({reviews.length})</span>}
              </h3>

              {/* Review list */}
              {reviews.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {reviews.map(r => (
                    <div key={r.id} className="p-4 bg-neutral-100 dark:bg-neutral-800/40 rounded-xl border border-neutral-200 dark:border-neutral-700/40">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-br from-primary-700 to-secondary-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {(r.userName || 'U')[0].toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{r.userName || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-secondary-400 fill-current' : 'text-neutral-600'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 dark:text-neutral-500 text-sm mb-6">No reviews yet. Be the first to review!</p>
              )}

              {/* Submit review form */}
              {user && (
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">Leave a Review</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => setReviewForm(f => ({ ...f, rating: s }))}
                        className="p-0.5 transition-transform hover:scale-110">
                        <Star className={`w-5 h-5 ${s <= reviewForm.rating ? 'text-secondary-400 fill-current' : 'text-neutral-600'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewForm.comment}
                    onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                    placeholder="Share your experience..."
                    rows={3}
                    className="w-full px-3 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500 dark:text-neutral-500 focus:outline-none focus:border-neutral-500 resize-none mb-3"
                  />
                  <button onClick={handleSubmitReview} disabled={submittingReview}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
                    <Send className="w-3.5 h-3.5" />
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-minimal sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">₹{rentalType === 'hourly' ? (vehicle.pricePerHour || Math.round(vehicle.price / 8)) : vehicle.price}</div>
                <div className="text-neutral-500 dark:text-neutral-500 text-sm">per {rentalType === 'hourly' ? 'hour' : 'day'}</div>
              </div>

              {/* Rental Type Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setRentalType('daily')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    rentalType === 'daily'
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setRentalType('hourly')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    rentalType === 'hourly'
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  Hourly
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-500 w-4 h-4" />
                    <input type="date" value={selectedDates.pickup} onChange={e => setSelectedDates({ ...selectedDates, pickup: e.target.value })} className="input-elegant pl-10 text-sm" />
                  </div>
                </div>
                {rentalType === 'hourly' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">Pickup Time</label>
                    <input type="time" value={selectedDates.pickupTime} onChange={e => setSelectedDates({ ...selectedDates, pickupTime: e.target.value })} className="input-elegant text-sm" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-500 w-4 h-4" />
                    <input type="date" value={selectedDates.return} onChange={e => setSelectedDates({ ...selectedDates, return: e.target.value })} className="input-elegant pl-10 text-sm" />
                  </div>
                </div>
                {rentalType === 'hourly' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">Return Time</label>
                    <input type="time" value={selectedDates.returnTime} onChange={e => setSelectedDates({ ...selectedDates, returnTime: e.target.value })} className="input-elegant text-sm" />
                  </div>
                )}
              </div>

              {duration > 0 && (
                <div className="bg-neutral-100 dark:bg-neutral-800/50 rounded-xl p-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>₹{pricePerUnit} × {duration} {rentalType === 'hourly' ? 'hours' : 'days'}</span>
                    <span>₹{baseAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Service fee</span><span>₹99</span>
                  </div>
                  <div className="flex justify-between font-semibold text-neutral-900 dark:text-neutral-100 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <span>Total</span><span>₹{(baseAmount + 99).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {availabilityMsg === 'unavailable' && (
                <div className="flex items-center gap-2 p-3 bg-error-900/20 border border-error-800/40 rounded-xl mb-4 text-xs text-error-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Vehicle is already booked for these dates
                </div>
              )}
              {availabilityMsg === 'available' && (
                <div className="flex items-center gap-2 p-3 bg-accent-900/20 border border-accent-800/40 rounded-xl mb-4 text-xs text-accent-400">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Vehicle is available for these dates
                </div>
              )}

              <button onClick={handleBooking} className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold py-4 rounded-xl transition-all duration-300 shadow-elegant hover:shadow-elegant-md hover:-translate-y-1 mb-3 text-sm">
                <MessageCircle className="w-4 h-4" />
                Book via WhatsApp
              </button>
              <p className="text-center text-xs text-neutral-500 dark:text-neutral-500 mb-6">Secure payment via WhatsApp · No upfront charges</p>
              {/* Owner */}
              {vehicle.owner && (
                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">Hosted by</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {vehicle.owner.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">{vehicle.owner.name}</p>
                      <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-500">
                        <Star className="w-3 h-3 text-secondary-400 fill-current" />
                        {vehicle.owner.rating} · {vehicle.owner.reviews} reviews
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-500">
                <Shield className="w-4 h-4 text-accent-400" />
                Protected by LivinLease insurance
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showWhatsAppPayment && bookingData && (
        <WhatsAppPayment booking={bookingData} onClose={() => setShowWhatsAppPayment(false)} onPaymentComplete={handlePaymentComplete} />
      )}
    </div>
  );
};

export default VehicleDetails;
