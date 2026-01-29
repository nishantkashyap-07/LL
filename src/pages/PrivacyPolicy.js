import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and government-issued ID for verification.",
        "Payment Information: Payment method details processed securely through our payment partners.",
        "Usage Data: Information about how you use our platform, including search queries and booking history.",
        "Device Information: IP address, browser type, operating system, and device identifiers.",
        "Location Data: GPS location when using our mobile app (with your permission)."
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our vehicle rental services.",
        "To process bookings, payments, and communicate about your rentals.",
        "To verify your identity and prevent fraud.",
        "To improve our services and develop new features.",
        "To send you important updates, promotional offers, and marketing communications.",
        "To comply with legal obligations and resolve disputes."
      ]
    },
    {
      icon: UserCheck,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share information with trusted service providers who assist in our operations.",
        "Vehicle owners may receive necessary information to complete your rental.",
        "We may disclose information when required by law or to protect our rights.",
        "In case of business transfer, your information may be transferred to the new entity."
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your data.",
        "All sensitive information is encrypted during transmission and storage.",
        "Regular security audits and updates are performed on our systems.",
        "Access to personal data is restricted to authorized personnel only.",
        "We use secure payment processors that comply with PCI DSS standards."
      ]
    },
    {
      icon: Shield,
      title: "Your Rights and Choices",
      content: [
        "Access: You can request a copy of the personal information we hold about you.",
        "Correction: You can update or correct your personal information at any time.",
        "Deletion: You can request deletion of your account and associated data.",
        "Portability: You can request your data in a machine-readable format.",
        "Marketing Opt-out: You can unsubscribe from marketing communications.",
        "Cookie Control: You can manage cookie preferences in your browser settings."
      ]
    }
  ];

  const cookieTypes = [
    {
      type: "Essential Cookies",
      description: "Required for basic website functionality and security.",
      examples: "Login sessions, security tokens, preference settings"
    },
    {
      type: "Analytics Cookies",
      description: "Help us understand how visitors use our website.",
      examples: "Page views, user interactions, performance metrics"
    },
    {
      type: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaign effectiveness.",
      examples: "Ad targeting, conversion tracking, social media integration"
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
                <Shield className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="text-secondary-400">Policy</span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6 text-sm opacity-75">
              <Shield className="w-4 h-4" />
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

      {/* Privacy Content */}
      <section className="container-elegant pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-elegant mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              At LivinLease, we are committed to protecting your privacy and ensuring the security of your 
              personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our vehicle rental platform.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              By using our services, you consent to the collection and use of information in accordance with 
              this policy. We encourage you to read this policy carefully and contact us if you have any questions.
            </p>
          </motion.div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="card-elegant"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                    <div className="space-y-3">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cookie Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-elegant mt-12"
          >
            <h3 className="text-xl font-semibold mb-6">Cookie Policy</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our platform. 
              Here are the types of cookies we use:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cookieTypes.map((cookie, index) => (
                <div key={index} className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">{cookie.type}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    {cookie.description}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    <strong>Examples:</strong> {cookie.examples}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-elegant mt-8"
          >
            <h3 className="text-xl font-semibold mb-4">Data Retention</h3>
            <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
              <p>We retain your personal information only as long as necessary to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide our services and maintain your account</li>
                <li>Comply with legal obligations and resolve disputes</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Improve our services through analytics (in anonymized form)</li>
              </ul>
              <p className="mt-4">
                When you delete your account, we will delete or anonymize your personal information 
                within 30 days, except where retention is required by law.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card-elegant mt-12 bg-secondary-50 dark:bg-secondary-900/10 border-secondary-200 dark:border-secondary-800"
          >
            <h3 className="text-xl font-semibold mb-4">Contact Our Privacy Team</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              If you have questions about this Privacy Policy or want to exercise your privacy rights:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Privacy Officer:</strong> privacy@livinlease.com</p>
              <p><strong>Data Protection:</strong> dpo@livinlease.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> 123 Business District, Mumbai, Maharashtra 400001</p>
            </div>
            <div className="mt-6 p-4 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg">
              <p className="text-sm text-secondary-800 dark:text-secondary-200">
                <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 72 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

