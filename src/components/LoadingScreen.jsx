import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const LoadingScreen = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { text: 'Initializing portfolio...', icon: '⚡' },
    { text: 'Loading projects...', icon: '🚀' },
    { text: 'Preparing animations...', icon: '✨' },
    { text: 'Setting up interactions...', icon: '🎯' },
    { text: 'Optimizing performance...', icon: '⚙️' },
    { text: 'Almost ready...', icon: '🎉' },
    { text: 'Welcome!', icon: '👋' }
  ];

  useEffect(() => {
    // Show logo with staggered animation
    setTimeout(() => setShowLogo(true), 300);

    // More realistic loading simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 12 + 3;
        const newProgress = Math.min(prev + increment, 100);
        
        // Update loading text and step based on progress
        const stepIndex = Math.floor((newProgress / 100) * (loadingSteps.length - 1));
        if (stepIndex !== currentStep && stepIndex < loadingSteps.length) {
          setCurrentStep(stepIndex);
          setLoadingText(loadingSteps[stepIndex].text);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setLoadingText('Welcome!');
          setTimeout(() => {
            onComplete();
          }, 1200);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete, currentStep]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
    }`}>
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs - Fixed positions to prevent layout shift */}
        {Array.from({ length: 12 }).map((_, i) => {
          // Predefined positions to prevent layout shifts
          const positions = [
            { left: '10%', top: '15%' }, { left: '85%', top: '25%' }, { left: '20%', top: '70%' },
            { left: '75%', top: '60%' }, { left: '5%', top: '45%' }, { left: '90%', top: '80%' },
            { left: '40%', top: '10%' }, { left: '60%', top: '85%' }, { left: '15%', top: '90%' },
            { left: '80%', top: '5%' }, { left: '50%', top: '50%' }, { left: '30%', top: '35%' }
          ];
          
          return (
            <div
              key={`orb-${i}`}
              className={`loading-orb absolute rounded-full blur-xl opacity-20 ${
                i % 3 === 0 ? 'bg-purple-500 w-32 h-32' :
                i % 3 === 1 ? 'bg-cyan-500 w-24 h-24' :
                'bg-blue-500 w-20 h-20'
              }`}
              style={{
                left: positions[i].left,
                top: positions[i].top,
                transform: 'translate3d(0,0,0)',
                animation: `floatOrbOptimized ${4 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i % 3) * 0.5}s`,
                willChange: 'transform'
              }}
            />
          );
        })}
        
        {/* Animated Grid Pattern */}
        <div className={`absolute inset-0 opacity-5 ${
          isDark ? 'bg-grid-white/[0.05]' : 'bg-grid-black/[0.05]'
        }`} style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
        
        {/* Pulsing Dots */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className={`absolute w-3 h-3 rounded-full ${
              isDark ? 'bg-cyan-400' : 'bg-cyan-600'
            }`}
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + Math.sin(i) * 60}%`,
              animation: `pulse ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        
        {/* Enhanced Animated Logo */}
        <div className={`mb-12 transition-all duration-1000 ${
          showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <div className="relative">
            {/* Outer Rotating Ring */}
            <div className={`absolute inset-0 w-32 h-32 rounded-full border-4 border-transparent ${
              isDark ? 'border-t-cyan-400 border-r-purple-500' : 'border-t-cyan-600 border-r-purple-700'
            }`} style={{ animation: 'spin 3s linear infinite' }}></div>
            
            {/* Middle Ring */}
            <div className={`absolute inset-2 w-28 h-28 rounded-full border-2 border-transparent ${
              isDark ? 'border-b-blue-400 border-l-pink-500' : 'border-b-blue-600 border-l-pink-700'
            }`} style={{ animation: 'spin 2s linear infinite reverse' }}></div>
            
            {/* Logo Container */}
            <div className={`relative w-32 h-32 rounded-full flex items-center justify-center ${
              isDark 
                ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50' 
                : 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-gray-300/50'
            } backdrop-blur-xl shadow-2xl`}>
              
              {/* Logo Text with Gradient */}
              <div className={`text-5xl font-bold bg-gradient-to-r ${
                isDark 
                  ? 'from-cyan-400 via-blue-400 to-purple-400' 
                  : 'from-cyan-600 via-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                MN
              </div>
              
              {/* Inner Glow */}
              <div className={`absolute inset-0 rounded-full ${
                isDark ? 'bg-blue-400/10' : 'bg-blue-600/10'
              } animate-pulse`}></div>
            </div>
            
            {/* Orbiting Dots */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 rounded-full ${
                  isDark ? 'bg-cyan-400' : 'bg-cyan-600'
                } shadow-lg`}
                style={{
                  animation: `orbit 4s linear infinite`,
                  animationDelay: `${i * 1}s`,
                  transformOrigin: '64px 64px'
                }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Loading Text with Icon */}
        <div className={`mb-8 h-8 transition-all duration-500 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>
              {loadingSteps[currentStep]?.icon || '⚡'}
            </span>
            <p className="text-xl font-medium">
              {loadingText}
            </p>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="w-96 mx-auto mb-6">
          {/* Progress Track */}
          <div className={`relative w-full h-3 rounded-full overflow-hidden ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'
          } backdrop-blur-sm border ${
            isDark ? 'border-gray-700/30' : 'border-gray-300/30'
          }`}>
            {/* Progress Fill */}
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out relative ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500' 
                  : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700'
              }`}
              style={{ width: `${progress}%` }}
            >
              {/* Animated Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            
            {/* Progress Glow */}
            <div 
              className={`absolute top-0 h-full rounded-full blur-sm opacity-50 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500' 
                  : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Labels */}
          <div className="flex justify-between mt-2 text-xs font-mono">
            <span className={isDark ? 'text-gray-500' : 'text-gray-600'}>0%</span>
            <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              {Math.round(progress)}%
            </span>
            <span className={isDark ? 'text-gray-500' : 'text-gray-600'}>100%</span>
          </div>
        </div>

        {/* Loading Steps Indicator */}
        <div className="flex justify-center gap-2 mb-4">
          {loadingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep
                  ? (isDark ? 'bg-cyan-400' : 'bg-cyan-600')
                  : (isDark ? 'bg-gray-700' : 'bg-gray-300')
              }`}
            />
          ))}
        </div>

        {/* Floating Elements (matching your animated background) */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-8 h-8 rounded-lg opacity-20 ${
                i % 3 === 0 ? 'bg-purple-500' : 
                i % 3 === 1 ? 'bg-blue-500 rounded-full' : 
                'bg-green-500'
              }`}
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + Math.sin(i) * 60}%`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                clipPath: i % 3 === 2 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Completion Animation */}
      {progress >= 100 && (
        <div className={`absolute inset-0 ${
          isDark ? 'bg-black' : 'bg-white'
        } animate-pulse`} />
      )}
    </div>
  );
};

export default LoadingScreen;