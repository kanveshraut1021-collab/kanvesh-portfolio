import React, { useState } from 'react';
import { Code2, Database, Globe, Cpu, Wrench, Cloud, Sparkles } from 'lucide-react';

export default function Skills() {
  const categories = [
    { id: 'languages', name: 'Programming Languages', icon: <Code2 className="w-4 h-4" /> },
    { id: 'web', name: 'Web Development', icon: <Globe className="w-4 h-4" /> },
    { id: 'backend', name: 'Backend & Database', icon: <Database className="w-4 h-4" /> },
    { id: 'cs', name: 'CS Fundamentals', icon: <Cpu className="w-4 h-4" /> },
    { id: 'tools', name: 'Development Tools', icon: <Wrench className="w-4 h-4" /> },
    { id: 'deployment', name: 'Deployment', icon: <Cloud className="w-4 h-4" /> },
  ];

  const skillsData = {
    languages: [
      {
        name: 'C',
        badge: 'Coursework & Logic',
        desc: 'Manual memory allocation, pointers, memory addresses, control flow, structs, and low-level algorithmic problem-solving.',
        topics: ['Pointers', 'Dynamic Memory', 'Structs', 'Algorithms'],
        note: 'Studied deeply in engineering coursework at GHRCEM Pune.'
      },
      {
        name: 'C++',
        badge: 'Practicing & DSA',
        desc: 'Object-Oriented Programming (classes, objects, encapsulation, inheritance, polymorphism) and foundational Standard Template Library (STL).',
        topics: ['OOP', 'Classes & Objects', 'STL Basics', 'Problem Solving'],
        note: 'Primary language for Data Structures and algorithmic practice.'
      },
      {
        name: 'Python',
        badge: 'Backend & Scripting',
        desc: 'FastAPI REST architecture, data handling, clean backend scripts, SQLAlchemy ORM modeling, and automation.',
        topics: ['FastAPI', 'SQLAlchemy', 'Pydantic', 'Automation'],
        note: 'Powers the backend API and database persistence of this portfolio.'
      },
      {
        name: 'Java',
        badge: 'Syntax Exploration',
        desc: 'Object-Oriented fundamentals, JVM architecture, classes, interfaces, and core syntax fundamentals.',
        topics: ['OOP', 'Core Java', 'Methods', 'Packages'],
        note: 'Explored through academic curriculum and programming exercises.'
      }
    ],
    web: [
      {
        name: 'React.js',
        badge: 'Shipped in Projects',
        desc: 'Functional components, hooks (useState, useEffect, useRef), component architecture, and responsive state synchronization.',
        topics: ['Hooks', 'State Management', 'Vite', 'Component Lifecycle'],
        note: 'Used to build the reactive user interface of this portfolio and StockHub.'
      },
      {
        name: 'JavaScript (ES6+)',
        badge: 'Core Competency',
        desc: 'DOM manipulation, promises, async/await, closures, fetch API, array methods, and event loop behavior.',
        topics: ['Async/Await', 'DOM API', 'Fetch', 'ES6 Modules'],
        note: 'Active language for client-side interactivity across all deployed sites.'
      },
      {
        name: 'Tailwind CSS',
        badge: 'Design System',
        desc: 'Utility-first modern styling, responsive breakpoints, custom theme extension, and zero-runtime performance.',
        topics: ['Utility Classes', 'Flex/Grid', 'Responsive', 'Theme Config'],
        note: 'Creates the cream, chocolate, and muted crimson design system here.'
      },
      {
        name: 'HTML5 & CSS3',
        badge: 'Semantic Web',
        desc: 'Accessible semantic markup, SEO best practices, CSS Grid, Flexbox, responsive typography, and media queries.',
        topics: ['Semantic Tags', 'CSS Grid', 'Flexbox', 'Accessibility'],
        note: 'Solid foundation applied throughout FarmEdge, Sai Automobile, and portfolio.'
      }
    ],
    backend: [
      {
        name: 'FastAPI',
        badge: 'Production Backend',
        desc: 'High-performance Python web framework, OpenAPI automatic documentation, Pydantic type validation, and asynchronous endpoints.',
        topics: ['Pydantic', 'Dependency Injection', 'CORS', 'Swagger Docs'],
        note: 'Handles contact message validation and storage for this portfolio.'
      },
      {
        name: 'PostgreSQL',
        badge: 'Relational Database',
        desc: 'Relational schema design, ACID transactions, data persistence, indexing, and structured SQL query management.',
        topics: ['Relational Schema', 'Primary Keys', 'Data Integrity', 'SQL'],
        note: 'Configured with SQLAlchemy for production portfolio submissions.'
      },
      {
        name: 'SQLAlchemy',
        badge: 'Python ORM',
        desc: 'Declarative models, database engine abstraction, session handling, transactions, and migration readiness.',
        topics: ['Declarative Base', 'Sessions', 'Engine Config', 'CRUD Operations'],
        note: 'Provides seamless database interaction with PostgreSQL and SQLite fallback.'
      }
    ],
    cs: [
      {
        name: 'Data Structures',
        badge: 'Core Focus',
        desc: 'Linear structures: Arrays, Singly & Doubly Linked Lists, Stacks, Queues, and basic tree traversal intuition.',
        topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues'],
        note: 'Ongoing curriculum study and active problem-solving practice.'
      },
      {
        name: 'Object-Oriented Programming',
        badge: 'Core Principles',
        desc: 'Encapsulation, abstraction, inheritance, polymorphism, modular class structures, and clean code organization.',
        topics: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
        note: 'Implemented in C++, Java, and Python backend services.'
      },
      {
        name: 'Algorithm Design',
        badge: 'Algorithmic Thinking',
        desc: 'Sorting algorithms (Bubble, Selection, Insertion), linear & binary search, time & space complexity awareness (Big-O).',
        topics: ['Time Complexity', 'Binary Search', 'Sorting', 'Logic Flow'],
        note: 'Focus of engineering lab coursework and competitive problem sets.'
      }
    ],
    tools: [
      {
        name: 'Git & GitHub',
        badge: 'Version Control',
        desc: 'Branching, staging, committing, conflict resolution, repository management, and collaboration workflows.',
        topics: ['Branching', 'Commits', 'Pull Requests', 'Collab Workflows'],
        note: 'Profile active at github.com/kanveshraut1021-collab.'
      },
      {
        name: 'VS Code',
        badge: 'Daily Workspace',
        desc: 'Configuring extensions, integrated terminal, debugger setup, snippets, and linting.',
        topics: ['Debugging', 'Extensions', 'Terminal', 'Linting'],
        note: 'Daily development environment for all academic and web projects.'
      },
      {
        name: 'Vite',
        badge: 'Build Tooling',
        desc: 'Fast Hot Module Replacement (HMR), optimized bundling, modern ESM support, and proxy configuration.',
        topics: ['HMR', 'Build Bundles', 'Proxy Config', 'ESM'],
        note: 'Powers the instant preview and build of this React application.'
      }
    ],
    deployment: [
      {
        name: 'Vercel',
        badge: 'Cloud Hosting',
        desc: 'Instant git-integrated deployments, custom domains, edge routing, and continuous integration preview.',
        topics: ['Git Integration', 'Edge Network', 'Environment Vars', 'Zero-Config'],
        note: 'Live host for Sai Automobile and StockHub inventory system.'
      },
      {
        name: 'Netlify',
        badge: 'Static & JAMstack',
        desc: 'Continuous deployment from GitHub, form handling, CDN caching, and domain routing.',
        topics: ['Static Hosting', 'Continuous Deploy', 'Global CDN', 'Build Logs'],
        note: 'Live host for FarmEdge agricultural portal.'
      }
    ]
  };

  const [activeCategory, setActiveCategory] = useState('languages');
  const [selectedSkill, setSelectedSkill] = useState(skillsData.languages[0]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSelectedSkill(skillsData[catId][0]);
  };

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#FAF6F1]/50 border-b border-[#A67C64]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9B4B52] font-semibold">
            03 / Toolkit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A3028] mt-2">
            Technical <span className="text-[#9B4B52] italic">skills &amp; capabilities.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#78685D] mt-3">
            An interactive overview organized by discipline. Click any category or skill to inspect practical details. No inflated percentage meters.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#9B4B52] text-[#F5EEE7] shadow-sm'
                  : 'bg-[#FAF6F1] text-[#705044] border border-[#D6C4B5] hover:bg-[#EAE0D6]'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Interactive Master-Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Skill Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {skillsData[activeCategory].map((skill) => {
              const isSelected = selectedSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#FAF6F1] border-[#9B4B52] shadow-md ring-2 ring-[#9B4B52]/20 transform -translate-y-0.5'
                      : 'bg-[#FAF6F1]/70 border-[#D6C4B5] hover:bg-[#FFFFFF] hover:border-[#9B4B52]/40 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-bold text-lg text-[#4A3028]">{skill.name}</h3>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#EAE0D6] text-[#705044] font-medium">
                      {skill.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#78685D] line-clamp-2 leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Spotlight Panel */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF6F1] border-2 border-[#D6C4B5] rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D6C4B5]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#9B4B52] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Skill Inspector
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#9B4B52] text-[#F5EEE7] font-mono text-[10px] font-semibold">
                  {selectedSkill.badge}
                </span>
              </div>

              <h4 className="font-serif text-3xl font-bold text-[#4A3028] mb-3">
                {selectedSkill.name}
              </h4>

              <p className="text-sm text-[#78685D] leading-relaxed mb-5">
                {selectedSkill.desc}
              </p>

              <div className="mb-5">
                <span className="block font-mono text-[11px] text-[#705044] uppercase tracking-wider font-semibold mb-2">
                  Key Topics &amp; Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-[#EAE0D6] text-[#352923] text-xs font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#EAE0D6]/60 p-3.5 rounded-xl border border-[#A67C64]/20 text-xs text-[#705044] font-sans italic">
                💡 <strong className="not-italic text-[#352923]">Context:</strong> {selectedSkill.note}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
