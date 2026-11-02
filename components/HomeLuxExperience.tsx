"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, Star, X } from "lucide-react";
import FadeIn from "./FadeIn";
import {
  homeluxProfile as profile,
  homeluxReviews,
  type HomeLuxReview,
} from "@/data/homelux";

const STAR_GOLD = "#F5B301";
const LINK_REL = "noopener noreferrer";

function GoldStars({
  count,
  className = "h-4 w-4",
  label,
}: {
  count: number;
  className?: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className={className}
          style={{ fill: STAR_GOLD, color: STAR_GOLD }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCount(3);
      else if (w >= 768) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function ReviewPhotoThumbs({
  photos,
  onOpen,
}: {
  photos: string[];
  onOpen: (src: string) => void;
}) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const visible = photos.filter((src) => !failed[src]);
  if (visible.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {visible.map((src) => (
        <button
          key={src}
          type="button"
          onClick={() => onOpen(src)}
          className="relative h-[72px] w-[72px] min-h-[44px] min-w-[44px] overflow-hidden rounded-lg border border-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B6FF]"
        >
          <Image
            src={src}
            alt="Photo from a customer review"
            width={72}
            height={72}
            className="h-full w-full object-cover"
            onError={() => setFailed((prev) => ({ ...prev, [src]: true }))}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  onOpenPhoto,
}: {
  review: HomeLuxReview;
  onOpenPhoto: (src: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const textId = useId();

  return (
    <article
      className="flex h-full min-h-[280px] flex-col rounded-[16px] border p-5 sm:p-6"
      style={{
        background: "rgba(15,22,36,0.9)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <GoldStars count={5} label="5 out of 5 stars" />
      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="text-base font-bold text-white">{review.author}</h3>
        <p className="text-base text-brand-muted">{review.date}</p>
      </div>
      <p className="mt-2 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-pill bg-brand-blue/15 px-3 text-sm font-medium text-white">
        <ShieldCheck className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
        {review.label}
      </p>
      <blockquote className="mt-4 flex-1">
        <p
          id={textId}
          className={`text-base leading-relaxed text-white ${
            review.clampPreview && !expanded ? "line-clamp-6" : ""
          }`}
        >
          <span className="text-brand-blue" aria-hidden="true">
            “
          </span>
          {review.text}
          <span className="text-brand-blue" aria-hidden="true">
            ”
          </span>
        </p>
        {review.clampPreview && (
          <button
            type="button"
            className="mt-2 min-h-11 text-base font-semibold text-brand-cyan underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B6FF]"
            aria-expanded={expanded}
            aria-controls={textId}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </blockquote>
      <p className="mt-4 text-base text-brand-muted">{review.details}</p>
      <p className="mt-2 text-base font-medium text-brand-cyan">{review.service}</p>
      <ReviewPhotoThumbs photos={review.photos} onOpen={onOpenPhoto} />
    </article>
  );
}

function PhotoLightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo from a customer review"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B6FF]"
        aria-label="Close photo"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt="Photo from a customer review"
          width={1200}
          height={900}
          className="max-h-[85vh] w-auto rounded-card object-contain"
        />
      </div>
    </div>
  );
}

export default function HomeLuxExperience() {
  const reviews = homeluxReviews;
  const visibleCount = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => {
        const next = i + dir;
        if (next < 0) return maxIndex;
        if (next > maxIndex) return 0;
        return next;
      });
    },
    [maxIndex],
  );

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (lightbox) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: ReactTouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) < 50) return;
    go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="homelux"
      className="relative scroll-mt-24 overflow-x-hidden overflow-y-hidden bg-brand-alt py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
              <span className="text-silver">{profile.sectionTitleBefore}</span>
              <span className="text-blue-gradient">{profile.sectionTitleAccent}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base text-brand-muted">
              {profile.subtitle}
            </p>
            <p className="mt-4 text-base text-brand-muted">{profile.sourceLine}</p>
            <p className="mt-6 text-base text-brand-muted">{profile.marketplaceName}</p>
            <a
              href={profile.profileUrl}
              target="_blank"
              rel={LINK_REL}
              className="mt-1 inline-flex min-h-11 items-center text-base font-semibold text-brand-blue underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B6FF]"
            >
              {profile.companyName}
            </a>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <GoldStars
                count={profile.rating}
                className="h-5 w-5"
                label={`${profile.rating} out of 5 stars from ${profile.reviewsCount} reviews ${profile.asOf}`}
              />
              <span className="text-base text-white">{profile.reviewsCount}</span>
              <span className="text-base text-brand-muted">{profile.asOf}</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10">
          <div
            ref={regionRef}
            className="relative outline-none"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="HomeLux reviews from Thumbtack"
            onKeyDown={onKeyDown}
          >
            <div
              className="overflow-hidden touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${index * (100 / visibleCount)}%)`,
                }}
              >
                {reviews.map((review, reviewIndex) => (
                  <div
                    key={review.id}
                    className="min-w-0 shrink-0 px-2 sm:px-3"
                    style={{ flexBasis: `${100 / visibleCount}%` }}
                    aria-hidden={
                      reviewIndex < index || reviewIndex >= index + visibleCount
                    }
                  >
                    <ReviewCard review={review} onOpenPhoto={setLightbox} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0F1624] text-white transition hover:border-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B6FF]"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0F1624] text-white transition hover:border-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B6FF]"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-10 flex flex-col items-center text-center">
            <a
              href={profile.profileUrl}
              target="_blank"
              rel={LINK_REL}
              className="btn-primary min-h-11 px-6"
            >
              {profile.ctaLabel}
            </a>
            <p className="mt-4 max-w-2xl text-base text-brand-muted">
              {profile.permissionNote}
            </p>
          </div>
        </FadeIn>
      </div>

      {lightbox && (
        <PhotoLightbox src={lightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
