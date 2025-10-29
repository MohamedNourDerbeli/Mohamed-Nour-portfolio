// Performance monitoring for render blocking and layout shift optimization
(function() {
  let clsScore = 0;
  let clsEntries = [];

  // Monitor Cumulative Layout Shift (CLS)
  if ('LayoutShift' in window) {
    const observer = new PerformanceObserver(function(list) {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
          clsEntries.push({
            value: entry.value,
            sources: entry.sources,
            time: entry.startTime
          });
        }
      }
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
    
    // Report CLS after page load
    window.addEventListener('load', function() {
      setTimeout(function() {
        console.log('📊 Layout Shift Metrics:');
        console.log('CLS Score:', clsScore.toFixed(4));
        console.log('Target: < 0.1 (Good), < 0.25 (Needs Improvement)');
        
        if (clsScore < 0.1) {
          console.log('✅ Excellent CLS score!');
        } else if (clsScore < 0.25) {
          console.log('⚠️ CLS needs improvement');
        } else {
          console.log('❌ Poor CLS score - needs optimization');
        }
        
        if (clsEntries.length > 0) {
          console.log('Layout shift sources:', clsEntries);
        }
      }, 2000);
    });
  }

  // Monitor font loading
  if ('fonts' in document) {
    document.fonts.ready.then(function() {
      console.log('✅ Fonts loaded successfully');
      performance.mark('fonts-loaded');
    });
  }

  // Monitor critical metrics
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      const paintEntries = performance.getEntriesByType('paint');
      
      console.log('🚀 Performance Metrics:');
      console.log('DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart) + 'ms');
      console.log('Load Complete:', Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms');
      
      paintEntries.forEach(function(entry) {
        console.log(entry.name + ':', Math.round(entry.startTime) + 'ms');
      });
      
      // Check for render blocking resources
      const resources = performance.getEntriesByType('resource');
      const renderBlockingCSS = resources.filter(r => 
        r.name.includes('.css') && r.renderBlockingStatus === 'blocking'
      );
      
      if (renderBlockingCSS.length === 0) {
        console.log('✅ No render blocking CSS detected');
      } else {
        console.log('⚠️ Render blocking CSS found:', renderBlockingCSS.length);
      }

      // Monitor Largest Contentful Paint
      if ('LargestContentfulPaint' in window) {
        const lcpObserver = new PerformanceObserver(function(list) {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', Math.round(lastEntry.startTime) + 'ms');
          console.log('LCP Element:', lastEntry.element);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      }
    }, 1000);
  });
})();