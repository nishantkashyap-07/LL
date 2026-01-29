import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, Car, Star, ArrowRight, 
  Users, Shield, Clock, MessageCircle, Award, Zap, Globe, 
  TrendingUp, Phone 
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import VehicleCard from '../components/VehicleCard';
import MetaTags from '../components/SEO/MetaTags';

const LandingPage = () => {
  const featuredVehicles = [
    {
      id: 1,
      name: 'Honda Activa 6G',
      type: 'scooty',
      image: '/api/placeholder/300/200',
      price: 299,
      rating: 4.8,
      reviews: 124,
      features: ['Fuel Efficient', 'Comfortable', 'Reliable']
    },
    {
      id: 2,
      name: 'Maruti Swift',
      type: 'car',
      image: '/api/placeholder/300/200',
      price: 1299,
      rating: 4.9,
      reviews: 89,
      features: ['AC', 'Automatic', '5 Seater']
    },
    {
      id: 3,
      name: 'Royal Enfield Classic',
      type: 'bike',
      image: '/api/placeholder/300/200',
      price: 899,
      rating: 4.7,
      reviews: 156,
      features: ['Powerful', 'Stylish', 'Adventure Ready']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      text: 'Amazing service! The booking process was seamless and the vehicle was in perfect condition.',
      location: 'New York'
    },
    {
      name: 'Mike Chen',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      text: 'LivinLease made my weekend trip so convenient. Highly recommend for anyone looking for reliable rentals.',
      location: 'San Francisco'
    },
    {
      name: 'Emily Davis',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      text: 'Great variety of vehicles and excellent customer support. Will definitely use again!',
      location: 'Los Angeles'
    }
  ];

  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Search & Select',
      description: 'Browse our curated fleet and find the perfect vehicle for your needs with advanced filters and real-time availability.',
      color: 'primary'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Book via WhatsApp',
      description: 'Complete your booking through WhatsApp with our streamlined process. Pay securely and get instant confirmation.',
      color: 'secondary'
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: 'Drive Away',
      description: 'Pick up your vehicle with all documents ready. Enjoy your journey with 24/7 roadside assistance included.',
      color: 'accent'
    }
  ];

  return (
    <div className="pt-20">
      <MetaTags 
        title="LivinLease - Premium Vehicle Rentals in India"
        description="Rent premium cars, bikes, and scooties across India. Transparent pricing, 24/7 support, and seamless WhatsApp booking. Your trusted vehicle rental partner."
        keywords="vehicle rental, car rental, bike rental, scooty rental, India, Mumbai, Delhi, Bangalore, premium vehicles, WhatsApp booking"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
        <div className="absolute inset-0 bg-sophisticated-gradient opacity-5 dark:opacity-10"></div>
        <div className="relative z-10 container-elegant text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center px-6 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                <Award className="w-4 h-4 mr-2 text-secondary-600" />
                India's Most Trusted Vehicle Rental Platform
              </motion.div>
              
              <div className="space-y-6">
                <h1 className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                  <span className="text-gradient">Premium Vehicle Rentals</span>
                  <br />
                  <span>Made Simple & Secure</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed">
                  Experience hassle-free vehicle rentals with our curated fleet of cars, bikes, and scooties. 
                  Professional service, transparent pricing, and seamless booking experience.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/browse" 
                className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase flex items-center"
              >
                Explore Vehicles
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
              <button className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-8 py-4 rounded-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center">
                <Phone className="mr-3 w-5 h-5" />
                +91 98765 43210
              </button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16"
            >
              {[
                { icon: Shield, text: '100% Secure', color: 'text-success-600' },
                { icon: Clock, text: '24/7 Support', color: 'text-primary-600' },
                { icon: MessageCircle, text: 'WhatsApp Booking', color: 'text-secondary-600' },
                { icon: TrendingUp, text: '50K+ Rides', color: 'text-accent-600' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-3">
                  <div className={`w-12 h-12 ${item.color} bg-current/10 rounded-xl flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-16"
            >
              <SearchBar />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Featured Vehicles */}
      <section className="section-padding-sm bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container-elegant">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                <Car className="w-4 h-4 mr-2" />
                Premium Fleet
              </div>
              <h2 className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                <span className="text-gradient">Featured Vehicles</span>
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                Handpicked rides from our premium collection, maintained to the highest standards 
                and ready for your next journey.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="hover-elegant"
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/browse" 
              className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase inline-flex items-center"
            >
              View All Vehicles
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-elegant">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-secondary-100 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Simple Process
              </div>
              <h2 className="font-display font-bold">
                How It <span className="text-gradient">Works</span>
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                Get on the road in just 3 simple steps. Our streamlined process ensures 
                you spend less time booking and more time driving.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="text-center group"
              >
                <div className="card-elegant hover-elegant">
                  <div className={`w-20 h-20 bg-gradient-to-r ${
                    step.color === 'primary' ? 'from-primary-500 to-primary-600' :
                    step.color === 'secondary' ? 'from-secondary-500 to-secondary-600' :
                    'from-accent-500 to-accent-600'
                  } rounded-2xl flex items-center justify-center text-white mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-3xl font-bold text-neutral-300 dark:text-neutral-600">
                        0{index + 1}
                      </span>
                      <h3 className="text-2xl font-display font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-sophisticated-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container-elegant">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join the growing community of satisfied customers who choose LivinLease 
              for their vehicle rental needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Happy Customers', icon: <Users className="w-8 h-8" /> },
              { number: '500+', label: 'Premium Vehicles', icon: <Car className="w-8 h-8" /> },
              { number: '25+', label: 'Cities Covered', icon: <Globe className="w-8 h-8" /> },
              { number: '4.9', label: 'Average Rating', icon: <Star className="w-8 h-8" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <div className="card-glass hover-elegant">
                  <div className="flex justify-center mb-4 opacity-80">
                    {stat.icon}
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Real experiences from real people
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="card-elegant hover-elegant"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-elegant"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Journey?</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Join thousands of satisfied customers and experience the freedom of premium vehicle rentals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase inline-flex items-center justify-center"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/browse" 
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-8 py-4 rounded-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 text-lg inline-flex items-center justify-center"
              >
                Browse Vehicles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

