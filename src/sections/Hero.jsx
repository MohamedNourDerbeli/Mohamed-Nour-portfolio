import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "../components/Button";
import { words } from "../constants";
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

  const statsData = [
    {
      value: "46+",
      label: "PROJECTS BUILT",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      value: "4+",
      label: "YEARS EXPERIENCE",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      value: "300,000+",
      label: "LINES OF CODE",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      value: "25+",
      label: "PROBLEM SOLVING",
      gradient: "from-blue-500 to-purple-500",
    },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-transparent"
    >
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
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

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button
                text="See My Projects"
                className="md:w-80 md:h-16 w-60 h-12"
                id="counter"
              />
            </div>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>

      {/* Stats Cards Section */}
      <div className="relative z-20 mt-16 px-5 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`stats-card relative p-6 rounded-2xl bg-gradient-to-br ${
                stat.gradient
              } backdrop-blur-sm text-center group hover:scale-105 transition-all duration-300 ${
                isDark
                  ? "bg-opacity-20 border border-white/10"
                  : "bg-opacity-10 border border-gray-200 shadow-lg"
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
