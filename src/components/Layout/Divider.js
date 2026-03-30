/**
 * Divider Component
 * Visual separator with optional label
 */

const Divider = ({ 
  label = null,
  orientation = 'horizontal',
  spacing = 'default',
  className = '' 
}) => {
  const spacingClasses = {
    none: '',
    sm: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    default: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    lg: orientation === 'horizontal' ? 'my-8' : 'mx-8'
  };

  if (orientation === 'vertical') {
    return (
      <div className={`w-px bg-neutral-800 ${spacingClasses[spacing]} ${className}`} />
    );
  }

  if (label) {
    return (
      <div className={`flex items-center ${spacingClasses[spacing]} ${className}`}>
        <div className="flex-1 border-t border-neutral-800"></div>
        <span className="px-4 text-sm text-neutral-400">{label}</span>
        <div className="flex-1 border-t border-neutral-800"></div>
      </div>
    );
  }

  return (
    <hr className={`border-neutral-800 ${spacingClasses[spacing]} ${className}`} />
  );
};

export default Divider;
