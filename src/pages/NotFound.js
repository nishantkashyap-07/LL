import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {/* 404 */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-8"
          >
            <div className="text-8xl md:text-9xl font-bold text-gradient mb-4">404</div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">Page Not Found</h1>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                The page you're looking for seems to have taken a different route. Let's get you back on track.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl py-4"
            >
              🚗
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                <Home className="w-4 h-4" />Back to Home
              </Link>
              <button onClick={() => window.history.back()} className="inline-flex items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium px-6 py-3 rounded-xl transition-all border border-neutral-200 dark:border-neutral-700 text-sm">
                <ArrowLeft className="w-4 h-4" />Go Back
              </button>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-4">Or try these pages:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { label: 'Browse Vehicles', to: '/browse', icon: Search },
                  { label: 'Contact Us', to: '/contact', icon: Home },
                  { label: 'Help Center', to: '/help', icon: Home }
                ].map(item => (
                  <Link key={item.to} to={item.to} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm transition-colors border border-neutral-200 dark:border-neutral-700">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
