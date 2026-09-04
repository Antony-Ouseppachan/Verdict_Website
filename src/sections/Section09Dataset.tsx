import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedMetric } from '../components/AnimatedMetric';
import { Database, Split } from 'lucide-react';

export const Section09Dataset: React.FC = () => {
  return (
    <section id="dataset" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="09"
        tag="Corpus Integrity"
        title="PhreshPhish Dataset Architecture"
        subtitle="Evaluated across 666,315 strictly disjoint URLs ensuring absolute zero data leakage between training and testing splits."
      />

      {/* Top Leakage Integrity Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <AnimatedMetric
          value={666315}
          label="TOTAL CORPUS SIZE"
          subtext="Verified benchmark dataset"
          highlightColor="text-white"
        />
        <AnimatedMetric
          value={0}
          suffix="%"
          label="TRAIN/TEST OVERLAP"
          subtext="Strict zero-leakage guarantee"
          highlightColor="text-emerald-400"
        />
        <AnimatedMetric
          value={0}
          label="DUPLICATE URL ROWS"
          subtext="Deduplicated canonical index"
          highlightColor="text-emerald-400"
        />
        <AnimatedMetric
          value={100}
          suffix="%"
          label="DISJOINT INTEGRITY"
          subtext="Independently evaluated sets"
          highlightColor="text-cyan-400"
        />
      </div>

      {/* Visual Train vs Test Split Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
        
        {/* Card 1: Training Corpus Split */}
        <div className="cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-slate-200">
                  Training Split (498,255 URLs)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                74.77% OF CORPUS
              </span>
            </div>

            {/* Split Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400">BENIGN: 276,729 (55.54%)</span>
                <span className="text-red-400">PHISH: 221,526 (44.46%)</span>
              </div>
              <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: '55.54%' }} />
                <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: '44.46%' }} />
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                <div className="text-[10px] text-slate-400 uppercase">BENIGN SAMPLES</div>
                <div className="text-emerald-400 font-bold text-lg mt-0.5">276,729</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">Verified authentic gateways & web links</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-red-500/20">
                <div className="text-[10px] text-slate-400 uppercase">PHISHING SAMPLES</div>
                <div className="text-red-400 font-bold text-lg mt-0.5">221,526</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">Active malicious phishing targets</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-500">
            Balanced training distribution prevents majority-class prediction bias.
          </div>
        </div>

        {/* Card 2: Evaluation Test Split */}
        <div className="cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Split className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-slate-200">
                  Evaluation Test Split (168,060 URLs)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                25.23% OF CORPUS
              </span>
            </div>

            {/* Split Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400">BENIGN: 91,260 (54.30%)</span>
                <span className="text-red-400">PHISH: 76,800 (45.70%)</span>
              </div>
              <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: '54.30%' }} />
                <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: '45.70%' }} />
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                <div className="text-[10px] text-slate-400 uppercase">TEST BENIGN</div>
                <div className="text-emerald-400 font-bold text-lg mt-0.5">91,260</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">Held-out unseen legitimate URLs</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-red-500/20">
                <div className="text-[10px] text-slate-400 uppercase">TEST PHISHING</div>
                <div className="text-red-400 font-bold text-lg mt-0.5">76,800</div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">Held-out unseen malicious targets</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-mono text-emerald-400">
            &quot;Training and test URLs are disjoint in the evaluated dataset.&quot;
          </div>
        </div>

      </div>
    </section>
  );
};
