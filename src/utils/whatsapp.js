// WhatsApp Integration Utilities

export const WHATSAPP_CONFIG = {
  businessNumber: "+919876543210", // Replace with actual business WhatsApp number
  upiId: "livinlease@paytm", // Replace with actual UPI ID
  supportNumber: "+919876543210" // Replace with support number
};

/**
 * Generate WhatsApp deep link for booking
 * @param {Object} booking - Booking details
 * @returns {string} WhatsApp URL
 */
export const generateWhatsAppBookingLink = (booking) => {
  const message = `Hi LivinLease! 🚗

I want to book a vehicle:

📋 *Booking Details:*
• Vehicle: ${booking.vehicleName}
• Booking ID: ${booking.bookingId}
• Duration: ${booking.days} days
• Dates: ${booking.dates}
• Total Amount: ₹${booking.totalAmount}

Please confirm availability and payment details.

Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.businessNumber.replace('+', '')}?text=${encodedMessage}`;
};

/**
 * Generate WhatsApp link for payment confirmation
 * @param {Object} payment - Payment details
 * @returns {string} WhatsApp URL
 */
export const generateWhatsAppPaymentLink = (payment) => {
  const message = `Payment Confirmation 💳

Booking ID: ${payment.bookingId}
Amount Paid: ₹${payment.amount}
Payment Method: ${payment.method}
Transaction ID: ${payment.transactionId || 'N/A'}

Please verify my payment. Screenshot attached.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.businessNumber.replace('+', '')}?text=${encodedMessage}`;
};

/**
 * Generate WhatsApp link for support
 * @param {string} issue - Issue description
 * @returns {string} WhatsApp URL
 */
export const generateWhatsAppSupportLink = (issue = '') => {
  const message = issue ? `Hi! I need help with: ${issue}` : 'Hi! I need help with my LivinLease booking.';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.supportNumber.replace('+', '')}?text=${encodedMessage}`;
};

/**
 * Generate booking ID
 * @returns {string} Unique booking ID
 */
export const generateBookingId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `LL${timestamp}${random}`;
};

/**
 * Format date for display
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Calculate rental duration
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 * @returns {number} Number of days
 */
export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number
 * @returns {boolean} Is valid
 */
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Format currency for display
 * @param {number} amount - Amount in rupees
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

