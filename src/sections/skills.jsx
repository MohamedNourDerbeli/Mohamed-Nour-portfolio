import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { coreSkills } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Technologies = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Animate the section title with bounce effect
    gsap.fromTo(
      ".tech-title h2",
      { y: 60, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate the subtitle
    gsap.fromTo(
      ".tech-title p",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate skills with enhanced stagger and bounce
    gsap.fromTo(
      ".skill-item",
      { 
        y: 50, 
        opacity: 0, 
        scale: 0.5,
        rotation: -10
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: {
          amount: 1.5,
          from: "random"
        },
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        },
      }
    );

    // Add floating animation to skills
    gsap.to(".skill-item", {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Add pulse effect on hover
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(item.querySelector('span'), {
          color: "#3b82f6",
          duration: 0.3
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(item.querySelector('span'), {
          color: "",
          duration: 0.3
        });
      });
    });
  });

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="w-full max-w-4xl mx-auto px-5 md:px-10">
        {/* Section Title */}
        <div className="tech-title text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Core Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies I work with to build modern, scalable solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {coreSkills.map((skill) => (
              <div
                key={skill}
                className="skill-item group relative text-center p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/40 dark:to-gray-900/20 border border-gray-200/30 dark:border-gray-700/40 backdrop-blur-sm cursor-pointer overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm md:text-base transition-all duration-300 group-hover:text-blue-400">
                    {skill}
                  </span>
                  
                  {/* Animated dot indicator */}
                  <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse"></div>
                </div>

                {/* Sparkle effect */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping" style={{animationDelay: '0.2s'}}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action with animation */}
        {/* <div className="text-center mt-16">
          <div className="animate-bounce">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Ready to build something amazing together?
            </p>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 group"
          >
            <span>View Projects</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Technologies;
