import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, 
  Linkedin, Youtube, ArrowRight, Shield, Award, Users, Star 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Story', href: '/story' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press & Media', href: '/press' },
        { name: 'Investor Relations', href: '/investors' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Browse Vehicles', href: '/browse' },
        { name: 'Corporate Rentals', href: '/corporate' },
        { name: 'Long-term Leasing', href: '/leasing' },
        { name: 'Airport Transfers', href: '/airport' },
        { name: 'Wedding Cars', href: '/wedding' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Support', href: '/support' },
        { name: 'Booking Guide', href: '/guide' },
        { name: 'Safety Guidelines', href: '/safety' },
        { name: 'Insurance Info', href: '/insurance' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Refund Policy', href: '/refunds' },
        { name: 'Cancellation Policy', href: '/cancellation' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/livinlease', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/livinlease', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/livinlease', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/livinlease', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/livinlease', color: 'hover:text-red-500' }
  ];

  const trustIndicators = [
    { icon: Shield, text: '100% Secure Payments', color: 'text-success-500' },
    { icon: Award, text: 'ISO Certified Service', color: 'text-primary-500' },
    { icon: Users, text: '50K+ Happy Customers', color: 'text-secondary-500' },
    { icon: Star, text: '4.9/5 Average Rating', color: 'text-warning-500' }
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-mesh-gradient"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-neutral-800">
          <div className="container-elegant py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-display font-bold text-white mb-4">
                  Stay Updated with <span className="text-gradient">LivinLease</span>
                </h3>
                <p className="text-lg text-neutral-400 mb-6">
                  Get exclusive deals, new vehicle updates, and travel tips delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-white placeholder:text-neutral-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase whitespace-nowrap"
                  >
                    Subscribe Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-6"
              >
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${indicator.color} bg-current/10 rounded-xl flex items-center justify-center`}>
                      <indicator.icon className={`w-6 h-6 ${indicator.color}`} />
                    </div>
                    <span className="font-medium text-white">{indicator.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container-elegant py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <img 
                    src="/final.jpg" 
                    alt="LivinLease Logo" 
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-2xl font-display font-bold text-gradient">LivinLease</span>
                    <div className="text-xs text-neutral-400 font-medium tracking-wider">PREMIUM RENTALS</div>
                  </div>
                </div>

                <p className="text-neutral-400 mb-8 leading-relaxed">
                  India's most trusted vehicle rental platform. Experience premium quality, 
                  transparent pricing, and exceptional service for all your travel needs.
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span>123 Business District, Mumbai, Maharashtra 400001</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-secondary-500" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent-500" />
                    <span>support@livinlease.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-warning-500" />
                    <span>24/7 Customer Support</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <h4 className="text-lg font-display font-semibold text-white mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-neutral-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800">
          <div className="container-elegant py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Copyright */}
              <div className="text-neutral-400 text-center lg:text-left">
                <p>© {currentYear} LivinLease. All rights reserved.</p>
                <p className="text-sm mt-1">
                  Made with ❤️ in India | Registered under Indian Companies Act
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-6">
                <span className="text-sm text-neutral-400 hidden sm:block">Follow us:</span>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-neutral-400 ${social.color} transition-colors duration-200`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>

              {/* Certifications */}
              <div className="flex items-center space-x-4 text-xs text-neutral-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

