import React from 'react';
import { Target, Cpu, Flame } from 'lucide-react';

export default function About() {
  const interestChips = [
    { label: 'Web Engineering', icon: '💻' },
    { label: 'Problem-Solving', icon: '🧩' },
    { label: 'Data Structures', icon: '📊' },
    { label: 'Git & GitHub', icon: '🐙' },
    { label: 'Continuous Learning', icon: '🚀' },
    { label: 'Python & FastAPI', icon: '⚡' },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Practical Building',
      desc: 'Learning concepts by implementing real, usable software applications that solve actual user workflows.',
      icon: <Target className="w-5 h-5 text-[#9B4B52]" />
    },
    {
      num: '02',
      title: 'Fundamentals First',
      desc: 'Strengthening core CS principles in C, C++, Data Structures, Memory Management, and Object-Oriented Design.',
      icon: <Cpu className="w-5 h-5 text-[#705044]" />
    },
    {
      num: '03',
      title: 'Consistent Discipline',
      desc: 'Daily coding practice, algorithmic exercises, clean repository commits, and learning through constructive review.',
      icon: <Flame className="w-5 h-5 text-[#882B34]" />
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#EAE0D6]/40 relative border-y border-[#A67C64]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#FAF6F1] p-3 border border-[#A67C64]/25 shadow-lg group">
              <div className="aspect-[4/4.5] rounded-xl overflow-hidden relative">
                <img
                  src="/profile/kanvesh.jpg"
                  alt="Kanvesh Raut in suit"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#221714]/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#F5EEE7] bg-[#221714]/60 backdrop-blur-md px-3 py-2 rounded-lg">
                  <span className="font-semibold">Kanvesh Raut</span>
                  <span className="text-[#C58D91] font-mono text-[11px]">B.Tech Second Year</span>
                </div>
              </div>
            </div>

            {/* Interest Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {interestChips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F1] border border-[#A67C64]/25 text-xs font-medium text-[#705044] shadow-2xs hover:border-[#9B4B52] transition-colors"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Header */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#9B4B52] font-semibold">
                01 / Introduction
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A3028] mt-2 leading-tight">
                A little about <span className="text-[#9B4B52] italic">me.</span>
              </h2>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[#78685D] leading-relaxed">
              <p>
                I am <strong className="text-[#4A3028] font-semibold">Kanvesh Raut</strong>, a second-year B.Tech Computer Engineering student at G H Raisoni College of Engineering and Management, Pune, with a deep passion for software engineering, full-stack web applications, and problem-solving.
              </p>
              <p>
                I enjoy learning new programming languages, exploring modern development tools, and building projects that solve practical problems. Through my projects, I am continuously refining my understanding of web development, system architecture, database modeling, and software engineering principles.
              </p>
            </div>

            {/* Editorial Quote Box */}
            <div className="bg-[#FAF6F1] border-l-4 border-[#9B4B52] p-5 rounded-r-xl shadow-xs">
              <p className="font-serif italic text-lg sm:text-xl text-[#4A3028] leading-snug">
                "My goal is to strengthen my technical skills, gain hands-on experience, contribute to meaningful projects, and become a skilled software developer."
              </p>
              <span className="block mt-2 font-mono text-xs text-[#705044] uppercase tracking-wider font-semibold">
                — Kanvesh Raut • Pune, India
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#78685D]">
              I firmly believe in continuous learning, consistency, and improving through practical experience.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((p) => (
                <div
                  key={p.num}
                  className="bg-[#FAF6F1] p-4 rounded-xl border border-[#A67C64]/20 shadow-xs hover:border-[#9B4B52]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#9B4B52]">{p.num}</span>
                    {p.icon}
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#352923] mb-1">{p.title}</h3>
                  <p className="text-xs text-[#78685D] leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
