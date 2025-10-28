import { useTheme } from '../contexts/ThemeContext';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const { isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full animate-spin ${
          isDark 
            ? 'border-gray-600 border-t-blue-400' 
            : 'border-gray-300 border-t-blue-600'
        }`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;