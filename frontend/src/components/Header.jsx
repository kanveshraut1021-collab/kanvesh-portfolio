import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-[#9B4B52] z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-3.5 shadow-sm border-b border-[#A67C64]/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brandmark with Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#9B4B52] rounded-lg p-1"
            aria-label="Kanvesh Raut Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-[#9B4B52] flex items-center justify-center text-[#F5EEE7] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V32M12 20H18L26 8M18 20L27 32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold text-[#4A3028] tracking-wide group-hover:text-[#9B4B52] transition-colors">
                Kanvesh Raut
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#78685D]">
                Computer Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-[#78685D] hover:text-[#4A3028] hover:bg-[#D6C4B5]/20 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Status Pill & Action */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0D6]/80 border border-[#D6C4B5] text-xs font-mono text-[#705044]">
              <span className="w-2 h-2 rounded-full bg-[#9B4B52] animate-pulse-subtle" />
              <span>Pune, IN</span>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#9B4B52] text-[#F5EEE7] text-xs font-semibold hover:bg-[#705044] transition-colors shadow-sm"
            >
              Let's Talk
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contact"
              className="px-3.5 py-2 rounded-full bg-[#9B4B52] text-[#F5EEE7] text-xs font-semibold sm:hidden"
            >
              Talk
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#4A3028] hover:bg-[#D6C4B5]/20 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-header border-b border-[#D6C4B5] px-6 py-5 shadow-lg">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-base font-medium text-[#4A3028] hover:bg-[#D6C4B5]/20 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-[#D6C4B5] flex items-center justify-between">
                <span className="text-xs font-mono text-[#78685D] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#9B4B52]" />
                  Pune, Maharashtra
                </span>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#9B4B52] text-[#F5EEE7] text-xs font-semibold"
                >
                  Contact Kanvesh
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
