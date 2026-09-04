import React from 'react';
import { VerdictLogo } from '../components/VerdictLogo';
import { ArrowUp } from 'lucide-react';

interface Section19Props {
  onScrollToTop: () => void;
}

export const Section19FinalStatement: React.FC<Section19Props> = ({ onScrollToTop }) => {
  return (
    <footer className="relative flex flex-col justify-between py-4 sm:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full border-t border-slate-900 bg-[#040609]">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="text-center my-auto py-12">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs uppercase tracking-wider mb-8">
          <VerdictLogo size={16} />
          <span>Verdict Payment Security Architecture</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[1.05] max-w-5xl mx-auto">
          Before you pay, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-300">
            verify who you are paying.
          </span>
        </h2>

        <p className="mt-8 text-slate-400 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto">
          AI-assisted payment gateway authenticity analysis.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onScrollToTop}
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-emerald-400" />
            <span>RETURN TO TOP</span>
          </button>
        </div>
      </div>

      {/* Footer Meta & Academic Rigor */}
      <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <VerdictLogo size={18} />
          <span className="text-slate-300 font-semibold">VERDICT RESEARCH</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <span>Research</span>
          <span>•</span>
          <span>Machine Learning</span>
          <span>•</span>
          <span>Web Security</span>
          <span>•</span>
          <span>FinTech</span>
        </div>

        <div>
          TRAINED ON PHRESHPHISH (666K URLs) • LINEAR SVM + XGBOOST STACK
        </div>
      </div>

    </footer>
  );
};
