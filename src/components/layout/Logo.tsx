'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = '', showTagline = true, variant = 'light' }: LogoProps) {
  const orangeColor = '#F26522';
  const navyColor = variant === 'dark' ? '#FFFFFF' : '#102B7B';

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <svg
        viewBox="0 0 420 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 sm:h-12 w-auto"
      >
        {/* "TH" small prefix */}
        <text
          x="5"
          y="32"
          fill={orangeColor}
          fontSize="22"
          fontWeight="900"
          fontFamily="Outfit, sans-serif"
          letterSpacing="1"
        >
          TH
        </text>

        {/* ── Wordmark "RAAMED" ── */}
        
        {/* R (Orange with dot) */}
        <path
          d="M 50 60 C 50 35, 75 30, 85 40 C 95 50, 75 58, 65 58 L 90 75"
          stroke={orangeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="58" cy="46" r="4" fill={orangeColor} />

        {/* AA (Orange) */}
        <text
          x="98"
          y="72"
          fill={orangeColor}
          fontSize="48"
          fontWeight="800"
          fontFamily="Outfit, sans-serif"
          letterSpacing="2"
        >
          AA
        </text>

        {/* ECG Pulse Heartbeat "M" (Orange transitioning to Navy) */}
        <path
          d="M 172 72 L 180 72 L 185 72 L 192 20"
          stroke={orangeColor}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 192 20 L 202 85 L 210 50 L 222 72 L 235 72"
          stroke={navyColor}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* ED (Navy Blue) */}
        <text
          x="240"
          y="72"
          fill={navyColor}
          fontSize="48"
          fontWeight="800"
          fontFamily="Outfit, sans-serif"
          letterSpacing="3"
        >
          ED
        </text>

        {/* ── Bottom Arrow Line with Medical Plus ── */}
        {/* Navy Medical Plus (+) */}
        <path
          d="M 22 92 H 36 M 29 85 V 99"
          stroke={navyColor}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Orange Line & Arrowhead */}
        <path
          d="M 38 92 H 350 L 338 84 M 350 92 L 338 100"
          stroke={orangeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showTagline && (
        <span
          className="text-[10px] font-extrabold uppercase tracking-widest leading-none mt-0.5 ml-1"
          style={{ color: variant === 'dark' ? '#94A3B8' : '#102B7B' }}
        >
          Medical Equipment Co.
        </span>
      )}
    </div>
  );
}
