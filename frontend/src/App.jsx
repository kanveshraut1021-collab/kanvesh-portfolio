import React, { useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import ExploringTicker from './components/ExploringTicker';
import ProjectShowcase from './components/ProjectShowcase';
import Capabilities from './components/Capabilities';
import Goal from './components/Goal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }, 400);
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#F5EEE7] text-[#4A3028] relative selection:bg-[#9B4B52] selection:text-[#F5EEE7]">
      {/* Subtle Grain Overlay for Editorial Texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Custom Animated Mouse Cursor for Desktop */}
      <CustomCursor />

      {/* Floating Particle Constellation Canvas */}
      <BackgroundCanvas />

      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <ExploringTicker />
        <ProjectShowcase />
        <Capabilities />
        <Goal />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
