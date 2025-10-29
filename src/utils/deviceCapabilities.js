// Device capability detection for performance optimization
export const getDeviceCapabilities = () => {
  // Check if device supports WebGL
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const hasWebGL = !!gl;

  // Check device memory (if available)
  const deviceMemory = navigator.deviceMemory || 4; // Default to 4GB if not available

  // Check connection speed
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');

  // Check if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Check CPU cores (rough estimate)
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;

  return {
    hasWebGL,
    deviceMemory,
    isSlowConnection,
    isMobile,
    hardwareConcurrency,
    shouldLoad3D: hasWebGL && deviceMemory >= 2 && !isSlowConnection && hardwareConcurrency >= 2
  };
};

export const shouldLoadHeavyAssets = () => {
  const capabilities = getDeviceCapabilities();
  return capabilities.shouldLoad3D;
};