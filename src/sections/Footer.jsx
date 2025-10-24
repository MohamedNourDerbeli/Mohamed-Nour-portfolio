import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Left side - Copyright */}
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Mohamed Nour. All rights reserved.
          </div>

          {/* Center - Social Links */}
          <div className="flex space-x-4">
            {socialImgs.map((socialImg, index) => (
              <a
                key={index}
                href={socialImg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110"
                aria-label={`Visit ${socialImg.name} profile`}
              >
                <img 
                  src={socialImg.imgPath} 
                  alt={`${socialImg.name} icon`}
                  className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>

          {/* Right side - Built with */}
          <div className="text-gray-400 text-sm">
            Built with React & Three.js
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
