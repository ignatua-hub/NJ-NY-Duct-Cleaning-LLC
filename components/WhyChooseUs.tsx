"use client";

import {
  BadgeCheck,
  CalendarClock,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import FadeIn from "./FadeIn";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Experienced and Insured Technicians",
    text: "Seasoned, background-checked crews who treat your home like their own — fully licensed and insured.",
  },
  {
    icon: Sparkles,
    title: "Professional Equipment",
    text: "Commercial-grade vacuums and tools that pull out what consumer kits leave behind.",
  },
  {
    icon: Wallet,
    title: "Upfront Pricing No Hidden Fees",
    text: "Clear quotes before we start. The price we give you is the price you pay.",
  },
  {
    icon: HandHeart,
    title: "Clean and Respectful Service",
    text: "Shoe covers, drop cloths, and a tidy finish — we leave rooms cleaner than we found them.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guarantee",
    text: "If you are not happy with the results, we make it right. No runaround.",
  },
  {
    icon: CalendarClock,
    title: "Fast Scheduling Across New Jersey",
    text: "Same-week appointments across NJ counties — we come to you when it works for your schedule.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-brand-alt py-16 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px] md:inset-y-0 md:h-auto"
        aria-hidden="true"
      >
        <Image
          src="/images/why-us-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[35%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/15 via-[#0A0F1A]/10 to-[#0A0F1A] md:to-[#0A0F1A]/50" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            <span className="text-silver">Why Choose </span>
            <span className="text-blue-gradient">NJ&amp;NY</span>
          </h2>
          <p className="mt-3 max-w-2xl text-brand-muted">
            Bold care for your air, your vents, and your peace of mind.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <FadeIn key={reason.title} delay={index * 0.04}>
                <article className="card-surface h-full !bg-[#0F1624]/70 p-6 backdrop-blur-[2px] transition hover:shadow-glow">
                  <div className="mb-4 inline-flex rounded-full bg-white/5 p-3 text-brand-cyan">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold italic text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-brand-muted">
                    {reason.text}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
