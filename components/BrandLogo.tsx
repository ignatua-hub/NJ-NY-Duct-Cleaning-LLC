"use client";

import { useState } from "react";
import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  height?: number;
};

/**
 * Uses /public/images/logo.png when present.
 * Falls back to an SVG brand mark matching the dark electric-blue brand.
 */
export default function BrandLogo({ className = "", height = 48 }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);
  const width = Math.round(height * 2.4);

  if (failed) {
    return (
      <div
        className={`flex items-center gap-2 ${className}`}
        style={{ height }}
        aria-label="NJ&NY Duct Cleaning LLC"
      >
        <svg
          width={height}
          height={height}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="64" height="64" rx="12" fill="#000000" />
          <path
            d="M8 44 L18 28 L28 40 L38 22 L48 36 L56 28"
            stroke="url(#njnyLogoWave)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="njnyLogoWave" x1="8" y1="22" x2="56" y2="44">
              <stop stopColor="#29B6FF" />
              <stop offset="1" stopColor="#0A5BFF" />
            </linearGradient>
          </defs>
        </svg>
        <span
          className="font-heading text-lg font-extrabold italic leading-none tracking-tight sm:text-xl"
          style={{ height }}
        >
          <span className="text-blue-gradient">NJ</span>
          <span className="text-silver">&amp;</span>
          <span className="text-blue-gradient">NY</span>
          <span className="ml-1 text-silver">Duct</span>
        </span>
      </div>
    );
  }

  return (
    <Image
      src="/images/logo.png"
      alt="NJ&NY Duct Cleaning LLC"
      width={width}
      height={height}
      className={`h-auto w-auto object-contain ${className}`}
      style={{ maxHeight: height }}
      priority
      onError={() => setFailed(true)}
    />
  );
}
