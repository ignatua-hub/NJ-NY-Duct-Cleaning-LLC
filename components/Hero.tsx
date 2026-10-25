"use client";

import { CheckCircle2, Phone } from "lucide-react";
import Skyline from "./Skyline";
import FadeIn from "./FadeIn";

const TRUST_BADGES = [
  "Licensed & Insured",
  "Satisfaction Guaranteed",
  "Same-Week Appointments",
  "Upfront Pricing",
];

// TODO: replace with real business phone number
const PHONE_HREF = "tel:+10000000000";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-black pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20"
    >
      <Skyline className="pointer-events-none absolute bottom-0 left-0 right-0 w-full" opacity={0.14} />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M-40 120 C 200 40, 420 200, 680 120 S 1100 40, 1480 160"
          stroke="#29B6FF"
          strokeWidth="1.5"
          opacity="0.35"
        />
        <path
          d="M-40 220 C 240 140, 460 300, 740 200 S 1160 120, 1480 240"
          stroke="#1E90FF"
          strokeWidth="1.25"
          opacity="0.25"
        />
        <path
          d="M-40 340 C 280 260, 500 400, 780 320 S 1200 240, 1480 360"
          stroke="#0A5BFF"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="font-heading text-5xl font-extrabold italic leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-silver">Breathe Cleaner. </span>
            <span className="text-blue-gradient">Live Safer.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
            New Jersey&apos;s trusted experts in air duct, dryer vent, chimney and HVAC
            care. Healthier air, lower energy bills, and a safer home — guaranteed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-primary text-base">
              Get a Free Quote
            </a>
            {/* TODO: replace with real business phone number */}
            <a href={PHONE_HREF} className="btn-secondary gap-2 text-base">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-2 text-sm font-medium text-white/90"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-cyan" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
