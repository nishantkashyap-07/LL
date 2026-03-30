/**
 * Stack Component
 * Vertical layout with consistent spacing
 */

const Stack = ({ 
  children, 
  spacing = 'default',
  divider = false,
  className = '' 
}) => {
  const spacingClasses = {
    none: 'space-y-0',
    xs: 'space-y-1',
    sm: 'space-y-2',
    default: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
    '2xl': 'space-y-12'
  };

  const dividerClass = divider ? 'divide-y divide-neutral-800' : '';

  return (
    <div className={`${spacingClasses[spacing]} ${dividerClass} ${className}`}>
      {children}
    </div>
  );
};

export default Stack;
