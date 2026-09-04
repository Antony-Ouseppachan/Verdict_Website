import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Lock, ShieldAlert, Check, HelpCircle, XCircle } from 'lucide-react';

export const Section03Motivation: React.FC = () => {
  return (
    <section id="motivation" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="03"
        tag="The Fundamental Flaw"
        title="HTTPS is not trust."
        subtitle="Transport layer security guarantees that your traffic cannot be intercepted in transit. It makes zero guarantees that the recipient is authentic."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: What HTTPS Proves (Transport) */}
        <div className="lg:col-span-5 cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-slate-200">
                  What TLS / HTTPS Proves
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                TRANSPORT LAYER
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">Encrypted Tunnel Active</div>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">
                    Traffic between browser and remote server cannot be snooped via Wi-Fi sniffing.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">Valid CA Signature</div>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">
                    Domain control validated via free automated Certificate Authorities (Let&apos;s Encrypt / ZeroSSL).
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">Green Padlock Rendered</div>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">
                    Browser displays standard security indicators, giving users false psychological safety.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-500">
            RESULT: Attackers obtain free TLS certificates in seconds for disposable phishing domains.
          </div>
        </div>

        {/* Center Divider / Gap Vector */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div className="font-mono text-xs text-amber-300 font-semibold uppercase tracking-wider">
            THE TRUST GAP
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Encryption ≠ Authenticity
          </p>
        </div>

        {/* Right Column: What HTTPS Cannot Determine (Application & Identity) */}
        <div className="lg:col-span-5 cyber-panel p-6 md:p-8 rounded-2xl border border-red-500/30 bg-red-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-red-500/20 mb-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-red-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-slate-200">
                  What HTTPS Leaves Unknown
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                CRITICAL UNKNOWNS
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-red-500/20">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">Merchant Identity?</div>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">
                    Unknown. Who legally operates the checkout page?
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-red-500/20">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">Form POST Destination?</div>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">
                    Unknown. Are card numbers submitted to Stripe/Razorpay or a rogue command-and-control server?
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-red-500/20">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">Payment Infrastructure Mismatch?</div>
                  <div className="text-xs text-slate-400 font-sans mt-0.5">
                    Unknown. Is the page impersonating a recognized financial gateway without authorization?
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs font-mono text-red-400">
            &quot;Transport security tells us the connection is encrypted. It does not tell us who should receive your payment.&quot;
          </div>
        </div>

      </div>
    </section>
  );
};
