import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../contexts/ThemeContext";
import { skillCategories, coreSkills } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Technologies = () => {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Use the first 4 categories from your constants
  const displayCategories = skillCategories.slice(0, 4);

  useGSAP(() => {
    // Animate title
    gsap.fromTo(
      ".tech-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate circular selector
    gsap.fromTo(
      ".circular-selector",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Animate skills panel
    gsap.fromTo(
      ".skills-panel",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  });

  const handleCategoryClick = (categoryIndex) => {
    console.log("Category clicked:", categoryIndex); // Debug log

    // Animate the carousel wheel rotation first
    const newRotation = categoryIndex * -90;
    gsap.to(".carousel-wheel-new", {
      rotation: newRotation,
      duration: 0.8,
      ease: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
    });

    // Animate center label change
    gsap.to(".carousel-center-label", {
      scale: 0.8,
      opacity: 0.5,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        // Change the category after label animation
        setSelectedCategory(categoryIndex);
        gsap.to(".carousel-center-label", {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      },
    });

    // Animate the skills panel transition with delay
    gsap.to(".skills-panel", {
      x: -30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Update skills after fade out
        setTimeout(() => {
          setSelectedCategory(categoryIndex);
          gsap.fromTo(
            ".skills-panel",
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        }, 100);
      },
    });
  };

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-10">
        {/* Section Title */}
        <div className="tech-title text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Technical <span className="text-purple-500">Arsenal</span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            My toolkit for building and innovation
          </p>
        </div>

        {/* Glass Card Container */}
        <div
          className={`glass-card rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
            isDark
              ? "bg-gray-900/20 border border-gray-700/30 backdrop-blur-sm"
              : "bg-white/20 border border-gray-200/30 backdrop-blur-sm shadow-xl"
          }`}
        >
          {/* Carousel Container */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="flex flex-col items-center gap-6">
              {/* Center Label - Now Above */}
              <div
                className={`px-6 py-3 rounded-full text-sm font-bold backdrop-blur-md transition-all duration-300 ${
                  isDark
                    ? "bg-gray-900/80 text-white border border-purple-500/30 shadow-lg shadow-purple-500/20"
                    : "bg-white/90 text-gray-800 border border-purple-300/50 shadow-lg shadow-purple-300/20"
                }`}
              >
                {displayCategories[selectedCategory]?.title}
              </div>

              {/* Carousel Container */}
              <div className="relative w-[200px] h-[200px] flex justify-center items-center">
                <div className="carousel-wheel-new">
                  {displayCategories.map((category, index) => {
                    const angle = index * 90 * (Math.PI / 180);
                    const radius = 85;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <button
                        key={index}
                        className={`carousel-item-new ${
                          selectedCategory === index ? "active" : ""
                        }`}
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Button clicked:", index);
                          handleCategoryClick(index);
                        }}
                      >
                        <div className="item-icon">
                          {index === 0 && ( // Frontend Development
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                          {index === 1 && ( // Backend Development
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                              />
                            </svg>
                          )}
                          {index === 2 && ( // Database & Storage
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                            </svg>
                          )}
                          {index === 3 && ( // DevOps & Cloud
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Panel */}
          <div className="w-full lg:w-2/3">
            <div className="space-y-5 skills-panel">
              {displayCategories[selectedCategory]?.skills.map(
                (skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`font-semibold text-sm ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </span>
                      <span className="mono text-xs gradient-text font-bold text-purple-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className={`skill-progress w-full h-2 rounded-full overflow-hidden ${
                        isDark ? "bg-gray-800/50" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className="skill-fill h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1200 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          transitionDelay: `${index * 150}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Primary Technologies */}
        <div className="mt-20">
          <h3
            className={`text-2xl font-bold text-center mb-8 ${
              isDark ? "text-purple-400" : "text-purple-600"
            }`}
          >
            Primary Technologies
          </h3>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {coreSkills.map((tech) => (
              <span
                key={tech}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isDark
                    ? "bg-gray-800/60 text-gray-300 border border-gray-700/50 hover:bg-purple-600/20 hover:border-purple-500/50"
                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-purple-100 hover:border-purple-300"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
