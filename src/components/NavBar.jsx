import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark 
            ? "bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50"
            : "bg-white/80 backdrop-blur-md border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Portfolio title and name */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm drop-shadow-sm">MN</span>
              </div>
              <div>
                <h1 className={`font-semibold text-lg ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}>
                  Portfolio
                </h1>
                <p className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}>Mohamed Nour Developer</p>
              </div>
            </div>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ link, name }) => {
              // Define icons for each nav item
              const getIcon = (itemName) => {
                switch(itemName) {
                  case 'Home':
                    return (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    );
                  case 'Projects':
                    return (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    );
                  case 'Skills':
                    return (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    );
                  case 'Blog':
                    return (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };

              return (
                <a
                  key={name}
                  href={link}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium relative overflow-hidden ${
                    isDark 
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  
                  {/* Icon with animation */}
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {getIcon(name)}
                  </div>
                  
                  {/* Text */}
                  <span className="relative z-10">{name}</span>
                  
                  {/* Active indicator dot */}
                  <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse ${
                    isDark ? "bg-blue-400" : "bg-blue-600"
                  }`}></div>
                </a>
              );
            })}
          </nav>

          {/* Right side - Theme toggle and Contact button */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <a
              href="#contact"
              className={`px-6 py-2 rounded-lg transition-all duration-300 text-sm font-medium shadow-lg ${
                isDark
                  ? "bg-blue-700 hover:bg-blue-800 text-white border border-blue-600"
                  : "bg-blue-700 hover:bg-blue-800 text-white border border-blue-600"
              }`}
            >
              Contact Me
            </a>
          </div>

          {/* Mobile menu button */}
          <button className={`md:hidden p-2 transition-colors duration-300 ${
            isDark 
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
