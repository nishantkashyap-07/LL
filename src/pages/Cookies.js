import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Eye, Settings } from 'lucide-react';
import { Container, Card, Stack } from '../components/Layout';
import MetaTags from '../components/SEO/MetaTags';

const cookieTypes = [
  {
    icon: Shield,
    title: 'Essential Cookies',
    description: 'Required for basic website functionality and security.',
    examples: ['Login sessions', 'Security tokens', 'Preference settings'],
    canDisable: false
  },
  {
    icon: Eye,
    title: 'Analytics Cookies',
    description: 'Help us understand how visitors use our website.',
    examples: ['Page views', 'User interactions', 'Performance metrics'],
    canDisable: true
  },
  {
    icon: Settings,
    title: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements.',
    examples: ['Ad targeting', 'Conversion tracking', 'Social media'],
    canDisable: true
  }
];

const Cookies = () => {
  return (
    <div className="pt-20 min-h-screen">
      <MetaTags title="Cookie Policy" description="Learn about how LivinLease uses cookies and similar technologies." />

      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-primary-950/20 to-neutral-950" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="w-16 h-16 bg-accent-500/20 border border-accent-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-8 h-8 text-accent-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Cookie Policy</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              How we use cookies and similar technologies
            </p>
          </motion.div>
        </Container>
      </div>

      <Container size="sm" className="py-12">
        <Stack spacing="xl">
          <Card variant="glass" padding="lg">
            <h2 className="text-2xl font-bold mb-4 text-white">What are cookies?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Cookies are small text files stored on your device when you visit our website.
              They help us provide you with a better experience by remembering your preferences
              and understanding how you use our services.
            </p>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Types of Cookies We Use</h2>
            <Stack spacing="lg">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="glass" padding="lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-500/20 border border-primary-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <type.icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-white">{type.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            type.canDisable
                              ? 'bg-warning-500/20 text-warning-400 border border-warning-500/30'
                              : 'bg-success-500/20 text-success-400 border border-success-500/30'
                          }`}>
                            {type.canDisable ? 'Can be disabled' : 'Always active'}
                          </span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4">{type.description}</p>
                        <div>
                          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Examples:</p>
                          <ul className="space-y-1">
                            {type.examples.map((example, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          </div>

          <Card variant="glass" padding="lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Managing Cookies</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              You can control and manage cookies in your browser settings. However,
              disabling certain cookies may affect website functionality.
            </p>
            <div className="bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50 rounded-xl p-4">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                <span className="font-medium text-white">Note:</span> Essential cookies cannot be disabled as they are
                necessary for the website to function properly.
              </p>
            </div>
          </Card>

          <Card variant="glass" padding="lg" className="bg-primary-500/5 border-primary-500/20">
            <h3 className="text-xl font-semibold mb-4 text-white">Questions?</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">If you have questions about our cookie policy:</p>
            <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <p><span className="text-white font-medium">Email:</span> privacy@livinlease.com</p>
              <p><span className="text-white font-medium">Phone:</span> +91 98765 43210</p>
            </div>
          </Card>

          <div className="text-center">
            <Link to="/" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              ← Back to Home
            </Link>
          </div>
        </Stack>
      </Container>
    </div>
  );
};

export default Cookies;
