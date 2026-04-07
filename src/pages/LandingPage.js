import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, Shield, Clock, MessageCircle, Phone,
  Users, Car, Zap, ChevronRight, MapPin, CheckCircle,
  TrendingUp, Award, ChevronDown, Calendar, Search,
  Smartphone, Download, Tag, Percent
} from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import MetaTags from '../components/SEO/MetaTags';
import { useNavigate } from 'react-router-dom';

/* ─── helpers ───────────────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { type: 'spring', stiffness: 280, damping: 24, delay }
});

const GradientOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />
);

/* ─── data ──────────────────────────────────────────────────────────────────── */
const featuredVehicles = [
  { id: 1, name: 'Honda Activa 6G', type: 'scooty', image: '/images/vehicles/hondo-activa-6G.png', price: 299, rating: 4.8, reviews: 124, features: ['Fuel Efficient', 'Comfortable', 'Reliable'] },
  { id: 2, name: 'Maruti Swift', type: 'car', image: '/images/vehicles/maruti-swift.jpg', price: 1299, rating: 4.9, reviews: 89, features: ['AC', 'Automatic', '5 Seater'], specs: { fuel: 'Petrol', seats: 5, transmission: 'Automatic' } },
  { id: 3, name: 'Royal Enfield Classic', type: 'bike', image: '/images/vehicles/royal-enfield.jpg', price: 899, rating: 4.7, reviews: 156, features: ['Powerful', 'Stylish', 'Adventure Ready'], specs: { fuel: 'Petrol', engine: '349cc', transmission: 'Manual' } }
];

const offers = [
  { tag: 'LONG TERM', title: 'Need a car for a few months?', desc: 'Flexible long-term rentals with special pricing.', discount: '20% OFF', from: '₹999', color: 'from-primary-800 to-primary-900', badge: 'bg-primary-700' },
  { tag: '3+ DAYS', title: '5% flat offer', desc: 'Save when you book your car for 3 or more days.', discount: '5% OFF', from: '₹999', color: 'from-secondary-800 to-secondary-900', badge: 'bg-secondary-700' },
  { tag: 'NEW USER', title: '10% off for new users', desc: 'Perfect time to start your first trip with us.', discount: '10% OFF', from: '₹999', color: 'from-accent-800 to-accent-900', badge: 'bg-accent-700' },
  { tag: 'LONG TRIPS', title: '15% off on long trips', desc: 'Get more value on 10+ day bookings.', discount: '15% OFF', from: '₹999', color: 'from-warning-800 to-warning-900', badge: 'bg-warning-700' },
  { tag: 'WEEKLY', title: '10% weekly offer', desc: 'Book for 5+ days and save instantly.', discount: '10% OFF', from: '₹999', color: 'from-primary-700 to-primary-800', badge: 'bg-primary-600' },
  { tag: 'OUTSTATION', title: 'Self-drive outstation trips', desc: 'Great for weekend getaways and long drives.', discount: 'BEST DEAL', from: '₹999', color: 'from-neutral-800 to-neutral-900', badge: 'bg-neutral-700' },
];

const steps = [
  { num: '01', icon: MapPin, title: 'Choose City & Dates', desc: 'Select your city, pickup/drop location, and travel dates to see available vehicles.' },
  { num: '02', icon: Car, title: 'Select Your Ride', desc: 'Pick your vehicle and choose home delivery or pickup from our hub.' },
  { num: '03', icon: MessageCircle, title: 'Book via WhatsApp', desc: 'Pay securely via WhatsApp. No hidden fees. Instant confirmation.' },
  { num: '04', icon: CheckCircle, title: 'Confirm & Drive', desc: 'Upload your license and finalize the booking. You\'re ready to go!' },
];

const testimonials = [
  { name: 'Arjun Sharma', initials: 'AS', rating: 5, text: 'Seamless booking, perfect vehicle condition. LivinLease has completely changed how I travel.', location: 'Mumbai', trips: 12 },
  { name: 'Priya Mehta', initials: 'PM', rating: 5, text: 'The WhatsApp booking flow is genius. Confirmed in minutes, no hassle whatsoever.', location: 'Bangalore', trips: 8 },
  { name: 'Rahul Verma', initials: 'RV', rating: 5, text: 'Great variety, honest pricing, and the 24/7 support actually works. Highly recommend.', location: 'Delhi', trips: 21 },
];

const faqs = [
  { q: 'What is the minimum age to rent a vehicle?', a: 'You must be 18 years or older with a valid driving license to rent any vehicle on LivinLease.' },
  { q: 'Is a valid driving license mandatory?', a: 'Yes, a valid driving license is mandatory. For two-wheelers, a two-wheeler license is required. For cars, a four-wheeler license is needed.' },
  { q: 'What documents are required for booking?', a: 'You need a valid driving license, Aadhaar card or passport as ID proof, and a refundable security deposit.' },
  { q: 'Are fuel costs included in the rental price?', a: 'No, fuel costs are not included. You receive the vehicle with a certain fuel level and must return it at the same level.' },
  { q: 'Can I cancel or reschedule my booking?', a: 'Yes. Cancellations 24+ hours before pickup get a full refund. Reschedule is free with 12+ hours notice.' },
  { q: 'Is there roadside assistance available?', a: 'Yes, all bookings include 24/7 roadside assistance. Call our support number anytime during your rental.' },
];

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Coimbatore', 'Madurai', 'Trichy', 'Mysore', 'Jaipur', 'Kochi'];

/* ─── Inline booking form ───────────────────────────────────────────────────── */
const BookingForm = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ location: 'Mumbai', pickup: '', returnDate: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/browse?location=${form.location}&pickupDate=${form.pickup}&returnDate=${form.returnDate}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-elegant-xl">
      <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-4">Find Your Ride</p>
      <div className="space-y-3">
        {/* Location */}
        <div>
          <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
            <select value={form.location} onChange={e => set('location', e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-500 appearance-none cursor-pointer">
              {cities.map(c => <option key={c} value={c} className="bg-neutral-100 dark:bg-neutral-800">{c}</option>)}
            </select>
          </div>
        </div>
        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Pick-Up Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
              <input type="date" value={form.pickup} min={today} onChange={e => set('pickup', e.target.value)}
                className="w-full pl-9 pr-2 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Return Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 dark:text-neutral-500" />
              <input type="date" value={form.returnDate} min={form.pickup || today} onChange={e => set('returnDate', e.target.value)}
                className="w-full pl-9 pr-2 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-500" />
            </div>
          </div>
        </div>
        <button type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl transition-all duration-300 text-sm shadow-elegant hover:shadow-elegant-lg hover:-translate-y-px">
          <Search className="w-4 h-4" />Find Vehicles
        </button>
      </div>
      <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-2">
        {['Bikes', 'Scooties', 'Cars', 'SUVs'].map(t => (
          <button key={t} type="button" onClick={() => navigate(`/browse?vehicleType=${t.toLowerCase()}`)}
            className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:text-neutral-100 rounded-lg text-xs font-medium transition-colors border border-neutral-200 dark:border-neutral-700">
            {t}
          </button>
        ))}
      </div>
    </form>
  );
};

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
  <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 pt-20">
    <motion.div style={{ y: orbY1 }} className="absolute pointer-events-none">
      <GradientOrb className="top-1/4 left-0 w-[600px] h-[600px] bg-primary-900/20" />
    </motion.div>
    <motion.div style={{ y: orbY2 }} className="absolute pointer-events-none right-0 bottom-0">
      <GradientOrb className="w-[500px] h-[500px] bg-secondary-900/15" />
    </motion.div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />

    <div className="relative z-10 container-elegant w-full py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy + form */}
        <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="space-y-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider backdrop-blur-md shadow-sm">
            <Award className="w-3.5 h-3.5 text-secondary-500 dark:text-secondary-400" />
            India's Most Trusted Vehicle Rental
          </motion.div>

          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-3">WEEKENDER</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 leading-[1.05] tracking-tight mb-4">
              Adventure-Ready<br />
              <span className="text-gradient">Vehicles</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-md">
              Space, style, and confidence — go bigger on every escape. Curated fleet, transparent pricing, instant WhatsApp booking.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-2">
            {['Spacious SUVs', 'Roadtrip Friendly', 'Weekly Offers', 'Unlimited KMs'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.07, type: 'spring', stiffness: 400 }}
                className="px-3 py-1.5 bg-white/60 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/60 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-md shadow-sm transition-all hover:bg-white dark:hover:bg-neutral-800"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Trust row */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="flex items-center gap-6 pt-2">
            {[
              { icon: Shield, text: '100% Insured', color: 'text-accent-400' },
              { icon: Clock, text: '24/7 Support', color: 'text-primary-400' },
              { icon: Zap, text: 'Instant Confirm', color: 'text-secondary-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex gap-3">
            <Link to="/browse" className="group inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl transition-all duration-300 text-sm shadow-elegant-lg hover:-translate-y-1">
              Explore Vehicles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-100 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium rounded-xl transition-all duration-200 text-sm border border-neutral-200 dark:border-neutral-700/60 backdrop-blur-sm">
              <Phone className="w-4 h-4 text-secondary-400" />Call Us
            </a>
          </motion.div>
        </motion.div>

        {/* Right: booking form */}
        <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <BookingForm />
        </motion.div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
  </section>
  );
};

/* ─── Offers Carousel ───────────────────────────────────────────────────────── */
const OffersCarousel = () => (
  <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-2">EXCLUSIVE OFFERS FOR YOU</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">Book the right vehicle<br />in just a few taps</h2>
        </div>
        <Link to="/browse" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:text-neutral-100 transition-colors">
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible snap-x snap-mandatory">
        {offers.map((offer, i) => (
          <motion.div key={i} {...fadeUp(i * 0.07)}
            className="flex-shrink-0 w-72 lg:w-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-200 dark:hover:border-neutral-700 hover:-translate-y-1 transition-all duration-300 group snap-center">
            {/* Top gradient bar */}
            <div className={`h-1.5 bg-gradient-to-r ${offer.color}`} />
            <div className="p-5">
              {/* Badges row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-neutral-900 dark:text-neutral-100 bg-neutral-700 px-2 py-1 rounded-md tracking-wider">LIVINLEASE</span>
                  <span className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Instant access</span>
                </div>
                <span className={`text-[10px] font-bold text-white px-2.5 py-1 rounded-lg ${offer.badge}`}>
                  {offer.discount}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 leading-snug">{offer.title}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-4 leading-relaxed">{offer.desc}</p>

              <div className="flex items-center gap-2 mb-4 text-xs text-neutral-500 dark:text-neutral-500">
                <CheckCircle className="w-3.5 h-3.5 text-accent-400 flex-shrink-0" />No hidden charges
                <CheckCircle className="w-3.5 h-3.5 text-accent-400 flex-shrink-0" />Free reschedule*
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">FROM</p>
                  <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{offer.from}<span className="text-xs font-normal text-neutral-500 dark:text-neutral-500">/ day</span></p>
                </div>
                <Link to="/browse"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl text-xs transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-px">
                  Book now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Stats Bar ─────────────────────────────────────────────────────────────── */
const StatsBar = () => (
  <section className="bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
    <div className="container-elegant py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { number: '1,000+', label: 'Cars in Total', icon: Car },
          { number: '40+', label: 'Service Locations', icon: MapPin },
          { number: '15+', label: 'Years Experience', icon: Award },
          { number: '10M+', label: 'Happy Customers', icon: Users },
        ].map((s, i) => (
          <motion.div key={i} {...fadeUp(i * 0.08)} className="text-center">
            <div className="flex justify-center mb-2 text-secondary-400"><s.icon className="w-5 h-5" /></div>
            <div className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{s.number}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Vehicle Tariffs ───────────────────────────────────────────────────────── */
const VehicleTariffs = () => (
  <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="text-center mb-12">
        <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-3">OUR FLEET</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Our Vehicle Tariffs</h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Prices start from ₹299/day. We have all-new model vehicles — Swift, Activa, Royal Enfield, Maruti Ertiga, Honda City, and more.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {featuredVehicles.map((v, i) => (
          <motion.div key={v.id} {...fadeUp(i * 0.1)}>
            <VehicleCard vehicle={v} />
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/browse" className="group inline-flex items-center gap-2 px-8 py-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium rounded-xl transition-all duration-200 border border-neutral-200 dark:border-neutral-700 hover:-translate-y-0.5">
          View All Vehicles <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </section>
);

/* ─── How It Works (4 steps) ────────────────────────────────────────────────── */
const HowItWorks = () => (
  <section className="py-20 bg-white dark:bg-neutral-900/40">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-3">SIMPLE PROCESS</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Book your rental vehicle<br />without any hassle
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">Follow the road — your 4-step journey to an awesome ride</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)}
            className="relative group">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-neutral-100 dark:bg-neutral-800 z-0" />
            )}
            <div className="relative z-10 card-minimal hover:border-neutral-200 dark:border-neutral-700 hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-neutral-700 to-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:border-neutral-300 dark:border-neutral-600 transition-colors">
                <step.icon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              </div>
              <div className="text-3xl font-bold text-neutral-800 mb-2 select-none">{step.num}</div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{step.title}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Dual CTA Split ────────────────────────────────────────────────────────── */
const DualCTA = () => (
  <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
    <div className="container-elegant">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safe ride */}
        <motion.div {...fadeUp(0)} className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8">
          <GradientOrb className="top-0 right-0 w-48 h-48 bg-accent-900/30" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-900/40 border border-accent-800/50 text-accent-300 rounded-full text-xs font-semibold mb-5">
              <Shield className="w-3.5 h-3.5" />Safe & Reliable
            </span>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Let's<br /><span className="text-gradient">Travel Together</span>
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
              Empower your journey with LivinLease, where every mile feels like your own adventure, backed by safety, comfort, and control.
            </p>
            <div className="flex flex-wrap gap-3 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
              {['Verified Vehicles', '24/7 Roadside Help', 'Insured Rides', 'Clean & Sanitized'].map(f => (
                <div key={f} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-400" />{f}
                </div>
              ))}
            </div>
            <Link to="/browse" className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl text-sm transition-all duration-300 shadow-elegant hover:shadow-elegant-md hover:-translate-y-1">
              Book a Safe Ride <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Discount offer */}
        <motion.div {...fadeUp(0.1)} className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8">
          <GradientOrb className="top-0 right-0 w-48 h-48 bg-secondary-900/30" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-900/40 border border-secondary-800/50 text-secondary-300 rounded-full text-xs font-semibold mb-5">
              <Tag className="w-3.5 h-3.5" />Limited Time Offer
            </span>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">Get</h3>
            <div className="text-5xl font-black text-secondary-400 mb-1">30% OFF</div>
            <p className="text-neutral-700 dark:text-neutral-300 font-semibold mb-3">on Your First Self-Drive</p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
              Drive more, spend less. Unlock exclusive self-drive discounts and seasonal offers tailored just for you.
            </p>
            <div className="flex flex-wrap gap-3 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
              {['No Hidden Charges', 'Free Reschedule*', 'Instant Confirm', 'Best Price Guaranteed'].map(f => (
                <div key={f} className="flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-secondary-400" />{f}
                </div>
              ))}
            </div>
            <Link to="/browse" className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-600 hover:bg-secondary-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 hover:-translate-y-px">
              View All Offers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─── Rental Basis ──────────────────────────────────────────────────────────── */
const RentalBasis = () => (
  <section className="py-20 bg-white dark:bg-neutral-900/40">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Hire and Drive Based<br />On Your Needs
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">Flexible rental options to match every journey</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Clock, title: 'Hourly Basis', desc: 'Hire your vehicle on an hourly basis for maximum convenience. Full freedom to choose your own ride for short trips and errands.', from: '₹99/hr', color: 'from-primary-700 to-primary-800' },
          { icon: Calendar, title: 'Daily Basis', desc: 'Book your vehicle and get additional discounts. Complete your daily routine by hiring the best vehicles as per your wish.', from: '₹299/day', color: 'from-secondary-700 to-secondary-800' },
          { icon: TrendingUp, title: 'Monthly Basis', desc: 'Renting your dream vehicle on a monthly basis is now simpler. Explore unlimited kilometers within the city and outstation.', from: '₹5,999/mo', color: 'from-accent-700 to-accent-800' },
        ].map((item, i) => (
          <motion.div key={i} {...fadeUp(i * 0.12)}
            className="card-elegant hover-elegant group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
            <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 shadow-elegant-md transition-transform duration-500`}>
              <item.icon className="w-7 h-7 text-white drop-shadow-md" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">{item.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">{item.desc}</p>
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">Starting from</p>
                <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{item.from}</p>
              </div>
              <Link to="/browse" className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:text-neutral-100 flex items-center gap-1 transition-colors">
                Book now <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Testimonials ──────────────────────────────────────────────────────────── */
const Testimonials = () => {
  const [active, setActive] = useState(0);

  return (
  <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="text-center mb-12">
        <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-3">CUSTOMER REVIEWS</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">What Our <span className="text-gradient">Customers Say</span></h2>
        <p className="text-neutral-600 dark:text-neutral-400">Real experiences from real people</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 280, damping: 24, delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="card-elegant hover-elegant group relative overflow-hidden cursor-pointer"
            onClick={() => setActive(i)}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-700/50 to-transparent" />
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-11 h-11 bg-gradient-to-br from-primary-700 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              >
                {t.initials}
              </motion.div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">{t.name}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
                  <MapPin className="w-3 h-3" />{t.location} · {t.trips} trips
                </div>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">
              {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-secondary-400 fill-current" />)}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">"{t.text}"</p>
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5 text-xs text-accent-400">
              <CheckCircle className="w-3.5 h-3.5" />Verified customer
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            animate={{ width: active === i ? 24 : 8, opacity: active === i ? 1 : 0.4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="h-2 rounded-full bg-neutral-900 dark:bg-neutral-100"
          />
        ))}
      </div>
    </div>
  </section>
  );
};

/* ─── FAQ ───────────────────────────────────────────────────────────────────── */
const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-20 bg-white dark:bg-neutral-900/40">
      <div className="container-elegant">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-3">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Frequently Asked Questions</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Everything you need to know before you ride</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={i} {...fadeUp(i * 0.05)}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-200 dark:border-neutral-700 transition-colors">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left">
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 pr-4">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-500 dark:text-neutral-500 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-neutral-800 pt-3">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── App Download ──────────────────────────────────────────────────────────── */
const AppDownload = () => (
  <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-10 lg:p-14">
        <GradientOrb className="top-0 right-0 w-80 h-80 bg-primary-900/20" />
        <GradientOrb className="bottom-0 left-0 w-64 h-64 bg-secondary-900/15" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] rounded-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-5">
              <Smartphone className="w-3.5 h-3.5 text-primary-400" />LIVINLEASE APP
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-neutral-900 dark:text-neutral-100 mb-5 leading-[1.1] tracking-tight">
              Book your ride in<br /><span className="text-gradient">under 60 seconds</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
              Save your favourite vehicles, track upcoming trips, manage payments and unlock app-only offers wherever you go.
            </p>
            <div className="flex flex-wrap gap-3 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
              {['Instant confirmation', 'Doorstep delivery', 'No hidden charges', 'App-only offers'].map(f => (
                <div key={f} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-400" />{f}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold rounded-xl text-sm transition-all duration-200 hover:-translate-y-px">
                <Download className="w-4 h-4" />App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium rounded-xl text-sm transition-all duration-200 border border-neutral-200 dark:border-neutral-700 hover:-translate-y-px">
                <Download className="w-4 h-4" />Google Play
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="text-center">
              <div className="w-40 h-40 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-center">
                  <Smartphone className="w-12 h-12 text-neutral-600 mx-auto mb-2" />
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">QR Code</p>
                  <p className="text-xs text-neutral-600">Coming soon</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">Scan & install</p>
              <p className="text-xs text-neutral-600 mt-1">Point your camera to download</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Final CTA ─────────────────────────────────────────────────────────────── */
const FinalCTA = () => (
  <section className="py-16 bg-white dark:bg-neutral-900/40">
    <div className="container-elegant text-center">
      <motion.div {...fadeUp()}>
        <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-4">READY TO RENT?</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">Book Now And Save Big</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-8">Transparent pricing · No hidden fees · 24/7 support</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/browse" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl transition-all duration-300 shadow-elegant-lg hover:-translate-y-1">
            Book a Safe Ride <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="tel:+919876543210" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium rounded-xl transition-all duration-200 border border-neutral-200 dark:border-neutral-700 hover:-translate-y-px">
            <Phone className="w-4 h-4 text-secondary-400" />+91 98765 43210
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Page ──────────────────────────────────────────────────────────────────── */
const LandingPage = () => (
  <div>
    <MetaTags
      title="LivinLease - Premium Vehicle Rentals in India"
      description="Rent premium cars, bikes, and scooties across India. Transparent pricing, 24/7 support, and seamless WhatsApp booking."
      keywords="vehicle rental, car rental, bike rental, scooty rental, India, premium vehicles"
    />
    <Hero />
    <OffersCarousel />
    <StatsBar />
    <VehicleTariffs />
    <HowItWorks />
    <DualCTA />
    <RentalBasis />
    <Testimonials />
    <FAQ />
    <AppDownload />
    <FinalCTA />
  </div>
);

export default LandingPage;
