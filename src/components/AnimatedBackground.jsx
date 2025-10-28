import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground = () => {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
    const timer = setTimeout(initializeShapeBreaking, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);



  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full overflow-hidden z-0 transition-colors duration-300 ${
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
            transition: 'all 0.1s ease',
          }}
        />
      )}
      

      {/* Squares - positioned in corners and edges */}
      <div className={`animated-bg-square absolute top-[5%] left-[2%] w-[50px] h-[50px] z-[5] rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-12 cursor-pointer ${
        isDark 
          ? 'bg-gradient-to-br from-purple-600/80 to-blue-600/80 border border-purple-400/30 hover:border-purple-300/60' 
          : 'bg-gradient-to-br from-purple-400/80 to-blue-400/80 border border-purple-300/50 hover:border-purple-400/70'
      }`} style={{ animation: 'floatRandomSquare 12s infinite ease-in-out' }}></div>
      
      <div className={`animated-bg-square absolute top-[15%] right-[3%] w-[45px] h-[45px] z-[5] rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-12 cursor-pointer ${
        isDark 
          ? 'bg-gradient-to-br from-pink-600/80 to-red-600/80 border border-pink-400/30 hover:border-pink-300/60' 
          : 'bg-gradient-to-br from-pink-400/80 to-red-400/80 border border-pink-300/50 hover:border-pink-400/70'
      }`} style={{ animation: 'floatRandomSquare 14s infinite ease-in-out', animationDelay: '2s' }}></div>
      
      <div className={`animated-bg-square absolute bottom-[5%] left-[5%] w-[55px] h-[55px] z-[5] rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-12 cursor-pointer ${
        isDark 
          ? 'bg-gradient-to-br from-indigo-600/80 to-purple-600/80 border border-indigo-400/30' 
          : 'bg-gradient-to-br from-indigo-400/80 to-purple-400/80 border border-indigo-300/50'
      }`} style={{ animation: 'floatRandomSquare 16s infinite ease-in-out', animationDelay: '4s' }}></div>
      
      <div className={`animated-bg-square absolute bottom-[10%] right-[2%] w-[40px] h-[40px] z-[5] rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-12 cursor-pointer ${
        isDark 
          ? 'bg-gradient-to-br from-cyan-600/80 to-teal-600/80 border border-cyan-400/30' 
          : 'bg-gradient-to-br from-cyan-400/80 to-teal-400/80 border border-cyan-300/50'
      }`} style={{ animation: 'floatRandomSquare 10s infinite ease-in-out', animationDelay: '1s' }}></div>
      
      <div className={`animated-bg-square absolute top-[2%] right-[25%] w-[48px] h-[48px] z-[5] rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-12 cursor-pointer ${
        isDark 
          ? 'bg-gradient-to-br from-orange-600/80 to-yellow-600/80 border border-orange-400/30' 
          : 'bg-gradient-to-br from-orange-400/80 to-yellow-400/80 border border-orange-300/50'
      }`} style={{ animation: 'floatRandomSquare 13s infinite ease-in-out', animationDelay: '3s' }}></div>

      {/* Circles - positioned along edges */}
      <div className={`animated-bg-circle absolute top-[35%] left-[1%] w-[50px] h-[50px] z-[5] rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-125 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-2 border-emerald-300/50 hover:border-emerald-200/70' : 'bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-emerald-400/50 hover:border-emerald-500/70'
      }`} style={{ animation: 'floatRandomSquare 15s infinite ease-in-out', animationDelay: '1.5s' }}></div>
      
      <div className={`animated-bg-circle absolute top-[60%] right-[1%] w-[42px] h-[42px] z-[5] rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-125 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-blue-300/50' : 'bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-blue-400/50'
      }`} style={{ animation: 'floatRandomSquare 11s infinite ease-in-out', animationDelay: '2.5s' }}></div>
      
      <div className={`animated-bg-circle absolute top-[8%] left-[15%] w-[58px] h-[58px] z-[5] rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-125 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-purple-300/50' : 'bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-purple-400/50'
      }`} style={{ animation: 'floatRandomSquare 17s infinite ease-in-out', animationDelay: '0.5s' }}></div>
      
      <div className={`animated-bg-circle absolute bottom-[8%] right-[20%] w-[46px] h-[46px] z-[5] rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-125 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-yellow-300/50' : 'bg-gradient-to-br from-yellow-500 to-orange-600 border-2 border-yellow-400/50'
      }`} style={{ animation: 'floatRandomSquare 9s infinite ease-in-out', animationDelay: '4.5s' }}></div>
      
      <div className={`animated-bg-circle absolute top-[45%] right-[1%] w-[52px] h-[52px] z-[5] rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-125 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-red-400 to-rose-500 border-2 border-red-300/50' : 'bg-gradient-to-br from-red-500 to-rose-600 border-2 border-red-400/50'
      }`} style={{ animation: 'floatRandomSquare 18s infinite ease-in-out', animationDelay: '3.5s' }}></div>

      {/* Triangles - positioned in corners and edges */}
      <div className={`animated-bg-triangle absolute top-[20%] left-[3%] w-[50px] h-[50px] z-[5] shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-45 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-slate-300 to-gray-100' : 'bg-gradient-to-br from-slate-700 to-gray-900'
      }`} style={{
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        animation: 'floatRandomSquare 14s infinite ease-in-out',
        animationDelay: '1s'
      }}></div>
      
      <div className={`animated-bg-triangle absolute bottom-[15%] left-[8%] w-[44px] h-[44px] z-[5] shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-45 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-indigo-300 to-blue-100' : 'bg-gradient-to-br from-indigo-700 to-blue-900'
      }`} style={{
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        animation: 'floatRandomSquare 16s infinite ease-in-out',
        animationDelay: '2s'
      }}></div>
      
      <div className={`animated-bg-triangle absolute top-[3%] left-[35%] w-[56px] h-[56px] z-[5] shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-45 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-emerald-300 to-green-100' : 'bg-gradient-to-br from-emerald-700 to-green-900'
      }`} style={{
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        animation: 'floatRandomSquare 12s infinite ease-in-out',
        animationDelay: '3s'
      }}></div>
      
      <div className={`animated-bg-triangle absolute bottom-[3%] right-[8%] w-[48px] h-[48px] z-[5] shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-45 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-pink-300 to-rose-100' : 'bg-gradient-to-br from-pink-700 to-rose-900'
      }`} style={{
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        animation: 'floatRandomSquare 10s infinite ease-in-out',
        animationDelay: '4s'
      }}></div>
      
      <div className={`animated-bg-triangle absolute top-[25%] right-[2%] w-[52px] h-[52px] z-[5] shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:rotate-45 cursor-pointer ${
        isDark ? 'bg-gradient-to-br from-amber-300 to-yellow-100' : 'bg-gradient-to-br from-amber-700 to-yellow-900'
      }`} style={{
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        WebkitClipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        animation: 'floatRandomSquare 15s infinite ease-in-out',
        animationDelay: '0.5s'
      }}></div>
    </div>
  );
};

export default AnimatedBackground;