import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  tag: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  tag,
  title,
  subtitle,
  align = 'center',
}) => {
  const words = title.split(' ');

  return (
    <div className={`mb-5 sm:mb-7 md:mb-8 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl'}`}>
      
      {/* Top Section Tag Pill with Kinetic Decryption Pulse */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`inline-flex items-center gap-2 mb-2.5 ${align === 'center' ? 'justify-center' : 'justify-start'}`}
      >
        <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.12)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          SECTION {number}
        </span>
        <span className="text-slate-600 font-mono text-xs">•</span>
        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest font-medium">
          {tag}
        </span>
      </motion.div>

      {/* Kinetic Staggered Heading */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2.5 leading-[1.12]">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.55,
              delay: 0.05 + i * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block mr-[0.28em] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300 drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)]"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Subtitle with Fade & Slide */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto font-normal"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Subtle Atmospheric Accent Shimmer */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-3.5 flex items-center gap-2 origin-left ${align === 'center' ? 'justify-center origin-center' : 'justify-start'}`}
      >
        <div className="h-[1.5px] w-12 bg-gradient-to-r from-emerald-500/50 via-teal-400/30 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
};
