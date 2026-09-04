import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ShieldAlert, AlertTriangle, ShieldCheck, FileSearch, XCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Section12Explainability: React.FC = () => {
  return (
    <section id="explainability" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="12"
        tag="Transparent Decision Defense"
        title="Explainable Verdict Telemetry"
        subtitle="Black-box machine learning fails cybersecurity audits. Every risk assessment comes with granular, auditable evidentiary signals."
      />

      <div className="cyber-panel p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950/90 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Hierarchical Evidence Breakdown
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Multimodal threat factor decomposition for audited incident response
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 font-semibold">
            AUDITABLE TELEMETRY ACTIVE
          </span>
        </div>

        {/* 3 Evidence Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: High Risk Signals */}
          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/40 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-red-500/30">
              <span className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                High Risk Signals
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                5 TRIGGERED
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-sans text-slate-200">
              {[
                'Payment form detected inside untrusted domain container',
                'Plain un-vaulted sensitive card & CVV inputs present in DOM',
                'Form destination routes to external unverified remote endpoint',
                'Provider/Domain mismatch: Brand assets do not match apex host',
                'Suspicious URL structure with high character n-gram entropy',
              ].map((sig, i) => (
                <div key={i} className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2: Medium Risk Signals */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/30">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Medium Risk Signals
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                3 OBSERVED
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-sans text-slate-200">
              {[
                'Multiple foreign remote scripts loaded from mixed CDNs',
                'Embedded iframe lacking standard sandbox security attributes',
                'Suspicious client-side event listener capturing keyboard buffers',
              ].map((sig, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 3: Safe Signals */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Verified Safe Signals
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                2 OBSERVED
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-sans text-slate-200">
              {[
                'HTTPS / TLS encrypted connection established',
                'Canonical domain structure conforms to RFC standard length',
              ].map((sig, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center font-mono text-xs text-slate-300">
          <span className="text-emerald-400 font-semibold">VERDICT GENERATED FROM MULTIPLE INDEPENDENT SIGNALS</span> • ZERO SINGLE-POINT FAILURES
        </div>
      </div>
    </section>
  );
};
