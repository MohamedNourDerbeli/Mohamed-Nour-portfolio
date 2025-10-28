import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const animationRef = useRef();
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2; // Larger particles
        this.speedX = (Math.random() - 0.5) * 0.8; // Faster movement
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.7 + 0.3; // More visible
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Different colors for dark/light mode
        if (isDark) {
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)'); // blue-500
          gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.7)'); // purple-500
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0.5)'); // cyan-500
          ctx.fillStyle = gradient;
        } else {
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)'); // blue-500 more visible
          gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.4)'); // purple-500 more visible
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0.3)'); // cyan-500 more visible
          ctx.fillStyle = gradient;
        }
        
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 10000)); // More particles
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with theme-appropriate background
      if (isDark) {
        ctx.fillStyle = 'rgba(17, 24, 39, 0.05)'; // Less clearing for more trail effect
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; // Less clearing for more trail effect
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      drawConnections();

      animationId = requestAnimationFrame(animate);
    };

    // Draw connections between particles
    const drawConnections = () => {
      const maxDistance = 100;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            
            if (isDark) {
              ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'; // More visible connections
            } else {
              ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)'; // More visible connections
            }
            
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        background: isDark 
          ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)'
          : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #f9fafb 100%)'
      }}
    />
  );
};

export default AnimatedBackground;