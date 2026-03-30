/**
 * Flex Component
 * Flexible layout component with common flex patterns
 */

const Flex = ({ 
  children, 
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'default',
  wrap = false,
  className = '' 
}) => {
  const directionClasses = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    col: 'flex-col',
    'col-reverse': 'flex-col-reverse'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const wrapClass = wrap ? 'flex-wrap' : '';

  return (
    <div className={`flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${gapClasses[gap]} ${wrapClass} ${className}`}>
      {children}
    </div>
  );
};

export default Flex;
