import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

const FloatingContactButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling past hero section
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <button
      onClick={scrollToContact}
      className={`floating-contact-button fixed bottom-6 right-6 z-[9999] group transition-all duration-300 ${
        isVisible 
          ? "translate-y-0 opacity-100 scale-100" 
          : "translate-y-16 opacity-0 scale-75 pointer-events-none"
      }`}
      style={{ 
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999 
      }}
    >
      {/* Main button */}
      <div className={`relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 ${
        isDark
          ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800"
      }`}>
        {/* Pulse animation */}
        <div className={`absolute inset-0 rounded-full animate-ping ${
          isDark
            ? "bg-blue-400/30"
            : "bg-blue-500/30"
        }`}></div>
        
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center w-full h-full text-white">
          <svg 
            className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      <div className={`absolute bottom-16 right-0 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 z-[10000] ${
        isDark
          ? "bg-gray-800 text-white border border-gray-700"
          : "bg-white text-gray-900 border border-gray-200 shadow-lg"
      }`}>
        Let's Connect!
        <div className={`absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
          isDark ? "border-t-gray-800" : "border-t-white"
        }`}></div>
      </div>
    </button>
  );
};

export default FloatingContactButton;