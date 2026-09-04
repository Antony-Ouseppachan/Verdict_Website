import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { DATASET_KEYWORD_STATS } from '../data/projectData';
import { Search, Info } from 'lucide-react';

export const Section08DatasetScan: React.FC = () => {
  const totalRows = 498255;

  return (
    <section id="dataset-scan" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="08"
        tag="Empirical Dataset Evidence"
        title="Why payment-specific analysis matters."
        subtitle="Empirical frequency scan across 498,255 training rows revealing the prevalence of financial, gateway, and credential-harvesting tokens in real-world phishing corpus."
      />

      <div className="cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/90 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Sampled Dataset Analysis
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Keyword token occurrences within PhreshPhish training corpus (498,255 URLs)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
              SCOPE: 498,255 TRAINING ROWS
            </span>
          </div>
        </div>

        {/* Scientific Integrity Note */}
        <div className="my-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300 font-sans">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white font-mono uppercase">[METHODOLOGICAL NOTE] </span>
            These counts represent keyword string occurrences within the raw evaluated training dataset. They illustrate the high frequency of financial harvesting targets (such as OTP, UPI, Stripe, PayPal) inside modern phishing campaigns, rather than asserting every occurrence is an isolated independent merchant page.
          </div>
        </div>

        {/* Visual Keyword Density Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATASET_KEYWORD_STATS.map((item) => {
            const maxVal = DATASET_KEYWORD_STATS[0].count;
            const ratio = (item.count / maxVal) * 100;
            const percentOfTotal = ((item.count / totalRows) * 100).toFixed(2);

            let badgeColor = 'bg-slate-800 text-slate-300';
            if (item.type === 'method') badgeColor = 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
            if (item.type === 'credential') badgeColor = 'bg-red-500/20 text-red-300 border border-red-500/30';
            if (item.type === 'provider') badgeColor = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';

            return (
              <div key={item.keyword} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-white uppercase">
                      &quot;{item.keyword}&quot;
                    </span>
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${badgeColor}`}>
                      {item.type}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-400">
                    {item.count.toLocaleString()}
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full"
                    style={{ width: `${Math.max(ratio, 4)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Occurrences in training corpus</span>
                  <span>{percentOfTotal}% frequency</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <div>TOP HARVESTING TARGETS: UPI (12,311) • OTP (11,882) • STRIPE (7,289) • PAYPAL (7,365)</div>
          <div className="text-emerald-400">VERIFIED DATASET FREQUENCIES</div>
        </div>
      </div>
    </section>
  );
};
