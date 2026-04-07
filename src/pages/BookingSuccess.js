import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, MessageCircle, Download, Share2, Calendar, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { bookingServices } from '../firebase/services';

const BookingSuccess = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) { setLoading(false); return; }
      try {
        const result = await bookingServices.getBooking(id);
        if (result.success) setBooking(result.data);
        else toast.error('Booking not found');
      } catch (err) {
        console.error(err);
        toast.error('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'My Booking Confirmation', text: `I just booked ${booking.vehicleName} on LivinLease!`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!booking) return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center max-w-sm">
        <div className="text-5xl mb-4">🚗</div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Booking not found</h2>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm mb-6">We couldn't find the booking you're looking for.</p>
        <Link to="/browse"><button className="bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all">Browse Vehicles</button></Link>
      </div>
    </div>
  );

  const steps = [
    { n: '1', title: 'Confirmation Message', desc: 'You will receive a WhatsApp confirmation with all booking details' },
    { n: '2', title: 'Prepare Documents', desc: 'Keep your driving license, ID proof, and booking ID ready' },
    { n: '3', title: 'Vehicle Pickup', desc: 'Collect your vehicle on the scheduled date and time' },
    { n: '4', title: 'Enjoy Your Ride', desc: 'Have a safe and wonderful journey!' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Booking Confirmed" description="Your vehicle booking has been confirmed successfully" />

      <div className="container-elegant py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-50 mb-2">Booking Confirmed!</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Your vehicle rental has been confirmed. Get ready for an amazing journey!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            {/* Booking Details */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Booking Details</h2>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">
                  {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-5">
                {booking.vehicleImage && <img src={booking.vehicleImage} alt={booking.vehicleName} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />}
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-0.5">{booking.vehicleType}</p>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{booking.vehicleName}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{booking.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Booking ID', value: booking.id, mono: true },
                  { label: 'Booking Date', value: booking.bookingDate },
                  { label: 'Rental Type', value: (booking.rentalType || 'daily').charAt(0).toUpperCase() + (booking.rentalType || 'daily').slice(1) },
                  { label: 'Duration', value: `${booking.duration || booking.days} ${booking.rentalType === 'hourly' ? 'hours' : 'days'}` },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">{item.label}</p>
                    <div className={`px-3 py-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-sm text-neutral-800 dark:text-neutral-200 ${item.mono ? 'font-mono' : ''}`}>{item.value}</div>
                  </div>
                ))}
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Pickup</p>
                  <div className="px-3 py-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                    <p className="text-sm text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />{booking.pickupDate}</p>
                    {booking.rentalType === 'hourly' && booking.pickupTime && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1.5 mt-1"><Clock className="w-3 h-3" />{booking.pickupTime}</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Return</p>
                  <div className="px-3 py-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                    <p className="text-sm text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />{booking.returnDate}</p>
                    {booking.rentalType === 'hourly' && booking.returnTime && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1.5 mt-1"><Clock className="w-3 h-3" />{booking.returnTime}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400"><span>Price per {booking.rentalType === 'hourly' ? 'hour' : 'day'}</span><span>₹{booking.pricePerDay || booking.pricePerHour}</span></div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400"><span>Duration</span><span>{booking.duration || booking.days} {booking.rentalType === 'hourly' ? 'hours' : 'days'}</span></div>
                  <div className="flex justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">Total Amount</span>
                    <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">₹{booking.totalAmount}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" /> Payment Verified
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-5">What's Next?</h3>
              <div className="space-y-4">
                {steps.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center text-xs font-bold text-neutral-700 dark:text-neutral-300 flex-shrink-0">{s.n}</div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-0.5">{s.title}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Seller */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Seller Contact</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-800 dark:text-neutral-200 font-bold text-sm">
                  {booking.seller?.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{booking.seller?.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">Vehicle Owner</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <a href={`tel:${booking.seller?.phone}`} className="flex items-center gap-2 p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" /><span className="text-xs text-neutral-700 dark:text-neutral-300">{booking.seller?.phone}</span>
                </a>
                <a href={`mailto:${booking.seller?.email}`} className="flex items-center gap-2 p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" /><span className="text-xs text-neutral-700 dark:text-neutral-300">{booking.seller?.email}</span>
                </a>
              </div>
              <button
                onClick={() => { const msg = `Hi, I have a confirmed booking (ID: ${booking.id}) for ${booking.vehicleName}.`; window.open(`https://wa.me/${booking.seller?.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank'); }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 py-2.5 rounded-xl text-sm transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp Seller
              </button>
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 space-y-2">
              <button onClick={() => toast.success('Receipt downloaded!')} className="w-full flex items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 py-2.5 rounded-xl text-sm transition-colors">
                <Download size={14} /> Download Receipt
              </button>
              <button onClick={handleShare} className="w-full flex items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 py-2.5 rounded-xl text-sm transition-colors">
                <Share2 size={14} /> Share Booking
              </button>
              <Link to="/bookings" className="block">
                <button className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold py-2.5 rounded-xl text-sm transition-all">
                  View All Bookings <ArrowRight size={14} />
                </button>
              </Link>
            </div>

            {/* Notes */}
            <div className="bg-white dark:bg-neutral-900 border border-amber-900/30 rounded-2xl p-5">
              <h4 className="text-xs font-semibold text-amber-400 mb-3 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Important Notes</h4>
              <ul className="text-xs text-neutral-500 dark:text-neutral-500 space-y-1.5">
                {['Carry valid ID and driving license', 'Vehicle inspection before pickup', 'Full fuel tank at delivery', 'Return with same fuel level', 'Report damages immediately'].map(n => <li key={n}>· {n}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
