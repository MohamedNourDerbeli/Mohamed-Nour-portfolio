import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../contexts/ThemeContext";
import TitleHeader from "../components/TitleHeader";
import { SkeletonCard } from "../components/Skeleton";
import { projects } from "../constants";
import { funMessages } from "../constants/index.js"

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showFunMessage = () => {
    const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)];
    setToastMessage(randomMessage);
    setShowToast(true);
    
    // Hide toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Animate project cards
    gsap.fromTo(
      ".project-card",
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Simple title animation
    gsap.fromTo(
      ".section-title",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Fun Toast Notification */}
      {showToast && (
        <div className={`fixed top-20 right-5 z-50 max-w-sm p-4 rounded-lg shadow-2xl border transition-all duration-500 transform ${
          showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } ${
          isDark 
            ? 'bg-gray-800/95 border-gray-700/50 text-white backdrop-blur-sm' 
            : 'bg-white/95 border-gray-200/50 text-gray-900 backdrop-blur-sm shadow-xl'
        }`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl animate-bounce">🎭</div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-relaxed">
                {toastMessage}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className={`text-xl leading-none hover:scale-110 transition-transform ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              ×
            </button>
          </div>
          
          {/* Progress bar */}
          <div className={`mt-3 h-1 rounded-full overflow-hidden ${
            isDark ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"
              style={{ 
                animation: 'shrink 4s linear forwards',
                width: '100%'
              }}
            />
          </div>
        </div>
      )}
      <div className="w-full max-w-7xl mx-auto px-5 md:px-10">
        <div className="section-title">
          <TitleHeader
            title="A small selection of recent projects"
            sub="Featured Work"
          />
        </div>

        {/* Projects Grid */}
        <div className="mt-20 relative min-h-screen">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              projects.map((project, index) => (
              <div key={project.id} className="relative">
                {/* Project Card */}
                <article className="project-card group relative rounded-2xl">
                  {/* Enhanced Browser Window Frame */}
                  <div
                    className={`relative rounded-2xl transition-all duration-500 group-hover:scale-[1.02] ${
                      isDark
                        ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 shadow-xl group-hover:shadow-3xl overflow-hidden"
                        : "bg-white border-2 border-gray-300 shadow-xl group-hover:shadow-2xl group-hover:border-gray-400 overflow-hidden"
                    }`}
                  >
                    {/* Browser Header with better styling */}
                    <div
                      className={`flex items-center gap-3 px-5 py-4 border-b ${
                        isDark
                          ? "bg-gray-900/80 border-gray-700/50"
                          : "bg-gray-50 border-gray-300"
                      }`}
                    >
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
                      </div>
                      <div
                        className={`flex-1 mx-4 h-6 rounded-md ${
                          isDark
                            ? "bg-gray-800/60"
                            : "bg-white border border-gray-300 shadow-inner"
                        }`}
                      ></div>

                      {/* Action buttons in top right */}
                      <div className="flex gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDark
                              ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white"
                              : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300 shadow-sm hover:shadow-md"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            showFunMessage();
                          }}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDark
                              ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white"
                              : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300 shadow-sm hover:shadow-md"
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Project Image with better overlay */}
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 ${
                          isDark
                            ? "bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            : "bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                        }`}
                      ></div>

                      {/* Floating project info with better structure */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-bold mb-3 drop-shadow-lg">
                          {project.title}
                        </h3>
                        
                        {/* Key features as bullet points */}
                        <div className="space-y-1 mb-2">
                          {project.keyFeatures?.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-200 text-xs">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                              <span className="drop-shadow-md">{feature}</span>
                            </div>
                          )) || (
                            <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md line-clamp-2">
                              {project.description}
                            </p>
                          )}
                        </div>
                        
                        {/* Project type indicator */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                            {project.category || "Web App"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack at bottom */}
                    <div
                      className={`p-5 ${
                        isDark ? "" : "bg-gray-50/50 border-t border-gray-200"
                      }`}
                    >
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                              isDark
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30"
                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
