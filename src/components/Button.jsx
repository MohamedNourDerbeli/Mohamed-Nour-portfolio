import { useTheme } from "../contexts/ThemeContext";

/**
 * A reusable CTA button component.
 * When clicked, it scrolls smoothly to the section with the provided ID,
 * with a small offset from the top for better visual placement.
 */

const Button = ({ text, className, id }) => {
  const { isDark } = useTheme();
  return (
    <a
      onClick={(e) => {
        e.preventDefault(); // Stop the link from jumping instantly

        const target = document.getElementById(id); // Find the section with the passed ID

        // Only scroll if we found the section and an ID is passed in
        // This prevents buttons without target IDs from scrolling
        if (target && id) {
          const offset = window.innerHeight * 0.15; // Leave a bit of space at the top

          // Calculate how far down the page we need to scroll
          const top =
            target.getBoundingClientRect().top + window.pageYOffset - offset;

          // Scroll smoothly to that position
          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
      className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
    >
      <div className={`cta-button group ${
        isDark 
          ? "bg-black-200" 
          : "bg-blue-600 hover:bg-blue-700 shadow-lg"
      }`}>
        <div className={`bg-circle ${
          isDark ? "bg-white-50" : "bg-black"
        }`} />
        <p className={`text uppercase md:text-lg transition-all duration-500 group-hover:-translate-x-5 xl:translate-x-0 -translate-x-5 ${
          isDark 
            ? "text-black group-hover:text-white-50" 
            : "text-white font-semibold"
        }`}>{text}</p>
        <div className={`arrow-wrapper size-10 rounded-full absolute right-10 top-1/2 -translate-y-1/2 flex justify-center items-center overflow-hidden ${
          isDark 
            ? "group-hover:bg-white-50" 
            : "group-hover:bg-white"
        }`}>
          <img 
            src="/images/arrow-down.svg" 
            alt="arrow" 
            className="size-5 xl:-translate-y-32 translate-y-0 animate-bounce group-hover:translate-y-0 transition-all duration-500"
          />
        </div>
      </div>
    </a>
  );
};

export default Button;
