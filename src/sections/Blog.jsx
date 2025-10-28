import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../contexts/ThemeContext";
import TitleHeader from "../components/TitleHeader";
import { SkeletonBlogCard } from "../components/Skeleton";
import { articles } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);



  useGSAP(() => {
    gsap.fromTo(
      ".blog-card",
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  });

  const getCategoryIcon = (category) => {
    const icons = {
      Cybersecurity: "🛡️",
      Blockchain: "⛓️",
      "Web Development": "🌐",
      Backend: "⚙️",
      Frontend: "🎨",
      DevOps: "☁️",
    };
    return icons[category] || "📝";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Cybersecurity: "from-red-500/20 to-orange-500/20 border-red-500/30",
      Blockchain: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      "Web Development": "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      Backend: "from-green-500/20 to-emerald-500/20 border-green-500/30",
      Frontend: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
      DevOps: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
    };
    return (
      colors[category] || "from-gray-500/20 to-gray-600/20 border-gray-500/30"
    );
  };

  return (
    <section id="blog" ref={sectionRef} className="section-padding">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-10">
        <TitleHeader
          title="Latest Articles & Insights"
          sub="📝 Sharing Knowledge & Experience"
        />

        <div className="mt-16">
          {/* Featured Article */}
          <div className="mb-12">
            {isLoading ? (
              <SkeletonBlogCard className="h-96" />
            ) : (
              <article
                className={`blog-card group relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl ${
                  isDark
                    ? "bg-gray-900/40 border border-gray-700/50 hover:border-gray-600/50"
                    : "bg-white/80 border border-gray-200/50 hover:border-gray-300/50 shadow-lg"
                }`}
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full overflow-hidden">
                      <img
                        src={articles[0].image}
                        alt={articles[0].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className={`w-full h-full bg-gradient-to-br ${getCategoryColor(
                          articles[0].category
                        )} items-center justify-center absolute inset-0 hidden`}
                      >
                        <span className="text-6xl">
                          {getCategoryIcon(articles[0].category)}
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium backdrop-blur-sm">
                          Featured
                        </span>
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                          isDark ? "from-gray-900/60" : "from-white/60"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                        {articles[0].category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {articles[0].readTime}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {articles[0].date}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {articles[0].title}
                    </h3>

                    <p
                      className={`mb-6 leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {articles[0].excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {articles[0].tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            isDark
                              ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                              : "bg-gray-200/80 text-gray-700 hover:bg-gray-300/80"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={articles[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium group/btn"
                    >
                      Read on Medium
                      <svg
                        className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
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
                    </a>
                  </div>
                </div>
              </article>
            )}
          </div>

          {/* Other Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBlogCard key={index} />
                ))
              : articles.slice(1).map((article) => (
                  <article
                    key={article.id}
                    className={`blog-card group relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${
                      isDark
                        ? "bg-gray-900/40 border border-gray-700/50 hover:border-gray-600/50"
                        : "bg-white/80 border border-gray-200/50 hover:border-gray-300/50 shadow-lg"
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className={`w-full h-full bg-gradient-to-br ${getCategoryColor(
                          article.category
                        )} items-center justify-center absolute inset-0 hidden`}
                      >
                        <span className="text-4xl">
                          {getCategoryIcon(article.category)}
                        </span>
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                          isDark ? "from-gray-900/60" : "from-white/60"
                        }`}
                      />

                      {/* Hover overlay */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${
                          isDark ? "bg-gray-900/80" : "bg-white/90"
                        }`}
                      >
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 backdrop-blur-sm border rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                            isDark
                              ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                              : "bg-gray-900/10 border-gray-900/20 text-gray-900 hover:bg-gray-900/20"
                          }`}
                        >
                          Read on Medium
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
                        </a>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {article.readTime}
                        </span>
                      </div>

                      <h4
                        className={`text-lg font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {article.title}
                      </h4>

                      <p
                        className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              isDark
                                ? "bg-gray-700/50 text-gray-400 hover:bg-gray-600/50"
                                : "bg-gray-200/80 text-gray-600 hover:bg-gray-300/80"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              isDark
                                ? "bg-gray-700/50 text-gray-400"
                                : "bg-gray-200/80 text-gray-600"
                            }`}
                          >
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {article.date}
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium group/btn flex items-center gap-1"
                        >
                          Read on Medium
                          <svg
                            className="w-3 h-3 transition-transform group-hover/btn:translate-x-1"
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
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
          </div>

          {/* Medium Profile Link */}
          <div className="mt-16 text-center">
            <div
              className={`p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm ${
                isDark ? "" : "shadow-lg"
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div>
                  <h4
                    className={`text-xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Follow me on Medium
                  </h4>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    @nourmohamedderbeli
                  </p>
                </div>
              </div>
              <p
                className={`mb-6 max-w-2xl mx-auto ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                I regularly publish in-depth cybersecurity articles,
                vulnerability research, and security best practices. Stay
                updated with the latest insights in information security.
              </p>
              <a
                href="https://medium.com/@nourmohamedderbeli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
                </svg>
                Follow on Medium
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
              </a>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="mt-12 text-center">
            <h4
              className={`text-lg font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              My Writing Focus Areas
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Vulnerability Research", icon: "🔍" },
                { name: "Buffer Overflow", icon: "💥" },
                { name: "Web Security", icon: "🌐" },
                { name: "Access Control", icon: "🔐" },
                { name: "Security Architecture", icon: "🏗️" },
                { name: "Penetration Testing", icon: "🎯" },
              ].map((topic, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-300 ${
                    isDark
                      ? "bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-600/50 hover:text-white"
                      : "bg-gray-200/80 text-gray-700 border-gray-300/50 hover:bg-gray-300/80 hover:text-gray-900"
                  }`}
                >
                  {topic.icon} {topic.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
