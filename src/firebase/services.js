// Firebase Services for LivinLease
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

// Collections
const COLLECTIONS = {
  USERS: 'users',
  VEHICLES: 'vehicles',
  BOOKINGS: 'bookings',
  REVIEWS: 'reviews',
  PAYMENTS: 'payments'
};

// User Services
export const userServices = {
  // Create user profile
  createUser: async (userId, userData) => {
    try {
      await setDoc(doc(db, COLLECTIONS.USERS, userId), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user profile
  getUser: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      if (userDoc.exists()) {
        return { success: true, data: { id: userDoc.id, ...userDoc.data() } };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      console.error('Error getting user:', error);
      return { success: false, error: error.message };
    }
  },

  // Update user profile
  updateUser: async (userId, updates) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  }
};

// Vehicle Services
export const vehicleServices = {
  // Add new vehicle
  addVehicle: async (vehicleData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.VEHICLES), {
        ...vehicleData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding vehicle:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all vehicles
  getVehicles: async (filters = {}) => {
    try {
      let q = collection(db, COLLECTIONS.VEHICLES);
      
      // Apply filters
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      if (filters.location) {
        q = query(q, where('location', '==', filters.location));
      }
      if (filters.isActive !== undefined) {
        q = query(q, where('isActive', '==', filters.isActive));
      }
      
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const vehicles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: vehicles };
    } catch (error) {
      console.error('Error getting vehicles:', error);
      return { success: false, error: error.message };
    }
  },

  // Get single vehicle
  getVehicle: async (vehicleId) => {
    try {
      const vehicleDoc = await getDoc(doc(db, COLLECTIONS.VEHICLES, vehicleId));
      if (vehicleDoc.exists()) {
        return { success: true, data: { id: vehicleDoc.id, ...vehicleDoc.data() } };
      }
      return { success: false, error: 'Vehicle not found' };
    } catch (error) {
      console.error('Error getting vehicle:', error);
      return { success: false, error: error.message };
    }
  },

  // Update vehicle
  updateVehicle: async (vehicleId, updates) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.VEHICLES, vehicleId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating vehicle:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete vehicle
  deleteVehicle: async (vehicleId) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.VEHICLES, vehicleId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      return { success: false, error: error.message };
    }
  }
};

// Booking Services
export const bookingServices = {
  // Create booking
  createBooking: async (bookingData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.BOOKINGS), {
        ...bookingData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating booking:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user bookings
  getUserBookings: async (userId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.BOOKINGS),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const bookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, data: bookings };
    } catch (error) {
      console.error('Error getting user bookings:', error);
      return { success: false, error: error.message };
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status, updates = {}) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.BOOKINGS, bookingId), {
        status,
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating booking status:', error);
      return { success: false, error: error.message };
    }
  }
};

// Storage Services
export const storageServices = {
  // Upload image
  uploadImage: async (file, path) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { success: true, url: downloadURL };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete image
  deleteImage: async (path) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { success: false, error: error.message };
    }
  }
};

// Payment Services
export const paymentServices = {
  // Record payment
  recordPayment: async (paymentData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.PAYMENTS), {
        ...paymentData,
        status: 'pending_verification',
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error recording payment:', error);
      return { success: false, error: error.message };
    }
  },

  // Update payment status
  updatePaymentStatus: async (paymentId, status, updates = {}) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.PAYMENTS, paymentId), {
        status,
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return { success: false, error: error.message };
    }
  }
};

