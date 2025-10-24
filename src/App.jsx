import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import Technologies from "./sections/skills";
import Navbar from "./components/NavBar";
import Blog from "./sections/Blog";
import SmoothScroll from "./components/SmoothScroll";

const AppContent = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
    <SmoothScroll />
    <Navbar />
    <Hero />
    <ShowcaseSection />
    <Technologies />
    <Blog />
    <Contact />
    <Footer />
  </div>
);

const App = () => <AppContent />;

export default App;
