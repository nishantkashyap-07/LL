/**
 * Card Component
 * Reusable card with consistent styling — light/dark aware
 */

const Card = ({ 
  children, 
  variant = 'default',
  padding = 'default',
  hover = false,
  className = '' 
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800',
    glass: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-700/50',
    minimal: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800',
    elevated: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-elegant-lg'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-elegant-lg' 
    : '';

  return (
    <div className={`rounded-2xl ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
