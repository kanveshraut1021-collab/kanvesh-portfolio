import React from 'react';
import { GraduationCap, Code, Globe, Rocket, Brain, Terminal, Award } from 'lucide-react';

export default function Journey() {
  const milestones = [
    {
      num: '01',
      phase: 'Foundations',
      title: 'Programming Fundamentals',
      desc: 'Mastered foundational syntax, control structures, pointers, memory allocation, and algorithmic logic in C and C++.',
      icon: <Terminal className="w-4 h-4 text-[#9B4B52]" />
    },
    {
      num: '02',
      phase: 'Web Tech',
      title: 'Modern Web Development',
      desc: 'Learned semantic HTML5, modern CSS3 layout systems (Flexbox, CSS Grid), responsive design, and core JavaScript DOM manipulation.',
      icon: <Globe className="w-4 h-4 text-[#705044]" />
    },
    {
      num: '03',
      phase: 'Shipped',
      title: 'Building Practical Projects',
      desc: 'Shipped real projects to production: modern farming portal FarmEdge, commercial workshop site for Sai Automobile, and StockHub inventory system.',
      icon: <Rocket className="w-4 h-4 text-[#882B34]" />
    },
    {
      num: '04',
      phase: 'In Progress',
      title: 'Problem-Solving & DSA',
      desc: 'Deepening knowledge in foundational data structures (arrays, linked lists, stacks, queues) and Object-Oriented Programming (OOP) paradigms.',
      icon: <Brain className="w-4 h-4 text-[#9B4B52]" />
    },
    {
      num: '05',
      phase: 'Daily Habit',
      title: 'Exploring Development Tools',
      desc: 'Mastering version control with Git & GitHub, VS Code debugging environments, REST APIs, and cloud deployment pipelines (Vercel, Netlify).',
      icon: <Code className="w-4 h-4 text-[#705044]" />
    },
    {
      num: '06',
      phase: 'Next Horizon',
      title: 'Internship Preparation',
      desc: 'Actively preparing for software development internships to collaborate with experienced engineers and learn production-grade workflows.',
      icon: <Award className="w-4 h-4 text-[#882B34]" />
    }
  ];

  return (
    <section id="journey" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9B4B52] font-semibold">
            02 / Timeline
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A3028] mt-2">
            Education &amp; <span className="text-[#9B4B52] italic">learning journey.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#78685D] mt-3">
            An honest representation of my path as a Computer Engineering student documenting foundational milestones.
          </p>
        </div>

        {/* Featured Education Card */}
        <div className="bg-[#FAF6F1] border border-[#D6C4B5] rounded-2xl p-6 sm:p-8 shadow-sm mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#9B4B52] text-[#F5EEE7] flex items-center justify-center shrink-0 shadow-sm">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAE0D6] text-[#705044] text-[11px] font-mono font-semibold mb-1.5">
                Formal Education
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#4A3028]">
                Bachelor of Technology (B.Tech) — Computer Engineering
              </h3>
              <p className="text-base text-[#705044] font-medium mt-0.5">
                G H Raisoni College of Engineering and Management, Pune
              </p>
              <p className="text-xs font-mono text-[#78685D] mt-1">
                Pune, Maharashtra, India • Second Year (Current Academic Session)
              </p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#A67C64]/20">
            <span className="px-3.5 py-1 rounded-full bg-[#882B34] text-[#F5EEE7] text-xs font-semibold">
              Second Year
            </span>
            <span className="font-mono text-[11px] text-[#705044] font-semibold mt-1 uppercase tracking-wider">
              Active Student
            </span>
          </div>
        </div>

        {/* 6-Milestone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {milestones.map((m) => (
            <div
              key={m.num}
              className="bg-[#FAF6F1]/90 rounded-xl p-5 border border-[#A67C64]/20 shadow-xs hover:border-[#9B4B52] hover:bg-[#FFFFFF] transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#9B4B52] bg-[#EAE0D6]/60 px-2 py-0.5 rounded">
                  Milestone {m.num}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#705044]">
                  {m.icon}
                  {m.phase}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#352923] mb-2 group-hover:text-[#882B34] transition-colors">
                {m.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#78685D] leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
