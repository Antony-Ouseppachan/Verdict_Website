import React, { useState, useEffect } from 'react';
import { VerdictLogo } from './VerdictLogo';
import { motion } from 'framer-motion';

interface SitePreloaderProps {
  onComplete: () => void;
}

export const SitePreloader: React.FC<SitePreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING VERDICT KERNEL...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const bounded = Math.min(next, 100);

        if (bounded > 25 && bounded <= 55) {
          setLoadingText('LOADING PHRESHPHISH (666K) EMBEDDINGS...');
        } else if (bounded > 55 && bounded <= 85) {
          setLoadingText('CALIBRATING MULTIMODAL INFERENCE STACK...');
        } else if (bounded > 85) {
          setLoadingText('DECRYPTING VERDICT INTERFACE...');
        }

        return bounded;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070d] text-white select-none overflow-hidden"
    >
      {/* Background Volumetric Glow */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-sm w-full px-6 text-center space-y-6">
        
        {/* Glowing Shield Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        >
          <VerdictLogo size={44} />
          <div className="absolute inset-0 rounded-2xl border border-emerald-400/60 animate-ping opacity-30" />
        </motion.div>

        {/* Monolithic Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-display font-black text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 uppercase">
            Verdict
          </h2>
        </motion.div>

        {/* Progress Bar & Counter */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 text-[11px] truncate pr-2">{loadingText}</span>
            <span className="text-emerald-400 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-400 tracking-wider">
          PAYMENT GATEWAY AUTHENTICITY INTELLIGENCE
        </div>
      </div>
    </motion.div>
  );
};
