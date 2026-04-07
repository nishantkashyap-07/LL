import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import LandingPage from './pages/LandingPage';
import BrowseVehicles from './pages/BrowseVehicles';
import VehicleDetails from './pages/VehicleDetails';
import Auth from './pages/Auth';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import Help from './pages/Help';
import Cookies from './pages/Cookies';
import NotFound from './pages/NotFound';

// User Pages (Protected)
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import BookingConfirmation from './pages/BookingConfirmation';
import BookingSuccess from './pages/BookingSuccess';
import Payments from './pages/Payments';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Wishlist from './pages/Wishlist';

// Seller Pages (Protected + Seller)
import SellerApplication from './pages/SellerApplication';
import SellerVerificationStatus from './pages/SellerVerificationStatus';
import SellerDashboard from './pages/SellerDashboard';
import SellerVehicles from './pages/SellerVehicles';
import SellerBookings from './pages/SellerBookings';
import SellerEarnings from './pages/SellerEarnings';
import SellerPayout from './pages/SellerPayout';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';

// Admin Pages (Protected + Admin)
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminVehicles from './pages/AdminVehicles';
import AdminBookings from './pages/AdminBookings';
import AdminPayments from './pages/AdminPayments';
import AdminSellers from './pages/AdminSellers';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                <Navbar />
                <main>
                  <Routes>
                    {/* Public */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/browse" element={<BrowseVehicles />} />
                    <Route path="/vehicle/:id" element={<VehicleDetails />} />
                    <Route path="/vehicles/:id" element={<VehicleDetails />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/cookies" element={<Cookies />} />

                    {/* User Protected */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
                    <Route path="/booking-confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
                    <Route path="/booking-success/:id" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
                    <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
                    <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

                    {/* Seller */}
                    <Route path="/seller/apply" element={<ProtectedRoute><SellerApplication /></ProtectedRoute>} />
                    <Route path="/seller/status" element={<ProtectedRoute><SellerVerificationStatus /></ProtectedRoute>} />
                    <Route path="/seller/dashboard" element={<ProtectedRoute requireSeller><SellerDashboard /></ProtectedRoute>} />
                    <Route path="/seller/vehicles" element={<ProtectedRoute requireSeller><SellerVehicles /></ProtectedRoute>} />
                    <Route path="/seller/vehicles/new" element={<ProtectedRoute requireSeller><AddVehicle /></ProtectedRoute>} />
                    <Route path="/seller/vehicles/edit/:id" element={<ProtectedRoute requireSeller><EditVehicle /></ProtectedRoute>} />
                    <Route path="/seller/bookings" element={<ProtectedRoute requireSeller><SellerBookings /></ProtectedRoute>} />
                    <Route path="/seller/earnings" element={<ProtectedRoute requireSeller><SellerEarnings /></ProtectedRoute>} />
                    <Route path="/seller/payout" element={<ProtectedRoute requireSeller><SellerPayout /></ProtectedRoute>} />

                    {/* Admin */}
                    <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
                    <Route path="/admin/vehicles" element={<ProtectedRoute requireAdmin><AdminVehicles /></ProtectedRoute>} />
                    <Route path="/admin/bookings" element={<ProtectedRoute requireAdmin><AdminBookings /></ProtectedRoute>} />
                    <Route path="/admin/payments" element={<ProtectedRoute requireAdmin><AdminPayments /></ProtectedRoute>} />
                    <Route path="/admin/sellers" element={<ProtectedRoute requireAdmin><AdminSellers /></ProtectedRoute>} />
                    <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin><AdminAnalytics /></ProtectedRoute>} />
                    <Route path="/admin/reports" element={<ProtectedRoute requireAdmin><AdminReports /></ProtectedRoute>} />
                    <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'rgba(23,23,23,0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      borderRadius: '12px',
                    },
                    success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
                    error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
                  }}
                />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
