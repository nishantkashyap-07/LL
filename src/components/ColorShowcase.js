import { motion } from 'framer-motion';
import { Palette, Eye, Heart, CheckCircle } from 'lucide-react';

const ColorShowcase = () => {
  const colorPalette = [
    {
      name: 'Primary',
      description: 'Deep Ocean Blue - Trust & Reliability',
      colors: [
        { shade: '500', class: 'bg-primary-500', hex: '#0ea5e9' },
        { shade: '600', class: 'bg-primary-600', hex: '#0284c7' },
        { shade: '700', class: 'bg-primary-700', hex: '#0369a1' },
      ]
    },
    {
      name: 'Secondary',
      description: 'Vibrant Orange - Energy & Adventure',
      colors: [
        { shade: '500', class: 'bg-secondary-500', hex: '#f97316' },
        { shade: '600', class: 'bg-secondary-600', hex: '#ea580c' },
        { shade: '700', class: 'bg-secondary-700', hex: '#c2410c' },
      ]
    },
    {
      name: 'Accent',
      description: 'Electric Green - Success & Eco-friendly',
      colors: [
        { shade: '500', class: 'bg-accent-500', hex: '#22c55e' },
        { shade: '600', class: 'bg-accent-600', hex: '#16a34a' },
        { shade: '700', class: 'bg-accent-700', hex: '#15803d' },
      ]
    }
  ];

  const componentExamples = [
    {
      title: 'Primary Button',
      component: (
        <button className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase">
          Book Now
        </button>
      )
    },
    {
      title: 'Secondary Button',
      component: (
        <button className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-8 py-4 rounded-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase">
          View Details
        </button>
      )
    },
    {
      title: 'Success Button',
      component: (
        <button className="btn-success">
          <CheckCircle className="w-4 h-4 mr-2" />
          Confirmed
        </button>
      )
    },
    {
      title: 'Glass Card',
      component: (
        <div className="glass-card w-48">
          <h3 className="font-semibold mb-2">Glass Effect</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Beautiful glassmorphism design
          </p>
        </div>
      )
    },
    {
      title: 'Premium Card',
      component: (
        <div className="card-premium w-48">
          <h3 className="font-semibold mb-2">Premium Card</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Enhanced card with gradient
          </p>
        </div>
      )
    },
    {
      title: 'Gradient Text',
      component: (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold gradient-text">Brand Gradient</h2>
          <h3 className="text-lg font-semibold gradient-text-success">Success Text</h3>
          <h3 className="text-lg font-semibold gradient-text-warning">Warning Text</h3>
        </div>
      )
    }
  ];

  const statusExamples = [
    {
      title: 'Pending Status',
      component: (
        <span className="status-pending px-3 py-1 rounded-full text-sm font-medium">
          Pending Verification
        </span>
      )
    },
    {
      title: 'Confirmed Status',
      component: (
        <span className="status-confirmed px-3 py-1 rounded-full text-sm font-medium">
          Booking Confirmed
        </span>
      )
    },
    {
      title: 'Cancelled Status',
      component: (
        <span className="status-cancelled px-3 py-1 rounded-full text-sm font-medium">
          Booking Cancelled
        </span>
      )
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">LivinLease</span> Color Theme
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            A sophisticated automotive-inspired color palette
          </p>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {colorPalette.map((palette, index) => (
              <motion.div
                key={palette.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="glass-card"
              >
                <h3 className="text-lg font-semibold mb-2">{palette.name}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                  {palette.description}
                </p>
                <div className="space-y-3">
                  {palette.colors.map((color) => (
                    <div key={color.shade} className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${color.class} rounded-lg shadow-lg`}></div>
                      <div>
                        <div className="font-medium">{palette.name} {color.shade}</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {color.hex}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Component Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Component Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {componentExamples.map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="glass-card text-center"
              >
                <h3 className="text-lg font-semibold mb-4">{example.title}</h3>
                <div className="flex justify-center">
                  {example.component}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Status Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statusExamples.map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="glass-card text-center"
              >
                <h3 className="text-lg font-semibold mb-4">{example.title}</h3>
                <div className="flex justify-center">
                  {example.component}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gradient Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8">Gradient Backgrounds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-gradient rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Brand Gradient</h3>
              <p className="opacity-90">Primary to Secondary</p>
            </div>
            <div className="bg-hero-gradient rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Hero Gradient</h3>
              <p className="opacity-90">Multi-color blend</p>
            </div>
          </div>
        </motion.div>

        {/* Usage Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card"
        >
          <h2 className="text-2xl font-bold mb-6">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary-500" />
                Primary Colors
              </h3>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
                <li>• <strong>Blue:</strong> Trust, reliability, premium feel</li>
                <li>• <strong>Orange:</strong> Energy, movement, call-to-action</li>
                <li>• <strong>Green:</strong> Success, eco-friendly, confirmation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-secondary-500" />
                Best Practices
              </h3>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
                <li>• Use gradients for primary actions</li>
                <li>• Glass effects for modern appeal</li>
                <li>• Consistent spacing and shadows</li>
                <li>• Accessible color contrasts</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ColorShowcase;

