import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function BrandLogo({ className = "", showWordmark = true }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-4 focus:outline-none ${className}`}
      aria-label="Siddiq — Home"
    >
      {/* 
        Brand Kit Mark:
        Rotated square (diamond) outline, 1.4px stroke, with a solid centre dot.
        Minimum size 20px. Clear space: mark height on every side minimum.
      */}
      <div className="relative flex items-center justify-center p-2 flex-shrink-0">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accent transition-transform duration-300 group-hover:scale-105"
        >
          {/* Diamond outline */}
          <path
            d="M 12 2.5 L 21.5 12 L 12 21.5 L 2.5 12 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Centre solid dot */}
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        </svg>
      </div>

      {showWordmark && (
        <span className="font-fraunces font-medium italic text-[21px] text-ink leading-none tracking-tight transition-colors">
          Siddiq
        </span>
      )}
    </Link>
  );
}
