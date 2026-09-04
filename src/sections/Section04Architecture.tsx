import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Globe, Code2, CreditCard, Cpu, Activity, Layers } from 'lucide-react';

export const Section04Architecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('fusion');

  const nodes = {
    url: {
      title: '01 URL Intelligence Model',
      model: 'Linear Support Vector Machine (Linear SVM)',
      features: 'TF-IDF character n-grams + lexical metrics (entropy, subdomains, digit frequency)',
      samples: '498,255 Train / 168,060 Test',
      metric: '96% Accuracy | 0.9923 ROC-AUC',
      desc: 'Performs zero-latency lexical and structural parsing of the target link before full DOM rendering.',
    },
    html: {
      title: '02 HTML Intelligence Model',
      model: 'Gradient Boosted Trees (XGBoost)',
      features: '56 Deep DOM structural, external domain ratios, resource, and script security vectors',
      samples: '498,255 Train / 168,060 Test',
      metric: '96% Accuracy | 0.9910 ROC-AUC',
      desc: 'X-rays the DOM structure to detect anomalous external form destinations, remote script injections, and iframe hijacking.',
    },
    payment: {
      title: '03 Payment Intelligence Model',
      model: 'Specialized Payment Feature XGBoost',
      features: 'Card, CVV, Expiry, UPI, OTP inputs, form domain mismatches, plain credential traps',
      samples: 'Keyword-targeted PhreshPhish & Gateway Corpus',
      metric: 'High Precision Financial Harvest Detection',
      desc: 'Dedicated financial threat pipeline asking: Should sensitive money or credentials ever be entered on this page?',
    },
    fusion: {
      title: '04 Risk Fusion Engine',
      model: 'Bayesian Multimodal Evidence Combiner',
      features: 'Calibrated joint threat probability combining URL, HTML, and Payment vectors',
      samples: 'Real-time Multimodal Inference',
      metric: 'Comprehensive Explainable Risk Score (0-100)',
      desc: 'The central decision layer. Combines independent confidence signals so single-model blindspots cannot trigger false verdicts.',
    },
  };

  return (
    <section id="architecture" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="04"
        tag="Multimodal Pipeline"
        title="Multimodal AI Architecture"
        subtitle="One signal can be fooled. Independent specialized models analyzing distinct attack surfaces produce resilient verdicts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Architectural Diagram */}
        <div className="lg:col-span-7 cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/80">
          
          {/* Top Node: Raw Payment Page */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 text-center max-w-md mx-auto relative group hover:border-emerald-500/50 transition-all">
            <div className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider">INPUT STREAM</div>
            <div className="font-display font-bold text-white text-base mt-0.5 flex items-center justify-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Target Webpage & Payment Context
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">Raw URL • DOM Tree • Form Targets • Remote Scripts</div>
          </div>

          {/* Flow Particles to 3 Modules */}
          <div className="my-4 flex items-center justify-center">
            <div className="w-[80%] h-8 border-b-2 border-l-2 border-r-2 border-slate-700/80 rounded-b-xl relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            </div>
          </div>

          {/* 3 Model Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Model 1: URL */}
            <button
              onClick={() => setSelectedNode('url')}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                selectedNode === 'url'
                  ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  96% ACC
                </span>
              </div>
              <div className="font-display font-semibold text-sm text-white">URL Model</div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">Linear SVM</div>
            </button>

            {/* Model 2: HTML */}
            <button
              onClick={() => setSelectedNode('html')}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                selectedNode === 'html'
                  ? 'bg-emerald-500/15 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  96% ACC
                </span>
              </div>
              <div className="font-display font-semibold text-sm text-white">HTML Model</div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">56-Vector XGBoost</div>
            </button>

            {/* Model 3: Payment */}
            <button
              onClick={() => setSelectedNode('payment')}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                selectedNode === 'payment'
                  ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  SPECIALIZED
                </span>
              </div>
              <div className="font-display font-semibold text-sm text-white">Payment Model</div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">Attack Surface Map</div>
            </button>

          </div>

          {/* Convergence Lines */}
          <div className="my-4 flex items-center justify-center">
            <div className="w-[80%] h-8 border-t-2 border-l-2 border-r-2 border-slate-700/80 rounded-t-xl relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
            </div>
          </div>

          {/* Bottom Node: Risk Fusion Engine */}
          <button
            onClick={() => setSelectedNode('fusion')}
            className={`w-full p-5 rounded-xl border text-center cursor-pointer transition-all ${
              selectedNode === 'fusion'
                ? 'bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-emerald-950/40 border-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span className="font-display font-bold text-base">Risk Fusion Engine</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                DECISION LAYER
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Joint Probability Calibrator → Explainable Authenticity Assessment
            </div>
          </button>

        </div>

        {/* Right Side: Deep Inspector Panel */}
        <div className="lg:col-span-5 cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/90 relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                Component Telemetry
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              ACTIVE SELECTION
            </span>
          </div>

          {/* Dynamic Content Based on Clicked Node */}
          {(() => {
            const node = nodes[selectedNode as keyof typeof nodes];
            return (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-display text-xl font-bold text-white">{node.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">{node.desc}</p>

                <div className="space-y-3 pt-4 border-t border-slate-800/80 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase">ALGORITHM / ARCHITECTURE</div>
                    <div className="text-emerald-400 font-semibold mt-0.5">{node.model}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase">FEATURE VECTOR SPACE</div>
                    <div className="text-slate-200 mt-0.5">{node.features}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase">BENCHMARK PERFORMANCE</div>
                    <div className="text-cyan-300 font-semibold mt-0.5">{node.metric}</div>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-slate-500">
            Click any node in the architecture diagram to inspect internal feature vectors and benchmark metrics.
          </div>
        </div>

      </div>
    </section>
  );
};
