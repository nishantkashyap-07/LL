/**
 * Container Component
 * Provides consistent max-width and padding across the application
 */

const Container = ({ 
  children, 
  size = 'default',
  className = '',
  noPadding = false 
}) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-[90rem]',
    full: 'max-w-full'
  };

  const paddingClasses = noPadding ? '' : 'px-4 sm:px-6 lg:px-8';

  return (
    <div className={`${sizeClasses[size]} mx-auto ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
