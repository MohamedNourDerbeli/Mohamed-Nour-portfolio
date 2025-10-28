import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import Technologies from "./sections/skills";
import Navbar from "./components/NavBar";
import Blog from "./sections/Blog";
import SmoothScroll from "./components/SmoothScroll";
import AnimatedBackground from "./components/AnimatedBackground";
import { ThemeProvider } from "./contexts/ThemeContext";

const AppContent = () => (
  <div className="min-h-screen text-gray-900 dark:text-white transition-colors duration-300 relative">
    <AnimatedBackground />
    <div className="relative z-20">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <Technologies />
      <Blog />
      <Contact />
      <Footer />
    </div>
  </div>
);

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
