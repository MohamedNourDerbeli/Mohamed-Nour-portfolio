import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground = () => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for DOM elements to be available
    const initializeShapeBreaking = () => {
      // Simple and reliable shape breaking functionality
      const handleClick = (e) => {
        console.log('Click detected at:', e.clientX, e.clientY);
        
        const elements = document.querySelectorAll('.animated-bg-square, .animated-bg-circle, .animated-bg-triangle');
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const elementCenterX = rect.left + rect.width / 2;
          const elementCenterY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(clickX - elementCenterX, 2) + 
            Math.pow(clickY - elementCenterY, 2)
          );
          
          // Break shapes within 200px of click
          if (distance < 200) {
            console.log('Breaking shape:', element.className);
            breakShape(element, clickX, clickY, elementCenterX, elementCenterY, index);
          }
        });
      };

    const breakShape = (element, clickX, clickY, elementX, elementY, index) => {
      // Calculate break direction (away from click)
      const deltaX = elementX - clickX;
      const deltaY = elementY - clickY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
      
      // Normalize direction and add force
      const forceMultiplier = 300;
      const breakX = deltaX / distance * forceMultiplier;
      const breakY = deltaY / distance * forceMultiplier;
      
      // Create particle explosion
      createBreakParticles(elementX, elementY, element);
      
      // Apply breaking animation using CSS transforms
      element.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.transform = `translate(${breakX}px, ${breakY}px) rotate(${Math.random() * 720 + 360}deg) scale(0)`;
      element.style.opacity = '0';
      
      // Respawn after delay
      setTimeout(() => {
        respawnShape(element, index);
      }, 2000 + Math.random() * 3000);
    };

    const createBreakParticles = (x, y, originalElement) => {
      const computedStyle = window.getComputedStyle(originalElement);
      const backgroundColor = computedStyle.backgroundColor || '#6366f1';
      
      // Create 6 particles
      for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'break-particle';
        particle.style.cssText = `
          position: fixed;
          width: 8px;
          height: 8px;
          background: ${backgroundColor};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          left: ${x}px;
          top: ${y}px;
          transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle explosion
        const angle = (i / 6) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;
        const particleX = Math.cos(angle) * distance;
        const particleY = Math.sin(angle) * distance;
        
        particle.style.transition = 'all 1s ease-out';
        
        // Trigger animation
        setTimeout(() => {
          particle.style.transform = `translate(${particleX - 4}px, ${particleY - 4}px) scale(0)`;
          particle.style.opacity = '0';
        }, 10);
        
        // Remove particle
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 1100);
      }
    };

    const respawnShape = (element, index) => {
      if (!element || !element.parentNode) return;
      
      // Reset position and properties
      element.style.transition = 'all 1s ease-out';
      element.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
      element.style.opacity = '0';
      
      // Animate back to normal
      setTimeout(() => {
        element.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
        element.style.opacity = '1';
        
        // Resume normal animation
        setTimeout(() => {
          element.style.transition = '';
        }, 1000);
      }, 100);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

      // Add global click handler to document to catch all clicks
      const globalClickHandler = (e) => {
        console.log('Global click detected at:', e.clientX, e.clientY);
        handleClick(e);
      };
      
      document.addEventListener('click', globalClickHandler);

      // Add event listeners to container
      if (containerRef.current) {
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseenter', handleMouseEnter);
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);
      }

      // Add individual click handlers to shapes
      const elements = document.querySelectorAll('.animated-bg-square, .animated-bg-circle, .animated-bg-triangle');
      console.log('Found', elements.length, 'shapes to add click handlers to');
      
      elements.forEach((element, index) => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', (e) => {
          e.stopPropagation();
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          console.log('Shape clicked directly:', element.className);
          breakShape(element, centerX, centerY, centerX, centerY, index);
        });
      });

      // Cleanup
      return () => {
        document.removeEventListener('click', globalClickHandler);
        if (containerRef.current) {
          containerRef.current.removeEventListener('mousemove', handleMouseMove);
          containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
          containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    };

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeShapeBreaking();
      setIsLoaded(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);



  // Expanded predefined positions with more shapes
  const elements = [
    // Squares - More distributed
    { type: 'square', top: '5%', left: '2%', size: 50, delay: 0, color: 'purple-blue' },
    { type: 'square', top: '15%', right: '3%', size: 45, delay: 2, color: 'pink-red' },
    { type: 'square', bottom: '5%', left: '5%', size: 55, delay: 4, color: 'indigo-purple' },
    { type: 'square', bottom: '10%', right: '2%', size: 40, delay: 1, color: 'cyan-teal' },
    { type: 'square', top: '2%', right: '25%', size: 48, delay: 3, color: 'orange-yellow' },
    { type: 'square', top: '40%', left: '8%', size: 42, delay: 1.8, color: 'emerald-green' },
    { type: 'square', bottom: '25%', right: '15%', size: 38, delay: 3.2, color: 'blue-cyan' },
    { type: 'square', top: '70%', left: '25%', size: 46, delay: 2.7, color: 'purple-pink' },
    
    // Circles - More variety
    { type: 'circle', top: '35%', left: '1%', size: 50, delay: 1.5, color: 'emerald-green' },
    { type: 'circle', top: '60%', right: '1%', size: 42, delay: 2.5, color: 'blue-cyan' },
    { type: 'circle', top: '8%', left: '15%', size: 58, delay: 0.5, color: 'purple-pink' },
    { type: 'circle', bottom: '8%', right: '20%', size: 46, delay: 4.5, color: 'yellow-orange' },
    { type: 'circle', top: '45%', right: '1%', size: 52, delay: 3.5, color: 'red-rose' },
    { type: 'circle', top: '25%', left: '12%', size: 36, delay: 1.2, color: 'cyan-teal' },
    { type: 'circle', bottom: '35%', left: '3%', size: 44, delay: 3.8, color: 'indigo-purple' },
    { type: 'circle', top: '80%', right: '8%', size: 40, delay: 2.1, color: 'orange-yellow' },
    
    // Triangles - More distributed
    { type: 'triangle', top: '20%', left: '3%', size: 50, delay: 1, color: 'slate-gray' },
    { type: 'triangle', bottom: '15%', left: '8%', size: 44, delay: 2, color: 'indigo-blue' },
    { type: 'triangle', top: '3%', left: '35%', size: 56, delay: 3, color: 'emerald-green' },
    { type: 'triangle', bottom: '3%', right: '8%', size: 48, delay: 4, color: 'pink-rose' },
    { type: 'triangle', top: '25%', right: '2%', size: 52, delay: 0.5, color: 'amber-yellow' },
    { type: 'triangle', top: '55%', left: '18%', size: 38, delay: 2.3, color: 'purple-blue' },
    { type: 'triangle', bottom: '45%', right: '25%', size: 42, delay: 1.7, color: 'emerald-green' },
    { type: 'triangle', top: '12%', right: '12%', size: 46, delay: 3.4, color: 'blue-cyan' },
    
    // New shape types - Hexagons and Stars
    { type: 'hexagon', top: '18%', left: '45%', size: 40, delay: 1.4, color: 'purple-pink' },
    { type: 'hexagon', bottom: '20%', left: '35%', size: 36, delay: 2.9, color: 'cyan-teal' },
    { type: 'hexagon', top: '65%', right: '30%', size: 44, delay: 0.8, color: 'yellow-orange' },
    { type: 'star', top: '30%', right: '18%', size: 38, delay: 2.6, color: 'indigo-purple' },
    { type: 'star', bottom: '60%', left: '40%', size: 42, delay: 1.1, color: 'red-rose' },
    { type: 'star', top: '50%', left: '60%', size: 35, delay: 3.7, color: 'emerald-green' }
  ];

  const getColorClasses = (color, type) => {
    const colors = {
      'purple-blue': isDark 
        ? 'bg-gradient-to-br from-purple-600/80 to-blue-600/80 border border-purple-400/30' 
        : 'bg-gradient-to-br from-purple-400/80 to-blue-400/80 border border-purple-300/50',
      'pink-red': isDark 
        ? 'bg-gradient-to-br from-pink-600/80 to-red-600/80 border border-pink-400/30' 
        : 'bg-gradient-to-br from-pink-400/80 to-red-400/80 border border-pink-300/50',
      'indigo-purple': isDark 
        ? 'bg-gradient-to-br from-indigo-600/80 to-purple-600/80 border border-indigo-400/30' 
        : 'bg-gradient-to-br from-indigo-400/80 to-purple-400/80 border border-indigo-300/50',
      'cyan-teal': isDark 
        ? 'bg-gradient-to-br from-cyan-600/80 to-teal-600/80 border border-cyan-400/30' 
        : 'bg-gradient-to-br from-cyan-400/80 to-teal-400/80 border border-cyan-300/50',
      'orange-yellow': isDark 
        ? 'bg-gradient-to-br from-orange-600/80 to-yellow-600/80 border border-orange-400/30' 
        : 'bg-gradient-to-br from-orange-400/80 to-yellow-400/80 border border-orange-300/50',
      'emerald-green': isDark 
        ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-2 border-emerald-300/50' 
        : 'bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-400/50',
      'blue-cyan': isDark 
        ? 'bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-blue-300/50' 
        : 'bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-blue-400/50',
      'purple-pink': isDark 
        ? 'bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-purple-300/50' 
        : 'bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-purple-400/50',
      'yellow-orange': isDark 
        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-yellow-300/50' 
        : 'bg-gradient-to-br from-yellow-500 to-orange-600 border-2 border-yellow-400/50',
      'red-rose': isDark 
        ? 'bg-gradient-to-br from-red-400 to-rose-500 border-2 border-red-300/50' 
        : 'bg-gradient-to-br from-red-500 to-rose-600 border-2 border-red-400/50',
      'slate-gray': isDark 
        ? 'bg-gradient-to-br from-slate-300 to-gray-100' 
        : 'bg-gradient-to-br from-slate-700 to-gray-900',
      'indigo-blue': isDark 
        ? 'bg-gradient-to-br from-indigo-300 to-blue-100' 
        : 'bg-gradient-to-br from-indigo-700 to-blue-900',
      'amber-yellow': isDark 
        ? 'bg-gradient-to-br from-amber-300 to-yellow-100' 
        : 'bg-gradient-to-br from-amber-700 to-yellow-900'
    };
    return colors[color] || colors['purple-blue'];
  };

  return (
    <div 
      ref={containerRef}
      className={`animated-background-container fixed inset-0 w-full h-full overflow-hidden z-0 transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
      style={{ pointerEvents: 'auto', cursor: 'default' }}
    >
      {/* Interactive cursor effect */}
      {isHovering && (
        <div 
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            background: isDark ? 'white' : 'black',
            transition: 'transform 0.1s ease',
            transform: 'translate3d(0,0,0)',
          }}
        />
      )}

      {/* Render all elements with layout shift prevention */}
      {elements.map((element, index) => {
        const positionStyle = {
          ...(element.top && { top: element.top }),
          ...(element.bottom && { bottom: element.bottom }),
          ...(element.left && { left: element.left }),
          ...(element.right && { right: element.right }),
        };

        const baseClasses = `animated-bg-element animated-bg-${element.type} absolute z-[5] shadow-lg backdrop-blur-sm transition-transform duration-300 cursor-pointer`;
        
        if (element.type === 'square') {
          return (
            <div
              key={`square-${index}`}
              className={`${baseClasses} rounded-lg hover:shadow-2xl hover:scale-110 hover:rotate-12 ${getColorClasses(element.color)} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                ...positionStyle,
                width: `${element.size}px`,
                height: `${element.size}px`,
                transform: 'translate3d(0,0,0)',
                animation: isLoaded ? `floatRandomSquareOptimized ${12 + element.delay}s infinite ease-in-out ${element.delay}s` : 'none',
                willChange: 'transform'
              }}
            />
          );
        }
        
        if (element.type === 'circle') {
          return (
            <div
              key={`circle-${index}`}
              className={`${baseClasses} rounded-full hover:shadow-2xl hover:scale-125 ${getColorClasses(element.color)} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                ...positionStyle,
                width: `${element.size}px`,
                height: `${element.size}px`,
                transform: 'translate3d(0,0,0)',
                animation: isLoaded ? `floatCircleOptimized ${10 + element.delay}s infinite ease-in-out ${element.delay}s` : 'none',
                willChange: 'transform'
              }}
            />
          );
        }
        
        if (element.type === 'triangle') {
          return (
            <div
              key={`triangle-${index}`}
              className={`${baseClasses} hover:shadow-2xl hover:scale-110 hover:rotate-45 ${getColorClasses(element.color)} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                ...positionStyle,
                width: `${element.size}px`,
                height: `${element.size}px`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transform: 'translate3d(0,0,0)',
                animation: isLoaded ? `floatTriangleOptimized ${8 + element.delay}s infinite ease-in-out ${element.delay}s` : 'none',
                willChange: 'transform'
              }}
            />
          );
        }
        
        if (element.type === 'hexagon') {
          return (
            <div
              key={`hexagon-${index}`}
              className={`${baseClasses} hover:shadow-2xl hover:scale-110 hover:rotate-12 ${getColorClasses(element.color)} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                ...positionStyle,
                width: `${element.size}px`,
                height: `${element.size}px`,
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                WebkitClipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transform: 'translate3d(0,0,0)',
                animation: isLoaded ? `floatRandomSquareOptimized ${9 + element.delay}s infinite ease-in-out ${element.delay}s` : 'none',
                willChange: 'transform'
              }}
            />
          );
        }
        
        if (element.type === 'star') {
          return (
            <div
              key={`star-${index}`}
              className={`${baseClasses} hover:shadow-2xl hover:scale-110 hover:rotate-45 ${getColorClasses(element.color)} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                ...positionStyle,
                width: `${element.size}px`,
                height: `${element.size}px`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                WebkitClipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transform: 'translate3d(0,0,0)',
                animation: isLoaded ? `floatTriangleOptimized ${7 + element.delay}s infinite ease-in-out ${element.delay}s` : 'none',
                willChange: 'transform'
              }}
            />
          );
        }
        
        return null;
      })}
    </div>
  );
};

export default AnimatedBackground;