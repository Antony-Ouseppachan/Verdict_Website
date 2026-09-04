import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
        <nav className="relative rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-slate-700/60 bg-[#070a12]/85 backdrop-blur-2xl">

          {/* Brand & Emblem */}
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer group bg-transparent border-0 p-0 text-left outline-none"
            onClick={() => onNavigate('hero')}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-105 transition-all shadow-[0_0_14px_rgba(16,185,129,0.25)]">
              <VerdictLogo size={18} />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-sm tracking-wider text-white uppercase group-hover:text-emerald-300 transition-colors">
                Verdict
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links with Magnetic Floating Active Pill */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/80">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap z-10 ${
                    isActive
                      ? 'text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white font-medium'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-emerald-400 rounded-full shadow-[0_0_14px_rgba(16,185,129,0.5)] -z-10"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Direct Jump to Dual Verification Demo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('demo')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/35 hover:bg-emerald-500/25 hover:border-emerald-400/70 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
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
