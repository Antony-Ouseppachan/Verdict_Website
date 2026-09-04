import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Clock, ShieldAlert, Cpu, Zap, User, Globe, Code } from 'lucide-react';

export const Section13UserFlow: React.FC = () => {
  const steps = [
    { step: '01', title: 'Payment Link Received', time: 'T+0ms', desc: 'Consumer clicks payment request from SMS, email, or invoice.', icon: User },
    { step: '02', title: 'Page Navigation', time: 'T+40ms', desc: 'Browser initiates HTTP handshake and receives initial response.', icon: Globe },
    { step: '03', title: 'Pre-Render Signal Capture', time: 'T+75ms', desc: 'System extracts URL tokens, DOM structure, forms & scripts.', icon: Code },
    { step: '04', title: 'Parallel Multimodal AI', time: 'T+110ms', desc: 'URL, HTML & Payment models execute concurrent inference.', icon: Cpu },
    { step: '05', title: 'Risk Fusion Evaluation', time: 'T+135ms', desc: 'Multimodal engine calculates joint threat probability.', icon: Zap },
    { step: '06', title: 'Pre-Submission Barrier', time: 'INTERCEPT', desc: 'Critical alert rendered BEFORE user types card, CVV, or OTP.', icon: ShieldAlert },
  ];

  return (
    <section id="user-flow" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="13"
        tag="Runtime Execution Timeline"
        title="Real-World Interception Timeline"
        subtitle="Operating before sensitive financial credentials can ever be typed into a rogue input field."
      />

      <div className="cyber-panel p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950/90 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              End-to-End Interception Pipeline
            </span>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            ZERO CONSUMER FRICTION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-emerald-400 font-bold">{item.step}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{item.time}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-semibold text-sm text-white">{item.title}</h4>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>PIPELINE: STREAMING INFERENCE ARCHITECTURE</span>
          <span className="text-emerald-400">INTERCEPTION GUARANTEE: PRE-KEYSTROKE</span>
        </div>
      </div>
    </section>
  );
};
