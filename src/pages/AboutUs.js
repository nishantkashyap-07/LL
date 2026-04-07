import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Award, Users, Car, Heart, TrendingUp, Zap, CheckCircle,
  ArrowRight, MapPin, Star, Globe, ChevronRight
} from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';

/* ─── helpers ─────────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { type: 'spring', stiffness: 280, damping: 24, delay },
});

const staggerChild = (i) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { type: 'spring', stiffness: 300, damping: 26, delay: i * 0.1 },
});

const GradientOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />
);

/* ─── data ─────────────────────────────────────────────────────────────── */
const stats = [
  { number: '1,000+', label: 'Vehicles in Fleet', icon: Car },
  { number: '50K+', label: 'Happy Customers', icon: Users },
  { number: '40+', label: 'Cities Covered', icon: MapPin },
  { number: '4.9★', label: 'Average Rating', icon: Star },
];

const values = [
  { icon: Shield, title: 'Safety First', desc: 'Every vehicle is thoroughly inspected, sanitized, and insured before reaching you. Your safety is our non-negotiable promise.', color: 'from-emerald-700 to-emerald-800' },
  { icon: Heart, title: 'Customer Love', desc: 'We go beyond transactions to build relationships. From 24/7 support to proactive assistance, you come first.', color: 'from-pink-700 to-pink-800' },
  { icon: Zap, title: 'Instant & Simple', desc: 'No paperwork nightmares. Book in under 60 seconds via WhatsApp and unlock your ride within minutes.', color: 'from-amber-700 to-amber-800' },
  { icon: Globe, title: 'Pan-India Reach', desc: 'From metro cities to tier-2 towns, LivinLease is expanding so that premium mobility is available everywhere.', color: 'from-blue-700 to-blue-800' },
  { icon: TrendingUp, title: 'Transparent Pricing', desc: 'What you see is what you pay. Zero hidden charges, honest fuel policies, and clear refund terms.', color: 'from-violet-700 to-violet-800' },
  { icon: Award, title: 'Premium Quality', desc: 'All-new model vehicles maintained to the highest standards. Every ride feels like driving your own.', color: 'from-orange-700 to-orange-800' },
];

const team = [
  { name: 'Arjun Mehta', role: 'Co-Founder & CEO', initials: 'AM', grad: 'from-blue-700 to-indigo-800', bio: 'Former automotive engineer turned entrepreneur. Passionate about democratising mobility across India.' },
  { name: 'Priya Sharma', role: 'Co-Founder & COO', initials: 'PS', grad: 'from-purple-700 to-pink-800', bio: 'Operations veteran with 10+ years scaling marketplaces. Obsessed with customer experience.' },
  { name: 'Rahul Verma', role: 'Head of Technology', initials: 'RV', grad: 'from-emerald-700 to-teal-800', bio: 'Full-stack architect who built the WhatsApp-first booking engine from scratch.' },
  { name: 'Kavya Nair', role: 'Head of Growth', initials: 'KN', grad: 'from-amber-700 to-orange-800', bio: 'Growth strategist who expanded LivinLease from 2 cities to 40+ in under 18 months.' },
];

const milestones = [
  { year: '2020', title: 'Founded in Mumbai', desc: 'Started with 10 vehicles and a vision to simplify vehicle rentals across India.' },
  { year: '2021', title: 'WhatsApp Booking Launch', desc: 'Launched the industry-first WhatsApp-native booking flow. Bookings tripled overnight.' },
  { year: '2022', title: 'Pan-India Expansion', desc: 'Reached 20+ cities and onboarded 500+ verified sellers on the platform.' },
  { year: '2023', title: '50,000 Happy Customers', desc: 'Crossed 50K rides and maintained a stellar 4.9★ average customer rating.' },
  { year: '2024', title: '1,000+ Vehicle Fleet', desc: 'Fleet crossed 1,000 vehicles. Launched monthly subscription rentals.' },
  { year: '2025+', title: 'The Road Ahead', desc: 'Expanding to 100+ cities, launching the mobile app, and introducing EV rentals.' },
];

/* ─── Hero ──────────────────────────────────────────────────────────────── */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 pt-20">
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <GradientOrb className="top-0 left-1/4 w-[500px] h-[500px] bg-primary-900/20" />
        <GradientOrb className="bottom-0 right-0 w-[400px] h-[400px] bg-secondary-900/15" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 container-elegant w-full py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider backdrop-blur-md shadow-sm mb-8"
        >
          <Award className="w-3.5 h-3.5 text-secondary-500" />
          India's Most Trusted Vehicle Rental
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.15 }}
          className="text-5xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-100 leading-[1.05] tracking-tight mb-6"
        >
          Driving India
          <br />
          <span className="text-gradient">Forward Together</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-neutral-600 dark:text-neutral-400 text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          LivinLease was born from a simple idea: renting a vehicle in India should be as easy, transparent, and trustworthy as borrowing one from a friend.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/browse" className="group inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl transition-all duration-300 shadow-elegant-lg hover:-translate-y-1 text-sm">
            Explore Our Fleet <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-100 dark:bg-neutral-800/70 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium rounded-xl transition-all duration-200 text-sm border border-neutral-200 dark:border-neutral-700">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Stats ─────────────────────────────────────────────────────────────── */
const Stats = () => (
  <section className="bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
    <div className="container-elegant py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={i} {...staggerChild(i)} className="text-center">
            <div className="flex justify-center mb-3 text-secondary-400">
              <s.icon className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{s.number}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Mission ───────────────────────────────────────────────────────────── */
const Mission = () => (
  <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
    <div className="container-elegant">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp(0)}>
          <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-4">OUR MISSION</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight mb-6">
            Mobility for
            <br />
            <span className="text-gradient">Every Indian</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-6">
            We believe that access to a great vehicle shouldn't be a luxury. Whether you're a college student needing a scooty for a week or a family planning a road trip, LivinLease has you covered — transparently and affordably.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            Our platform connects verified vehicle owners with customers who need flexible, quality transport. Every booking is backed by insurance, 24/7 support, and our promise of zero hidden charges.
          </p>
          <div className="space-y-3">
            {['Verified sellers & vehicles', 'Transparent pricing always', '24/7 WhatsApp support', 'Doorstep delivery available'].map((item, i) => (
              <motion.div key={i} {...staggerChild(i)} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="relative">
          <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-10 shadow-elegant-xl">
            <GradientOrb className="top-0 right-0 w-48 h-48 bg-secondary-900/20" />
            <GradientOrb className="bottom-0 left-0 w-40 h-40 bg-accent-900/15" />
            <div className="relative z-10 space-y-6">
              {[
                { label: 'Customer Satisfaction', value: 98, color: 'bg-accent-500' },
                { label: 'On-time Delivery', value: 97, color: 'bg-secondary-500' },
                { label: 'Repeat Bookings', value: 85, color: 'bg-primary-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.label}</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center">Based on 50,000+ verified customer reviews</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─── Values ────────────────────────────────────────────────────────────── */
const Values = () => (
  <section className="py-24 bg-white dark:bg-neutral-900/40">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-3">WHAT WE STAND FOR</p>
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Our Core Values</h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">Six principles that guide every decision we make — from product to people.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={i}
            {...staggerChild(i * 0.07)}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="card-elegant group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />
            <div className={`w-12 h-12 bg-gradient-to-br ${v.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 shadow-elegant-md transition-transform duration-500`}>
              <v.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">{v.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Timeline ──────────────────────────────────────────────────────────── */
const Timeline = () => (
  <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="text-center mb-16">
        <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-3">OUR JOURNEY</p>
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">How We Got Here</h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">From a small startup with 10 vehicles to India's most trusted rental platform.</p>
      </motion.div>

      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-[26px] top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-8">
          {milestones.map((m, i) => (
            <motion.div key={i} {...staggerChild(i * 0.1)} className="flex gap-6 relative">
              <div className="flex-shrink-0 w-14 h-14 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl flex flex-col items-center justify-center z-10 shadow-elegant">
                <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-500">{m.year}</span>
              </div>
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex-1 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">{m.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── Team ──────────────────────────────────────────────────────────────── */
const Team = () => (
  <section className="py-24 bg-white dark:bg-neutral-900/40">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-3">THE PEOPLE</p>
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Meet Our Team</h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">A passionate team of builders, dreamers, and doers committed to transforming mobility.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <motion.div
            key={i}
            {...staggerChild(i * 0.1)}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="group text-center"
          >
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-elegant-lg">
              <div className={`w-16 h-16 bg-gradient-to-br ${member.grad} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-elegant-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                {member.initials}
              </div>
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">{member.name}</h3>
              <p className="text-xs font-semibold text-secondary-500 uppercase tracking-wider mb-3">{member.role}</p>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── CTA ───────────────────────────────────────────────────────────────── */
const CTA = () => (
  <section className="py-20 bg-neutral-50 dark:bg-neutral-950">
    <div className="container-elegant">
      <motion.div {...fadeUp()} className="relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-12 lg:p-16 text-center">
        <GradientOrb className="top-0 left-1/4 w-64 h-64 bg-secondary-900/20" />
        <GradientOrb className="bottom-0 right-1/4 w-64 h-64 bg-primary-900/15" />
        <div className="relative z-10">
          <p className="text-xs font-bold text-secondary-400 uppercase tracking-[0.2em] mb-4">JOIN THE JOURNEY</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-xl mx-auto mb-8">
            Browse our curated fleet and book your next adventure in under 60 seconds — no paperwork, no hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl transition-all duration-300 shadow-elegant-lg hover:-translate-y-1">
              Browse Vehicles <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/seller/apply" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium rounded-xl transition-all duration-200 border border-neutral-200 dark:border-neutral-700">
              Become a Seller <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Page ──────────────────────────────────────────────────────────────── */
const AboutUs = () => (
  <div>
    <MetaTags
      title="About Us — LivinLease"
      description="Learn about LivinLease — India's most trusted vehicle rental platform. Our mission, values, team, and journey."
      keywords="about livinlease, vehicle rental india, team, mission, values"
    />
    <Hero />
    <Stats />
    <Mission />
    <Values />
    <Timeline />
    <Team />
    <CTA />
  </div>
);

export default AboutUs;
