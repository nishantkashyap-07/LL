import { motion } from 'framer-motion';
import { ArrowLeft, Shield, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using LivinLease services, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service."
      ]
    },
    {
      title: "2. Vehicle Rental Agreement",
      content: [
        "All vehicle rentals are subject to availability and confirmation.",
        "Rental rates are subject to change without notice until booking is confirmed.",
        "A valid driving license and government-issued ID are required for all rentals.",
        "Security deposit may be required and will be refunded upon safe return of the vehicle."
      ]
    },
    {
      title: "3. User Responsibilities",
      content: [
        "Users must be at least 18 years old to rent a vehicle.",
        "Users are responsible for any damage to the vehicle during the rental period.",
        "Vehicles must be returned in the same condition as received.",
        "Users must comply with all traffic laws and regulations."
      ]
    },
    {
      title: "4. Payment Terms",
      content: [
        "Payment is required at the time of booking confirmation.",
        "We accept payments via WhatsApp, UPI, and other digital payment methods.",
        "All prices are inclusive of applicable taxes unless otherwise stated.",
        "Refunds are processed according to our cancellation policy."
      ]
    },
    {
      title: "5. Cancellation Policy",
      content: [
        "Cancellations made 24+ hours before pickup: Full refund",
        "Cancellations made 12-24 hours before pickup: 50% refund",
        "Cancellations made less than 12 hours before pickup: No refund",
        "LivinLease reserves the right to cancel bookings due to unforeseen circumstances."
      ]
    },
    {
      title: "6. Insurance and Liability",
      content: [
        "All vehicles are covered by comprehensive insurance.",
        "Users are liable for damages not covered by insurance.",
        "LivinLease is not liable for personal belongings left in vehicles.",
        "Users must report accidents immediately to local authorities and LivinLease."
      ]
    },
    {
      title: "7. Privacy and Data Protection",
      content: [
        "We collect and use personal information as described in our Privacy Policy.",
        "User data is protected and not shared with third parties without consent.",
        "We use cookies and similar technologies to improve user experience.",
        "Users have the right to access, modify, or delete their personal data."
      ]
    },
    {
      title: "8. Prohibited Uses",
      content: [
        "Using vehicles for illegal activities or commercial purposes without permission.",
        "Subletting or transferring rental rights to third parties.",
        "Modifying or tampering with vehicle systems or appearance.",
        "Using vehicles outside the permitted geographical area."
      ]
    },
    {
      title: "9. Limitation of Liability",
      content: [
        "LivinLease's liability is limited to the rental amount paid.",
        "We are not liable for indirect, incidental, or consequential damages.",
        "Force majeure events are beyond our control and responsibility.",
        "Users acknowledge inherent risks in vehicle operation."
      ]
    },
    {
      title: "10. Modifications to Terms",
      content: [
        "LivinLease reserves the right to modify these terms at any time.",
        "Users will be notified of significant changes via email or platform notifications.",
        "Continued use of services constitutes acceptance of modified terms.",
        "Users should review terms periodically for updates."
      ]
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="section-padding-sm bg-sophisticated-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container-elegant">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of <span className="text-secondary-400">Service</span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6 text-sm opacity-75">
              <Clock className="w-4 h-4" />
              <span>Last updated: January 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back Button */}
      <section className="container-elegant py-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </section>

      {/* Terms Content */}
      <section className="container-elegant pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-elegant mb-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Welcome to LivinLease</h2>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of LivinLease's vehicle rental platform 
                  and services. By using our platform, you agree to these terms in full. Please read them 
                  carefully and contact us if you have any questions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="card-elegant"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary-700 dark:text-primary-300">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-elegant mt-12 bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800"
          >
            <h3 className="text-xl font-semibold mb-4">Questions About These Terms?</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> legal@livinlease.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> 123 Business District, Mumbai, Maharashtra 400001</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;

