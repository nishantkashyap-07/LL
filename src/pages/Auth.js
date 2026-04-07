import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Phone, ArrowRight, AlertCircle, Shield, Zap, Star, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const validateForm = () => {
    const newErrors = {};
    if (activeTab === 'signup') {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid phone number';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (activeTab === 'login') {
        await login(formData.email, formData.password);
        toast.success('Welcome back!');
      } else {
        await signup(formData.email, formData.password, formData.name, formData.phone);
        toast.success('Account created! Please verify your email.');
      }
      navigate(from, { replace: true });
    } catch (error) {
      const msg = error.code === 'auth/email-already-in-use' ? 'Email already in use'
        : error.code === 'auth/wrong-password' ? 'Invalid email or password'
        : error.code === 'auth/user-not-found' ? 'No account found with this email'
        : error.message;
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Welcome!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const inputClass = (field) =>
    `w-full pl-12 pr-4 py-4 bg-white dark:bg-neutral-900 border ${errors[field] ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'} rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:text-neutral-500 text-sm`;

  const benefits = [
    { icon: Shield, text: '100% Secure Payments', color: 'text-emerald-400' },
    { icon: Zap, text: 'Instant Booking Confirmation', color: 'text-amber-400' },
    { icon: Star, text: '500+ Premium Vehicles', color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
      <MetaTags title={activeTab === 'login' ? 'Login' : 'Sign Up'} description="Login or create an account to book vehicles" />

      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neutral-100 dark:bg-neutral-800/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutral-100 dark:bg-neutral-800/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Branding */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">India's #1 Vehicle Rental Platform</span>
            </div>

            <h1 className="text-5xl font-bold text-neutral-50 mb-6 leading-tight">
              Your Journey<br />
              <span className="text-neutral-600 dark:text-neutral-400">Starts Here</span>
            </h1>

            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-10">
              Join thousands of happy customers who trust us for premium vehicle rentals across India.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center justify-center">
                    <b.icon className={`w-5 h-5 ${b.color}`} />
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">{b.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              {[{ n: '50K+', l: 'Users' }, { n: '500+', l: 'Vehicles' }, { n: '4.9★', l: 'Rating' }].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{s.n}</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-500">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
              {/* Logo mark */}
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <User className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-50 text-center mb-1">
                {activeTab === 'login' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-500 text-sm text-center mb-8">
                {activeTab === 'login' ? 'Sign in to continue your journey' : 'Get started in seconds'}
              </p>

              {/* Tabs */}
              <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl mb-8">
                {['login', 'signup'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                      activeTab === tab
                        ? 'bg-neutral-100 text-neutral-900'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    {tab === 'login' ? 'Login' : 'Sign Up'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence>
                  {activeTab === 'signup' && (
                    <motion.div
                      key="signup-extra"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
                          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass('name')} />
                        </div>
                        {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" className={inputClass('phone')} />
                        </div>
                        {errors.phone && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass('email')} />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder={activeTab === 'login' ? 'Your password' : 'Min. 6 characters'} className={`${inputClass('password')} pr-12`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
                </div>

                <AnimatePresence>
                  {activeTab === 'signup' && (
                    <motion.div
                      key="confirm-pw"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat password" className={`${inputClass('confirmPassword')} pr-12`} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:text-neutral-300">
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>

                {activeTab === 'login' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" />
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:text-neutral-100 transition-colors">Forgot password?</Link>
                  </div>
                )}

                {activeTab === 'signup' && (
                  <div className="flex items-start gap-3 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      By signing up, you agree to our{' '}
                      <Link to="/terms" className="text-neutral-800 dark:text-neutral-200 hover:text-white">Terms of Service</Link>{' '}and{' '}
                      <Link to="/privacy" className="text-neutral-800 dark:text-neutral-200 hover:text-white">Privacy Policy</Link>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-100 hover:bg-white text-neutral-900 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                <span className="text-xs text-neutral-500 dark:text-neutral-500">or continue with</span>
                <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
