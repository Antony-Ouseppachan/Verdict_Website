import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ShieldCheck, AlertTriangle, Eye, Lock, User, Link2, CreditCard, Keyboard, ShieldAlert } from 'lucide-react';

export const Section02Problem: React.FC = () => {
  const [inspectMode, setInspectMode] = useState(false);

  const THREAT_STEPS = [
    { step: '01', title: 'Target User', desc: 'Receives payment link via SMS/Email', icon: User, alert: false },
    { step: '02', title: 'Deceptive Link', desc: 'Clicks high-urgency checkout URL', icon: Link2, alert: false },
    { step: '03', title: 'Payment UI', desc: 'Visual replica rendered perfectly', icon: CreditCard, alert: false },
    { step: '04', title: 'Credential Input', desc: 'User enters PAN, Expiry, CVV, OTP', icon: Keyboard, alert: true },
    { step: '05', title: 'Direct Drain', desc: 'Credentials exfiltrated & funds drained', icon: ShieldAlert, alert: true },
  ];

  return (
    <section id="problem" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="02"
        tag="The Threat Paradigm"
        title="Modern phishing doesn't look malicious."
        subtitle="To human eyes, a cloned payment page is indistinguishable from the authentic gateway. The compromise happens silently under the surface."
      />

      {/* Threat Chain Visual Flow */}
      <div className="cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 mb-16">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
          <span>THREAT EXECUTION CHAIN</span>
          <span className="text-slate-600">—</span>
          <span className="text-red-400 font-semibold">PRE-SUBMISSION VULNERABILITY</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
          {THREAT_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`p-4 rounded-xl border relative transition-all ${
                  item.alert
                    ? 'bg-red-500/10 border-red-500/30 text-slate-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-500">{item.step}</span>
                  <div className={`p-1.5 rounded-lg ${item.alert ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-display font-semibold text-sm text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 font-sans">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Visual Comparison: Legitimate vs Fake */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">
              Visual Surface vs. Hidden Infrastructure
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Toggle deep telemetry to reveal malicious signals invisible to regular consumers.
            </p>
          </div>

          {/* Deep Inspection Toggle */}
          <button
            onClick={() => setInspectMode(!inspectMode)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold cursor-pointer transition-all ${
              inspectMode
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
                : 'bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{inspectMode ? 'SURFACE VIEW' : 'ACTIVATE DEEP X-RAY INSPECTION'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card A: Legitimate Gateway */}
          <div className="cyber-panel rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-950/80">
            <div className="px-4 py-3 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs font-semibold text-emerald-300 uppercase">
                  Authentic Gateway (Razorpay Checkout)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                VERIFIED HOST
              </span>
            </div>

            {/* URL Simulation */}
            <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">https://api.razorpay.com</span>
              <span className="text-slate-500">/v1/checkout/public</span>
            </div>

            {/* Content Mockup */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="text-xs text-slate-400 font-mono">MERCHANT</div>
                  <div className="font-semibold text-white">Acme Corp Cloud Services</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">AMOUNT</div>
                  <div className="font-bold text-emerald-400">$49.00 USD</div>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-3 opacity-90">
                <div>
                  <label className="text-[11px] font-mono text-slate-400">CARD NUMBER</label>
                  <div className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-300">
                    4242 •••• •••• 4242
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">EXPIRY</label>
                    <div className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-300">
                      12 / 28
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">CVV</label>
                    <div className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-300">
                      •••
                    </div>
                  </div>
                </div>
              </div>

              {/* Deep Inspection Layer */}
              {inspectMode && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs font-mono space-y-2 animate-fadeIn">
                  <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    AUTHENTIC SIGNAL VERIFICATION
                  </div>
                  <div className="text-slate-300 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Hosted on verified ASN: AS13335 (Cloudflare / Razorpay)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>PCI-DSS Tokenized Iframe container isolates PAN</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Form target: https://api.razorpay.com/v1/payments</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Zero cross-origin mismatch detected</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card B: Deceptive Phishing Gateway */}
          <div className="cyber-panel rounded-2xl overflow-hidden border border-red-500/40 bg-slate-950/80 relative">
            <div className="px-4 py-3 bg-red-950/40 border-b border-red-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="font-mono text-xs font-semibold text-red-300 uppercase">
                  Deceptive Clone (Malicious Impersonator)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                CRITICAL THREAT
              </span>
            </div>

            {/* URL Simulation */}
            <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-red-400 font-medium">https://razorpay-secure-checkout.site</span>
              <span className="text-slate-500">/pay/session</span>
            </div>

            {/* Content Mockup */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="text-xs text-slate-400 font-mono">MERCHANT</div>
                  <div className="font-semibold text-white">Acme Corp Cloud Services</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">AMOUNT</div>
                  <div className="font-bold text-emerald-400">$49.00 USD</div>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-3 opacity-90">
                <div>
                  <label className="text-[11px] font-mono text-slate-400">CARD NUMBER</label>
                  <div className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-300">
                    4242 •••• •••• 4242
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">EXPIRY</label>
                    <div className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-300">
                      12 / 28
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">CVV</label>
                    <div className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-300">
                      •••
                    </div>
                  </div>
                </div>
              </div>

              {/* Deep Inspection Layer */}
              {inspectMode ? (
                <div className="mt-4 p-4 rounded-xl bg-red-950/30 border border-red-500/40 text-xs font-mono space-y-2 animate-fadeIn">
                  <div className="text-red-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    DEEP THREAT VECTORS EXPOSED
                  </div>
                  <div className="text-slate-300 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 text-red-300">
                      <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                      <span>Provider Mismatch: Claims Razorpay, hosted on .site disposable host</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-red-300">
                      <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                      <span>Plain un-vaulted input: Direct credential harvesting in DOM</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-red-300">
                      <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                      <span>Form destination: http://185.220.101.5/exfil.php (Foreign IP)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-red-300">
                      <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                      <span>Obfuscated script: Base64 payload listening on keyup</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-3 rounded-xl bg-slate-900/50 border border-dashed border-slate-700 text-center text-xs font-mono text-slate-400">
                  Surface appears identical. Click &quot;Activate Deep X-Ray Inspection&quot; above to reveal anomalies.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
