import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, MessageCircle, Mail } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';

const categories = [
  {
    title: 'Booking & Rentals',
    faqs: [
      { question: 'How do I book a vehicle?', answer: 'Browse our vehicles, select your preferred one, choose dates, and complete booking via WhatsApp. Our team will confirm within 2-4 hours.' },
      { question: 'What documents do I need to rent?', answer: 'You need a valid driving license, Aadhaar card or passport, and a security deposit. All documents are verified before vehicle handover.' },
      { question: 'Can I cancel my booking?', answer: 'Yes. Cancellations 24+ hours before pickup get a full refund. 12-24 hours: 50% refund. Less than 12 hours: no refund.' },
      { question: 'What is the minimum rental period?', answer: 'Minimum rental period is 1 day (24 hours). We also offer weekly and monthly packages with discounts.' }
    ]
  },
  {
    title: 'Payment & Pricing',
    faqs: [
      { question: 'How do I pay for my booking?', answer: 'We accept payments via WhatsApp using UPI, Google Pay, PhonePe, Paytm, or bank transfer. Cash on delivery available in select locations.' },
      { question: 'Is there a security deposit?', answer: 'Yes, a refundable security deposit is required. Amount varies by vehicle type: ₹2000 for scooties, ₹5000 for bikes, ₹10000 for cars.' },
      { question: 'Are there any hidden charges?', answer: 'No hidden charges. Price includes basic insurance. Extra charges only for fuel, toll, parking, and damages beyond normal wear.' },
      { question: 'When will I get my security deposit back?', answer: 'Security deposit is refunded within 48 hours after vehicle return, subject to damage inspection.' }
    ]
  },
  {
    title: 'Vehicle & Insurance',
    faqs: [
      { question: 'Are vehicles insured?', answer: 'Yes, all vehicles have comprehensive insurance. However, you are liable for damages not covered by insurance and traffic violations.' },
      { question: 'What if the vehicle breaks down?', answer: 'We provide 24/7 roadside assistance. Call our support number immediately. We will arrange repair or a replacement vehicle at no extra cost.' },
      { question: 'Can I drive outside the city?', answer: 'Yes, but inform us beforehand. Some vehicles have geographical restrictions. Interstate travel may require additional documentation.' },
      { question: 'What happens if I damage the vehicle?', answer: 'Minor damages are covered by insurance. Major damages or negligence will be charged from the security deposit. Police report required for accidents.' }
    ]
  },
  {
    title: 'Account & Support',
    faqs: [
      { question: 'Do I need to create an account?', answer: 'Account is optional for browsing but required for booking. It helps track your bookings and provides faster checkout.' },
      { question: 'How do I contact customer support?', answer: 'Contact us via WhatsApp at +91 98765 43210, email at support@livinlease.com, or call our 24/7 helpline.' },
      { question: 'Can I extend my rental period?', answer: 'Yes, contact us at least 24 hours before return time. Extension is subject to vehicle availability and additional payment.' },
      { question: 'What if I return the vehicle late?', answer: 'Late returns are charged hourly. After 3 hours, a full day charge applies. Please inform us if you anticipate a delay.' }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = categories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(f =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.faqs.length > 0);

  const toggle = (catIdx, faqIdx) => {
    const key = `${catIdx}-${faqIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="FAQ" description="Frequently asked questions about LivinLease vehicle rentals." />

      {/* Hero */}
      <div className="bg-neutral-900 border-b border-neutral-800">
        <div className="container-elegant py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-14 h-14 bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <HelpCircle className="w-7 h-7 text-neutral-300" />
            </div>
            <h1 className="text-4xl font-bold text-neutral-100 mb-3">Frequently Asked Questions</h1>
            <p className="text-neutral-400 max-w-xl mx-auto">Quick answers to common questions about our services</p>
          </motion.div>
        </div>
      </div>

      <div className="container-elegant py-10">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-elegant pl-11 w-full"
            />
          </div>
        </motion.div>

        {/* Categories */}
        {filtered.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-10">
            {filtered.map((cat, catIdx) => (
              <motion.div key={catIdx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: catIdx * 0.05 }}>
                <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">{cat.title}</h2>
                <div className="space-y-2">
                  {cat.faqs.map((faq, faqIdx) => {
                    const key = `${catIdx}-${faqIdx}`;
                    const isOpen = openIndex === key;
                    return (
                      <div key={faqIdx} className="card-minimal p-0 overflow-hidden">
                        <button
                          onClick={() => toggle(catIdx, faqIdx)}
                          className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-neutral-800/50 transition-colors"
                        >
                          <span className="font-medium text-neutral-200 pr-4 text-sm">{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-neutral-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed border-t border-neutral-800 pt-3">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-neutral-600" />
            </div>
            <p className="text-neutral-400 text-sm">No results for "{searchQuery}"</p>
          </div>
        )}

        {/* Still have questions */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto mt-16">
          <div className="card-minimal text-center">
            <h2 className="text-xl font-bold text-neutral-100 mb-2">Still have questions?</h2>
            <p className="text-neutral-400 text-sm mb-6">Our support team is here to help.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold rounded-xl text-sm transition-all">
                <MessageCircle className="w-4 h-4" />WhatsApp Support
              </a>
              <a href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium rounded-xl text-sm transition-all border border-neutral-700">
                <Mail className="w-4 h-4" />Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
