import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'farmedge',
    index: '01',
    title: 'FarmEdge — Modern Farming Platform',
    category: 'Agricultural Platform',
    liveUrl: 'https://modernfarmingfarmedge.netlify.app/',
    screenshot: '/screenshots/farmedge.png',
    displayUrl: 'https://modernfarmingfarmedge.netlify.app',
    description: 'A simple farming-related web project intended to help villagers.',
    features: [
      'Modern agricultural technique guides with efficiency & water conservation metrics (drip irrigation & hydroponics)',
      'Climate & crop suitability recommendations tailored to regional farming needs',
      'AgroSmart agricultural supply catalog with dynamic cart calculation',
      'Clean, responsive multi-section layout accessible on mobile devices'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Netlify', 'Responsive Design'],
    badge: 'Live on Netlify',
    glowColor: 'rgba(214, 196, 181, 0.12)', // Subtle beige glow
  },
  {
    id: 'sai-automobile',
    index: '02',
    title: 'Sai Automobile — Business Website',
    category: 'Commercial Business Website',
    liveUrl: 'https://sai-automobile.vercel.app/',
    screenshot: '/screenshots/sai-automobile.png',
    displayUrl: 'https://sai-automobile.vercel.app',
    description: 'A shop website created for a business/client opportunity.',
    features: [
      'Interactive 3-bay workshop showcase with animated roll-up shutters on hover',
      'Curated genuine battery brand catalog (Exide, Amaron, Tata Green)',
      'Instant emergency calling integration (tel:+919075919023) for on-road assistance',
      'Operational hours, live open indicator, and service location details'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel', 'UI/UX Design'],
    badge: 'Live on Vercel',
    glowColor: 'rgba(197, 141, 145, 0.15)', // Subtle dusty rose glow
  },
  {
    id: 'inventory-system',
    index: '03',
    title: 'Inventory Management System',
    category: 'Full-Stack Dashboard',
    liveUrl: 'https://inventory-management-system-iota-sandy.vercel.app/',
    screenshot: '/screenshots/inventory.png',
    displayUrl: 'https://inventory-management-system-iota-sandy.vercel.app',
    description: 'A project focused on organizing inventory and managing stock.',
    features: [
      'Real-time stock level analytics, SKU classification, and category breakdown',
      'Product inventory data table with instant search and status indicators',
      'Critical stock health alerts highlighting items requiring immediate restock',
      'Dark theme UI designed for extended viewing with data typography'
    ],
    tech: ['React.js', 'Python Flask / REST API', 'Tailwind CSS', 'Vercel'],
    badge: 'Live on Vercel',
    glowColor: 'rgba(155, 75, 82, 0.18)', // Subtle crimson glow
  }
];

export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const media = card.querySelector('.project-media');
        const mediaImg = card.querySelector('.project-img');
        const details = card.querySelector('.project-details');
        const badge = card.querySelector('.project-badge');
        const title = card.querySelector('.project-title');
        const desc = card.querySelector('.project-desc');
        const list = card.querySelector('.project-features');
        const tech = card.querySelector('.project-tech');
        const cta = card.querySelector('.project-cta');

        // ScrollTrigger for each project showcase
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 35%',
            toggleActions: 'play none none reverse',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          }
        });

        // 1. Cinematic Screenshot Reveal & Subtle Scale
        tl.fromTo(
          media,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );

        if (mediaImg) {
          tl.fromTo(
            mediaImg,
            { scale: 0.94 },
            { scale: 1, duration: 1.0, ease: 'power2.out' },
            '-=0.7'
          );
        }

        // 2. Project details reveal
        if (details) {
          tl.fromTo(
            [badge, title, desc, list, tech, cta].filter(Boolean),
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' },
            '-=0.75'
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProject = (idx) => {
    const el = cardsRef.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-32 bg-[#201614] text-[#F5EEE7] border-y border-[#382823] relative overflow-hidden"
    >
      {/* Subtle Cream, Beige, and Dusty Rose Light Effects blending naturally with #201614 */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#C58D91]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#D6C4B5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[550px] bg-gradient-to-b from-[#F5EEE7]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#382823]">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C58D91] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C58D91]" />
              04 / Cinematic Showcase
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5EEE7] mt-3 tracking-tight">
              Selected <span className="text-[#C58D91] italic font-normal">projects.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#C5B6AB] mt-3 leading-relaxed">
              Real deployed web projects with live production interfaces. Explore verified screenshots, actual technical implementations, and working live links.
            </p>
          </div>

          {/* Quick Project Switcher Nav */}
          <div className="flex items-center gap-2 bg-[#2E201B] p-1.5 rounded-full border border-[#382823] shrink-0">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeIndex === idx
                    ? 'bg-[#9B4B52] text-[#F5EEE7] shadow-sm'
                    : 'text-[#C5B6AB] hover:text-[#F5EEE7] hover:bg-[#382823]'
                }`}
              >
                <span>{p.index}</span>
                <span className="hidden sm:inline">{p.title.split('—')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Sequential Scroll-Triggered Cinematic Project Showcases */}
        <div className="space-y-28 md:space-y-36">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-2"
            >
              
              {/* Media Column (Cinematic Browser Viewport) */}
              <div className="project-media lg:col-span-7 flex flex-col will-change-transform order-1">
                <div className="relative group">
                  
                  {/* Subtle Colored Ambient Backlight */}
                  <div
                    className="absolute -inset-3 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10"
                    style={{ backgroundColor: proj.glowColor }}
                  />

                  {/* Browser Chrome Container */}
                  <div className="rounded-2xl overflow-hidden bg-[#18110F] border border-[#382823] shadow-2xl transition-all duration-500 group-hover:border-[#705044]/60 group-hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
                    
                    {/* Browser Chrome Bar */}
                    <div className="bg-[#241A17] px-4 py-3 flex items-center justify-between border-b border-[#382823]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#E05252]/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#E5A83B]/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#4BB543]/80 inline-block" />
                      </div>

                      {/* Prominent URL Display Pill */}
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-1 max-w-md mx-3 px-3 py-1 rounded-md bg-[#18110F] text-[#C5B6AB] hover:text-[#F5EEE7] text-xs font-mono truncate border border-[#382823] transition-colors"
                        title={`Visit ${proj.displayUrl}`}
                      >
                        <span className="text-[#C58D91] mr-1.5">🔒</span>
                        <span className="truncate">{proj.displayUrl}</span>
                      </a>

                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#C5B6AB] hover:text-[#F5EEE7] transition-colors flex items-center gap-1"
                        title="Launch live site in new tab"
                      >
                        <span className="hidden sm:inline">Launch</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C58D91]" />
                      </a>
                    </div>

                    {/* Real Project Screenshot Viewport */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#140D0C]">
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full cursor-pointer relative group/img"
                      >
                        <img
                          src={proj.screenshot}
                          alt={`${proj.title} Real Live Website Screenshot`}
                          className="project-img w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
                          loading="lazy"
                        />
                        
                        {/* Hover Overlay with View Live Project button */}
                        <div className="absolute inset-0 bg-[#18110F]/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9B4B52] text-[#F5EEE7] text-sm font-semibold shadow-xl transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                            <span>View Live Project</span>
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Bottom Verification Strip */}
                    <div className="bg-[#241A17] px-4 py-2.5 flex items-center justify-between text-xs font-mono text-[#C5B6AB] border-t border-[#382823]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4BB543] animate-pulse" />
                        <span className="text-[11px]">Real Live Project Screenshot</span>
                      </div>
                      <span className="text-[#C58D91] text-[11px] font-semibold">{proj.badge}</span>
                    </div>

                  </div>

                </div>
              </div>

              {/* Details Column */}
              <div className="project-details lg:col-span-5 flex flex-col space-y-5 order-2">
                
                {/* Index & Badge */}
                <div className="project-badge flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E201B] border border-[#382823] font-mono text-xs font-semibold text-[#C5B6AB]">
                    <span className="w-2 h-2 rounded-full bg-[#882B34]" />
                    <span>PROJECT {proj.index}</span>
                    <span>•</span>
                    <span className="text-[#C58D91]">{proj.category}</span>
                  </div>

                  <span className="font-mono text-xs text-[#C58D91] font-semibold bg-[#2E201B] px-2.5 py-1 rounded-md border border-[#382823]">
                    {proj.badge}
                  </span>
                </div>

                {/* Project Title */}
                <div>
                  <h3 className="project-title font-serif text-3xl sm:text-4xl lg:text-4xl font-bold text-[#F5EEE7] tracking-tight leading-snug">
                    {proj.title}
                  </h3>
                </div>

                {/* Description (Exact prompt requirement) */}
                <div className="project-desc bg-[#2E201B]/80 p-4 sm:p-5 rounded-xl border-l-4 border-[#882B34] border-y border-r border-[#382823] backdrop-blur-xs">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#C58D91] font-bold mb-1.5">
                    Project Overview
                  </span>
                  <p className="text-sm sm:text-base text-[#F5EEE7] leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="project-features">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#C5B6AB] font-bold mb-2.5">
                    Key Features &amp; Implementations
                  </span>
                  <ul className="space-y-2">
                    {proj.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#C5B6AB] leading-snug">
                        <CheckCircle className="w-4 h-4 text-[#C58D91] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Applied */}
                <div className="project-tech">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#C5B6AB] font-bold mb-2">
                    Technologies Applied
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#2E201B] border border-[#382823] text-[#F5EEE7] text-xs font-mono font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: View Live Project + Direct URL link */}
                <div className="project-cta pt-3 flex flex-col sm:flex-row sm:items-center gap-3.5">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#9B4B52] hover:bg-[#705044] text-[#F5EEE7] text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-[#2E201B] hover:bg-[#382823] border border-[#382823] text-[#C58D91] hover:text-[#F5EEE7] text-xs font-mono font-medium transition-colors truncate"
                  >
                    <span className="truncate">{proj.displayUrl}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
