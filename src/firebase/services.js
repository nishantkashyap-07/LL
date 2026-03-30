import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, where, orderBy,
  serverTimestamp, setDoc, onSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

const COLLECTIONS = {
  USERS: 'users',
  VEHICLES: 'vehicles',
  BOOKINGS: 'bookings',
  REVIEWS: 'reviews',
  PAYMENTS: 'payments',
  MESSAGES: 'messages',
  WISHLISTS: 'wishlists',
  SELLER_APPLICATIONS: 'sellerApplications',
  NOTIFICATIONS: 'notifications'
};

// ─── User Services ────────────────────────────────────────────────────────────
export const userServices = {
  createUser: async (userId, userData) => {
    try {
      await setDoc(doc(db, COLLECTIONS.USERS, userId), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getUser: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      if (userDoc.exists()) return { success: true, data: { id: userDoc.id, ...userDoc.data() } };
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateUser: async (userId, updates) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), { ...updates, updatedAt: serverTimestamp() });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAllUsers: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.USERS), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ─── Vehicle Services ─────────────────────────────────────────────────────────
export const vehicleServices = {
  addVehicle: async (vehicleData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.VEHICLES), {
        ...vehicleData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
        rating: 0,
        reviewCount: 0
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getVehicles: async (filters = {}) => {
    try {
      let q = collection(db, COLLECTIONS.VEHICLES);
      const constraints = [where('isActive', '==', true)];
      if (filters.type) constraints.push(where('type', '==', filters.type));
      if (filters.location) constraints.push(where('location', '==', filters.location));
      if (filters.sellerId) constraints.push(where('sellerId', '==', filters.sellerId));
      constraints.push(orderBy('createdAt', 'desc'));
      q = query(q, ...constraints);
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getVehicle: async (vehicleId) => {
    try {
      const vehicleDoc = await getDoc(doc(db, COLLECTIONS.VEHICLES, vehicleId));
      if (vehicleDoc.exists()) return { success: true, data: { id: vehicleDoc.id, ...vehicleDoc.data() } };
      return { success: false, error: 'Vehicle not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateVehicle: async (vehicleId, updates) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.VEHICLES, vehicleId), { ...updates, updatedAt: serverTimestamp() });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteVehicle: async (vehicleId) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.VEHICLES, vehicleId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAllVehicles: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.VEHICLES), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ─── Booking Services ─────────────────────────────────────────────────────────
export const bookingServices = {
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
      return { success: false, error: error.message };
    }
  },

  getUserBookings: async (userId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.BOOKINGS),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getBooking: async (bookingId) => {
    try {
      const bookingDoc = await getDoc(doc(db, COLLECTIONS.BOOKINGS, bookingId));
      if (bookingDoc.exists()) return { success: true, data: { id: bookingDoc.id, ...bookingDoc.data() } };
      return { success: false, error: 'Booking not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateBookingStatus: async (bookingId, status, updates = {}) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.BOOKINGS, bookingId), {
        status, ...updates, updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAllBookings: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.BOOKINGS), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Generic update — alias used by SellerBookings.js
  updateBooking: async (bookingId, updates) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.BOOKINGS, bookingId), {
        ...updates, updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Check if a vehicle is available for given dates
  checkAvailability: async (vehicleId, pickupDate, returnDate) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.BOOKINGS),
        where('vehicleId', '==', vehicleId),
        where('status', 'in', ['pending', 'confirmed', 'active'])
      );
      const snap = await getDocs(q);
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const conflict = snap.docs.some(d => {
        const b = d.data();
        const bStart = new Date(b.pickupDate);
        const bEnd = new Date(b.returnDate);
        return pickup < bEnd && returnD > bStart;
      });
      return { success: true, available: !conflict };
    } catch (error) {
      return { success: true, available: true }; // fail open
    }
  }
};

// ─── Seller Services ──────────────────────────────────────────────────────────
export const sellerServices = {
  getSellerVehicles: async (sellerId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.VEHICLES),
        where('sellerId', '==', sellerId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getSellerBookings: async (sellerId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.BOOKINGS),
        where('sellerId', '==', sellerId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getSellerEarnings: async (sellerId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.BOOKINGS),
        where('sellerId', '==', sellerId),
        where('status', '==', 'completed')
      );
      const snap = await getDocs(q);
      const bookings = snap.docs.map(d => d.data());
      const totalEarnings = bookings.reduce((sum, b) => sum + (b.sellerAmount || 0), 0);
      const now = new Date();
      const monthlyEarnings = bookings
        .filter(b => {
          const date = b.createdAt?.toDate?.() || new Date(b.createdAt);
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        })
        .reduce((sum, b) => sum + (b.sellerAmount || 0), 0);
      return { success: true, data: { totalEarnings, monthlyEarnings, bookings } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  applyAsSeller: async (userId, applicationData) => {
    try {
      await setDoc(doc(db, COLLECTIONS.SELLER_APPLICATIONS, userId), {
        ...applicationData,
        userId,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        sellerStatus: 'pending',
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Used by SellerApplication.js
  submitApplication: async (userId, formData, documents) => {
    try {
      // Upload documents to storage
      const docUrls = {};
      for (const [key, file] of Object.entries(documents)) {
        if (file) {
          const storageRef = ref(storage, `seller-docs/${userId}/${key}-${Date.now()}`);
          const snapshot = await uploadBytes(storageRef, file);
          docUrls[key] = await getDownloadURL(snapshot.ref);
        }
      }
      await setDoc(doc(db, COLLECTIONS.SELLER_APPLICATIONS, userId), {
        ...formData,
        documents: docUrls,
        userId,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      await setDoc(doc(db, COLLECTIONS.USERS, userId), {
        sellerStatus: 'pending',
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getSellerApplication: async (userId) => {
    try {
      const appDoc = await getDoc(doc(db, COLLECTIONS.SELLER_APPLICATIONS, userId));
      if (appDoc.exists()) return { success: true, data: { id: appDoc.id, ...appDoc.data() } };
      return { success: false, error: 'Application not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAllApplications: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.SELLER_APPLICATIONS), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  approveApplication: async (userId) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.SELLER_APPLICATIONS, userId), { status: 'approved' });
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        isSeller: true,
        sellerStatus: 'approved',
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  rejectApplication: async (userId, reason = '') => {
    try {
      await updateDoc(doc(db, COLLECTIONS.SELLER_APPLICATIONS, userId), { status: 'rejected', reason });
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        sellerStatus: 'rejected',
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Alias used by SellerVerificationStatus.js
  getApplicationByUserId: async (userId) => {
    try {
      const appDoc = await getDoc(doc(db, COLLECTIONS.SELLER_APPLICATIONS, userId));
      if (appDoc.exists()) return { success: true, data: { id: appDoc.id, ...appDoc.data() } };
      return { success: false, error: 'Application not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Bank details stored as sub-doc on user
  getSellerBankDetails: async (userId) => {
    try {
      const snap = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      if (snap.exists()) return snap.data().bankDetails || null;
      return null;
    } catch (error) {
      console.error('getSellerBankDetails error:', error);
      return null;
    }
  },

  updateSellerBankDetails: async (userId, bankDetails) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        bankDetails, updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getSellerPayouts: async (sellerId) => {
    try {
      const q = query(
        collection(db, 'payouts'),
        where('sellerId', '==', sellerId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      console.error('getSellerPayouts error:', error);
      return [];
    }
  }
};

// ─── Payment Services ─────────────────────────────────────────────────────────
export const paymentServices = {
  recordPayment: async (paymentData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.PAYMENTS), {
        ...paymentData,
        status: 'pending_verification',
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updatePaymentStatus: async (paymentId, status, updates = {}) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.PAYMENTS, paymentId), {
        status, ...updates, updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getUserPayments: async (userId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.PAYMENTS),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAllPayments: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.PAYMENTS), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ─── Message Services ─────────────────────────────────────────────────────────
export const messageServices = {
  sendMessage: async (conversationId, messageData) => {
    try {
      const docRef = await addDoc(
        collection(db, COLLECTIONS.MESSAGES, conversationId, 'messages'),
        { ...messageData, createdAt: serverTimestamp(), read: false }
      );
      // Update conversation metadata
      await setDoc(doc(db, COLLECTIONS.MESSAGES, conversationId), {
        lastMessage: messageData.text,
        lastMessageAt: serverTimestamp(),
        participants: messageData.participants || [],
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getConversations: async (userId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.MESSAGES),
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
      );
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getMessages: async (conversationId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.MESSAGES, conversationId, 'messages'),
        orderBy('createdAt', 'asc')
      );
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  subscribeToMessages: (conversationId, callback) => {
    const q = query(
      collection(db, COLLECTIONS.MESSAGES, conversationId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  },

  // Used by Messages.js — get all messages involving a user grouped by other participant
  getUserConversations: async (userId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.MESSAGES),
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
      );
      const snap = await getDocs(q);
      const grouped = {};
      snap.docs.forEach(d => {
        const data = d.data();
        const otherUserId = data.participants?.find(p => p !== userId) || 'unknown';
        if (!grouped[otherUserId]) grouped[otherUserId] = [];
        grouped[otherUserId].push({ id: d.id, ...data });
      });
      return { success: true, data: grouped };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Real-time listener for a conversation between two users
  listenToConversation: (userId, otherUserId, callback) => {
    const conversationId = [userId, otherUserId].sort().join('_');
    const q = query(
      collection(db, COLLECTIONS.MESSAGES, conversationId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }
};

// ─── Wishlist Services ────────────────────────────────────────────────────────
export const wishlistServices = {
  addToWishlist: async (userId, vehicleId) => {
    try {
      await setDoc(doc(db, COLLECTIONS.WISHLISTS, `${userId}_${vehicleId}`), {
        userId, vehicleId, createdAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  removeFromWishlist: async (userId, vehicleId) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.WISHLISTS, `${userId}_${vehicleId}`));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getUserWishlist: async (userId) => {
    try {
      const q = query(collection(db, COLLECTIONS.WISHLISTS), where('userId', '==', userId));
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => d.data().vehicleId) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  isInWishlist: async (userId, vehicleId) => {
    try {
      const docSnap = await getDoc(doc(db, COLLECTIONS.WISHLISTS, `${userId}_${vehicleId}`));
      return { success: true, data: docSnap.exists() };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ─── Review Services ──────────────────────────────────────────────────────────
export const reviewServices = {
  addReview: async (reviewData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.REVIEWS), {
        ...reviewData, createdAt: serverTimestamp()
      });
      // Update vehicle rating
      const vehicleReviews = await getDocs(
        query(collection(db, COLLECTIONS.REVIEWS), where('vehicleId', '==', reviewData.vehicleId))
      );
      const reviews = vehicleReviews.docs.map(d => d.data());
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await updateDoc(doc(db, COLLECTIONS.VEHICLES, reviewData.vehicleId), {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getVehicleReviews: async (vehicleId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.REVIEWS),
        where('vehicleId', '==', vehicleId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ─── Storage Services ─────────────────────────────────────────────────────────
export const storageServices = {
  uploadImage: async (file, path) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteImage: async (path) => {
    try {
      await deleteObject(ref(storage, path));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// ─── Admin Services ───────────────────────────────────────────────────────────
export const adminServices = {
  getStats: async () => {
    try {
      const [usersSnap, vehiclesSnap, bookingsSnap, paymentsSnap] = await Promise.all([
        getDocs(collection(db, COLLECTIONS.USERS)),
        getDocs(collection(db, COLLECTIONS.VEHICLES)),
        getDocs(collection(db, COLLECTIONS.BOOKINGS)),
        getDocs(collection(db, COLLECTIONS.PAYMENTS))
      ]);
      const bookings = bookingsSnap.docs.map(d => d.data());
      const payments = paymentsSnap.docs.map(d => d.data());
      const totalRevenue = payments
        .filter(p => p.status === 'verified')
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      return {
        success: true,
        data: {
          totalUsers: usersSnap.size,
          totalVehicles: vehiclesSnap.size,
          totalBookings: bookingsSnap.size,
          totalRevenue,
          activeBookings: bookings.filter(b => b.status === 'active').length,
          pendingBookings: bookings.filter(b => b.status === 'pending').length
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Real-time listeners
  listenToUsers: (callback) => {
    const q = query(collection(db, COLLECTIONS.USERS), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  },

  listenToVehicles: (callback) => {
    const q = query(collection(db, COLLECTIONS.VEHICLES), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  },

  listenToBookings: (callback) => {
    const q = query(collection(db, COLLECTIONS.BOOKINGS), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  },

  listenToPayments: (callback) => {
    const q = query(collection(db, COLLECTIONS.PAYMENTS), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  },

  listenToSellers: (callback) => {
    const q = query(collection(db, COLLECTIONS.SELLER_APPLICATIONS), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  },

  listenToReports: (callback) => {
    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  },

  // User management
  updateUserStatus: async (userId, updates) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), { ...updates, updatedAt: serverTimestamp() });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateUserRole: async (userId, updates) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), { ...updates, updatedAt: serverTimestamp() });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteUser: async (userId) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.USERS, userId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Vehicle management
  updateVehicleStatus: async (vehicleId, status, updates = {}) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.VEHICLES, vehicleId), {
        status, ...updates, updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Seller management
  updateSellerStatus: async (applicationId, status) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.SELLER_APPLICATIONS, applicationId), {
        status, updatedAt: serverTimestamp()
      });
      // Also update user record
      await updateDoc(doc(db, COLLECTIONS.USERS, applicationId), {
        sellerStatus: status,
        isSeller: status === 'approved',
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Analytics
  getAnalyticsData: async () => {
    try {
      const [bookingsSnap, paymentsSnap, usersSnap, vehiclesSnap] = await Promise.all([
        getDocs(query(collection(db, COLLECTIONS.BOOKINGS), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, COLLECTIONS.PAYMENTS), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, COLLECTIONS.USERS)),
        getDocs(collection(db, COLLECTIONS.VEHICLES))
      ]);
      const bookings = bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const payments = paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const vehicles = vehiclesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const totalRevenue = payments.filter(p => p.status === 'verified').reduce((s, p) => s + (p.amount || 0), 0);

      // Build last 6 months labels
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        months.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: d.toLocaleString('default', { month: 'short' }) });
      }

      const monthlyRevenue = months.map(m => {
        const rev = bookings
          .filter(b => {
            const date = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` === m.key;
          })
          .reduce((s, b) => s + (b.totalAmount || 0), 0);
        return { month: m.label, revenue: rev };
      });

      const monthlyBookings = months.map(m => {
        const count = bookings.filter(b => {
          const date = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` === m.key;
        }).length;
        return { month: m.label, bookings: count };
      });

      // Vehicle type breakdown
      const typeBreakdown = {};
      vehicles.forEach(v => { typeBreakdown[v.type || 'other'] = (typeBreakdown[v.type || 'other'] || 0) + 1; });

      // Booking status breakdown
      const statusBreakdown = {};
      bookings.forEach(b => { statusBreakdown[b.status || 'unknown'] = (statusBreakdown[b.status || 'unknown'] || 0) + 1; });

      return {
        success: true,
        data: {
          totalRevenue,
          totalBookings: bookings.length,
          totalUsers: usersSnap.size,
          totalVehicles: vehiclesSnap.size,
          completedBookings: bookings.filter(b => b.status === 'completed').length,
          monthlyRevenue,
          monthlyBookings,
          typeBreakdown,
          statusBreakdown
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Platform settings stored in a single doc
  getSettings: async () => {
    try {
      const snap = await getDoc(doc(db, 'settings', 'platform'));
      if (snap.exists()) return { success: true, data: snap.data() };
      return { success: true, data: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  saveSettings: async (settingsData) => {
    try {
      await setDoc(doc(db, 'settings', 'platform'), {
        ...settingsData, updatedAt: serverTimestamp()
      }, { merge: true });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Reports
  createReport: async (reportData) => {
    try {
      const docRef = await addDoc(collection(db, 'reports'), {
        ...reportData,
        status: 'open',
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
