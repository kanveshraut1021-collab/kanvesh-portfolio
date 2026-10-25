import React from 'react';
import { Compass, Sparkles, Target, Users } from 'lucide-react';

export default function Goal() {
  const focuses = [
    {
      num: 'Focus 01',
      title: 'Engineering Rigor',
      desc: 'Mastering Data Structures, Algorithms, and Object-Oriented principles to write clean, high-performance, well-structured software.',
      icon: <Target className="w-5 h-5 text-[#C58D91]" />
    },
    {
      num: 'Focus 02',
      title: 'Internship Opportunity',
      desc: 'Securing a developer internship role to gain exposure to real-world software lifecycles, team code reviews, and production systems.',
      icon: <Users className="w-5 h-5 text-[#BFA08E]" />
    },
    {
      num: 'Focus 03',
      title: 'Building Meaningful Tech',
      desc: 'Creating technology products that solve real-life difficulties for businesses, farmers, and communities through modern digital tools.',
      icon: <Sparkles className="w-5 h-5 text-[#C58D91]" />
    }
  ];

  return (
    <section id="goal" className="py-20 md:py-28 bg-[#221714] text-[#F5EEE7] relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9B4B52]/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#705044]/15 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C58D91] font-semibold flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            06 / Vision &amp; Direction
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#F5EEE7] mt-2">
            Where I want <span className="text-[#C58D91] italic">to go.</span>
          </h2>
        </div>

        {/* Lead Quote Statement */}
        <div className="bg-[#2E201B]/80 border-l-4 border-[#C58D91] p-6 sm:p-8 rounded-r-2xl border-y border-r border-[#382823] backdrop-blur-xs mb-12 shadow-xl">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F5EEE7] leading-relaxed font-light">
            "My goal is to become a proficient software developer with strong programming fundamentals and practical development experience.{' '}
            <span className="text-[#C58D91] italic font-normal">
              I want to build useful applications
            </span>
            , work on challenging technical problems, contribute to collaborative projects, and secure internship opportunities where I can learn from experienced professionals."
          </p>
          <span className="block font-mono text-xs text-[#C5B6AB] uppercase tracking-wider mt-4">
            — Kanvesh Raut • Career Aspiration
          </span>
        </div>

        {/* 3 Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {focuses.map((f) => (
            <div
              key={f.num}
              className="bg-[#2E201B] border border-[#382823] p-6 rounded-2xl hover:border-[#C58D91]/60 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#C58D91] bg-[#382823] px-2.5 py-1 rounded">
                  {f.num}
                </span>
                <div className="p-2 rounded-lg bg-[#382823]/80 group-hover:bg-[#382823] transition-colors">
                  {f.icon}
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5EEE7] mb-2 group-hover:text-[#C58D91] transition-colors">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#C5B6AB] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
