import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import LoadingSpinner from "./LoadingSpinner";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder = null,
  blurDataURL = null,
  onLoad = () => {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate a simple blur placeholder if none provided
  const defaultPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${
        isDark ? "#1f2937" : "#f3f4f6"
      }"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="${
        isDark ? "#6b7280" : "#9ca3af"
      }" font-family="system-ui" font-size="14">Loading...</text>
    </svg>
  `)}`;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Placeholder/Blur Image */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse">
          {blurDataURL ? (
            <img
              src={blurDataURL}
              alt=""
              className="w-full h-full object-cover filter blur-sm scale-110"
            />
          ) : placeholder ? (
            placeholder
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center ${
                isDark ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <LoadingSpinner size="md" />
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Loading...
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isDark ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <svg
              className={`w-8 h-8 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Failed to load
            </span>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
