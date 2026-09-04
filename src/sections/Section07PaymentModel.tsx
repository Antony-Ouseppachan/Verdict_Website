import React from 'react';
import { PAYMENT_FEATURES_LIST } from '../data/projectData';
import { CreditCard, Sparkles, Scan, Lock, AlertOctagon } from 'lucide-react';

export const Section07PaymentModel: React.FC = () => {

  return (
    <section id="payment-ai" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full relative">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Headline Focus */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          The Core Differentiator
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.1]">
          We don&apos;t just ask: <br />
          <span className="text-slate-400">&quot;Is this URL safe?&quot;</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-300">
            We ask: &quot;Should you trust this page with your money?&quot;
          </span>
        </h2>

        <p className="mt-6 text-slate-300 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
          Generic cybersecurity models look for typical phishing heuristics. Our Payment Intelligence Model maps the entire financial attack surface—from plain CVV inputs to unauthorized provider impersonation.
        </p>
      </div>

      {/* Real-time Payment Attack Surface Interactive Visualizer */}
      <div className="cyber-panel p-6 md:p-8 rounded-3xl border border-emerald-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(16,185,129,0.1)] mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Payment Attack Surface Extraction Map
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Multimodal heuristic scanning of financial harvesting vectors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">VECTOR STATUS:</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              30 FINANCIAL SIGNALS ACTIVE
            </span>
          </div>
        </div>

        {/* Attack Surface Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          
          {/* Surface Category 1: Sensitive Credential Harvesters */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5" />
                Plain Credential Harvesters
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400">
                CRITICAL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Detects un-tokenized PAN, CVV, expiry, and OTP requested directly inside raw DOM rather than inside an authorized PCI-DSS vault.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-800 font-mono text-[11px] text-slate-300">
              <div className="flex items-center justify-between">
                <span>card_cvv_combo</span>
                <span className="text-red-400">HIGH EXPLOIT</span>
              </div>
              <div className="flex items-center justify-between">
                <span>sensitive_payment_combo</span>
                <span className="text-red-400">FULL HARVEST</span>
              </div>
              <div className="flex items-center justify-between">
                <span>otp_payment_combo</span>
                <span className="text-amber-400">2FA INTERCEPT</span>
              </div>
            </div>
          </div>

          {/* Surface Category 2: Gateway & Provider Impersonation */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                Provider Mismatch Engine
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                HIGH THREAT
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Cross-references rendered branding (Stripe, Razorpay, PayPal logos) against underlying host domain and form action destinations.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-800 font-mono text-[11px] text-slate-300">
              <div className="flex items-center justify-between">
                <span>provider_mismatch</span>
                <span className="text-amber-400">BRAND SPOOF</span>
              </div>
              <div className="flex items-center justify-between">
                <span>form_domain_count</span>
                <span className="text-cyan-400">CROSS-ORIGIN</span>
              </div>
              <div className="flex items-center justify-between">
                <span>external_form</span>
                <span className="text-red-400">DATA EXFIL</span>
              </div>
            </div>
          </div>

          {/* Surface Category 3: UPI & Modern Indian FinTech Signatures */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                UPI & Payment Rail Vectors
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                SPECIALIZED
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Identifies modern UPI handle collectors (@okhdfc, @okaxis, VPA handles, QR intent hooks) and mobile checkout intercept scripts.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-800 font-mono text-[11px] text-slate-300">
              <div className="flex items-center justify-between">
                <span>upi_input</span>
                <span className="text-cyan-400">VPA CAPTURE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>iframe_domain_count</span>
                <span className="text-slate-300">VAULT CHECK</span>
              </div>
              <div className="flex items-center justify-between">
                <span>eval_count / base64_count</span>
                <span className="text-amber-400">OBFUSCATION</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Comprehensive Features Table */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
            EXTRACTED PAYMENT VECTOR DICTIONARY (30 FEATURES)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-2">
            {PAYMENT_FEATURES_LIST.map((feat) => (
              <div key={feat.name} className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 flex items-start justify-between gap-2">
                <div>
                  <div className="font-mono text-xs font-semibold text-emerald-400">{feat.name}</div>
                  <div className="text-[10px] text-slate-400 font-sans mt-0.5">{feat.desc}</div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                  {feat.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
