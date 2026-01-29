import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MessageCircle, Calendar, Car, ArrowRight, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/whatsapp';

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold mb-2">No booking found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            It looks like you haven't made a booking yet.
          </p>
          <Link to="/browse" className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-elegant hover:shadow-elegant-md tracking-wide text-xs uppercase">
            Browse Vehicles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Booking <span className="gradient-text">Confirmed!</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your vehicle rental request has been submitted successfully
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Booking Details</h2>
            <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
              Pending Verification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Booking ID</label>
                <div className="text-lg font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  {booking.bookingId}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Vehicle</label>
                <div className="text-lg font-semibold">{booking.vehicleName}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</label>
                <div className="text-lg">{booking.days} days</div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Pickup Date</label>
                <div className="text-lg">{formatDate(booking.pickupDate)}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Return Date</label>
                <div className="text-lg">{formatDate(booking.returnDate)}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount</label>
                <div className="text-2xl font-bold text-primary-500">
                  {formatCurrency(booking.totalAmount)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card mb-8"
        >
          <h3 className="text-xl font-bold mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Payment Verification</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Our team will verify your payment within 2-4 hours during business hours.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Confirmation Call</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  You'll receive a WhatsApp message and call to confirm pickup details.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Vehicle Pickup</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Collect your vehicle on the scheduled date and time. Enjoy your ride!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-8 py-4 rounded-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center justify-center">
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </button>
          
          <button className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase flex items-center justify-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Support
          </button>

          <Link to="/dashboard" className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-8 py-4 rounded-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center justify-center">
            View Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
        >
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Important Notes:</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Please keep your booking ID handy for all communications</li>
            <li>• Carry a valid driving license and ID proof during pickup</li>
            <li>• Vehicle will be delivered with full fuel tank</li>
            <li>• Any damages will be charged separately</li>
            <li>• Cancellation policy applies as per terms and conditions</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

