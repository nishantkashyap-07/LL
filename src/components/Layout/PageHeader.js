import { motion } from 'framer-motion';
import Container from './Container';

/**
 * PageHeader Component
 * Consistent header for internal pages — light/dark aware
 */

const PageHeader = ({ 
  title, 
  subtitle, 
  icon: Icon,
  background = 'gradient',
  breadcrumbs = null 
}) => {
  const backgroundClasses = {
    gradient: 'bg-sophisticated-gradient',
    dark: 'bg-white dark:bg-neutral-900',
    subtle: 'bg-white dark:bg-neutral-900/50'
  };

  return (
    <div className={`${backgroundClasses[background]} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>

      <Container className="relative z-10 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {breadcrumbs && (
            <div className="mb-6 text-sm text-white/80">
              {breadcrumbs}
            </div>
          )}

          {Icon && (
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default PageHeader;
