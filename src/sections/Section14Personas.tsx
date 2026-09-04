import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Users, Building2, ShoppingBag, Shield, Globe } from 'lucide-react';

export const Section14Personas: React.FC = () => {
  const personas = [
    {
      title: 'Consumers & End-Users',
      role: 'Direct Payment Defense',
      desc: 'Prevent direct financial loss and credential theft when paying via SMS links, QR codes, or unfamiliar merchant checkout portals.',
      icon: Users,
      benefit: 'Immediate pre-submission warning alerts',
    },
    {
      title: 'Banks & FinTech Security',
      role: 'Customer Protection Architecture',
      desc: 'Analyze reported malicious payment gateways targeting account holders, intercepting fraudulent UPI handles and card harvesters.',
      icon: Building2,
      benefit: 'Reduced chargebacks & fraud investigation costs',
    },
    {
      title: 'Payment Gateway Platforms',
      role: 'Brand Impersonation Intelligence',
      desc: 'Detect unauthorized rogue web servers scraping and mimicking official checkout widgets and logos without valid API credentials.',
      icon: Shield,
      benefit: 'Rapid brand defense and malicious host takedowns',
    },
    {
      title: 'E-Commerce Merchants',
      role: 'Checkout Trust Infrastructure',
      desc: 'Ensure embedded third-party payment widgets maintain integrity against malicious JavaScript injection and form redirection attacks.',
      icon: ShoppingBag,
      benefit: 'Protected merchant reputation & buyer trust',
    },
    {
      title: 'Browser & Endpoint Security',
      role: 'Zero-Day Threat Extension',
      desc: 'Integrate specialized financial heuristics into next-generation browser telemetry beyond standard blacklists.',
      icon: Globe,
      benefit: 'Pre-emptive zero-day phishing interception',
    },
  ];

  return (
    <section id="personas" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="14"
        tag="Stakeholder Value"
        title="Who is this built for?"
        subtitle="Addressing critical vulnerabilities across every tier of the modern digital payments ecosystem."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="cyber-panel p-6 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4 flex flex-col justify-between group hover:border-slate-700 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                    ECOSYSTEM TIER
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white">{p.title}</h3>
                <div className="font-mono text-xs text-emerald-400">{p.role}</div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{p.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 font-mono text-[11px] text-slate-300 flex items-center justify-between">
                <span>IMPACT:</span>
                <span className="text-cyan-300 font-semibold">{p.benefit}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-xs font-mono text-slate-500">
        NOTE: Conceptual ecosystem alignment. Does not claim active commercial partnerships.
      </div>
    </section>
  );
};
