import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import anime from 'animejs/lib/anime.es.js';

const AnimatedBackground = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    function randomValues() {
      anime({
        targets: '.animated-square, .animated-circle, .animated-triangle',
        translateX: function() {
          return anime.random(-window.innerWidth/2, window.innerWidth/2);
        },
        translateY: function() {
          return anime.random(-window.innerHeight/2, window.innerHeight/2);
        },
        rotate: function() {
          return anime.random(0, 360);
        },
        scale: function() {
          return anime.random(0.2, 2);
        },
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: randomValues,
      });
    }
    
    // Start the animation
    randomValues();
  }, []);

  return (
    <div className="animated-background">
      {/* Squares */}
      <div className={`animated-square ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-square ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-square ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-square ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-square ${isDark ? 'dark' : 'light'}`}></div>
      
      {/* Circles */}
      <div className={`animated-circle ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-circle ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-circle ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-circle ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-circle ${isDark ? 'dark' : 'light'}`}></div>
      
      {/* Triangles */}
      <div className={`animated-triangle ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-triangle ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-triangle ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-triangle ${isDark ? 'dark' : 'light'}`}></div>
      <div className={`animated-triangle ${isDark ? 'dark' : 'light'}`}></div>
    </div>
  );
};

export default AnimatedBackground;