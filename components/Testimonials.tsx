"use client";

import { Star } from "lucide-react";
import FadeIn from "./FadeIn";

// TODO: replace with real reviews
const REVIEWS = [
  {
    name: "Maria",
    town: "Paramus, NJ",
    text: "Our allergies calmed down within days. The crew was on time, careful with the floors, and the before-and-after on our returns was unreal.",
  },
  {
    name: "James",
    town: "Jersey City, NJ",
    text: "Dryer used to take two cycles. After the vent cleaning it finishes in one — and I finally stopped worrying about lint and fire risk.",
  },
  {
    name: "Priya",
    town: "Princeton, NJ",
    text: "Chimney smelled smoky every winter. They cleaned it thoroughly, explained what they found, and pricing was exactly what they quoted.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">What Neighbors </span>
            <span className="text-blue-gradient">Say</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            Homeowners across New Jersey trust us with the air they breathe.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <FadeIn key={review.name} delay={index * 0.05}>
              <blockquote className="card-surface flex h-full flex-col p-6">
                <div className="mb-3 flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-brand-cyan text-brand-cyan"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-brand-muted">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="mt-4 text-sm font-semibold text-white">
                  {review.name}
                  <span className="font-normal text-brand-muted"> — {review.town}</span>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
