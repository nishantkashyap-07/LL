import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Card, Stack } from '../components/Layout';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Password reset email sent!');
    } catch (err) {
      const msg =
        err.code === 'auth/user-not-found' ? 'No account found with this email' :
        err.code === 'auth/too-many-requests' ? 'Too many attempts. Please try again later' :
        'Failed to send reset email. Please try again';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-12 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-white placeholder:text-neutral-500";

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center py-12">
      <MetaTags title="Forgot Password" description="Reset your LivinLease account password" />

      <Container size="sm">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="glass" padding="lg">
            <Stack spacing="lg">
              {!sent ? (
                <>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Forgot Password?</h1>
                    <p className="text-neutral-400">
                      Enter your email and we'll send you a reset link
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <Stack spacing="lg">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-300">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            placeholder="Enter your email"
                            className={`${inputClass} ${error ? 'border-error-500' : ''}`}
                            disabled={loading}
                          />
                        </div>
                        {error && (
                          <p className="text-error-400 text-sm mt-2 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {error}
                          </p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        type="submit" disabled={loading}
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : 'Send Reset Link'}
                      </motion.button>
                    </Stack>
                  </form>

                  <div className="text-center">
                    <Link to="/auth" className="text-primary-400 hover:text-primary-300 text-sm font-medium inline-flex items-center">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back to Login
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success-500/20 border border-success-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-success-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Check Your Email</h1>
                    <p className="text-neutral-400 mb-2">We've sent a password reset link to</p>
                    <p className="text-lg font-medium text-white mb-6">{email}</p>
                    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 text-sm text-neutral-400 text-left">
                      <p className="font-medium text-white mb-2">Didn't receive the email?</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Check your spam folder</li>
                        <li>Make sure the email address is correct</li>
                        <li>Wait a few minutes and check again</li>
                      </ul>
                    </div>
                  </div>

                  <Stack spacing="default">
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => { setSent(false); setEmail(''); }}
                      className="w-full bg-neutral-800/50 hover:bg-neutral-800/70 text-white font-medium px-8 py-4 rounded-xl transition-all border border-neutral-700/50"
                    >
                      Try Another Email
                    </motion.button>
                    <Link to="/auth" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg"
                      >
                        Back to Login
                      </motion.button>
                    </Link>
                  </Stack>
                </>
              )}
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
