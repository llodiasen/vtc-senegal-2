import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Background geometric shapes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Abstract primary shapes */}
        <path
          d="M150 50 L200 100 L180 180 L100 150 Z"
          fill="#002060"
          opacity="0.15"
        />
        <circle cx="320" cy="100" r="80" fill="#002060" opacity="0.1" />
        <path
          d="M250 250 L350 280 L320 350 L220 320 Z"
          fill="#059669"
          opacity="0.2"
        />
        <rect
          x="50"
          y="280"
          width="100"
          height="100"
          rx="10"
          fill="#002060"
          opacity="0.12"
        />

        {/* Decorative diagonal line */}
        <line
          x1="0"
          y1="200"
          x2="400"
          y2="200"
          stroke="#002060"
          strokeWidth="60"
          opacity="0.15"
          transform="rotate(-25 200 200)"
        />
      </svg>

      {/* Car illustration */}
      <div className="absolute bottom-16 right-8 z-10">
        <svg
          width="200"
          height="100"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Car body */}
          <path
            d="M30 60 L50 40 L120 40 L140 60 L170 60 L175 70 L175 85 L25 85 L25 70 Z"
            fill="#1f2937"
            stroke="#0f172a"
            strokeWidth="2"
          />
          {/* Car windows */}
          <path
            d="M55 45 L65 50 L110 50 L120 45 Z"
            fill="#60a5fa"
            opacity="0.6"
          />
          {/* Wheels */}
          <circle cx="50" cy="85" r="12" fill="#0f172a" />
          <circle cx="50" cy="85" r="6" fill="#4b5563" />
          <circle cx="150" cy="85" r="12" fill="#0f172a" />
          <circle cx="150" cy="85" r="6" fill="#4b5563" />
          {/* Car details */}
          <rect x="80" y="65" width="40" height="3" rx="1.5" fill="#002060" />
        </svg>
      </div>

      {/* People silhouettes */}
      <div className="absolute bottom-20 left-12 z-20">
        {/* Person 1 - Driver */}
        <svg
          width="60"
          height="80"
          viewBox="0 0 60 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <circle cx="30" cy="15" r="10" fill="#1f2937" />
          {/* Body */}
          <path
            d="M30 25 L20 40 L20 65 L25 65 L25 45 L30 40 L35 45 L35 65 L40 65 L40 40 Z"
            fill="#1f2937"
          />
          {/* Arms */}
          <path d="M20 35 L10 45 L12 47 L22 37 Z" fill="#1f2937" />
          <path d="M40 35 L50 40 L48 42 L38 37 Z" fill="#1f2937" />
          {/* Legs */}
          <path d="M25 65 L22 80 L28 80 Z" fill="#1f2937" />
          <path d="M35 65 L32 80 L38 80 Z" fill="#1f2937" />
        </svg>
      </div>

      <div className="absolute bottom-16 left-28 z-15">
        {/* Person 2 - Passenger */}
        <svg
          width="50"
          height="75"
          viewBox="0 0 50 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <circle cx="25" cy="12" r="9" fill="#374151" />
          {/* Body */}
          <path
            d="M25 21 L17 35 L17 60 L22 60 L22 40 L25 35 L28 40 L28 60 L33 60 L33 35 Z"
            fill="#374151"
          />
          {/* Arms */}
          <path d="M17 30 L8 38 L10 40 L19 32 Z" fill="#374151" />
          <path d="M33 30 L42 35 L40 37 L31 32 Z" fill="#374151" />
          {/* Legs */}
          <path d="M22 60 L20 75 L25 75 Z" fill="#374151" />
          <path d="M28 60 L26 75 L31 75 Z" fill="#374151" />
        </svg>
      </div>

      {/* Decorative elements - location pins */}
      <div className="absolute top-16 right-16">
        <svg
          width="30"
          height="40"
          viewBox="0 0 30 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 0C9.5 0 5 4.5 5 10C5 17.5 15 30 15 30C15 30 25 17.5 25 10C25 4.5 20.5 0 15 0Z"
            fill="#002060"
          />
          <circle cx="15" cy="10" r="4" fill="white" />
        </svg>
      </div>

      {/* Additional decorative dots */}
      <div className="absolute top-32 left-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-600 opacity-40"></div>
          <div className="w-3 h-3 rounded-full bg-primary-500 opacity-30"></div>
          <div className="w-3 h-3 rounded-full bg-primary-400 opacity-20"></div>
        </div>
      </div>
    </div>
  );
};
