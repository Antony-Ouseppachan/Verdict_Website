import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  label?: string;
  subtext?: string;
  highlightColor?: string;
}

export const AnimatedMetric: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1800,
  label,
  subtext,
  highlightColor = 'text-white',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Luxurious ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easeProgress * value;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  const formattedNumber = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <div ref={elementRef} className="cyber-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden group hover:border-slate-700 transition-all">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
      
      {label && (
        <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {label}
        </div>
      )}

      <div className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${highlightColor} mb-1`}>
        <span>{prefix}</span>
        <span>{formattedNumber}</span>
        <span className="text-emerald-400 text-2xl md:text-3xl ml-0.5">{suffix}</span>
      </div>

      {subtext && (
        <div className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
          {subtext}
        </div>
      )}
    </div>
  );
};
