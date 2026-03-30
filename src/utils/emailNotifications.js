// Email Notifications via EmailJS
// Setup: create a free account at emailjs.com, add your service/template IDs to .env
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Template IDs — create these in your EmailJS dashboard
const TEMPLATES = {
  BOOKING_CONFIRMATION: process.env.REACT_APP_EMAILJS_BOOKING_TEMPLATE,
  SELLER_APPROVED: process.env.REACT_APP_EMAILJS_SELLER_APPROVED_TEMPLATE,
  SELLER_REJECTED: process.env.REACT_APP_EMAILJS_SELLER_REJECTED_TEMPLATE,
  BOOKING_STATUS_UPDATE: process.env.REACT_APP_EMAILJS_BOOKING_STATUS_TEMPLATE
};

// Only send if EmailJS is configured
const isConfigured = () => SERVICE_ID && PUBLIC_KEY;

/**
 * Send booking confirmation to the customer
 */
export const sendBookingConfirmation = async ({ toEmail, toName, vehicleName, startDate, endDate, totalAmount, bookingId }) => {
  if (!isConfigured() || !TEMPLATES.BOOKING_CONFIRMATION) return;
  try {
    await emailjs.send(SERVICE_ID, TEMPLATES.BOOKING_CONFIRMATION, {
      to_email: toEmail,
      to_name: toName,
      vehicle_name: vehicleName,
      start_date: startDate,
      end_date: endDate,
      total_amount: `₹${totalAmount}`,
      booking_id: bookingId,
      app_name: 'LivinLease'
    }, PUBLIC_KEY);
  } catch (err) {
    // Non-critical — log but don't throw
    console.warn('Email notification failed:', err);
  }
};

/**
 * Notify seller when their application is approved
 */
export const sendSellerApproved = async ({ toEmail, toName }) => {
  if (!isConfigured() || !TEMPLATES.SELLER_APPROVED) return;
  try {
    await emailjs.send(SERVICE_ID, TEMPLATES.SELLER_APPROVED, {
      to_email: toEmail,
      to_name: toName,
      app_name: 'LivinLease',
      dashboard_url: `${window.location.origin}/seller`
    }, PUBLIC_KEY);
  } catch (err) {
    console.warn('Email notification failed:', err);
  }
};

/**
 * Notify seller when their application is rejected
 */
export const sendSellerRejected = async ({ toEmail, toName, reason }) => {
  if (!isConfigured() || !TEMPLATES.SELLER_REJECTED) return;
  try {
    await emailjs.send(SERVICE_ID, TEMPLATES.SELLER_REJECTED, {
      to_email: toEmail,
      to_name: toName,
      rejection_reason: reason || 'Please contact support for more details.',
      app_name: 'LivinLease'
    }, PUBLIC_KEY);
  } catch (err) {
    console.warn('Email notification failed:', err);
  }
};

/**
 * Notify customer when booking status changes (confirmed/cancelled)
 */
export const sendBookingStatusUpdate = async ({ toEmail, toName, vehicleName, status, bookingId }) => {
  if (!isConfigured() || !TEMPLATES.BOOKING_STATUS_UPDATE) return;
  try {
    await emailjs.send(SERVICE_ID, TEMPLATES.BOOKING_STATUS_UPDATE, {
      to_email: toEmail,
      to_name: toName,
      vehicle_name: vehicleName,
      booking_status: status,
      booking_id: bookingId,
      app_name: 'LivinLease'
    }, PUBLIC_KEY);
  } catch (err) {
    console.warn('Email notification failed:', err);
  }
};
