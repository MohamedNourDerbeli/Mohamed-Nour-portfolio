// Performance monitoring utilities

export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  };
};

export const observeWebVitals = () => {
  try {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => {
        console.log('CLS:', metric);
      });
      getFID((metric) => {
        console.log('FID:', metric);
      });
      getFCP((metric) => {
        console.log('FCP:', metric);
      });
      getLCP((metric) => {
        console.log('LCP:', metric);
      });
      getTTFB((metric) => {
        console.log('TTFB:', metric);
      });
    }).catch((error) => {
      console.warn('Web Vitals not available:', error);
    });
  } catch (error) {
    console.warn('Web Vitals import failed:', error);
  }
};

export const measureResourceTiming = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource');
    
    resources.forEach(resource => {
      if (resource.name.includes('.jpg') || 
          resource.name.includes('.png') || 
          resource.name.includes('.webp')) {
        console.log(`Image ${resource.name} took ${resource.duration}ms to load`);
      }
    });
  }
};

export const reportLargestContentfulPaint = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }
};

export const reportFirstInputDelay = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    
    observer.observe({ entryTypes: ['first-input'] });
  }
};

export const reportCumulativeLayoutShift = () => {
  if ('PerformanceObserver' in window) {
    let clsValue = 0;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
  }
};

// Basic performance monitoring without external dependencies
export const basicPerformanceMonitoring = () => {
  // Monitor page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Monitor resource loading
    setTimeout(measureResourceTiming, 1000);
    
    // Monitor navigation timing
    if ('navigation' in performance) {
      const navTiming = performance.getEntriesByType('navigation')[0];
      if (navTiming) {
        console.log('Navigation Timing:', {
          domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
          loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart,
          totalTime: navTiming.loadEventEnd - navTiming.fetchStart
        });
      }
    }
  });
};

// Initialize all performance monitoring
export const initPerformanceMonitoring = () => {
  if (process.env.NODE_ENV === 'development') {
    // Try advanced monitoring first
    observeWebVitals();
    reportLargestContentfulPaint();
    reportFirstInputDelay();
    reportCumulativeLayoutShift();
    
    // Always run basic monitoring
    basicPerformanceMonitoring();
  }
};