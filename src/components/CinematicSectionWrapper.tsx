import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface CinematicSectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  glowColor?: 'emerald' | 'cyan' | 'amber' | 'red' | 'default';
}

export const CinematicSectionWrapper: React.FC<CinematicSectionWrapperProps> = ({
  children,
  id,
  className = '',
  glowColor = 'default',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking within the viewport for this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring physics for fluid MorphX morphing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // MorphX horizontal wave displacement mappings
  const morphXScale = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0.96, 1, 1, 0.97]);
  const morphXOpacity = useTransform(smoothProgress, [0, 0.18, 0.82, 1], [0.15, 1, 1, 0.2]);
  const morphXSkew = useTransform(smoothProgress, [0, 0.22, 0.78, 1], [-2.5, 0, 0, 2.5]);
  const morphXTranslate = useTransform(smoothProgress, [0, 0.22, 0.78, 1], [-24, 0, 0, 24]);

  let ambientGlow = 'rgba(16, 185, 129, 0.035)';
  if (glowColor === 'cyan') ambientGlow = 'rgba(6, 182, 212, 0.035)';
  if (glowColor === 'amber') ambientGlow = 'rgba(245, 158, 11, 0.035)';
  if (glowColor === 'red') ambientGlow = 'rgba(239, 68, 68, 0.035)';

  return (
    <div ref={containerRef} id={id} className={`relative w-full py-4 ${className}`}>
      
      {/* MorphX Animated Container */}
      <motion.div
        style={{
          scale: morphXScale,
          opacity: morphXOpacity,
          skewX: morphXSkew,
          x: morphXTranslate,
        }}
        className="relative w-full rounded-3xl overflow-hidden transition-all duration-300"
      >
        {/* Background Volumetric Ambiance with Morph Mesh */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 blur-3xl opacity-90 animate-morph-mesh"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${ambientGlow} 0%, transparent 75%)`,
          }}
        />

        {/* MorphX Horizontal Laser Light Beam Sweep */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

        {/* Futuristic Corner Tech Accents */}
        <div className="absolute top-3 left-6 w-3.5 h-3.5 border-t border-l border-emerald-500/30 pointer-events-none" />
        <div className="absolute top-3 right-6 w-3.5 h-3.5 border-t border-r border-emerald-500/30 pointer-events-none" />
        <div className="absolute bottom-3 left-6 w-3.5 h-3.5 border-b border-l border-emerald-500/30 pointer-events-none" />
        <div className="absolute bottom-3 right-6 w-3.5 h-3.5 border-b border-r border-emerald-500/30 pointer-events-none" />

        {/* Section Content */}
        <div className="relative z-10 px-2 sm:px-4">
          {children}
        </div>

        {/* MorphX Bottom Horizon Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};
