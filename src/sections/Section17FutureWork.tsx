import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { RESEARCH_ROADMAP } from '../data/projectData';
import { GitFork, CheckCircle2, Clock, Compass } from 'lucide-react';

export const Section17FutureWork: React.FC = () => {
  return (
    <section id="future" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="17"
        tag="Research Evolution"
        title="Engineering Roadmap & Future Work"
        subtitle="Transparent distinction between currently implemented models, active laboratory investigations, and planned ecosystem integrations."
      />

      <div className="cyber-panel p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950/90 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              8-Phase Architectural Evolution
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">4 IMPLEMENTED</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">1 IN PROGRESS</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">3 PLANNED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESEARCH_ROADMAP.map((item) => {
            const isImplemented = item.status === 'IMPLEMENTED';
            const isInProgress = item.status === 'IN_PROGRESS';
            
            let statusBadge = 'bg-slate-800 text-slate-400 border-slate-700';
            if (isImplemented) statusBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
            if (isInProgress) statusBadge = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';

            return (
              <div
                key={item.phase}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  isImplemented
                    ? 'bg-slate-900/60 border-emerald-500/20'
                    : isInProgress
                    ? 'bg-slate-900/60 border-cyan-500/30'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-75'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400">{item.phase}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded border uppercase font-semibold ${statusBadge}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-white">{item.name}</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 mt-4 flex items-center justify-between text-[11px] font-mono">
                  {isImplemented ? (
                    <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      VERIFIED BENCHMARK
                    </span>
                  ) : isInProgress ? (
                    <span className="text-cyan-400 flex items-center gap-1.5 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      ACTIVE LAB PIPELINE
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1.5 font-semibold">
                      <Compass className="w-3.5 h-3.5" />
                      PLANNED MILESTONE
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs font-mono text-slate-400">
          <span className="text-amber-400 font-semibold">[HONESTY GUARANTEE]</span> Computer Vision (Phase 06) is marked strictly as PLANNED research and is NOT claimed as currently implemented.
        </div>
      </div>
    </section>
  );
};
