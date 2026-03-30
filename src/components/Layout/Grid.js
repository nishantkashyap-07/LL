/**
 * Grid Component
 * Responsive grid layout with consistent spacing
 */

const Grid = ({ 
  children, 
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 'default',
  className = '' 
}) => {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4',
    default: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  const colClasses = `grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg}`;

  return (
    <div className={`grid ${colClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;
