import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

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
      }, 850); // MorphX animation completion threshold
    },
    [currentIndex, isTransitioning, onSectionChange, sections]
  );

  // Wheel & Trackpad Controller: Scroll within section first; trigger MorphX ONLY when boundary reached
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (isTransitioning) {
        return;
      }

      // Check if nested inner scrollable (like a code box or telemetry box) is handling it
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.allow-inner-scroll')) {
        const scrollable = target.closest('.allow-inner-scroll') as HTMLElement;
        const isScrollableDown = scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 10;
        const isScrollableUp = scrollable.scrollTop > 10;
        if ((e.deltaY > 0 && isScrollableDown) || (e.deltaY < 0 && isScrollableUp)) {
          return;
        }
      }

      // Dynamically locate the active scrollable container
      const container =
        ((e.target as HTMLElement)?.closest('.overflow-y-auto') as HTMLElement) ||
        containerRef.current ||
        (document.querySelector('.overflow-y-auto') as HTMLElement);

      if (!container) return;

      const isScrollable = container.scrollHeight > container.clientHeight + 10;
      const isAtBottom = !isScrollable || (container.scrollHeight - container.scrollTop - container.clientHeight <= 20);
      const isAtTop = !isScrollable || (container.scrollTop <= 20);

      // User scrolling DOWN
      if (e.deltaY > 0) {
        // If the section is long and user hasn't reached bottom yet, allow natural scroll
        if (!isAtBottom) {
          return;
        }

        // Section is at bottom: advance to next section with MorphX
        if (now - lastScrollTime.current < 650) return;
        if (currentIndex < sections.length - 1) {
          lastScrollTime.current = now;
          goToSection(currentIndex + 1, 'down');
        }
      }
      // User scrolling UP
      else if (e.deltaY < 0) {
        // If the section is long and user hasn't reached top yet, allow natural scroll
        if (!isAtTop) {
          return;
        }

        // Section is at top: retreat to previous section with MorphX
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

  // Master-Animator Cinematic Optical Physics & Quintic Inertia
  const morphXVariants: import('framer-motion').Variants = {
    initial: (dir: 'down' | 'up') => ({
      opacity: 0,
      scale: 1.045,
      y: dir === 'down' ? 44 : -44,
      filter: 'blur(20px) brightness(1.22) contrast(1.06)',
      zIndex: 2,
    }),
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px) brightness(1) contrast(1)',
      zIndex: 2,
      transition: {
        duration: 0.92,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number], // Studio-grade Quintic deceleration curve
      },
    },
    exit: (dir: 'down' | 'up') => ({
      opacity: 0,
      scale: 0.955,
      y: dir === 'down' ? -38 : 38,
      filter: 'blur(18px) brightness(0.78) contrast(0.94)',
      zIndex: 1,
      transition: {
        duration: 0.78,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
      },
    }),
  };

  const currentSection = sections[currentIndex] || sections[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#04060a]">
      
      {/* Cinematic Theater Vignette & Depth Mask */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(4, 6, 10, 0.7) 100%)',
        }}
      />

      {/* Dynamic Multi-Plane Atmospheric Volumetric Glow */}
      <div className="absolute inset-0 pointer-events-none select-none -z-20 overflow-hidden">
        <motion.div
          key={`ambient-glow-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.65, y: direction === 'down' ? 60 : -60 }}
          animate={{ opacity: 0.16, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.35, y: direction === 'down' ? -60 : 60 }}
          transition={{ duration: 1.3, ease: [0.19, 1, 0.22, 1] }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/25 via-teal-500/15 to-cyan-500/10 blur-[180px]"
        />
        <motion.div
          key={`ambient-secondary-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute bottom-10 right-1/4 w-[600px] h-[400px] rounded-full bg-emerald-600/15 blur-[160px]"
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
              scale: 0.75,
              y: direction === 'down' ? 140 : -140,
              filter: 'blur(16px)',
            }}
            animate={{
              opacity: 0.038,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              scale: 1.22,
              y: direction === 'down' ? -120 : 120,
              filter: 'blur(16px)',
            }}
            transition={{ duration: 1.15, ease: [0.19, 1, 0.22, 1] }}
            className="font-display font-black text-[28rem] sm:text-[36rem] lg:text-[48rem] tracking-tighter text-emerald-300 select-none leading-none will-change-transform"
          >
            {String(currentIndex + 1).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Anamorphic Volumetric Optical Flare Pulse on Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8, scaleY: 0.6 }}
            animate={{ opacity: 0.09, scaleX: 1.05, scaleY: 1 }}
            exit={{ opacity: 0, scaleX: 1.2, scaleY: 1.4 }}
            transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent blur-2xl"
          />
        )}
      </AnimatePresence>

      {/* MorphX Kinetic Viewport Layer with Rack-Focus Camera Motion */}
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
          }}
        >
          {/* Section Container Starting Cleanly Below Navbar */}
          <div className="max-w-7xl mx-auto w-full flex flex-col py-1">
            {currentSection.component}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Right Cyber Pagination Bar */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2 bg-slate-950/60 p-2 rounded-full border border-slate-800/80 backdrop-blur-xl shadow-2xl">
        {sections.map((s, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={s.id}
              onClick={() => goToSection(idx)}
              className="group relative flex items-center justify-center cursor-pointer p-1"
              title={`${idx + 1}. ${s.name}`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-400 ease-out ${
                  isActive
                    ? 'bg-emerald-400 scale-135 shadow-[0_0_12px_rgba(16,185,129,0.9)]'
                    : 'bg-slate-700 hover:bg-slate-400'
                }`}
              />
              
              {/* Tooltip Label */}
              <span className="absolute right-7 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-200 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl backdrop-blur-md">
                {String(idx + 1).padStart(2, '0')}. {s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Floating Navigation Arrows & Section Tracker */}
      <div className="fixed bottom-4 right-8 z-40 flex items-center gap-3 font-mono text-xs text-slate-400 bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800/80 backdrop-blur-lg shadow-2xl">
        <span className="text-emerald-400 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span>/</span>
        <span>{String(sections.length).padStart(2, '0')}</span>
        
        <div className="h-3 w-[1px] bg-slate-800" />
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => goToSection(currentIndex - 1, 'up')}
            disabled={currentIndex === 0 || isTransitioning}
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer flex items-center justify-center transition-colors"
            title="Previous Section (Arrow Up)"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => goToSection(currentIndex + 1, 'down')}
            disabled={currentIndex === sections.length - 1 || isTransitioning}
            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer flex items-center justify-center transition-colors"
            title="Next Section (Arrow Down)"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
