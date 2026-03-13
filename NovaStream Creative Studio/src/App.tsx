import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import HeroSection from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectShowcase';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/* Fixed overlays */}
      <div className="noise-overlay" />
      <Cursor />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}