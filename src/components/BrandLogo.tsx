import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Custom IVQIE Monogram: Geometric node network & intelligent growth angles */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
          aria-hidden="true"
        >
          {/* Subtle background container */}
          <rect width="40" height="40" rx="10" fill="#0F1117" />
          
          {/* Geometric node vectors forming IVQIE signature */}
          {/* Vertical 'I' pillar */}
          <path
            d="M10 11V29"
            stroke="#E11D48"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Dynamic 'V' vector */}
          <path
            d="M16 12L22 26L28 12"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'Q' orbit loop & node connection */}
          <circle
            cx="28"
            cy="24"
            r="4.5"
            stroke="#8B5CF6"
            strokeWidth="2.5"
          />
          <path
            d="M31 27L34 30"
            stroke="#E11D48"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Connecting intelligence node */}
          <circle cx="22" cy="26" r="2" fill="#E11D48" />
          <circle cx="10" cy="11" r="1.75" fill="#8B5CF6" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes[size]} font-extrabold tracking-tight text-white font-['Outfit',sans-serif] leading-none`}
          >
            IVQIE<span className="text-rose-500">.</span>
          </span>
        </div>
      )}
    </div>
  );
};
