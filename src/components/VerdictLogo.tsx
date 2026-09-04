import React from 'react';

interface VerdictLogoProps {
  className?: string;
  size?: number;
}

export const VerdictLogo: React.FC<VerdictLogoProps> = ({ className = '', size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Shield Outline */}
      <path
        d="M24 4L8 10V22C8 31.5 14.8 40.3 24 44C33.2 40.3 40 31.5 40 22V10L24 4Z"
        fill="#081418"
        stroke="#10B981"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Subtle Glow Path */}
      <path
        d="M24 7.5L11.5 12.2V21.8C11.5 29.4 16.9 36.6 24 39.8C31.1 36.6 36.5 29.4 36.5 21.8V12.2L24 7.5Z"
        stroke="#10B981"
        strokeWidth="1"
        strokeOpacity="0.25"
      />
      {/* Top Dot / Node */}
      <circle cx="24" cy="15.5" r="2.8" fill="#10B981" />
      {/* Stylized Sharp 'V' Emblem */}
      <path
        d="M16 20.5L24 34L32 20.5H27.5L24 27.5L20.5 20.5H16Z"
        fill="#10B981"
      />
    </svg>
  );
};
