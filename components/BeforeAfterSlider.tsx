"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  priority?: boolean;
};

function PhotoOrPlaceholder({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0A0F1A] text-sm font-medium text-brand-muted">
        Add photo
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  title,
  priority = false,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);
  const introPlayed = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 2));
    }
  };

  // One-time intro animation when slider enters viewport: 50 → 65 → 35 → 50
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || introPlayed.current) return;
        introPlayed.current = true;

        const frames = [65, 35, 50];
        let i = 0;
        const run = () => {
          if (i >= frames.length) return;
          setPosition(frames[i]);
          i += 1;
          window.setTimeout(run, 420);
        };
        window.setTimeout(run, 350);
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // BEFORE is top layer clipped with inset(0 X% 0 0) where X = 100 - position.
  // Dragging RIGHT increases position → reveals MORE BEFORE.
  // Dragging LEFT decreases position → reveals MORE AFTER.
  const beforeClip = `inset(0 ${100 - position}% 0 0)`;

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-card border border-white/10 bg-brand-alt md:aspect-[16/10]"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label="Before and after comparison"
      onKeyDown={onKeyDown}
    >
      {/* AFTER — bottom layer */}
      <div className="absolute inset-0">
        <PhotoOrPlaceholder
          src={afterSrc}
          alt={`${title} — after cleaning`}
          priority={priority}
        />
      </div>

      {/* BEFORE — top layer, clipped */}
      <div className="absolute inset-0" style={{ clipPath: beforeClip }}>
        <PhotoOrPlaceholder
          src={beforeSrc}
          alt={`${title} — before cleaning`}
          priority={priority}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-pill bg-black/75 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" aria-hidden="true" />
        BEFORE
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-pill bg-black/75 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" aria-hidden="true" />
        AFTER
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-30"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-white" />
        <div
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-glow"
          style={{
            backgroundImage: "linear-gradient(135deg, #29B6FF 0%, #0A5BFF 100%)",
            touchAction: "none",
            pointerEvents: "auto",
          }}
        >
          <ChevronLeft className="h-4 w-4 text-white" aria-hidden="true" />
          <ChevronRight className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
