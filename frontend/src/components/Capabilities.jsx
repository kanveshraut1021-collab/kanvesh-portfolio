import React from 'react';
import { Smartphone, Sparkles, Bug, FolderGit2, BookOpen, Users, SplitSquareVertical } from 'lucide-react';

export default function Capabilities() {
  const capabilities = [
    {
      num: '01',
      title: 'Build Responsive Websites',
      desc: 'Creating websites that adapt cleanly to mobile, tablet, and desktop screens with semantic HTML5 and fluid CSS layout models.',
      icon: <Smartphone className="w-5 h-5 text-[#9B4B52]" />
    },
    {
      num: '02',
      title: 'Implement Interactive Features',
      desc: 'Developing dynamic UI elements, modals, tab selectors, live counters, and interactive filtering with modern JavaScript.',
      icon: <Sparkles className="w-5 h-5 text-[#705044]" />
    },
    {
      num: '03',
      title: 'Write & Debug Programs',
      desc: 'Writing structured code in C, C++, and Python, stepping through logic with debuggers, catching edge cases, and fixing bugs.',
      icon: <Bug className="w-5 h-5 text-[#882B34]" />
    },
    {
      num: '04',
      title: 'Develop Academic & Personal Projects',
      desc: 'Taking an engineering idea from initial concept and database schema to a deployed, production-ready web application.',
      icon: <FolderGit2 className="w-5 h-5 text-[#9B4B52]" />
    },
    {
      num: '05',
      title: 'Learn New Technologies Independently',
      desc: 'Reading official documentation, following modern engineering specifications, experimenting with libraries, and staying curious.',
      icon: <BookOpen className="w-5 h-5 text-[#705044]" />
    },
    {
      num: '06',
      title: 'Collaborate and Accept Feedback',
      desc: 'Working constructively with peers, communicating ideas with clarity, and incorporating code reviews into iterative improvements.',
      icon: <Users className="w-5 h-5 text-[#882B34]" />
    },
    {
      num: '07',
      title: 'Break Problems Into Manageable Steps',
      desc: 'Approaching complex assignments with modular decomposition, clean algorithmic flowcharts, and testable incremental steps.',
      icon: <SplitSquareVertical className="w-5 h-5 text-[#705044]" />,
      span: true
    }
  ];

  return (
    <section id="capabilities" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9B4B52] font-semibold">
            05 / Core Strengths
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A3028] mt-2">
            Things I enjoy <span className="text-[#9B4B52] italic">building &amp; doing.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#78685D] mt-3">
            Practical competencies developed through hands-on coding, engineering lab coursework, and building production applications.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((c) => (
            <div
              key={c.num}
              className={`bg-[#FAF6F1] p-6 rounded-2xl border border-[#A67C64]/20 shadow-xs hover:border-[#9B4B52] hover:bg-[#FFFFFF] transition-all duration-200 group ${
                c.span ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#9B4B52] bg-[#EAE0D6] px-2.5 py-1 rounded-md">
                  {c.num}
                </span>
                <div className="p-2 rounded-lg bg-[#EAE0D6]/60 group-hover:bg-[#EAE0D6] transition-colors">
                  {c.icon}
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#352923] mb-2 group-hover:text-[#882B34] transition-colors">
                {c.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#78685D] leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
