import { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import Technologies from "./sections/skills";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import SmoothScroll from "./components/SmoothScroll";
import AnimatedBackground from "./components/AnimatedBackground";
import LoadingScreen from "./components/LoadingScreen";
import FloatingContactButton from "./components/FloatingContactButton";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <div className="min-h-screen text-gray-900 dark:text-white relative">
          <AnimatedBackground />
          <div className="relative z-10">
            <SmoothScroll />
            <Navbar />
            <Hero />
            <ShowcaseSection />
            <Technologies />
            <Blog />
            <Contact />
            <Footer />
            <FloatingContactButton />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
