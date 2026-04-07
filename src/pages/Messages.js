import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, ArrowRight, Headphones, Zap, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';

const staggerChild = (i) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 26, delay: i * 0.1 },
});

const channels = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    desc: 'Chat with our team directly on WhatsApp for instant booking help and updates.',
    cta: 'Open WhatsApp',
    href: 'https://wa.me/919876543210',
    color: 'from-green-600 to-emerald-700',
    badge: 'Fastest response',
    badgeColor: 'bg-emerald-900/40 border-emerald-800/40 text-emerald-400',
  },
  {
    icon: Phone,
    title: 'Call Us',
    desc: 'Speak to a real human 24/7. We\'re always here to help with your rental needs.',
    cta: 'Call Now',
    href: 'tel:+919876543210',
    color: 'from-blue-600 to-indigo-700',
    badge: '24/7 Available',
    badgeColor: 'bg-blue-900/40 border-blue-800/40 text-blue-400',
  },
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'Send us a detailed message and receive a thorough response within 2 hours.',
    cta: 'Send Email',
    href: 'mailto:support@livinlease.com',
    color: 'from-violet-600 to-purple-700',
    badge: 'Within 2 hrs',
    badgeColor: 'bg-violet-900/40 border-violet-800/40 text-violet-400',
  },
];

const faqs = [
  { q: 'How do I track my booking status?', a: 'Go to My Bookings in your dashboard to see real-time status of all your trips.' },
  { q: 'Can I change my booking dates?', a: 'Yes! Contact us via WhatsApp or call us at least 12 hours before your pickup time for free rescheduling.' },
  { q: 'What if my vehicle breaks down?', a: 'Call our 24/7 roadside assistance immediately. All rentals include emergency support.' },
  { q: 'How do I get my security deposit back?', a: 'Deposits are refunded within 48 hours of vehicle return, once our team confirms no damages.' },
];

const Messages = () => (
  <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <MetaTags
      title="Messages & Support — LivinLease"
      description="Contact LivinLease support via WhatsApp, phone, or email. We're here 24/7."
    />

    <div className="container-elegant py-14">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-6 shadow-sm">
          <Headphones className="w-3.5 h-3.5 text-secondary-400" />
          Support & Messaging
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          We're Here to <span className="text-gradient">Help</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-xl mx-auto">
          Reach out through any channel below. Our team is available 24/7 to ensure your ride is perfect.
        </p>
      </motion.div>

      {/* Response Time Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 24 }}
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 mb-8 flex flex-wrap items-center justify-center gap-6 text-sm"
      >
        {[
          { icon: Zap, text: 'WhatsApp: < 5 min', color: 'text-emerald-400' },
          { icon: Phone, text: 'Phone: Instant', color: 'text-blue-400' },
          { icon: Clock, text: 'Email: < 2 hours', color: 'text-violet-400' },
        ].map(({ icon: Icon, text, color }, i) => (
          <div key={i} className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">{text}</span>
          </div>
        ))}
      </motion.div>

      {/* Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {channels.map((ch, i) => (
          <motion.div key={i} {...staggerChild(i)}>
            <a
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-1.5 hover:shadow-elegant-xl transition-all duration-300"
            >
              <div className="relative">
                <div className={`absolute top-0 right-0 bg-gradient-to-r ${ch.color} w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none`} />
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${ch.color} rounded-2xl flex items-center justify-center mb-4 shadow-elegant-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                <ch.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`inline-flex px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider mb-3 ${ch.badgeColor}`}>
                {ch.badge}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">{ch.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-5">{ch.desc}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:gap-3 transition-all">
                {ch.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 280, damping: 24 }}
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="font-bold text-neutral-900 dark:text-neutral-100">Common Questions</h2>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-0.5">Quick answers before you reach out</p>
        </div>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {faqs.map((faq, i) => (
            <motion.div key={i} {...staggerChild(i + 3)} className="px-6 py-5">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{faq.q}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
        <div className="px-6 py-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Still need help?{' '}
            <Link to="/faq" className="text-neutral-900 dark:text-neutral-100 font-semibold hover:underline">
              Browse full FAQ →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Messages;
