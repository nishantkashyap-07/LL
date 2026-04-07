import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', details: ['123 Business District', 'Mumbai, Maharashtra 400001', 'India'], color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Phone, title: 'Call Us', details: ['+91 98765 43210', '+91 98765 43211', '24/7 Support Available'], color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Mail, title: 'Email Us', details: ['hello@livinlease.com', 'support@livinlease.com', 'Response within 2 hours'], color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Clock, title: 'Business Hours', details: ['Mon–Fri: 9:00 AM – 8:00 PM', 'Saturday: 10:00 AM – 6:00 PM', 'Sunday: 10:00 AM – 4:00 PM'], color: 'text-amber-400', bg: 'bg-amber-500/10' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const faqs = [
    { question: 'How do I book a vehicle?', answer: 'Browse our vehicles, select your preferred one, choose dates, and complete booking via WhatsApp.' },
    { question: 'What documents do I need?', answer: 'You need a valid driving license, Aadhaar card, and a security deposit for vehicle rental.' },
    { question: 'Can I cancel my booking?', answer: 'Yes, you can cancel up to 24 hours before pickup for a full refund. Check our cancellation policy for details.' },
    { question: 'Is insurance included?', answer: 'Yes, all our vehicles come with comprehensive insurance coverage for your peace of mind.' }
  ];

  return (
    <div className="pt-20 bg-neutral-50 dark:bg-neutral-950">
      {/* Hero */}
      <section className="section-padding-sm border-b border-neutral-200 dark:border-neutral-800/50">
        <div className="container-elegant text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-6 shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-secondary-400" />
              We're available 24/7
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Have questions? Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding-sm">
        <div className="container-elegant">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 24, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 text-center transition-shadow duration-300 hover:shadow-elegant-lg h-full">
                  <div className={`w-11 h-11 ${info.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className={`w-5 h-5 ${info.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-xs text-neutral-500 dark:text-neutral-500">{detail}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="section-padding border-t border-neutral-200 dark:border-neutral-800/50">
        <div className="container-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required className="input-elegant" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" className="input-elegant" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email address" required className="input-elegant" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Subject</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} required className="input-elegant">
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} required className="input-elegant resize-none" />
                  </div>
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold py-3 rounded-xl transition-all disabled:opacity-50">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><Send className="w-4 h-4" /><span>Send Message</span></>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Map & Quick Contact */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Find Us</h3>
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-neutral-500 dark:text-neutral-500 mx-auto mb-2" />
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Mumbai, Maharashtra</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Quick Contact</h3>
                <div className="space-y-2">
                  <a href="tel:+919876543210" className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 dark:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 text-sm">
                    <Phone className="w-4 h-4 text-neutral-500 dark:text-neutral-500" /><span>+91 98765 43210</span>
                  </a>
                  <a href="mailto:hello@livinlease.com" className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 dark:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 text-sm">
                    <Mail className="w-4 h-4 text-neutral-500 dark:text-neutral-500" /><span>hello@livinlease.com</span>
                  </a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 dark:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 text-sm">
                    <MessageCircle className="w-4 h-4 text-neutral-500 dark:text-neutral-500" /><span>WhatsApp Support</span>
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} aria-label={social.label}
                      className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:text-neutral-100">
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding border-t border-neutral-200 dark:border-neutral-800/50 bg-white dark:bg-neutral-900/30">
        <div className="container-elegant">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">Quick answers to common questions about our services</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{faq.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
