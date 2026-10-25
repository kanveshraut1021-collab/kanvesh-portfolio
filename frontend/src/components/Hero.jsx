import React from 'react';
import { ArrowRight, Code2, Database, MapPin, Sparkles, Layers } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Academic Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0D6] border border-[#A67C64]/30 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#9B4B52] animate-pulse-subtle" />
              <span className="font-mono text-xs font-semibold text-[#705044] tracking-wide">
                B.Tech • Second Year • GHRCEM Pune
              </span>
            </div>

            {/* Cinematic Name with Warm Glow, Light Sweep, and Crimson Accent */}
            <div className="relative inline-block my-1">
              {/* Subtle Warm Glow Behind Name */}
              <div className="hero-name-glow" aria-hidden="true" />

              <h1 className="hero-name-animated font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#4A3028] leading-[1.08] relative">
                <span className="relative z-10">Kanvesh</span>{' '}
                <span className="relative z-10 italic font-normal text-[#9B4B52]">Raut</span>

                {/* Soft Cinematic Light Sweep Across Name */}
                <span className="hero-name-sweep z-20" aria-hidden="true" />
              </h1>
            </div>

            {/* Staggered Professional Tagline */}
            <div className="hero-tagline-animated font-serif text-xl sm:text-2xl md:text-3xl text-[#4A3028] font-medium leading-snug">
              "Learning Today. <span className="text-[#9B4B52] italic font-normal">Building Tomorrow.</span>"
            </div>

            {/* Introduction Paragraph */}
            <p className="text-base sm:text-lg text-[#78685D] max-w-2xl leading-relaxed">
              I am an enthusiastic Computer Engineering student passionate about programming, web development,
              problem-solving, and building practical technology projects. Through hands-on development, I transform
              curiosity into resilient digital experiences.
            </p>

            {/* Supporting Line */}
            <div className="font-mono text-xs sm:text-sm text-[#705044] bg-[#FAF6F1]/80 px-4 py-2.5 rounded-lg border-l-2 border-[#9B4B52] italic">
              "Exploring technology. Building ideas. Growing through code."
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#9B4B52] hover:bg-[#705044] text-[#F5EEE7] text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#skills"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#FAF6F1] hover:bg-[#FFFFFF] border border-[#D6C4B5] text-[#4A3028] text-sm font-medium transition-all duration-200 shadow-xs hover:border-[#9B4B52]"
              >
                <Code2 className="w-4 h-4 text-[#9B4B52]" />
                <span>Explore Skills</span>
              </a>

              <a
                href="#contact"
                className="text-sm font-semibold text-[#9B4B52] hover:text-[#4A3028] underline underline-offset-4 decoration-[#9B4B52]/30 hover:decoration-[#4A3028] px-2 py-2 transition-colors"
              >
                Contact Me →
              </a>
            </div>

            {/* Quick Indicators / Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 w-full max-w-xl border-t border-[#A67C64]/20">
              <div className="flex items-center gap-2 text-xs text-[#78685D]">
                <MapPin className="w-3.5 h-3.5 text-[#9B4B52] shrink-0" />
                <span>Pune, India</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#78685D]">
                <Layers className="w-3.5 h-3.5 text-[#705044] shrink-0" />
                <span>3 Deployed Projects Live</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#78685D]">
                <Database className="w-3.5 h-3.5 text-[#882B34] shrink-0" />
                <span>Python FastAPI Backend</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card with Real Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Decorative background aura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#9B4B52]/20 via-[#A67C64]/15 to-[#F5EEE7] blur-lg -z-10" />

              <div className="glass-card rounded-2xl p-4 sm:p-5 border border-[#A67C64]/25 shadow-xl transition-transform duration-300 hover:shadow-2xl">
                
                {/* Editorial Top Stamp */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#A67C64]/20 font-mono text-[11px] text-[#78685D]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#705044]">
                    <Sparkles className="w-3 h-3 text-[#9B4B52]" />
                    Developer Profile • 2026
                  </span>
                  <span>Pune, Maharashtra</span>
                </div>

                {/* Profile Image Frame */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/4.6] bg-[#EAE0D6] border border-[#A67C64]/20 shadow-inner group">
                  <img
                    src="/profile/kanvesh.jpg"
                    alt="Kanvesh Raut — Computer Engineering Student"
                    className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[1.01] transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#221714]/80 via-transparent to-transparent opacity-85" />

                  {/* Image Bottom Tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#FAF6F1]/90 backdrop-blur-md border border-[#A67C64]/30 shadow-md">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#9B4B52] font-bold">
                      Aspiring Software Developer
                    </span>
                    <span className="block font-serif text-lg font-bold text-[#352923]">
                      Kanvesh Raut
                    </span>
                    <span className="block text-xs text-[#78685D]">
                      G H Raisoni College of Engineering and Management
                    </span>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="flex items-center justify-between pt-3 mt-3 text-xs font-mono text-[#78685D]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#882B34]" />
                    <span>Active Student • GHRCEM</span>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#882B34] text-[#F5EEE7] flex items-center justify-center font-serif font-bold text-xs">
                    KR
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
