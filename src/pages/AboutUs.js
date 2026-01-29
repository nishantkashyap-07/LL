import { motion } from 'framer-motion';
import { 
  Users, Award, Shield, Clock, MapPin, Phone, Mail,
  Target, Eye, Heart, Star, TrendingUp, Globe
} from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: Users },
    { number: '500+', label: 'Premium Vehicles', icon: Award },
    { number: '25+', label: 'Cities Covered', icon: Globe },
    { number: '4.9', label: 'Average Rating', icon: Star }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Every vehicle is thoroughly inspected and insured. Your safety is our top priority.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring exceptional experiences.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Constantly improving our platform with the latest technology and user feedback.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300',
      description: 'Visionary leader with 15+ years in automotive industry'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: '/api/placeholder/300/300',
      description: 'Operations expert ensuring seamless customer experiences'
    },
    {
      name: 'Amit Patel',
      role: 'Technology Lead',
      image: '/api/placeholder/300/300',
      description: 'Tech innovator building the future of vehicle rentals'
    },
    {
      name: 'Sneha Reddy',
      role: 'Customer Success',
      image: '/api/placeholder/300/300',
      description: 'Dedicated to making every customer journey exceptional'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-sophisticated-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container-elegant text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-secondary-400">LivinLease</span>
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
              Revolutionizing vehicle rentals in India with premium quality, 
              transparent pricing, and exceptional customer service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-8 h-8 text-primary-500" />
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    To make premium vehicle rentals accessible, affordable, and hassle-free 
                    for everyone across India. We believe in empowering mobility and creating 
                    memorable travel experiences.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-8 h-8 text-secondary-500" />
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    To become India's most trusted and innovative vehicle rental platform, 
                    setting new standards for quality, service, and customer satisfaction 
                    in the mobility sector.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/api/placeholder/600/400"
                alt="LivinLease Team"
                className="rounded-2xl shadow-elegant-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding-sm bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container-elegant">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and customer satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <div className="card-elegant hover-elegant">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-elegant">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our company culture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="card-elegant hover-elegant"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container-elegant">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              The passionate individuals behind LivinLease, working tirelessly to 
              revolutionize your travel experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="card-elegant hover-elegant text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container-elegant">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-elegant text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your <span className="text-gradient">Journey?</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the LivinLease difference today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <Mail className="w-5 h-5" />
                <span>hello@livinlease.com</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-5 h-5" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

