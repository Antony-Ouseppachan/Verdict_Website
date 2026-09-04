import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { MessageSquare, ShieldAlert } from 'lucide-react';

export const Section15UseCase: React.FC = () => {
  return (
    <section id="use-case" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="15"
        tag="Live Incident Anatomy"
        title="Walkthrough: The Fake Invoice Intercept"
        subtitle="Deconstructing step-by-step how our multimodal engine neutralizes an urgent checkout spoof before funds are drained."
      />

      <div className="cyber-panel p-6 md:p-10 rounded-3xl border border-red-500/30 bg-slate-950/95 shadow-[0_0_60px_rgba(239,68,68,0.08)] mb-12">
        
        {/* Top Scenario Banner */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 mb-8">
          <MessageSquare className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-slate-300">
            <span className="font-mono font-bold text-amber-400 uppercase">[INCOMING ATTACK VECTOR] </span>
            Target user receives urgent SMS: <span className="text-white font-mono">&quot;Your package delivery order #9482 is pending customs clearance. Complete $3.50 payment immediately: https://dhl-express-clearance-secure.top/pay&quot;</span>
          </div>
        </div>

        {/* 3 Step Stage Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">STAGE 01</span>
              <span className="text-emerald-400">VISUAL REPLICA</span>
            </div>
            <h4 className="font-display font-semibold text-white">Visual Deception</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              The victim arrives at a pixel-perfect checkout UI rendering DHL logos, verified SSL lock, and standard card payment forms.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">STAGE 02</span>
              <span className="text-cyan-400">BACKGROUND SCAN</span>
            </div>
            <h4 className="font-display font-semibold text-white">Multimodal Dissection</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Engine extracts 56 HTML vectors and isolates the form action: destination is routed to an unverified Russian bulletproof host.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/40 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-red-400 font-bold">STAGE 03</span>
              <span className="text-red-400">INTERCEPTED</span>
            </div>
            <h4 className="font-display font-semibold text-white">Pre-Submission Block</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Critical warning blocks the viewport before user can type their CVV or OTP. Zero credentials transmitted.
            </p>
          </div>

        </div>

        {/* The Interception Banner Output */}
        <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/50 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            THREAT DETECTED • PAYMENT HARVESTING INTERCEPTED
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
            &quot;THIS PAYMENT PAGE DOES NOT PROVIDE SUFFICIENT EVIDENCE OF AUTHENTICITY.&quot;
          </h3>

          <p className="text-xs font-mono text-slate-300 max-w-2xl mx-auto">
            Form action foreign IP: 194.87.144.29 • Provider mismatch: Branded as DHL / Visa • Plain CVV input trap
          </p>
        </div>

      </div>
    </section>
  );
};
