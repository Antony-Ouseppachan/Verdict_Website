import React from 'react';

export const MorphXFilter: React.FC = () => {
  return (
    <svg className="fixed w-0 h-0 pointer-events-none -z-50" aria-hidden="true">
      <defs>
        {/* MorphX Horizontal Liquid Displacement Filter */}
        <filter id="morphx-glitch" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.003"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* MorphX Subtle Wave Filter */}
        <filter id="morphx-wave" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01 0.002"
            numOctaves="1"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="8"
            xChannelSelector="R"
          />
        </filter>
      </defs>
    </svg>
  );
};
