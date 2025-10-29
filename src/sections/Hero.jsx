import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "../components/Button";
import { words, heroStats } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";
import { useTheme } from "../contexts/ThemeContext";

const Hero = () => {
  const { isDark } = useTheme();
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
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
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
          <HeroExperience />
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
                <h3
                  className={`text-2xl md:text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {stat.value}
                </h3>
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
