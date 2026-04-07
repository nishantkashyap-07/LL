import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Card, Stack } from '../components/Layout';
import MetaTags from '../components/SEO/MetaTags';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing and using LivinLease services, you accept and agree to be bound by the terms and provision of this agreement.',
      'If you do not agree to abide by the above, please do not use this service.'
    ]
  },
  {
    title: '2. Vehicle Rental Agreement',
    content: [
      'All vehicle rentals are subject to availability and confirmation.',
      'Rental rates are subject to change without notice until booking is confirmed.',
      'A valid driving license and government-issued ID are required for all rentals.',
      'Security deposit may be required and will be refunded upon safe return of the vehicle.'
    ]
  },
  {
    title: '3. User Responsibilities',
    content: [
      'Users must be at least 18 years old to rent a vehicle.',
      'Users are responsible for any damage to the vehicle during the rental period.',
      'Vehicles must be returned in the same condition as received.',
      'Users must comply with all traffic laws and regulations.'
    ]
  },
  {
    title: '4. Payment Terms',
    content: [
      'Payment is required at the time of booking confirmation.',
      'We accept payments via WhatsApp, UPI, and other digital payment methods.',
      'All prices are inclusive of applicable taxes unless otherwise stated.',
      'Refunds are processed according to our cancellation policy.'
    ]
  },
  {
    title: '5. Cancellation Policy',
    content: [
      'Cancellations made 24+ hours before pickup: Full refund',
      'Cancellations made 12-24 hours before pickup: 50% refund',
      'Cancellations made less than 12 hours before pickup: No refund',
      'LivinLease reserves the right to cancel bookings due to unforeseen circumstances.'
    ]
  },
  {
    title: '6. Insurance and Liability',
    content: [
      'All vehicles are covered by comprehensive insurance.',
      'Users are liable for damages not covered by insurance.',
      'LivinLease is not liable for personal belongings left in vehicles.',
      'Users must report accidents immediately to local authorities and LivinLease.'
    ]
  },
  {
    title: '7. Prohibited Uses',
    content: [
      'Using vehicles for illegal activities or commercial purposes without permission.',
      'Subletting or transferring rental rights to third parties.',
      'Modifying or tampering with vehicle systems or appearance.',
      'Using vehicles outside the permitted geographical area.'
    ]
  },
  {
    title: '8. Limitation of Liability',
    content: [
      "LivinLease's liability is limited to the rental amount paid.",
      'We are not liable for indirect, incidental, or consequential damages.',
      'Force majeure events are beyond our control and responsibility.'
    ]
  },
  {
    title: '9. Modifications to Terms',
    content: [
      'LivinLease reserves the right to modify these terms at any time.',
      'Users will be notified of significant changes via email or platform notifications.',
      'Continued use of services constitutes acceptance of modified terms.'
    ]
  }
];

const TermsOfService = () => {
  return (
    <div className="pt-20 min-h-screen">
      <MetaTags title="Terms of Service" description="Please read these terms carefully before using our services." />

      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary-950/20 to-neutral-950" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="w-16 h-16 bg-secondary-500/20 border border-secondary-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-secondary-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Terms of Service</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-4">Last updated: January 2024</p>
          </motion.div>
        </Container>
      </div>

      <Container size="md" className="py-12">
        <Stack spacing="xl">
          <Link to="/" className="inline-flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Intro */}
          <Card variant="glass" padding="lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-500/20 border border-primary-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Welcome to LivinLease</h2>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  These Terms of Service govern your use of LivinLease's vehicle rental platform and services.
                  By using our platform, you agree to these terms in full. Please read them carefully and
                  contact us if you have any questions.
                </p>
              </div>
            </div>
          </Card>

          {/* Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <Card variant="glass" padding="lg">
                <h3 className="text-xl font-semibold mb-4 text-primary-400">{section.title}</h3>
                <div className="space-y-3">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Contact */}
          <Card variant="glass" padding="lg" className="bg-primary-500/5 border-primary-500/20">
            <h3 className="text-xl font-semibold mb-4 text-white">Questions About These Terms?</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">If you have any questions about these Terms of Service:</p>
            <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <p><span className="text-white font-medium">Email:</span> legal@livinlease.com</p>
              <p><span className="text-white font-medium">Phone:</span> +91 98765 43210</p>
              <p><span className="text-white font-medium">Address:</span> 123 Business District, Mumbai, Maharashtra 400001</p>
            </div>
          </Card>
        </Stack>
      </Container>
    </div>
  );
};

export default TermsOfService;
