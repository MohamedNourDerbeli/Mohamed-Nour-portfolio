import { useState, lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load heavy components to reduce initial bundle size
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const Technologies = lazy(() => import("./sections/skills"));
const Blog = lazy(() => import("./sections/Blog"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));
const SmoothScroll = lazy(() => import("./components/SmoothScroll"));
const AnimatedBackground = lazy(() => import("./components/AnimatedBackground"));


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
        <div className="min-h-screen text-gray-900 dark:text-white relative layout-stable theme-stable">
          <Suspense fallback={<div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />}>
            <AnimatedBackground />
          </Suspense>
          <div className="relative z-10 no-layout-shift">
            <Suspense fallback={<div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />}>
              <SmoothScroll />
            </Suspense>
            <Navbar />
            <Hero />
            <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-5 md:mx-20" />}>
              <ShowcaseSection />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-5 md:mx-20 mt-20" />}>
              <Technologies />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-5 md:mx-20 mt-20" />}>
              <Blog />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-5 md:mx-20 mt-20" />}>
              <Contact />
            </Suspense>
            <Suspense fallback={<div className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse" />}>
              <Footer />
            </Suspense>

          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
