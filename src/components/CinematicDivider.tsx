import React from 'react';

interface CinematicDividerProps {
  label?: string;
  index?: string;
}

export const CinematicDivider: React.FC<CinematicDividerProps> = ({ label, index }) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8 flex items-center justify-between pointer-events-none opacity-80">
      {/* Left Laser Line with Gradient Fade */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-emerald-500/40 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </div>

      {/* Center Cinematic Node */}
      <div className="px-6 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        {index && (
          <span className="font-mono text-[10px] tracking-widest text-emerald-400/90 uppercase font-semibold">
            SEC_{index}
          </span>
        )}
        {label && (
          <>
            <span className="text-slate-700 font-mono text-[10px]">•</span>
            <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
              {label}
            </span>
          </>
        )}
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
      </div>

      {/* Right Laser Line with Gradient Fade */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-slate-800 to-emerald-500/40 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </div>
    </div>
  );
};
