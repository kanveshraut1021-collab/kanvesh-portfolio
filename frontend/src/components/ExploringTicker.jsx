import React from 'react';
import { Compass } from 'lucide-react';

export default function ExploringTicker() {
  const learningItems = [
    'C & C++ Fundamentals (In-Depth)',
    'Object-Oriented Programming (OOP)',
    'Python & FastAPI REST Architecture',
    'PostgreSQL & SQLAlchemy Database Storage',
    'Data Structures & Algorithms',
    'Git & GitHub Team Workflows',
    'Full-Stack System Engineering',
    'Modern Web Interactivity & Animations'
  ];

  return (
    <div className="bg-[#FAF6F1] py-4 border-y border-[#A67C64]/20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-4">
        
        {/* Title Badge */}
        <div className="flex items-center gap-2 shrink-0 font-mono text-xs font-bold text-[#882B34] uppercase tracking-wider bg-[#EAE0D6] px-3.5 py-1.5 rounded-full border border-[#A67C64]/25">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Currently Exploring:</span>
        </div>

        {/* Scrollable list of items */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 w-full text-xs font-mono text-[#705044]">
          {learningItems.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0D6]/50 border border-[#A67C64]/20 shrink-0 whitespace-nowrap hover:bg-[#EAE0D6] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B4B52]" />
              {item}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
