import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, MapPin } from 'lucide-react';

const NotFound = () => {
  const suggestions = [
    { icon: Home, text: 'Go to Homepage', link: '/' },
    { icon: Search, text: 'Browse Vehicles', link: '/browse' },
    { icon: MapPin, text: 'Contact Us', link: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card-elegant"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-8xl md:text-9xl font-bold text-primary-500 mb-4">
              404
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Oops! Page Not Found
            </h1>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              The page you're looking for seems to have taken a different route. 
              Let's get you back on track!
            </p>

            {/* Illustration */}
            <div className="py-8">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                🚗
              </motion.div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Looks like this vehicle took a wrong turn!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase flex items-center justify-center">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-8 py-4 rounded-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </div>

            {/* Suggestions */}
            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                Or try these popular pages:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      to={suggestion.link}
                      className="flex items-center justify-center space-x-2 p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                    >
                      <suggestion.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{suggestion.text}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Help Text */}
            <div className="pt-6">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Still can't find what you're looking for?{' '}
                <Link 
                  to="/contact" 
                  className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default NotFound;

