import { useTheme } from '../contexts/ThemeContext';

const Skeleton = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '', 
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const { isDark } = useTheme();

  const baseClasses = `${
    isDark ? 'bg-gray-700' : 'bg-gray-300'
  } ${width} ${height} ${className}`;

  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded',
    card: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]}`}
      role="status"
      aria-label="Loading..."
    />
  );
};

// Skeleton components for specific use cases
export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton 
        key={index}
        height="h-4"
        width={index === lines - 1 ? 'w-3/4' : 'w-full'}
        variant="text"
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`${
      isDark ? 'bg-gray-800/40' : 'bg-white/80'
    } border ${
      isDark ? 'border-gray-700/50' : 'border-gray-200/50'
    } rounded-xl p-6 ${className}`}>
      <Skeleton height="h-48" variant="card" className="mb-4" />
      <Skeleton height="h-6" width="w-3/4" className="mb-2" />
      <SkeletonText lines={3} />
      <div className="flex gap-2 mt-4">
        <Skeleton height="h-6" width="w-16" variant="rectangular" />
        <Skeleton height="h-6" width="w-20" variant="rectangular" />
        <Skeleton height="h-6" width="w-14" variant="rectangular" />
      </div>
    </div>
  );
};

export const SkeletonBlogCard = ({ className = '' }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`${
      isDark ? 'bg-gray-800/40' : 'bg-white/80'
    } border ${
      isDark ? 'border-gray-700/50' : 'border-gray-200/50'
    } rounded-xl overflow-hidden ${className}`}>
      <Skeleton height="h-48" variant="rectangular" />
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <Skeleton height="h-5" width="w-16" variant="rectangular" />
          <Skeleton height="h-5" width="w-20" variant="rectangular" />
        </div>
        <Skeleton height="h-6" width="w-full" className="mb-3" />
        <SkeletonText lines={3} />
        <div className="flex justify-between items-center mt-4">
          <Skeleton height="h-4" width="w-24" />
          <Skeleton height="h-4" width="w-20" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonProfile = ({ className = '' }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <Skeleton height="h-12" width="w-12" variant="circular" />
    <div className="flex-1">
      <Skeleton height="h-4" width="w-32" className="mb-2" />
      <Skeleton height="h-3" width="w-24" />
    </div>
  </div>
);

export default Skeleton;