import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { InteractiveCanvas } from './InteractiveCanvas';

export interface SectionItem {
  id: string;
  name: string;
  component: React.ReactNode;
}

interface MorphXFullpageProps {
  sections: SectionItem[];
  activeSectionId: string;
  onSectionChange: (sectionId: string) => void;
}

export const MorphXFullpage: React.FC<MorphXFullpageProps> = ({
  sections,
  activeSectionId,
  onSectionChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);

  // Sync internal index with external activeSectionId
  useEffect(() => {
    const idx = sections.findIndex((s) => s.id === activeSectionId);
    if (idx !== -1 && idx !== currentIndex) {
      setDirection(idx > currentIndex ? 'down' : 'up');
      setCurrentIndex(idx);
    }
  }, [activeSectionId, sections, currentIndex]);

  // Global mouse position tracking for ambient dynamic flashlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const goToSection = useCallback(
    (newIndex: number, forcedDirection?: 'down' | 'up') => {
      if (newIndex < 0 || newIndex >= sections.length || isTransitioning) return;

      const dir = forcedDirection || (newIndex > currentIndex ? 'down' : 'up');
      setDirection(dir);
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      onSectionChange(sections[newIndex].id);

      setTimeout(() => {
        setIsTransitioning(false);
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      }, 920);
    },
    [currentIndex, isTransitioning, onSectionChange, sections]
  );

  // Wheel & Trackpad Controller
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (isTransitioning) return;

      const target = e.target as HTMLElement | null;
      if (target && target.closest('.allow-inner-scroll')) {
        const scrollable = target.closest('.allow-inner-scroll') as HTMLElement;
        const isScrollableDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 10;
        const isScrollableUp = scrollable.scrollTop > 10;
        if ((e.deltaY > 0 && isScrollableDown) || (e.deltaY < 0 && isScrollableUp)) {
          return;
        }
      }

      const container =
        ((e.target as HTMLElement)?.closest('.overflow-y-auto') as HTMLElement) ||
        containerRef.current ||
        (document.querySelector('.overflow-y-auto') as HTMLElement);

      if (!container) return;

      const isScrollable = container.scrollHeight > container.clientHeight + 10;
      const isAtBottom = !isScrollable || (container.scrollHeight - container.scrollTop - container.clientHeight <= 20);
      const isAtTop = !isScrollable || (container.scrollTop <= 20);

      if (e.deltaY > 0) {
        if (!isAtBottom) return;
        if (now - lastScrollTime.current < 650) return;
        if (currentIndex < sections.length - 1) {
          lastScrollTime.current = now;
          goToSection(currentIndex + 1, 'down');
        }
      } else if (e.deltaY < 0) {
        if (!isAtTop) return;
        if (now - lastScrollTime.current < 650) return;
        if (currentIndex > 0) {
          lastScrollTime.current = now;
          goToSection(currentIndex - 1, 'up');
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      const container = containerRef.current || (document.querySelector('.overflow-y-auto') as HTMLElement);
      if (!container) return;

      const isScrollable = container.scrollHeight > container.clientHeight + 10;
      const isAtBottom = !isScrollable || (container.scrollHeight - container.scrollTop - container.clientHeight <= 30);
      const isAtTop = !isScrollable || (container.scrollTop <= 30);

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (isAtBottom && currentIndex < sections.length - 1) {
          e.preventDefault();
          goToSection(currentIndex + 1, 'down');
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (isAtTop && currentIndex > 0) {
          e.preventDefault();
          goToSection(currentIndex - 1, 'up');
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;
      const container = containerRef.current || (document.querySelector('.overflow-y-auto') as HTMLElement);
      if (!container) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      const isScrollable = container.scrollHeight > container.clientHeight + 10;
      const isAtBottom = !isScrollable || (container.scrollHeight - container.scrollTop - container.clientHeight <= 30);
      const isAtTop = !isScrollable || (container.scrollTop <= 30);

      if (Math.abs(deltaY) > 40) {
        if (deltaY > 0 && isAtBottom && currentIndex < sections.length - 1) {
          goToSection(currentIndex + 1, 'down');
        } else if (deltaY < 0 && isAtTop && currentIndex > 0) {
          goToSection(currentIndex - 1, 'up');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, isTransitioning, goToSection, sections.length]);

  // Master-Animator 3D Spatial Camera Warp & Rack-Focus Physics
  const morphXVariants: import('framer-motion').Variants = {
    initial: (dir: 'down' | 'up') => ({
      opacity: 0,
      scale: 1.06,
      z: 80,
      y: dir === 'down' ? 50 : -50,
      rotateX: dir === 'down' ? 2.5 : -2.5,
      filter: 'blur(22px) brightness(1.25) contrast(1.08)',
      zIndex: 2,
    }),
    animate: {
      opacity: 1,
      scale: 1,
      z: 0,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px) brightness(1) contrast(1)',
      zIndex: 2,
      transition: {
        duration: 0.92,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
      },
    },
    exit: (dir: 'down' | 'up') => ({
      opacity: 0,
      scale: 0.94,
      z: -120,
      y: dir === 'down' ? -42 : 42,
      rotateX: dir === 'down' ? -2.5 : 2.5,
      filter: 'blur(20px) brightness(0.72) contrast(0.92)',
      zIndex: 1,
      transition: {
        duration: 0.78,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
      },
    }),
  };

  const currentSection = sections[currentIndex] || sections[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030509]">
      
      {/* Interactive GPU Particle Constellation Canvas */}
      <InteractiveCanvas />

      {/* Dynamic Cursor Flashlight Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(16, 185, 129, 0.07), transparent 75%)`,
        }}
      />

      {/* Film Grain Shimmer Texture */}
      <div 
        className="absolute inset-0 pointer-events-none select-none -z-15 opacity-[0.03] mix-blend-screen bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Cinematic Theater Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(3, 5, 9, 0.82) 100%)',
        }}
      />

      {/* Cyber Grid Depth Underlay */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-25 -z-30" />

      {/* Dynamic Multi-Plane Atmospheric Volumetric Glow */}
      <div className="absolute inset-0 pointer-events-none select-none -z-20 overflow-hidden">
        <motion.div
          key={`ambient-glow-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.65, y: direction === 'down' ? 60 : -60 }}
          animate={{ opacity: 0.2, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.35, y: direction === 'down' ? -60 : 60 }}
          transition={{ duration: 1.3, ease: [0.19, 1, 0.22, 1] }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-500/15 to-cyan-500/15 blur-[190px]"
        />
        <motion.div
          key={`ambient-secondary-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute bottom-10 right-1/4 w-[600px] h-[400px] rounded-full bg-emerald-600/20 blur-[170px]"
        />
      </div>

      {/* Monumental Ambient Section Numeral in 3D Rack-Focus Parallax */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={`numeral-${currentIndex}`}
            custom={direction}
            initial={{
              opacity: 0,
              scale: 0.72,
              y: direction === 'down' ? 150 : -150,
              filter: 'blur(18px)',
            }}
            animate={{
              opacity: 0.045,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              scale: 1.25,
              y: direction === 'down' ? -130 : 130,
              filter: 'blur(18px)',
            }}
            transition={{ duration: 1.15, ease: [0.19, 1, 0.22, 1] }}
            className="font-display font-black text-[30rem] sm:text-[38rem] lg:text-[50rem] tracking-tighter text-emerald-300 select-none leading-none will-change-transform"
          >
            {String(currentIndex + 1).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Anamorphic Volumetric Optical Flare Pulse on Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.75, scaleY: 0.5 }}
            animate={{ opacity: 0.12, scaleX: 1.1, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 1.3, scaleY: 1.5 }}
            transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent blur-2xl"
          />
        )}
      </AnimatePresence>

      {/* MorphX Kinetic Viewport Layer with 3D Spatial Camera Motion */}
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={currentSection.id}
          ref={containerRef}
          custom={direction}
          variants={morphXVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden pt-[4.75rem] pb-10 px-4 md:px-8 custom-scrollbar origin-center will-change-transform"
          style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            perspective: '1400px',
          }}
        >
          {/* Section Container Starting Cleanly Below Navbar */}
          <div className="max-w-7xl mx-auto w-full flex flex-col py-1">
            {currentSection.component}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Right Cyber Pagination Bar */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2.5 bg-slate-950/75 p-2 rounded-full border border-slate-800/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        {sections.map((s, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={s.id}
              onClick={() => goToSection(idx)}
              className="group relative flex items-center justify-center cursor-pointer p-1 outline-none"
              title={`${idx + 1}. ${s.name}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-400 ease-out ${
                  isActive
                    ? 'bg-emerald-400 scale-145 shadow-[0_0_15px_rgba(16,185,129,1)] ring-2 ring-emerald-500/40'
                    : 'bg-slate-700/80 hover:bg-slate-400 hover:scale-115'
                }`}
              />
              
              {/* Tooltip Label */}
              <span className="absolute right-8 px-3 py-1.5 rounded-lg bg-slate-900/95 border border-slate-700/90 text-xs font-mono text-slate-200 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-2xl backdrop-blur-md transform group-hover:-translate-x-1">
                <span className="text-emerald-400 font-bold mr-1.5">{String(idx + 1).padStart(2, '0')}.</span>
                {s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Floating Navigation Arrows & Section Tracker */}
      <div className="fixed bottom-4 right-8 z-40 flex items-center gap-3 font-mono text-xs text-slate-400 bg-slate-950/85 px-4 py-2 rounded-full border border-slate-800/90 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
        <span className="text-emerald-400 font-bold tracking-wider">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400 font-medium">{String(sections.length).padStart(2, '0')}</span>
        
        <div className="h-3.5 w-[1px] bg-slate-800" />
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => goToSection(currentIndex - 1, 'up')}
            disabled={currentIndex === 0 || isTransitioning}
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer flex items-center justify-center transition-colors rounded-full hover:bg-slate-800/60"
            title="Previous Section (Arrow Up)"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => goToSection(currentIndex + 1, 'down')}
            disabled={currentIndex === sections.length - 1 || isTransitioning}
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer flex items-center justify-center transition-colors rounded-full hover:bg-slate-800/60"
            title="Next Section (Arrow Down)"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
