import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MessageCircle, Calendar, ArrowRight, Download, Clock } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import { formatCurrency, formatDate } from '../utils/whatsapp';

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) return (
    <div className="pt-20 min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center max-w-sm">
        <div className="text-5xl mb-4">🚗</div>
        <h2 className="text-xl font-bold text-neutral-100 mb-2">No booking found</h2>
        <p className="text-neutral-500 text-sm mb-6">It looks like you haven't made a booking yet.</p>
        <Link to="/browse"><button className="bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl text-sm transition-all">Browse Vehicles</button></Link>
      </div>
    </div>
  );

  const steps = [
    { n: '1', title: 'Payment Verification', desc: 'Our team will verify your payment within 2-4 hours during business hours.' },
    { n: '2', title: 'Confirmation Call', desc: "You'll receive a WhatsApp message and call to confirm pickup details." },
    { n: '3', title: 'Vehicle Pickup', desc: 'Collect your vehicle on the scheduled date and time. Enjoy your ride!' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="Booking Confirmed" description="Your vehicle rental request has been submitted" />

      <div className="container-elegant py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-50 mb-2">Booking Confirmed!</h1>
          <p className="text-neutral-400">Your vehicle rental request has been submitted successfully</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-neutral-100">Booking Details</h2>
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium">Pending Verification</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-500 mb-1.5">Booking ID</p>
                  <div className="px-3 py-2.5 bg-neutral-800 rounded-xl text-sm font-mono text-neutral-200">{booking.bookingId || 'Pending'}</div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1.5">Vehicle</p>
                  <div className="px-3 py-2.5 bg-neutral-800 rounded-xl text-sm font-semibold text-neutral-200">{booking.vehicleName}</div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1.5">Rental Type</p>
                  <div className="px-3 py-2.5 bg-neutral-800 rounded-xl text-sm text-neutral-200 capitalize">{booking.rentalType || 'daily'}</div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1.5">Duration</p>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-neutral-800 rounded-xl">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-sm text-neutral-200">{booking.duration} {booking.rentalType === 'hourly' ? 'hours' : 'days'}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1.5">Pickup</p>
                  <div className="px-3 py-2.5 bg-neutral-800 rounded-xl">
                    <p className="text-sm text-neutral-200 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-neutral-400" />{formatDate(booking.pickupDate)}</p>
                    {booking.rentalType === 'hourly' && booking.pickupTime && (
                      <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-1"><Clock className="w-3 h-3" />{booking.pickupTime}</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1.5">Return</p>
                  <div className="px-3 py-2.5 bg-neutral-800 rounded-xl">
                    <p className="text-sm text-neutral-200 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-neutral-400" />{formatDate(booking.returnDate)}</p>
                    {booking.rentalType === 'hourly' && booking.returnTime && (
                      <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-1"><Clock className="w-3 h-3" />{booking.returnTime}</p>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-neutral-500 mb-1.5">Total Amount</p>
                  <div className="px-3 py-2.5 bg-neutral-800 rounded-xl text-lg font-bold text-neutral-100">{formatCurrency(booking.totalAmount)}</div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-neutral-100 mb-5">What happens next?</h3>
              <div className="space-y-4">
                {steps.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-xs font-bold text-neutral-300 flex-shrink-0">{s.n}</div>
                    <div>
                      <p className="text-sm font-medium text-neutral-200 mb-0.5">{s.title}</p>
                      <p className="text-xs text-neutral-500">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 py-2.5 rounded-xl text-sm transition-colors">
                <Download size={14} /> Download Receipt
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 py-2.5 rounded-xl text-sm transition-colors">
                <MessageCircle size={14} /> Contact Support
              </button>
              <Link to={booking.bookingId ? `/booking-success/${booking.bookingId}` : "/dashboard"} className="block">
                <button className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold py-2.5 rounded-xl text-sm transition-all">
                  View Dashboard <ArrowRight size={14} />
                </button>
              </Link>
            </div>

            <div className="bg-neutral-900 border border-amber-900/30 rounded-2xl p-5">
              <h4 className="text-xs font-semibold text-amber-400 mb-3 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Important Notes</h4>
              <ul className="text-xs text-neutral-500 space-y-1.5">
                {['Keep your booking ID handy', 'Carry valid driving license and ID', 'Vehicle delivered with full fuel tank', 'Any damages will be charged separately', 'Cancellation policy applies per T&C'].map(n => <li key={n}>· {n}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
