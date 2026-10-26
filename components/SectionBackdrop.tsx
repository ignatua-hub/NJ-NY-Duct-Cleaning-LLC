import Image from "next/image";
import type { ReactNode } from "react";

export const SECTION_COLORS = {
  black: "#000000",
  alt: "#0A0F1A",
} as const;

type SectionBackdropProps = {
  /** Background photo under /public; covers the whole section when set. */
  src?: string;
  imageClassName?: string;
  /** Tint layers drawn over the photo. */
  overlay?: ReactNode;
  /** Color of the section above; the top edge fades in from it. */
  fadeFrom?: string;
  /** This section's own background color; the photo fades into it at the bottom. */
  color: string;
  wave?: boolean;
  /** Load immediately — use for the first photo below the hero. */
  priority?: boolean;
};

export default function SectionBackdrop({
  src,
  imageClassName = "",
  overlay,
  fadeFrom,
  color,
  wave = true,
  priority = false,
}: SectionBackdropProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {src && (
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={`object-cover ${imageClassName}`}
        />
      )}
      {overlay}
      {src && (
        <div
          className="absolute inset-x-0 bottom-0 h-10 sm:h-14"
          style={{ background: `linear-gradient(to bottom, transparent, ${color})` }}
        />
      )}
      {fadeFrom && (
        <div
          className={`absolute inset-x-0 top-0 ${src ? "h-8 sm:h-10" : "h-16 sm:h-24"}`}
          style={{ background: `linear-gradient(to bottom, ${fadeFrom}, transparent)` }}
        />
      )}
      {wave && (
        <svg
          className="absolute inset-x-0 top-0 mx-auto h-12 w-full max-w-5xl px-4"
          viewBox="0 0 800 48"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24 C 80 8, 160 40, 240 24 S 400 8, 480 24 S 640 40, 800 24"
            stroke="url(#airflow-wave)"
            strokeWidth="2"
            opacity="0.55"
          />
          <path
            d="M0 32 C 100 16, 180 44, 280 28 S 460 12, 560 30 S 700 44, 800 28"
            stroke="url(#airflow-wave)"
            strokeWidth="1.5"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="airflow-wave" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#29B6FF" stopOpacity="0" />
              <stop offset="0.5" stopColor="#1E90FF" />
              <stop offset="1" stopColor="#0A5BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}
