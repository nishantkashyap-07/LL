import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Card, Stack } from '../components/Layout';
import MetaTags from '../components/SEO/MetaTags';

const sections = [
  {
    icon: Database,
    title: 'Information We Collect',
    content: [
      'Personal Information: Name, email address, phone number, and government-issued ID for verification.',
      'Payment Information: Payment method details processed securely through our payment partners.',
      'Usage Data: Information about how you use our platform, including search queries and booking history.',
      'Device Information: IP address, browser type, operating system, and device identifiers.',
      'Location Data: GPS location when using our mobile app (with your permission).'
    ]
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    content: [
      'To provide and maintain our vehicle rental services.',
      'To process bookings, payments, and communicate about your rentals.',
      'To verify your identity and prevent fraud.',
      'To improve our services and develop new features.',
      'To send you important updates, promotional offers, and marketing communications.',
      'To comply with legal obligations and resolve disputes.'
    ]
  },
  {
    icon: UserCheck,
    title: 'Information Sharing',
    content: [
      'We do not sell, trade, or rent your personal information to third parties.',
      'We may share information with trusted service providers who assist in our operations.',
      'Vehicle owners may receive necessary information to complete your rental.',
      'We may disclose information when required by law or to protect our rights.'
    ]
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: [
      'We implement industry-standard security measures to protect your data.',
      'All sensitive information is encrypted during transmission and storage.',
      'Regular security audits and updates are performed on our systems.',
      'Access to personal data is restricted to authorized personnel only.'
    ]
  },
  {
    icon: Shield,
    title: 'Your Rights and Choices',
    content: [
      'Access: You can request a copy of the personal information we hold about you.',
      'Correction: You can update or correct your personal information at any time.',
      'Deletion: You can request deletion of your account and associated data.',
      'Marketing Opt-out: You can unsubscribe from marketing communications at any time.'
    ]
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="pt-20 min-h-screen">
      <MetaTags title="Privacy Policy" description="Your privacy is important to us. Learn how we collect, use, and protect your information." />

      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary-950/20 to-neutral-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="w-16 h-16 bg-primary-500/20 border border-primary-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Privacy Policy</h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-neutral-500 mt-4">Last updated: January 2024</p>
          </motion.div>
        </Container>
      </div>

      <Container size="md" className="py-12">
        <Stack spacing="xl">
          <Link to="/" className="inline-flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Intro */}
          <Card variant="glass" padding="lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Commitment to Your Privacy</h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              At LivinLease, we are committed to protecting your privacy and ensuring the security of your
              personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you use our vehicle rental platform.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              By using our services, you consent to the collection and use of information in accordance with
              this policy.
            </p>
          </Card>

          {/* Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card variant="glass" padding="lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 border border-primary-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-white">{section.title}</h3>
                    <div className="space-y-3">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-neutral-400 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Contact */}
          <Card variant="glass" padding="lg" className="bg-secondary-500/5 border-secondary-500/20">
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Our Privacy Team</h3>
            <p className="text-neutral-400 mb-4">If you have questions about this Privacy Policy:</p>
            <div className="space-y-2 text-sm text-neutral-400">
              <p><span className="text-white font-medium">Privacy Officer:</span> privacy@livinlease.com</p>
              <p><span className="text-white font-medium">Phone:</span> +91 98765 43210</p>
              <p><span className="text-white font-medium">Address:</span> 123 Business District, Mumbai, Maharashtra 400001</p>
            </div>
          </Card>
        </Stack>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
