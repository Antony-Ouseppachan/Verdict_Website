import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { URL_MODEL_DATA, HTML_MODEL_DATA } from '../data/projectData';
import { Target } from 'lucide-react';

export const Section10Performance: React.FC = () => {
  const [activeModelTab, setActiveModelTab] = useState<'url' | 'html'>('url');

  const currentData = activeModelTab === 'url' ? URL_MODEL_DATA : HTML_MODEL_DATA;

  return (
    <section id="performance" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="10"
        tag="Evaluation Rigor"
        title="Model Performance Metrics"
        subtitle="Comprehensive precision, recall, F1-scores, and ROC-AUC curves calculated across held-out evaluation test splits."
      />

      {/* Model Selection Tabs */}
      <div className="flex items-center justify-center mb-10">
        <div className="cyber-panel p-1.5 rounded-2xl border border-slate-800 bg-slate-950/80 inline-flex items-center gap-2">
          <button
            onClick={() => setActiveModelTab('url')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold cursor-pointer transition-all ${
              activeModelTab === 'url'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            URL MODEL (LINEAR SVM)
          </button>

          <button
            onClick={() => setActiveModelTab('html')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold cursor-pointer transition-all ${
              activeModelTab === 'html'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            HTML MODEL (XGBOOST V2)
          </button>
        </div>
      </div>

      {/* Model Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Macro Metrics & Specs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/90">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">MODEL ARCHITECTURE</span>
                <h3 className="font-display font-bold text-xl text-white mt-0.5">{currentData.name}</h3>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                {currentData.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase">OVERALL ACCURACY</div>
                <div className="font-display text-3xl font-bold text-emerald-400 mt-1">
                  {(currentData.accuracy * 100).toFixed(0)}%
                </div>
                <div className="text-[10px] font-sans text-slate-500 mt-1">168,060 test samples</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase">ROC-AUC SCORE</div>
                <div className="font-display text-3xl font-bold text-cyan-400 mt-1">
                  {currentData.rocAuc.toFixed(4)}
                </div>
                <div className="text-[10px] font-sans text-slate-500 mt-1">Near-perfect separation</div>
              </div>
            </div>

            <div className="space-y-3 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                <span className="text-slate-400">EVALUATION SET</span>
                <span className="text-white font-semibold">168,060 URLs</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                <span className="text-slate-400">FEATURE EMBEDDING</span>
                <span className="text-emerald-400 font-semibold">{activeModelTab === 'url' ? 'TF-IDF Character N-Grams' : '56 DOM Vectors'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Class-Level Precision / Recall / F1 Breakdown */}
        <div className="lg:col-span-7 cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/90">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                Class-Level Classification Performance
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              DISJOINT EVALUATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Benign Class Card */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Class: Benign (Legitimate)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  91,260 SAMPLES
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Precision</span>
                    <span className="text-emerald-400 font-bold">{currentData.benignMetrics.precision.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${currentData.benignMetrics.precision * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Recall</span>
                    <span className="text-emerald-400 font-bold">{currentData.benignMetrics.recall.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${currentData.benignMetrics.recall * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>F1-Score</span>
                    <span className="text-emerald-400 font-bold">{currentData.benignMetrics.f1.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${currentData.benignMetrics.f1 * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Phish Class Card */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-red-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-red-400 uppercase tracking-wider">
                  Class: Phish (Malicious)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                  76,800 SAMPLES
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Precision</span>
                    <span className="text-red-400 font-bold">{currentData.phishMetrics.precision.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: `${currentData.phishMetrics.precision * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Recall</span>
                    <span className="text-red-400 font-bold">{currentData.phishMetrics.recall.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: `${currentData.phishMetrics.recall * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>F1-Score</span>
                    <span className="text-red-400 font-bold">{currentData.phishMetrics.f1.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: `${currentData.phishMetrics.f1 * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>DISJOINT TEST SET EVALUATION</span>
            <span className="text-cyan-300">MINIMAL FALSE POSITIVES (F1: 0.95-0.96)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
