"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";

const COUNTIES = [
  "Bergen",
  "Hudson",
  "Essex",
  "Passaic",
  "Morris",
  "Union",
  "Middlesex",
  "Monmouth",
  "Ocean",
  "Mercer",
  "Somerset",
  "Camden",
  "Burlington",
  "Atlantic",
  "Cape May",
  "Gloucester",
  "Hunterdon",
  "Warren",
  "Sussex",
  "Cumberland",
  "Salem",
];

export default function ServiceArea() {
  return (
    <section
      id="service-area"
      className="relative overflow-hidden bg-brand-alt py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/service-area-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[56%_center] md:object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/55 via-[#0A0F1A]/45 to-[#0A0F1A]/80" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0A0F1A]/70 via-[#0A0F1A]/20 to-transparent md:block" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">Proudly Serving All of </span>
            <span className="text-blue-gradient">New Jersey</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            From Bergen to Cape May, our crews are on the road every day.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {COUNTIES.map((county) => (
              <li
                key={county}
                className="rounded-pill border border-white/10 bg-[#0F1624]/80 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
              >
                {county}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
