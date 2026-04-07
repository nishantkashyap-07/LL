/**
 * Section Component
 * Provides consistent vertical spacing for page sections
 */

const Section = ({ 
  children, 
  spacing = 'default',
  background = 'transparent',
  className = '' 
}) => {
  const spacingClasses = {
    none: '',
    sm: 'py-12 lg:py-16',
    default: 'py-16 lg:py-24',
    lg: 'py-24 lg:py-32',
    xl: 'py-32 lg:py-40'
  };

  const backgroundClasses = {
    transparent: '',
    subtle: 'bg-white dark:bg-neutral-900/50',
    dark: 'bg-white dark:bg-neutral-900',
    gradient: 'bg-sophisticated-gradient'
  };

  return (
    <section className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
