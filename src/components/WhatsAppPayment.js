import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Copy, CheckCircle, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  generateWhatsAppBookingLink, 
  generateBookingId, 
  formatCurrency,
  WHATSAPP_CONFIG 
} from '../utils/whatsapp';

const WhatsAppPayment = ({ booking, onClose, onPaymentComplete }) => {
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentProof, setPaymentProof] = useState(null);
  const [uploading, setUploading] = useState(false);

  // WhatsApp payment details
  const bookingId = generateBookingId();
  
  const bookingWithId = {
    ...booking,
    bookingId
  };

  const handleWhatsAppRedirect = () => {
    const whatsappUrl = generateWhatsAppBookingLink(bookingWithId);
    window.open(whatsappUrl, '_blank');
    setPaymentStep(2);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(WHATSAPP_CONFIG.upiId);
    toast.success('UPI ID copied to clipboard!');
  };

  const copyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    toast.success('Booking ID copied to clipboard!');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        setPaymentProof(file);
        setUploading(false);
        toast.success('Payment proof uploaded successfully!');
        setPaymentStep(3);
      }, 2000);
    }
  };

  const handlePaymentComplete = () => {
    onPaymentComplete({
      bookingId,
      paymentMethod: 'whatsapp',
      paymentProof: paymentProof?.name,
      status: 'pending_verification'
    });
    toast.success('Payment submitted for verification!');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-green-500" />
            WhatsApp Payment
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Booking Summary */}
        <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Vehicle:</span>
              <span className="font-medium">{booking.vehicleName}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">{booking.days} days</span>
            </div>
            <div className="flex justify-between">
              <span>Dates:</span>
              <span className="font-medium">{booking.dates}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-600 pt-2">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-primary-500">{formatCurrency(booking.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Payment Steps */}
        <div className="space-y-6">
          {/* Step 1: WhatsApp Contact */}
          <div className={`${paymentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                paymentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700'
              }`}>
                1
              </div>
              <h3 className="font-semibold">Contact via WhatsApp</h3>
            </div>
            
            <div className="ml-11 space-y-3">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Click below to open WhatsApp and send your booking details to our payment team.
              </p>
              
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Open WhatsApp
              </button>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Booking ID:</span>
                  <button
                    onClick={copyBookingId}
                    className="text-green-600 hover:text-green-700 flex items-center text-sm"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </button>
                </div>
                <code className="text-sm bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  {bookingId}
                </code>
              </div>
            </div>
          </div>

          {/* Step 2: Payment */}
          <div className={`${paymentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                paymentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                2
              </div>
              <h3 className="font-semibold">Make Payment</h3>
            </div>
            
            {paymentStep >= 2 && (
              <div className="ml-11 space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pay {formatCurrency(booking.totalAmount)} using any of these methods:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">UPI ID:</span>
                      <button
                        onClick={copyUpiId}
                        className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </button>
                    </div>
                    <code className="text-sm bg-white dark:bg-gray-800 px-2 py-1 rounded">
                      {WHATSAPP_CONFIG.upiId}
                    </code>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Other payment methods:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Google Pay / PhonePe / Paytm</li>
                      <li>Bank transfer (details via WhatsApp)</li>
                      <li>Cash on delivery (selected locations)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Upload Proof */}
          <div className={`${paymentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                paymentStep >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                3
              </div>
              <h3 className="font-semibold">Upload Payment Proof (Optional)</h3>
            </div>
            
            {paymentStep >= 2 && (
              <div className="ml-11 space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Upload a screenshot of your payment for faster verification.
                </p>
                
                {!paymentProof ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Drag and drop or click to upload
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="payment-proof"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="payment-proof"
                      className={`bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-6 py-3 rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase cursor-pointer ${uploading ? 'opacity-50' : ''}`}
                    >
                      {uploading ? 'Uploading...' : 'Choose File'}
                    </label>
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm">Payment proof uploaded: {paymentProof.name}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-8 py-4 rounded-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase"
          >
            Cancel
          </button>
          <button
            onClick={handlePaymentComplete}
            disabled={paymentStep < 2}
            className={`flex-1 bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase ${paymentStep < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Complete Booking
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Need help?</strong> Contact us on WhatsApp at {WHATSAPP_CONFIG.supportNumber} or call our support team.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppPayment;

