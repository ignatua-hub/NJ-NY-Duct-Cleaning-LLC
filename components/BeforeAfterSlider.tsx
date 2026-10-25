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
      <div className="flex h-full w-full items-end justify-center bg-[#0A0F1A] px-4 pb-4 text-center text-base font-medium text-brand-muted">
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
  const [draggingUi, setDraggingUi] = useState(false);
  const dragging = useRef(false);
  const introPlayed = useRef(false);
  const scrollLock = useRef<{ x: number; y: number } | null>(null);

  const stopScrollLock = useCallback(() => {
    const lock = scrollLock.current;
    scrollLock.current = null;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    if (lock) window.scrollTo(lock.x, lock.y);
  }, []);

  useEffect(() => {
    const blockMove = (event: TouchEvent) => {
      if (!dragging.current) return;
      event.preventDefault();
    };
    const blockScroll = () => {
      const lock = scrollLock.current;
      if (!lock || !dragging.current) return;
      if (window.scrollX !== lock.x || window.scrollY !== lock.y) {
        window.scrollTo(lock.x, lock.y);
      }
    };
    window.addEventListener("touchmove", blockMove, { passive: false });
    window.addEventListener("scroll", blockScroll);
    return () => {
      window.removeEventListener("touchmove", blockMove);
      window.removeEventListener("scroll", blockScroll);
      stopScrollLock();
    };
  }, [stopScrollLock]);

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
    setDraggingUi(true);
    scrollLock.current = { x: window.scrollX, y: window.scrollY };
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    e.preventDefault();
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    setDraggingUi(false);
    stopScrollLock();
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

  // position = % of AFTER revealed, left of the handle. 0 = BEFORE only, 100 = AFTER only.
  const afterClip = `inset(0 calc(100% - ${position}%) 0 0)`;
  const roundedPosition = Math.round(position);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-white/10 bg-brand-alt md:aspect-[16/10]"
      style={{ touchAction: draggingUi ? "none" : "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={roundedPosition}
      aria-valuetext={`${roundedPosition}% after cleaning shown`}
      aria-label="Before and after comparison. Move right to reveal after cleaning, left to reveal before cleaning."
      onKeyDown={onKeyDown}
    >
      <div className="absolute inset-0" data-layer="before">
        <PhotoOrPlaceholder
          src={beforeSrc}
          alt={`${title} — before cleaning`}
          priority={priority}
        />
      </div>

      <div className="absolute inset-0" data-layer="after" style={{ clipPath: afterClip }}>
        <PhotoOrPlaceholder
          src={afterSrc}
          alt={`${title} — after cleaning`}
          priority={priority}
        />
      </div>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-30 w-[3px] -translate-x-1/2 bg-white"
        style={{ left: `${position}%` }}
      />
      <div
        className="absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-glow"
        style={{
          left: `clamp(22px, ${position}%, calc(100% - 22px))`,
          backgroundImage: "linear-gradient(135deg, #29B6FF 0%, #0A5BFF 100%)",
          touchAction: "none",
        }}
      >
        <ChevronLeft className="h-4 w-4 text-white" aria-hidden="true" />
        <ChevronRight className="h-4 w-4 text-white" aria-hidden="true" />
      </div>
    </div>
  );
}
