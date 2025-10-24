import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    // Enhanced smooth scrolling for all anchor links
    const handleSmoothScroll = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      // Calculate offset for fixed navbar
      const navbarHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    };

    // Add event listener to document
    document.addEventListener("click", handleSmoothScroll);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleSmoothScroll);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmoothScroll;
