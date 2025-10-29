import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { lazy, Suspense, useState, useEffect } from "react";

import Button from "../components/Button";
import { words, heroStats } from "../constants";
import { useTheme } from "../contexts/ThemeContext";
import { shouldLoadHeavyAssets } from "../utils/deviceCapabilities";

// Lazy load the 3D experience to reduce initial bundle
const HeroExperience = lazy(() => import("../components/models/hero_models/HeroExperience"));

const Hero = () => {
  const { isDark } = useTheme();
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    // Check device capabilities and load 3D model conditionally
    try {
      const canLoad3D = shouldLoadHeavyAssets();
      setShouldLoad3D(canLoad3D);
    } catch (error) {
      console.error('Error checking device capabilities:', error);
      // Fallback to not loading 3D on error
      setShouldLoad3D(false);
    }
  }, []);
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );

    // Animate stats cards
    gsap.fromTo(
      ".stats-card",
      { y: 60, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 1.2,
      }
    );
  });



  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-transparent"
    >
      {/* Geometric background shapes */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rotate-45 blur-lg"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-18 h-18 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rotate-12 blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-md"></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rotate-45 blur-md"></div>
      </div>

      <div className="relative z-10 xl:mt-20 mt-32 md:h-dvh h-[80vh] grid xl:grid-cols-2 grid-cols-1 gap-8 items-center px-5 md:px-20">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center">
          <div className="flex flex-col gap-7">
            <div
              className={`hero-text ${isDark ? "text-white" : "text-gray-900"}`}
            >
              <h1 className={isDark ? "text-white" : "text-gray-900"}>
                Turning
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span
                          className={isDark ? "text-white" : "text-gray-900"}
                        >
                          {word.text}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1 className={isDark ? "text-white" : "text-gray-900"}>
                into Real Projects
              </h1>
              <h1 className={isDark ? "text-white" : "text-gray-900"}>
                that Deliver Results
              </h1>
            </div>

            <p
              className={`md:text-xl relative z-10 pointer-events-none ${
                isDark ? "text-white-50" : "text-gray-600"
              }`}
            >
              Hey, I'm Mohamed Nour. I turn coffee into code and bugs into
              "features."
            </p>

            {/* Enhanced CTA Hierarchy */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Primary CTA */}
              <Button
                text="See My Projects"
                className="md:w-80 md:h-16 w-60 h-12 primary-cta"
                id="projects"
              />
              
              {/* Secondary CTA */}
              <a
                href="#contact"
                className={`group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10"
                    : "border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <span className="font-medium">Let's Connect</span>
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure className="flex items-center justify-center xl:h-[60vh] h-[40vh]">
          {shouldLoad3D ? (
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Loading 3D...
                    </span>
                  </div>
                </div>
              </div>
            }>
              <HeroExperience />
            </Suspense>
          ) : (
            // Fallback visual for low-performance devices
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="relative w-64 h-64">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse`}></div>
                <div className={`absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 animate-pulse delay-75`}></div>
                <div className={`absolute inset-8 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 animate-pulse delay-150`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    🚀
                  </span>
                </div>
              </div>
            </div>
          )}
        </figure>
      </div>

      {/* Stats Cards Section */}
      <div className="relative z-20 mt-16 px-5 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {heroStats.map((stat, index) => (
            <div
              key={index}
              className={`stats-card relative p-6 rounded-2xl backdrop-blur-sm text-center group hover:scale-105 transition-all duration-300 ${
                isDark
                  ? "bg-transparent border border-white/10"
                  : "bg-transparent border border-gray-200/30"
              }`}
            >
              <div className="relative z-10">
                <div
                  className={`text-2xl md:text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                  role="text"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {stat.value}
                </div>
                <p
                  className={`text-xs md:text-sm font-medium tracking-wider ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </p>
              </div>

              {/* Animated background */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
