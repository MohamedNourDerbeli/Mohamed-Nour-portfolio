// Performance monitoring for render blocking optimization
(function() {
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
    }, 1000);
  });
})();