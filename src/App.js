import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import BrowseVehicles from './pages/BrowseVehicles';
import VehicleDetails from './pages/VehicleDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookingConfirmation from './pages/BookingConfirmation';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import ColorShowcase from './components/ColorShowcase';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen bg-neutral-950 dark">
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/browse" element={<BrowseVehicles />} />
                    <Route path="/vehicle/:id" element={<VehicleDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/colors" element={<ColorShowcase />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--toast-bg)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid var(--toast-border)',
                      color: 'var(--toast-color)',
                      borderRadius: '12px',
                    },
                    success: {
                      style: {
                        '--toast-bg': 'rgba(34, 197, 94, 0.1)',
                        '--toast-border': 'rgba(34, 197, 94, 0.2)',
                        '--toast-color': '#22c55e',
                      },
                    },
                    error: {
                      style: {
                        '--toast-bg': 'rgba(239, 68, 68, 0.1)',
                        '--toast-border': 'rgba(239, 68, 68, 0.2)',
                        '--toast-color': '#ef4444',
                      },
                    },
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

