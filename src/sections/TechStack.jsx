import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import TitleHeader from "../components/TitleHeader";
import { skillCategories } from "../constants";

const TechStack = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Animate skill categories
    gsap.fromTo(
      ".skill-category",
      {
        y: 60,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 70%",
        },
      }
    );

    // Animate individual skill items
    gsap.fromTo(
      ".skill-item",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#skills",
          start: "top 60%",
        },
      }
    );
  });

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-10">
        <TitleHeader
          title="My Key Skills & Expertise"
          sub="🚀 Technologies & Tools I Master"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="skill-category group relative overflow-hidden rounded-2xl bg-gray-900/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Category Header */}
              <div className="p-6 border-b border-gray-700/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills List */}
              <div className="p-6">
                <div className="grid grid-cols-1 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="skill-item group/skill flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/40 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                          <span 
                            className="text-xs font-bold text-white hidden"
                            style={{ display: 'none' }}
                          >
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-gray-200 font-medium">
                          {skill.name}
                        </span>
                      </div>
                      
                      {/* Skill Level */}
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 group-hover/skill:from-blue-400 group-hover/skill:to-purple-400"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 font-medium min-w-[35px]">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap gap-3 justify-center">
            {['Problem Solving', 'Team Leadership', 'Security Best Practices'].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm text-gray-300 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
