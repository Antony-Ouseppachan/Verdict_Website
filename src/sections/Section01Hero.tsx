import React, { useState, useEffect } from 'react';
import { Lock, ArrowDown, Globe, Code2, CreditCard, Sparkles, Download, ChevronRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { CyberTiltCard } from '../components/CyberTiltCard';

interface Section01HeroProps {
  onScrollToExplore: () => void;
  onNavigateToDownload?: () => void;
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 70, rotateX: -60, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      delay: 0.15 + i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const Section01Hero: React.FC<Section01HeroProps> = ({ onScrollToExplore, onNavigateToDownload }) => {
  const [typedUrl, setTypedUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'console' | 'radar'>('console');
  const targetUrl = 'https://api.razorpay.com/v1/checkout/public?order_id=ord_987x9';
  const brandLetters = ['V', 'E', 'R', 'D', 'I', 'C', 'T'];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= targetUrl.length) {
        setTypedUrl(targetUrl.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative flex flex-col justify-between py-2 px-4 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">

      {/* Volumetric Emerald Horizon Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px] bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Cyber Perspective Grid Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-35 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

      {/* Hero Centerpiece */}
      <div className="text-center pt-1 pb-6">

        {/* Staggered 3D Kinetic Brand Title */}
        <div className="relative inline-flex items-center justify-center select-none perspective-[1000px]">
          <div className="flex overflow-hidden py-4">
            {brandLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-7xl sm:text-9xl md:text-[10.5rem] lg:text-[13rem] font-black tracking-tighter uppercase leading-[0.82] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] hover:text-emerald-300 transition-colors duration-300 cursor-default"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Precision Laser Baseline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[1px] shadow-[0_0_20px_rgba(16,185,129,1)] origin-center"
          />
        </div>

        {/* Cinematic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-slate-300 text-lg md:text-2xl font-light max-w-3xl mx-auto tracking-wide font-sans leading-relaxed"
        >
          <span className="text-emerald-400 font-semibold font-mono text-sm sm:text-base tracking-wider block mb-2 uppercase">
            Payment Gateway Authenticity Intelligence
          </span>
          Evaluating checkout page legitimacy across URL structure, DOM structural integrity, and financial harvesting attack surfaces before credentials leave the browser.
        </motion.p>

        {/* Quick Launch & Download Action CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.88 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          {onNavigateToDownload && (
            <button
              onClick={onNavigateToDownload}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-display font-extrabold text-sm tracking-wide hover:brightness-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Get Verdict</span>
            </button>
          )}

          <button
            onClick={onScrollToExplore}
            className="px-6 py-3 rounded-2xl bg-slate-900/80 border border-slate-700/90 text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-500 font-mono text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <span>Explore Architecture</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </button>
        </motion.div>

        {/* The Centerpiece: Beast-Tier Holographic Gateway Inspection Console */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-5xl mx-auto w-full"
        >
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-slate-700/80 via-emerald-500/30 to-slate-900/80 shadow-[0_30px_100px_rgba(0,0,0,0.95)]">

            {/* Specular Inner Console Frame */}
            <div className="rounded-[22px] overflow-hidden bg-[#070b14]/95 backdrop-blur-2xl border border-slate-800 text-left">

              {/* Console Top Toolbar */}
              <div className="px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="ml-3 text-xs font-mono text-slate-400">VERDICT_INSPECTOR // V2.4</span>
                </div>

                {/* Simulated Address Bar */}
                <div className="flex-1 max-w-xl flex items-center gap-2.5 bg-[#030509] px-4 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 shadow-inner overflow-hidden">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-semibold select-none">HTTPS</span>
                  <span className="text-slate-200 truncate">{typedUrl}</span>
                  <span className="w-2 h-4 bg-emerald-400 animate-pulse shrink-0" />
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setActiveTab('console')}
                    className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer transition-all ${activeTab === 'console' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    MULTIMODAL STACK
                  </button>
                  <button
                    onClick={() => setActiveTab('radar')}
                    className={`px-3 py-1 rounded text-[11px] font-mono cursor-pointer transition-all ${activeTab === 'radar' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    TELEMETRY LOGS
                  </button>
                </div>
              </div>

              {/* Console Body Area */}
              <div className="p-6 md:p-8 space-y-6">

                {activeTab === 'console' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Core 01: URL AI */}
                    <CyberTiltCard glowColor="cyan" className="p-5">
                      <div className="flex items-center justify-between font-mono text-xs mb-3">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-cyan-400" />
                          <span className="font-bold text-white uppercase">URL Model</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                          SVM 96%
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-sans leading-relaxed">
                        Character n-gram TF-IDF & lexical entropy analysis
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-cyan-300 flex justify-between">
                        <span>ROC-AUC: 0.9923</span>
                        <span>498K TRAIN</span>
                      </div>
                    </CyberTiltCard>

                    {/* Core 02: HTML AI */}
                    <CyberTiltCard glowColor="emerald" className="p-5">
                      <div className="flex items-center justify-between font-mono text-xs mb-3">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white uppercase">HTML Model</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          XGBOOST 96%
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-sans leading-relaxed">
                        56 DOM structural, external domain & script vectors
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-emerald-300 flex justify-between">
                        <span>ROC-AUC: 0.9910</span>
                        <span>0% LEAKAGE</span>
                      </div>
                    </CyberTiltCard>

                    {/* Core 03: Payment Attack Surface */}
                    <CyberTiltCard glowColor="amber" className="p-5">
                      <div className="flex items-center justify-between font-mono text-xs mb-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-amber-400" />
                          <span className="font-bold text-white uppercase">Payment AI</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          30 VECTORS
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-sans leading-relaxed">
                        Card, CVV, OTP, UPI inputs & form destination verification
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-amber-300 flex justify-between">
                        <span>PROVIDER MATCH</span>
                        <span>ACTIVE</span>
                      </div>
                    </CyberTiltCard>

                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#030509] border border-slate-800 font-mono text-xs space-y-2 text-slate-300 max-h-52 overflow-y-auto">
                    <div className="text-emerald-400">[0.00ms] INITIATING HTTPS CONNECTION TO api.razorpay.com</div>
                    <div className="text-cyan-300">[2.14ms] EXTRACTED LEXICAL TF-IDF N-GRAMS (Entropy: 3.42 bits)</div>
                    <div className="text-slate-400">[8.40ms] DOM PARSER: 0 Foreign external domains detected</div>
                    <div className="text-emerald-400">[14.20ms] PCI-DSS TOKENIZED CONTAINER VERIFIED</div>
                    <div className="text-cyan-300">[18.90ms] PROVIDER SIGNATURE: Razorpay Software Private Limited (AS13335)</div>
                    <div className="text-amber-300">[24.50ms] RISK FUSION ENGINE CONVERGENCE: THREAT SCORE 4.2% (SAFE)</div>
                  </div>
                )}

                {/* Bottom Telemetry Status Strip */}
                <div className="bg-[#030509] p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-400">CORPUS:</span>
                    <span className="text-emerald-400 font-bold">PhreshPhish (666K URLs)</span>
                  </div>

                  <div className="text-slate-400 text-[11px] font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LINEAR SVM + XGBOOST ARCHITECTURE
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex flex-col items-center justify-center pt-6">
        <button
          onClick={onScrollToExplore}
          className="group flex flex-col items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer outline-none"
        >
          <span className="font-mono text-xs tracking-widest uppercase">
            SCROLL TO EXPLORE ARCHITECTURE
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-emerald-400 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
};
