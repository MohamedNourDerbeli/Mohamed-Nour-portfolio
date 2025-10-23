import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import Navbar from "./components/NavBar";
import Blog from "./sections/Blog";

const App = () => (
  <>
    <Navbar />
    <Hero />
    <ShowcaseSection />
    <TechStack />
    <Blog />
    <Contact />
    <Footer />
  </>
);

export default App;
