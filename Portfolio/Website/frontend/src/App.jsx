import './App.css';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Footer />
    </>
  );
}
