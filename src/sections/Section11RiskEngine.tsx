import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Cpu, AlertOctagon } from 'lucide-react';

export const Section11RiskEngine: React.FC = () => {
  const [urlScore, setUrlScore] = useState<number>(92);
  const [htmlScore, setHtmlScore] = useState<number>(84);
  const [paymentScore, setPaymentScore] = useState<number>(95);

  // Calibrated Bayesian Fusion calculation
  // Payment intelligence receives highest weight for financial pages, with structural corroboration
  const calculateFusion = (u: number, h: number, p: number) => {
    const w_u = 0.25;
    const w_h = 0.35;
    const w_p = 0.40;

    // Linear combination + non-linear penalty for extreme payment attack surface
    let raw = u * w_u + h * w_h + p * w_p;
    if (p > 90 && (u > 80 || h > 80)) {
      raw = Math.min(100, raw * 1.08); // High confidence threat boost
    }
    return Math.round(raw);
  };

  const finalRisk = calculateFusion(urlScore, htmlScore, paymentScore);

  let verdict = {
    badge: 'CRITICAL THREAT',
    message: 'DO NOT ENTER PAYMENT INFORMATION',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/30',
    status: 'HIGH_RISK',
  };

  if (finalRisk < 30) {
    verdict = {
      badge: 'VERIFIED SAFE',
      message: 'AUTHENTIC PAYMENT GATEWAY SIGNALS VERIFIED',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      status: 'SAFE',
    };
  } else if (finalRisk < 70) {
    verdict = {
      badge: 'CAUTION / SUSPICIOUS',
      message: 'UNVERIFIED MERCHANT ROUTING DETECTED',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      status: 'SUSPICIOUS',
    };
  }

  return (
    <section id="risk-engine" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="11"
        tag="The Decision Room"
        title="Risk Fusion Engine"
        subtitle="Calibrated multimodal aggregation combining independent model confidence weights into a resilient, tamper-resistant financial verdict."
      />

      <div className="cyber-panel p-6 md:p-10 rounded-3xl border border-slate-700/80 bg-slate-950/95 shadow-[0_0_60px_rgba(0,0,0,0.9)] mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                Multimodal Fusion Decision Chamber
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Interactive weight calibration & real-time threat calculation
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
            ENGINE: BAYESIAN RISK FUSION V2
          </span>
        </div>

        {/* 3 Model Inputs + Live Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          
          {/* URL Intelligence Input */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-cyan-400 font-semibold uppercase">01 URL Intelligence</span>
              <span className="text-white font-bold text-base">{urlScore}%</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={urlScore}
              onChange={(e) => setUrlScore(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />

            <div className="text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Weight: 25%</span>
              <span className="text-cyan-300">{urlScore > 50 ? 'Threat Signal' : 'Benign Signal'}</span>
            </div>
          </div>

          {/* HTML Intelligence Input */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-emerald-400 font-semibold uppercase">02 HTML Intelligence</span>
              <span className="text-white font-bold text-base">{htmlScore}%</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={htmlScore}
              onChange={(e) => setHtmlScore(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />

            <div className="text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Weight: 35%</span>
              <span className="text-emerald-300">{htmlScore > 50 ? 'DOM Anomaly' : 'Clean DOM'}</span>
            </div>
          </div>

          {/* Payment Intelligence Input */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-amber-400 font-semibold uppercase">03 Payment Intelligence</span>
              <span className="text-white font-bold text-base">{paymentScore}%</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={paymentScore}
              onChange={(e) => setPaymentScore(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />

            <div className="text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Weight: 40%</span>
              <span className="text-amber-300">{paymentScore > 50 ? 'Financial Trap' : 'Authorized Vault'}</span>
            </div>
          </div>

        </div>

        {/* Fusion Verdict Output Card */}
        <div className={`p-6 md:p-8 rounded-2xl border ${verdict.bg} transition-all`}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <AlertOctagon className={`w-5 h-5 ${verdict.color}`} />
              <span className={`font-mono text-xs font-bold uppercase tracking-wider ${verdict.color}`}>
                CALCULATED PAYMENT RISK: {finalRisk}%
              </span>
            </div>
            <span className={`font-mono text-xs px-3 py-1 rounded-full font-bold uppercase ${verdict.bg} ${verdict.color}`}>
              {verdict.badge}
            </span>
          </div>

          <h4 className={`font-display text-2xl md:text-3xl font-black ${verdict.color} uppercase tracking-tight`}>
            &quot;{verdict.message}&quot;
          </h4>

          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-slate-400">
            <div>FUSION LOGIC: Multi-vector Joint Probability</div>
            <div>DECISION TIME: Real-Time Execution</div>
            <div className="text-slate-300">INTERCEPTION: Pre-Submission Barrier</div>
          </div>
        </div>
      </div>
    </section>
  );
};
