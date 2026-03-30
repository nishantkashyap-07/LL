import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube, Shield, Award, ArrowRight } from 'lucide-react';
import logoImage from '../logo/final.jpg';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', to: '/about' },
      { name: 'Browse Vehicles', to: '/browse' },
      { name: 'Help Center', to: '/help' },
      { name: 'Contact', to: '/contact' },
      { name: 'FAQ', to: '/faq' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', to: '/terms' },
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Cookie Policy', to: '/cookies' },
    ]
  }
];

const socials = [
  { icon: Facebook, href: 'https://facebook.com/livinlease', label: 'Facebook', hover: 'hover:text-blue-400' },
  { icon: Twitter, href: 'https://twitter.com/livinlease', label: 'Twitter', hover: 'hover:text-sky-400' },
  { icon: Instagram, href: 'https://instagram.com/livinlease', label: 'Instagram', hover: 'hover:text-pink-400' },
  { icon: Linkedin, href: 'https://linkedin.com/company/livinlease', label: 'LinkedIn', hover: 'hover:text-blue-500' },
  { icon: Youtube, href: 'https://youtube.com/livinlease', label: 'YouTube', hover: 'hover:text-red-400' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      {/* Newsletter strip */}
      <div className="border-b border-neutral-800">
        <div className="container-elegant py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-xl font-semibold text-neutral-100 mb-1">Stay in the loop</h3>
              <p className="text-neutral-400 text-sm">Exclusive deals and new vehicle updates, straight to your inbox.</p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input type="email" placeholder="your@email.com"
                className="flex-1 lg:w-64 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors" />
              <button className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold rounded-xl text-sm transition-all duration-200 hover:-translate-y-px flex-shrink-0">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-elegant py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <img src={logoImage} alt="LivinLease" className="w-11 h-11 rounded-xl object-cover shadow-elegant" />
              <div>
                <div className="text-lg font-semibold text-neutral-100">LivinLease</div>
                <div className="text-[10px] text-neutral-500 tracking-widest uppercase">Premium Rentals</div>
              </div>
            </Link>

            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's most trusted vehicle rental platform. Premium quality, transparent pricing, exceptional service.
            </p>

            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <span>123 Business District, Mumbai, MH 400001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <span>support@livinlease.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(section => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Trust */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-5">Trust & Safety</h4>
            <div className="space-y-3">
              {[
                { icon: Shield, text: 'SSL Secured Payments' },
                { icon: Award, text: 'ISO Certified Service' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-xl border border-neutral-700/50">
                  <item.icon className="w-4 h-4 text-accent-400 flex-shrink-0" />
                  <span className="text-sm text-neutral-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-elegant py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">© {year} LivinLease. All rights reserved. Made with ❤️ in India.</p>

          <div className="flex items-center gap-4">
            {socials.map(s => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}
                className={`text-neutral-500 ${s.hover} transition-colors duration-200`} aria-label={s.label}>
                <s.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
