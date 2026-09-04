import React, { useState, useEffect } from 'react';
import { VerdictLogo } from './VerdictLogo';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'problem', label: 'Threat Model' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'url-ai', label: 'URL Model' },
  { id: 'html-ai', label: 'HTML Model' },
  { id: 'payment-ai', label: 'Payment AI' },
  { id: 'risk-engine', label: 'Risk Fusion' },
  { id: 'performance', label: 'Metrics' },
  { id: 'future', label: 'Roadmap' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      setScrolled(winScroll > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Island Navigation */}
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300 ${scrolled ? 'top-3' : 'top-4'
        }`}>
        <nav className="relative rounded-full px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-[0_16px_40px_rgba(0,0,0,0.65)] border border-slate-700/60 bg-[#070a12]/85 backdrop-blur-2xl">

          {/* Brand & Emblem */}
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer group bg-transparent border-0 p-0 text-left outline-none"
            onClick={() => onNavigate('hero')}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-105 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <VerdictLogo size={18} />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-sm tracking-wider text-white uppercase group-hover:text-emerald-300 transition-colors">
                Verdict
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/80">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_14px_rgba(16,185,129,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 font-medium'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Direct Jump to Dual Verification Demo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('demo')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400/60 transition-all cursor-pointer"
            >
              <span>Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </nav>
      </header>
    </>
  );
};
