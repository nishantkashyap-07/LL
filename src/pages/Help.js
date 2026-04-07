import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HelpCircle, Book, MessageCircle, Phone, Mail,
  FileText, Shield, CreditCard, Car, Users, Settings
} from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';

const Help = () => {
  const helpCategories = [
    { icon: Car, title: 'Booking & Rentals', description: 'Learn how to book vehicles and manage your rentals', link: '/faq', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: CreditCard, title: 'Payments', description: 'Payment methods, refunds, and billing information', link: '/faq', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Shield, title: 'Safety & Insurance', description: 'Vehicle insurance, safety guidelines, and policies', link: '/faq', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Users, title: 'Account Management', description: 'Profile settings, verification, and account security', link: '/faq', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: FileText, title: 'Documents', description: 'Required documents and verification process', link: '/faq', color: 'text-red-400', bg: 'bg-red-500/10' },
    { icon: Settings, title: 'Technical Support', description: 'App issues, bugs, and technical assistance', link: '/contact', color: 'text-neutral-700 dark:text-neutral-300', bg: 'bg-neutral-700/50' }
  ];

  const quickLinks = [
    { icon: Book, title: 'User Guide', link: '/faq', description: 'Complete guide to using LivinLease' },
    { icon: FileText, title: 'Terms of Service', link: '/terms', description: 'Our terms and conditions' },
    { icon: Shield, title: 'Privacy Policy', link: '/privacy', description: 'How we protect your data' },
    { icon: HelpCircle, title: 'FAQ', link: '/faq', description: 'Frequently asked questions' }
  ];

  const contactMethods = [
    { icon: MessageCircle, title: 'WhatsApp Support', description: 'Chat with us on WhatsApp', action: 'Chat Now', link: 'https://wa.me/919876543210', bg: 'bg-emerald-500' },
    { icon: Phone, title: 'Call Us', description: '24/7 phone support', action: '+91 98765 43210', link: 'tel:+919876543210', bg: 'bg-blue-500' },
    { icon: Mail, title: 'Email Support', description: 'Response within 24 hours', action: 'support@livinlease.com', link: 'mailto:support@livinlease.com', bg: 'bg-neutral-600' }
  ];

  const popularTopics = [
    'How to book a vehicle?', 'Payment methods accepted', 'Cancellation policy',
    'Security deposit refund', 'Required documents', 'Vehicle breakdown assistance',
    'Extending rental period', 'Late return charges'
  ];

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags
        title="Help Center - LivinLease Support"
        description="Get help with LivinLease. Find guides, FAQs, and contact our support team."
      />

      {/* Header */}
      <div className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800/50 py-16">
        <div className="container-elegant text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <HelpCircle className="w-7 h-7 text-neutral-700 dark:text-neutral-300" />
            </div>
            <h1 className="text-4xl font-bold text-neutral-50 mb-3">How can we help you?</h1>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">Find answers, guides, and get support for all your questions</p>
          </motion.div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="container-elegant py-16">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpCategories.map((cat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Link to={cat.link} className="block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:border-neutral-600 rounded-2xl p-6 transition-all group">
                <div className={`w-11 h-11 ${cat.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <cat.icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-white">{cat.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="border-t border-neutral-200 dark:border-neutral-800/50 bg-white dark:bg-neutral-900/30">
        <div className="container-elegant py-16">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Popular Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularTopics.map((topic, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                <Link to="/faq"
                  className="block p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:border-neutral-600 transition-colors text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:text-neutral-100">
                  {topic}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container-elegant py-16">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
              <Link to={link.link} className="block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:border-neutral-600 rounded-2xl p-6 text-center transition-all group">
                <div className="w-11 h-11 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <link.icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-white text-sm">{link.title}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">{link.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="border-t border-neutral-200 dark:border-neutral-800/50 bg-white dark:bg-neutral-900/30">
        <div className="container-elegant py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-neutral-50 mb-2">Still need help?</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Our support team is available 24/7 to assist you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 text-center">
                  <div className={`w-11 h-11 ${method.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 text-sm">{method.title}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-4">{method.description}</p>
                  <a
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-block bg-neutral-100 hover:bg-white text-neutral-900 font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
                  >
                    {method.action}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
