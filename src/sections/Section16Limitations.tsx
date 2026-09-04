import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { AlertCircle } from 'lucide-react';

export const Section16Limitations: React.FC = () => {
  const limitations = [
    {
      title: 'Static vs. Runtime Evasion',
      desc: 'Static HTML vectoring cannot observe delayed payload hydration or polymorphic JavaScript evaluated after human interaction.',
      mitigation: 'Addressed in Phase 05 via headless browser event execution.',
    },
    {
      title: 'Complex Multi-Vendor Merchant Stacks',
      desc: 'Legitimate international e-commerce stores frequently use third-party tracking CDNs, custom proxy tunnels, and regional subdomains that trigger heuristic warnings.',
      mitigation: 'Requires domain reputation historical telemetry and whitelisting.',
    },
    {
      title: 'Provider Detection vs. Cryptographic Verification',
      desc: 'Detecting Stripe or Razorpay SDK scripts is not proof of authorized merchant account status—fraudulent accounts can temporarily register on legitimate payment gateways.',
      mitigation: 'Requires deeper integration with gateway signature APIs.',
    },
    {
      title: 'Benchmark Corpus vs. Zero-Day Drift',
      desc: 'High benchmark performance (96% accuracy on PhreshPhish) reflects historical phishing distributions. Threat actors continuously evolve obfuscation techniques.',
      mitigation: 'Continuous active-learning retraining pipelines required in production.',
    },
    {
      title: 'HTTPS Certificate Proliferation',
      desc: 'Automated free CAs issue valid SSL certificates to disposable phishing domains in seconds, rendering transport-level encryption insufficient for authenticity.',
      mitigation: 'Core justification for our multimodal architectural stack.',
    },
    {
      title: 'Client-Side Resource Constraints',
      desc: 'Running heavy neural networks inside browser tabs introduces battery and memory overhead on low-end mobile devices.',
      mitigation: 'Linear SVM and tree-based models chosen specifically for microsecond inference.',
    },
  ];

  return (
    <section id="limitations" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="16"
        tag="Engineering Honesty"
        title="System Limitations & Boundary Conditions"
        subtitle="True cybersecurity engineering requires rigorous transparency regarding threat models, evasion risks, and operational trade-offs."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {limitations.map((item, index) => (
          <div key={item.title} className="cyber-panel p-6 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Boundary 0{index + 1}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                  TRADE-OFF
                </span>
              </div>

              <h4 className="font-display font-bold text-base text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 font-mono text-[11px] text-slate-300">
              <span className="text-slate-500 uppercase">ENGINEERING RATIONALE: </span>
              <span className="text-emerald-400">{item.mitigation}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs font-mono text-slate-400">
        &quot;Model performance on benchmark data does not guarantee identical real-world performance without ongoing threat intelligence.&quot;
      </div>
    </section>
  );
};
