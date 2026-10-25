import React from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#221714] text-[#F5EEE7] pt-16 pb-12 border-t border-[#382823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#382823]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9B4B52] text-[#F5EEE7] flex items-center justify-center font-serif text-lg font-bold">
                KR
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-[#F5EEE7]">
                  Kanvesh Raut
                </span>
                <span className="font-mono text-xs text-[#C5B6AB]">
                  Computer Engineering Student
                </span>
              </div>
            </div>

            <p className="font-serif italic text-base text-[#C58D91]">
              "Learning Today. Building Tomorrow."
            </p>

            <p className="text-xs text-[#C5B6AB] max-w-sm leading-relaxed">
              Second-year Computer Engineering student at G H Raisoni College of Engineering and Management, Pune. Focused on software engineering, web development, and problem solving.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C58D91] font-semibold block mb-4">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-medium text-[#C5B6AB]">
              <li><a href="#hero" className="hover:text-[#F5EEE7] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#F5EEE7] transition-colors">About Me</a></li>
              <li><a href="#journey" className="hover:text-[#F5EEE7] transition-colors">My Journey</a></li>
              <li><a href="#skills" className="hover:text-[#F5EEE7] transition-colors">Technical Skills</a></li>
              <li><a href="#projects" className="hover:text-[#F5EEE7] transition-colors">Featured Projects</a></li>
              <li><a href="#capabilities" className="hover:text-[#F5EEE7] transition-colors">Capabilities</a></li>
              <li><a href="#contact" className="hover:text-[#F5EEE7] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C58D91] font-semibold block mb-1">
              Connect Directly
            </span>
            
            <a
              href="mailto:kanveshraut9640@gmail.com"
              className="text-xs text-[#C5B6AB] hover:text-[#F5EEE7] flex items-center gap-2 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C58D91]" />
              <span>kanveshraut9640@gmail.com</span>
            </a>

            <a
              href="tel:+919075919023"
              className="text-xs text-[#C5B6AB] hover:text-[#F5EEE7] flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C58D91]" />
              <span>+91 9075919023</span>
            </a>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.linkedin.com/in/kanvesh-raut-2a5050407/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#2E201B] hover:bg-[#9B4B52] text-[#F5EEE7] flex items-center justify-center transition-colors border border-[#382823]"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/kanveshraut1021-collab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#2E201B] hover:bg-[#9B4B52] text-[#F5EEE7] flex items-center justify-center transition-colors border border-[#382823]"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#C5B6AB]">
          <div>
            © {CURRENT_YEAR} Kanvesh Raut. Built with React, Tailwind CSS, Python FastAPI &amp; PostgreSQL.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E201B] hover:bg-[#382823] text-[#F5EEE7] border border-[#382823] transition-colors cursor-pointer text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C58D91]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
