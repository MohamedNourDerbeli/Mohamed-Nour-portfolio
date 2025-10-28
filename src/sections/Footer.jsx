import { socialImgs, footerLinks, footerTechStack } from "../constants";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();



  return (
    <footer
      className={`relative overflow-hidden ${
        isDark
          ? "bg-gray-900/80 border-t border-gray-700/50"
          : "bg-white/80 border-t border-gray-200/50"
      } backdrop-blur-sm`}
    >
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                MN
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Mohamed Nour
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Software Developer & Cybersecurity Student
                </p>
              </div>
            </div>

            <p
              className={`text-sm leading-relaxed max-w-md ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Passionate about creating innovative solutions and sharing
              knowledge through code. Always exploring new technologies and
              pushing the boundaries of what's possible.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {socialImgs.map((socialImg, index) => (
                <a
                  key={index}
                  href={socialImg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDark
                      ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50"
                      : "bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200/50 hover:border-gray-300/50"
                  }`}
                  aria-label={`Visit ${socialImg.name} profile`}
                >
                  <img
                    src={socialImg.imgPath}
                    alt={`${socialImg.name} icon`}
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Hover tooltip */}
                  <div
                    className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                      isDark
                        ? "bg-gray-800 text-white"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    {socialImg.name}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors duration-300 hover:translate-x-1 inline-block ${
                      isDark
                        ? "text-gray-400 hover:text-purple-400"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Built With
            </h4>
            <div className="space-y-2">
              {footerTechStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-lg">{tech.icon}</span>
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                  isDark
                    ? "bg-green-900/30 text-green-400 border border-green-500/30"
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for work
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${
            isDark ? "border-gray-700/50" : "border-gray-200/50"
          }`}
        >
          {/* Copyright */}
          <div
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            © {currentYear} Mohamed Nour. All rights reserved.
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              isDark
                ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white border border-gray-700/50"
                : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 hover:text-gray-900 border border-gray-200/50"
            }`}
          >
            <span className="text-sm">Back to top</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
