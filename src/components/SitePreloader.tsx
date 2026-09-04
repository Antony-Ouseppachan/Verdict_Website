import React, { useState, useEffect } from 'react';
import { VerdictLogo } from './VerdictLogo';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Binary } from 'lucide-react';

interface SitePreloaderProps {
  onComplete: () => void;
}

const STAGES = [
  { threshold: 0, text: 'INITIALIZING SECURE VERDICT KERNEL', icon: Cpu },
  { threshold: 28, text: 'LOADING PHRESHPHISH 666K VECTOR EMBEDDINGS', icon: Database },
  { threshold: 58, text: 'CALIBRATING DUAL SVM + XGBOOST INFERENCE STACK', icon: Binary },
  { threshold: 86, text: 'DECRYPTING PAYMENT SECURITY REPOSITORIES', icon: ShieldCheck },
  { threshold: 100, text: 'SYSTEM READY // LAUNCHING INTERFACE', icon: ShieldCheck },
];

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/';

export const SitePreloader: React.FC<SitePreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState(STAGES[0].text);
  const [targetText, setTargetText] = useState(STAGES[0].text);

  // Smooth progress calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 550);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 6) + 3;
        const bounded = Math.min(next, 100);

        const currentStage = [...STAGES].reverse().find((s) => bounded >= s.threshold);
        if (currentStage && currentStage.text !== targetText) {
          setTargetText(currentStage.text);
        }

        return bounded;
      });
    }, 42);

    return () => clearInterval(timer);
  }, [onComplete, targetText]);

  // Hacker cryptographic text decryption effect
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '/' || char === '+' || char === '-') return char;
            if (index < iteration) return targetText[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1.5;
    }, 25);

    return () => clearInterval(interval);
  }, [targetText]);

  const CurrentIcon =
    [...STAGES].reverse().find((s) => progress >= s.threshold)?.icon || Cpu;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(20px) brightness(1.3)',
      }}
      transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030509] text-white select-none overflow-hidden"
    >
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />

      {/* Volumetric Center Glow Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Main Container */}
      <div className="relative flex flex-col items-center max-w-md w-full px-6 text-center space-y-7 z-10">
        
        {/* Futuristic Gyroscopic Orbital Ring Frame */}
        <div className="relative flex items-center justify-center w-28 h-28">
          
          {/* Outer Clockwise Dashed Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-emerald-500/30"
          />

          {/* Middle Counter-Clockwise Segmented Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-t-2 border-b-2 border-cyan-400/40 border-l-transparent border-r-transparent"
          />

          {/* Inner Glowing Shield Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-[#0e1626] to-[#070b14] border border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.35)]"
          >
            <VerdictLogo size={34} />
            <div className="absolute inset-0 rounded-2xl border border-emerald-400/50 animate-pulse opacity-40" />
          </motion.div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-1.5">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-display font-black text-3xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 uppercase drop-shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
          >
            Verdict
          </motion.h2>
          <div className="font-mono text-[10px] text-emerald-400/90 tracking-widest uppercase font-semibold">
            Payment Gateway Authenticity Intelligence
          </div>
        </div>

        {/* Progress Display & Cryptographic Status Terminal */}
        <div className="w-full space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-white/[0.07] backdrop-blur-xl shadow-2xl">
          
          {/* Status Label & Percentage */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300 text-[11px] truncate pr-2">
              <CurrentIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
              <span className="truncate">{displayText}</span>
            </div>
            <span className="text-emerald-400 font-bold font-mono tracking-wider ml-2 shrink-0">
              {progress}%
            </span>
          </div>

          {/* High-Precision Segmented Progress Bar */}
          <div className="relative w-full h-2 bg-slate-900/90 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.9)] relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            >
              {/* Laser Leading Edge */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#fff]" />
            </motion.div>
          </div>

          {/* Telemetry Micro Footer */}
          <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 pt-0.5 border-t border-slate-800/60">
            <span>MEM: 512MB ALLOC</span>
            <span>SECURE ENCLAVE ACTIVE</span>
            <span>TLS 1.3</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
